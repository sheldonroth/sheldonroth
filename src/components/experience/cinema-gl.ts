/**
 * A small full-screen WebGL renderer for the cinematic preview: two photographs on one quad, a slow push-in per
 * work, three shader transitions (light streak, blur-to-focus, film burn) and a film finish (bloom, vignette,
 * grain, floating dust). No three.js: one shader, one quad, so it stays light on phones.
 */

export type TransitionKind = 1 | 2 | 3; // 1 light streak, 2 blur to focus, 3 film burn

export interface Plate {
  aspect: number; // width / height
  focal: { x: number; y: number }; // 0..1 from the top-left of the photograph
}

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUv;
uniform sampler2D uA;
uniform sampler2D uB;
uniform vec4 uRectA;
uniform vec4 uRectB;
uniform float uP;
uniform float uType;
uniform float uTime;
uniform vec2 uRes;
uniform float uFlash;
uniform float uDust;

const float PI = 3.14159265;

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) { float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; } return v; }

vec3 tap(sampler2D t, vec4 r, vec2 uv) { return texture2D(t, r.xy + (uv - 0.5) * r.zw).rgb; }
vec3 tapLod(sampler2D t, vec4 r, vec2 uv, float bias) { return texture2D(t, r.xy + (uv - 0.5) * r.zw, bias).rgb; }

// 13-tap golden-spiral blur with a per-pixel random turn (no banding) and a mip bias where mipmaps exist
// (WebGL2), so wide blurs stay smooth. rad is in screen uv, stretched for the anamorphic streak.
vec3 soft(sampler2D t, vec4 r, vec2 uv, vec2 rad) {
  float bias = clamp(log2(max(min(rad.x * uRes.x, rad.y * uRes.y) / 6.0, 1.0)), 0.0, 5.0);
  float turn = hash(gl_FragCoord.xy) * 6.2831;
  vec3 acc = tapLod(t, r, uv, bias);
  for (int i = 1; i < 13; i++) {
    float fi = float(i);
    float a = fi * 2.39996 + turn;
    vec2 o = vec2(cos(a), sin(a)) * sqrt(fi / 12.0) * rad;
    acc += tapLod(t, r, uv + o, bias);
  }
  return acc / 13.0;
}

float dust(vec2 uv, float t) {
  float d = 0.0;
  float aspect = uRes.x / uRes.y;
  for (int l = 0; l < 3; l++) {
    float fl = float(l);
    float sc = (6.0 + fl * 5.0) * max(uRes.y / 900.0, 0.75);
    vec2 p = uv * vec2(aspect, 1.0) * sc;
    p += vec2(t * (0.010 + fl * 0.006), t * (0.018 + fl * 0.008)) * sc * 0.6;
    vec2 id = floor(p);
    vec2 f = fract(p);
    float r = hash(id + fl * 17.0);
    if (r > 0.86) {
      vec2 c = vec2(hash(id + 3.1), hash(id + 7.7)) * 0.7 + 0.15;
      c += 0.1 * vec2(sin(t * 0.37 + r * 40.0), cos(t * 0.29 + r * 30.0));
      float s = 0.025 + 0.04 * hash(id + 5.0);
      float tw = 0.5 + 0.5 * sin(t * (0.5 + r) + r * 60.0);
      d += smoothstep(s, 0.0, length(f - c)) * (0.35 + 0.65 * tw) * (1.0 - fl * 0.25);
    }
  }
  return d;
}

