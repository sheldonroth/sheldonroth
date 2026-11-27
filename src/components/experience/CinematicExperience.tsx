'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Cinema, type TransitionKind } from './cinema-gl';
import { markExperienceSeen } from './seen';
import s from './experience.module.css';

export interface Chapter {
  slug: string;
  title: string;
  gallery: string;
  tagline: string;
  description: string;
  edition: number;
  tier: string;
  from?: string;
  width: number;
  height: number;
  focal: { x: number; y: number };
}

const TRANSITIONS: TransitionKind[] = [1, 2, 3];
const sized = (slug: string, w: number) => `/works/w${w}/${slug}.jpg`;

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new window.Image();
    img.decoding = 'async';
    img.onload = () => (img.decode ? img.decode().catch(() => undefined).then(() => resolve(img)) : resolve(img));
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Wordless cinematic opening: full-screen photographs with WebGL transitions, moved through by scroll, swipe,
 * keys or click. A faint scroll cue is the only type. Moving past the last photograph hands off to the normal
 * home page ("/", served as the home once the sr_seen cookie is set).
 */
export default function CinematicExperience({ chapters }: { chapters: Chapter[] }) {
  const N = chapters.length;
  const [mode, setMode] = useState<'gl' | 'css' | null>(null);
  const [reduced, setReduced] = useState(false);
  const [touch, setTouch] = useState(false);
  const [phase, setPhase] = useState<'intro' | 'show'>('intro');
  const [progress, setProgress] = useState(0);
  const [minTime, setMinTime] = useState(false);
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [leaving, setLeaving] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cinemaRef = useRef<Cinema | null>(null);
  const lockUntil = useRef(0);
  const indexRef = useRef(0);
  const startRef = useRef(0);
  indexRef.current = index;

  /** Hand off to the normal home page: fade out, then a full navigation so "/" is served as the home. */
  const enterSite = useCallback(() => {
    if (leaving) return;
    markExperienceSeen();
    setLeaving(true);
    window.setTimeout(() => window.location.assign('/'), reduced ? 80 : 1000);
  }, [leaving, reduced]);

  // Pick the renderer once on the client: WebGL, unless it is missing or the visitor prefers reduced motion.
  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduced(rm);
    setTouch(window.matchMedia('(pointer: coarse)').matches);
    const start = chapters.findIndex((c) => c.slug === window.location.hash.replace(/^#/, ''));
    if (start >= 0) {
      startRef.current = start;
      setIndex(start);
    }
    if (rm || !canvasRef.current) {
      setMode('css');
      return;
    }
    try {
      const c = Cinema.create(
        canvasRef.current,
        chapters.map((ch) => ({ aspect: ch.width / ch.height, focal: ch.focal })),
      );
      if (!c) throw new Error('no webgl');
      cinemaRef.current = c;
      c.start();
      setMode('gl');
    } catch {
      setMode('css');
    }
    const lost = (e: Event) => {
      e.preventDefault();
      setMode('css');
    };
    const canvas = canvasRef.current;
    canvas.addEventListener('webglcontextlost', lost);
    return () => {
      canvas.removeEventListener('webglcontextlost', lost);
      cinemaRef.current?.destroy();
      cinemaRef.current = null;
    };
  }, [chapters]);

  // Progressive loading: a light copy of every work first (the hairline bar tracks this), then sharp copies nearest first.
  useEffect(() => {
    if (!mode) return;
    let cancelled = false;
    const big = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2) > 1300 ? 2048 : 1200;
    const first = startRef.current;
    const order = chapters.map((_, i) => i).sort((a, b) => Math.abs(a - first) - Math.abs(b - first));
    (async () => {
      if (mode === 'css') {
        await Promise.allSettled(order.slice(0, 2).map((i) => loadImage(sized(chapters[i].slug, 1200))));
        if (!cancelled) setProgress(1);
        return;
      }
      let done = 0;
      const total = N;
      // The opening work in a sharp copy first, so the hard cut lands on a crisp frame.
      const hero = await loadImage(sized(chapters[first].slug, 1200)).catch(() => null);
      if (cancelled) return;
      if (hero) cinemaRef.current?.upload(first, hero);
      setProgress(++done / total);
      await Promise.all(
        order.map(async (i) => {
          if (i === first) return;
          const img = await loadImage(sized(chapters[i].slug, 640)).catch(() => null);
          if (cancelled) return;
          if (img) cinemaRef.current?.upload(i, img);
          setProgress(++done / total);
        }),
      );
      setProgress(1);
      for (const i of order) {
        if (cancelled) return;
        const img = await loadImage(sized(chapters[i].slug, big)).catch(() => null);
        if (img && !cancelled) cinemaRef.current?.upload(i, img);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [mode, chapters, N]);

  // The opening is a near-black screen with a hairline progress bar, held long enough to read as a pause.
  useEffect(() => {
    if (!mode) return;
    const id = window.setTimeout(() => setMinTime(true), reduced ? 200 : 1500);
    return () => window.clearTimeout(id);
  }, [mode, reduced]);

  // Hard cut from the opening to the first work once the images are in.
  useEffect(() => {
    if (phase !== 'intro' || !mode || !minTime || progress < 1) return;
    setPhase('show');
    markExperienceSeen();
    cinemaRef.current?.show(startRef.current, 1, true);
    lockUntil.current = performance.now() + 1200;
  }, [phase, mode, minTime, progress]);

  const go = useCallback(
    (next: number, force = false) => {
      if (phase !== 'show' || leaving) return;
      const cur = indexRef.current;
      const now = performance.now();
      if (next >= N) {
        // Past the last photograph: on to the normal site (never from a stray gesture right as it arrives).
        if (cur === N - 1 && now >= lockUntil.current) enterSite();
        return;
      }
      const n = Math.max(0, next);
      if (n === cur) return;
      if (!force && now < lockUntil.current) return;
      lockUntil.current = now + (reduced ? 500 : 1150);
      setPrevIndex(cur);
      setIndex(n);
      cinemaRef.current?.show(n, TRANSITIONS[n % TRANSITIONS.length]);
    },
    [N, phase, leaving, reduced, enterSite],
  );

  // Hash per work, kept in step with the view (and followed when edited by hand).
  useEffect(() => {
    if (phase !== 'show') return;
    const hash = chapters[index].slug;
    if (window.location.hash !== `#${hash}`) window.history.replaceState(null, '', `#${hash}`);
  }, [index, phase, chapters]);

  useEffect(() => {
    const onHash = () => {
      const i = chapters.findIndex((c) => c.slug === window.location.hash.replace(/^#/, ''));
      if (i >= 0) go(i, true);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [go, chapters]);

  // Keys, wheel and swipe.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const cur = indexRef.current;
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        go(cur + 1, true);
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        go(cur - 1, true);
      } else if (e.key === 'Home') {
        e.preventDefault();
        go(0, true);
      } else if (e.key === 'End') {
        e.preventDefault();
        go(N - 1, true);
      }
    };
    let acc = 0;
    let accTimer = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      acc += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      window.clearTimeout(accTimer);
      accTimer = window.setTimeout(() => (acc = 0), 220);
      if (Math.abs(acc) > 60) {
        go(indexRef.current + Math.sign(acc));
        acc = 0;
      }
    };
    let tx = 0, ty = 0, tt = 0;
    const onStart = (e: TouchEvent) => {
      tx = e.touches[0].clientX;
      ty = e.touches[0].clientY;
      tt = performance.now();
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - tx;
      const dy = e.changedTouches[0].clientY - ty;
      if (performance.now() - tt > 900) return;
      const d = Math.abs(dx) > Math.abs(dy) ? dx : dy;
      if (Math.abs(d) < 45) return;
      go(indexRef.current + (d < 0 ? 1 : -1), true);
    };
    const onMove = (e: TouchEvent) => e.preventDefault();
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: false });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
      window.removeEventListener('touchmove', onMove);
    };
  }, [go, N]);

  const onStageClick = () => go(indexRef.current + 1, true);

  return (
    <div className={`${s.root} ${reduced ? s.reduced : ''}`} data-mode={mode ?? 'pending'}>
      {/* The scene */}
      <div className={`${s.stage} ${leaving ? s.stageLeaving : ''}`} onClick={onStageClick}>
        <canvas ref={canvasRef} className={s.canvas} style={{ display: mode === 'css' ? 'none' : undefined }} />
        {mode === 'css' && (
          <div className={s.layers}>
            {chapters.map((c, i) => (
              <div key={c.slug} className={`${s.layer} ${i === index ? s.layerActive : i === prevIndex ? s.layerLeaving : ''}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sized(c.slug, 1200)}
                  srcSet={`${sized(c.slug, 640)} 640w, ${sized(c.slug, 1200)} 1200w, ${sized(c.slug, 2048)} 2048w`}
                  sizes="100vw"
                  alt=""
                  loading={Math.abs(i - index) <= 1 ? 'eager' : 'lazy'}
                  style={{ objectPosition: `${c.focal.x * 100}% ${c.focal.y * 100}%` }}
                />
              </div>
            ))}
            <div className={s.cssFinish} />
          </div>
        )}
      </div>

      {phase === 'show' && (
        <>
          {/* No visible words; the work's name is available to screen readers only. */}
          <h1 className={s.srOnly} aria-live="polite">{chapters[index].title}</h1>
          <div className={s.scrim} />
          <div className={s.cue} aria-hidden>
            <span className={s.cueWord}>{touch ? 'Swipe' : 'Scroll'}</span>
            <span className={s.cueChevron} />
          </div>
        </>
      )}

      {/* Discreet skip, straight to the normal site */}
      <button type="button" className={s.skip} onClick={enterSite}>
        Skip
      </button>

      {/* The opening: near-black with a hairline progress bar, and nothing to read */}
      {phase === 'intro' && (
        <div className={s.intro} aria-hidden>
          <div className={s.introBar}>
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      )}

      {/* The handoff: the last image settles into darkness, then the normal home page loads */}
      <div className={`${s.leave} ${leaving ? s.leaveOn : ''}`} aria-hidden />
    </div>
  );
}