void main() {
  vec2 uv = vUv;
  float p = clamp(uP, 0.0, 1.0);
  float bell = sin(p * PI);
  float aspect = uRes.x / uRes.y;
  float blurA = 0.0, blurB = 0.0, m = p;
  vec2 stretch = vec2(1.0, 1.0);
  vec3 light = vec3(0.0);

  if (uType > 0.5 && uType < 1.5) {
    // Light streak: the scene blooms into a horizontal ribbon of light and the next work resolves out of it.
    blurA = 0.04 * smoothstep(0.1, 0.5, p);
    blurB = 0.04 * (1.0 - smoothstep(0.5, 0.95, p));
    stretch = vec2(2.6, 0.08);
    m = smoothstep(0.4, 0.6, p);
    float y = uv.y - mix(0.56, 0.46, p);
    float x = uv.x - (p * 1.8 - 0.4);
    float head = exp(-x * x * 6.0);
    light = vec3(1.0, 0.84, 0.64) * (exp(-y * y * 5000.0) * 1.6 + exp(-y * y * 140.0) * 0.22) * bell * (0.35 + 0.9 * head);
    light += vec3(1.0, 0.9, 0.78) * pow(bell, 4.0) * 0.18;
  } else if (uType > 1.5 && uType < 2.5) {
    // Blur to focus.
    blurA = 0.035 * smoothstep(0.0, 0.55, p);
    blurB = 0.045 * (1.0 - smoothstep(0.35, 1.0, p));
    m = smoothstep(0.25, 0.7, p);
  } else if (uType > 2.5) {
    // Film burn: the next work develops through a drifting noise front with a warm edge.
    // Film dissolve: the next work develops through a soft drifting front with a faint amber edge.
    float n = fbm(uv * vec2(aspect, 1.0) * 1.6 + uTime * 0.04) * 0.75 + (1.0 - uv.y) * 0.25;
    float edge = p * 1.3 - 0.15;
    m = 1.0 - smoothstep(edge - 0.12, edge + 0.12, n);
    float e = exp(-pow((n - edge) / 0.06, 2.0)) * bell;
    light = vec3(1.0, 0.7, 0.42) * e * 0.28;
  }

  vec2 radA = vec2(max(blurA, 0.008)) * stretch * vec2(1.0 / aspect, 1.0);
  vec2 radB = vec2(max(blurB, 0.008)) * stretch * vec2(1.0 / aspect, 1.0);
  vec3 sA = tap(uA, uRectA, uv);
  vec3 gA = soft(uA, uRectA, uv, radA);
  vec3 a = mix(sA, gA, clamp(blurA / 0.008, 0.0, 1.0));
  vec3 col = a;
  vec3 glow = gA;
  if (m > 0.001) {
    vec3 sB = tap(uB, uRectB, uv);
    vec3 gB = soft(uB, uRectB, uv, radB);
    vec3 b = mix(sB, gB, clamp(blurB / 0.008, 0.0, 1.0));
    col = mix(a, b, m);
    glow = mix(gA, gB, m);
  }

  // Bloom from the soft pass, a gentle filmic shoulder, and the light of the transition.
  col += max(glow - 0.82, 0.0) * vec3(1.0, 0.92, 0.82) * 0.3;
  col += light;
  col = col * (1.0 + uFlash * 1.6);
  col = col / (1.0 + max(col - 1.0, 0.0));

  // Vignette.
  vec2 q = (uv - 0.5) * vec2(1.0, 1.0);
  col *= 1.0 - 0.42 * pow(length(q) * 1.35, 2.4);

  // Floating dust, lit by the scene.
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  col += vec3(1.0, 0.95, 0.88) * dust(uv, uTime) * (0.06 + 0.16 * lum) * uDust;

  // Grain.
  float g = hash(gl_FragCoord.xy + fract(uTime * 7.13) * 371.0) - 0.5;
  col += g * 0.04 * (1.0 - lum * 0.5);

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const easeInOut = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * t);

export class Cinema {
  private gl: WebGLRenderingContext;
  private gl2: boolean;
  private prog: WebGLProgram;
  private u: Record<string, WebGLUniformLocation | null> = {};
  private texs: (WebGLTexture | null)[];
  private black: WebGLTexture;
  private arrive: number[];
  private from = -1;
  private to = -1;
  private type: TransitionKind = 1;
  private tStart = 0;
  private flashStart = -1e9;
  private raf = 0;
  private t0 = performance.now();
  readonly duration = 1700;

  private constructor(private canvas: HTMLCanvasElement, gl: WebGLRenderingContext, gl2: boolean, private plates: Plate[]) {
    this.gl = gl;
    this.gl2 = gl2;
    this.prog = this.build();
    this.texs = plates.map(() => null);
    this.arrive = plates.map(() => 0);
    this.black = this.makeTex();
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([6, 6, 6, 255]));
  }

  static create(canvas: HTMLCanvasElement, plates: Plate[]): Cinema | null {
    const opts: WebGLContextAttributes = { antialias: false, alpha: false, premultipliedAlpha: false, powerPreference: 'high-performance' };
    try {
      const gl2 = canvas.getContext('webgl2', opts) as WebGLRenderingContext | null;
      const gl = gl2 ?? (canvas.getContext('webgl', opts) as WebGLRenderingContext | null);
      if (!gl) return null;
      return new Cinema(canvas, gl, !!gl2, plates);
    } catch {
      return null;
    }
  }

  private build() {
    const gl = this.gl;
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader');
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? 'link');
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    for (const n of ['uA', 'uB', 'uRectA', 'uRectB', 'uP', 'uType', 'uTime', 'uRes', 'uFlash', 'uDust']) this.u[n] = gl.getUniformLocation(prog, n);
    gl.uniform1i(this.u.uA, 0);
    gl.uniform1i(this.u.uB, 1);
    gl.uniform1f(this.u.uDust, 1);
    return prog;
  }

  private makeTex() {
    const gl = this.gl;
    const t = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    return t;
  }

  /** Upload (or replace with a sharper copy) the photograph for plate i. */
  upload(i: number, img: HTMLImageElement) {
    const gl = this.gl;
    const t = this.texs[i] ?? this.makeTex();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    if (this.gl2) {
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    }
    this.texs[i] = t;
  }

  /** Cut to plate i through a transition (from the current plate, or from black on the first call). */
  show(i: number, type: TransitionKind, flash = false) {
    const now = performance.now();
    this.from = this.to;
    this.to = i;
    this.type = type;
    this.tStart = now;
    this.arrive[i] = now;
    if (flash) this.flashStart = now;
  }

  setDust(on: boolean) {
    this.gl.useProgram(this.prog);
    this.gl.uniform1f(this.u.uDust, on ? 1 : 0);
  }

  start() {
    const loop = (now: number) => {
      this.frame(now);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.gl.getExtension('WEBGL_lose_context')?.loseContext();
  }

  private resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const w = Math.round(this.canvas.clientWidth * dpr);
    const h = Math.round(this.canvas.clientHeight * dpr);
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    return [w, h];
  }

  /** The window into plate i: centre and size in texture uv, with a slow push-in and drift since it arrived. */
  private rect(i: number, now: number, W: number, H: number, extraZoom: number): [number, number, number, number] {
    if (i < 0) return [0.5, 0.5, 1, 1];
    const pl = this.plates[i];
    const sa = W / H;
    let fx = 1, fy = 1;
    if (sa > pl.aspect) fy = pl.aspect / sa;
    else fx = sa / pl.aspect;
    const m = easeInOut(clamp((now - this.arrive[i]) / 24000, 0, 1));
    const dir = i % 2 ? -1 : 1;
    const z = 1.04 + 0.11 * m + extraZoom;
    fx /= z;
    fy /= z;
    const cx = clamp(pl.focal.x + dir * (m - 0.5) * 0.05, fx / 2, 1 - fx / 2);
    const cy = clamp(1 - pl.focal.y + (m - 0.5) * 0.02, fy / 2, 1 - fy / 2);
    return [cx, cy, fx, fy];
  }

  private frame(now: number) {
    const gl = this.gl;
    const [W, H] = this.resize();
    gl.viewport(0, 0, W, H);
    gl.useProgram(this.prog);
    const p = clamp((now - this.tStart) / this.duration, 0, 1);
    const transitioning = p < 1 && this.from !== this.to;
    const a = transitioning ? this.from : this.to;
    const push = transitioning && this.type === 1 ? 0.14 * p * p : 0;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, (a >= 0 && this.texs[a]) || this.black);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, (transitioning && this.to >= 0 && this.texs[this.to]) || this.black);
    gl.uniform4fv(this.u.uRectA, this.rect(a, now, W, H, push));
    gl.uniform4fv(this.u.uRectB, this.rect(this.to, now, W, H, transitioning ? 0.06 * (1 - p) : 0));
    gl.uniform1f(this.u.uP, transitioning ? p : 0);
    gl.uniform1f(this.u.uType, transitioning ? this.type : 0);
    gl.uniform1f(this.u.uTime, (now - this.t0) / 1000);
    gl.uniform2f(this.u.uRes, W, H);
    const f = clamp(1 - (now - this.flashStart) / 900, 0, 1);
    gl.uniform1f(this.u.uFlash, f * f);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}
