'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
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

const NAME = 'SHELDON ROTH';
const CLOSING = 'collection';
const AUTO_ENTER_SECONDS = 12;
const TRANSITIONS: TransitionKind[] = [1, 2, 3];
const pad = (n: number) => String(n).padStart(2, '0');
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

export default function CinematicExperience({ chapters }: { chapters: Chapter[] }) {
  const N = chapters.length; // index N is the closing gallery wall
  const [mode, setMode] = useState<'gl' | 'css' | null>(null);
  const [reduced, setReduced] = useState(false);
  const [phase, setPhase] = useState<'intro' | 'show'>('intro');
  const [typed, setTyped] = useState(0);
  const [progress, setProgress] = useState(0);
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [lastWork, setLastWork] = useState(N - 1);
  const [hint, setHint] = useState(true);
  const [stageStyle, setStageStyle] = useState<CSSProperties>({});
  // The caption is HTML above the canvas and changes only by fading out, swapping, and fading in.
  const [cap, setCap] = useState(0);
  const [capOn, setCapOn] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cinemaRef = useRef<Cinema | null>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lockUntil = useRef(0);
  const indexRef = useRef(0);
  const startRef = useRef(0);
  indexRef.current = index;

  /** Hand off to the normal home page (the live site). A hard navigation, so "/" is served as the home, not the intro. */
  const enterSite = useCallback(
    (to = '/') => {
      markExperienceSeen();
      setCountdown(null);
      setLeaving(true);
      window.setTimeout(() => window.location.assign(to), reduced ? 80 : 750);
    },
    [reduced],
  );

  const slugToIndex = useCallback(
    (hash: string) => {
      const h = hash.replace(/^#/, '');
      if (h === CLOSING) return N;
      const i = chapters.findIndex((c) => c.slug === h);
      return i;
    },
    [chapters, N],
  );

  // Decide the renderer once on the client: WebGL unless it is missing or the visitor prefers reduced motion.
  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduced(rm);
    const start = slugToIndex(window.location.hash);
    if (start >= 0) {
      startRef.current = start;
      setIndex(start);
      if (start < N) setLastWork(start);
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
  }, [chapters, N, slugToIndex]);

  // Progressive loading: a light copy of every work first (the intro bar tracks this), then sharp copies nearest first.
  useEffect(() => {
    if (!mode) return;
    let cancelled = false;
    const big = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2) > 1300 ? 2048 : 1200;
    const first = Math.min(startRef.current, N - 1);
    const order = chapters.map((_, i) => i).sort((a, b) => Math.abs(a - first) - Math.abs(b - first));
    (async () => {
      if (mode === 'css') {
        // The browser loads the <img> srcsets itself; just warm the first two so the cut is clean.
        await Promise.allSettled(order.slice(0, 2).map((i) => loadImage(sized(chapters[i].slug, 1200))));
        if (!cancelled) setProgress(1);
        return;
      }
      let done = 0;
      const total = N + 1;
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

  // The quiet opening: the name typed out on near-black.
  useEffect(() => {
    if (!mode) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem('sr-experience-seen') === '1';
      sessionStorage.setItem('sr-experience-seen', '1');
    } catch {}
    if (reduced || seen || startRef.current > 0) {
      setTyped(NAME.length);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= NAME.length) window.clearInterval(id);
    }, 95);
    return () => window.clearInterval(id);
  }, [mode, reduced]);

  // Hard cut from the opening to the first work once the name is typed and the images are in.
  useEffect(() => {
    if (phase !== 'intro' || !mode || typed < NAME.length || progress < 1) return;
    const id = window.setTimeout(
      () => {
        setPhase('show');
        markExperienceSeen();
        const start = Math.min(startRef.current, N - 1);
        setCap(start);
        cinemaRef.current?.show(start, 1, true);
        lockUntil.current = performance.now() + 1200;
      },
      reduced ? 150 : 650,
    );
    return () => window.clearTimeout(id);
  }, [phase, mode, typed, progress, reduced, N]);

  const go = useCallback(
    (next: number, force = false) => {
      const cur = indexRef.current;
      const n = Math.max(0, Math.min(N, next));
      if (n === cur || phase !== 'show') return;
      const now = performance.now();
      if (!force && now < lockUntil.current) return;
      lockUntil.current = now + (reduced ? 500 : 1150);
      setHint(false);
      setPrevIndex(cur);
      setIndex(n);
      if (n < N) {
        setLastWork(n);
        // Coming back from the wall the stage re-expands over the same work, so no transition is needed.
        if (cur !== N || n !== lastWork) cinemaRef.current?.show(n, TRANSITIONS[n % TRANSITIONS.length]);
      }
    },
    [N, phase, reduced, lastWork],
  );

  // Caption: fade the old text out, swap it while invisible, fade the new text in. No blur, scale or warp.
  useEffect(() => {
    if (phase !== 'show' || index >= N) return;
    if (index === cap && capOn) return;
    setCapOn(false);
    const id = window.setTimeout(() => {
      setCap(index);
      setCapOn(true);
    }, reduced ? 120 : 420);
    return () => window.clearTimeout(id);
  }, [index, phase, N, reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  // On the closing wall: count down to the site, unless the visitor does anything.
  useEffect(() => {
    if (index !== N || leaving) {
      setCountdown(null);
      return;
    }
    let left = AUTO_ENTER_SECONDS;
    setCountdown(left);
    const stop = () => setCountdown(null);
    const evs = ['wheel', 'touchstart', 'keydown', 'pointerdown', 'scroll'];
    const wall = wallRef.current;
    evs.forEach((e) => window.addEventListener(e, stop, { passive: true, once: true }));
    wall?.addEventListener('scroll', stop, { passive: true, once: true });
    const id = window.setInterval(() => {
      left -= 1;
      if (left <= 0) {
        window.clearInterval(id);
        enterSite();
      } else setCountdown(left);
    }, 1000);
    return () => {
      window.clearInterval(id);
      evs.forEach((e) => window.removeEventListener(e, stop));
      wall?.removeEventListener('scroll', stop);
    };
  }, [index, N, leaving, enterSite]);

  // Hash per work, kept in step with the view (and followed when edited by hand).
  useEffect(() => {
    if (phase !== 'show') return;
    const hash = index === N ? CLOSING : chapters[index].slug;
    if (window.location.hash !== `#${hash}`) window.history.replaceState(null, '', `#${hash}`);
  }, [index, phase, chapters, N]);

  useEffect(() => {
    const onHash = () => {
      const i = slugToIndex(window.location.hash);
      if (i >= 0) go(i, true);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [go, slugToIndex]);

  // Keys, wheel and swipe.
  useEffect(() => {
    const atWallTop = () => indexRef.current === N && (wallRef.current?.scrollTop ?? 0) <= 2;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const cur = indexRef.current;
      const onWall = cur === N;
      if (['ArrowRight', 'PageDown', ' '].includes(e.key) || (e.key === 'ArrowDown' && !onWall)) {
        if (onWall) {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            enterSite();
          }
          return;
        }
        e.preventDefault();
        go(cur + 1, true);
      } else if (e.key === 'ArrowLeft' || ((e.key === 'ArrowUp' || e.key === 'PageUp') && (!onWall || atWallTop()))) {
        e.preventDefault();
        go(cur - 1, true);
      } else if (e.key === 'Home') {
        e.preventDefault();
        go(0, true);
      } else if (e.key === 'End') {
        e.preventDefault();
        go(N, true);
      }
    };
    let acc = 0;
    let accTimer = 0;
    const onWheel = (e: WheelEvent) => {
      const cur = indexRef.current;
      if (cur === N && !(e.deltaY < 0 && atWallTop())) return; // the wall scrolls normally
      e.preventDefault();
      acc += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      window.clearTimeout(accTimer);
      accTimer = window.setTimeout(() => (acc = 0), 220);
      if (Math.abs(acc) > 60) {
        go(cur + Math.sign(acc));
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
      const cur = indexRef.current;
      const horiz = Math.abs(dx) > Math.abs(dy);
      const d = horiz ? dx : dy;
      if (Math.abs(d) < 45) return;
      if (cur === N) {
        if (horiz && dx > 0) go(cur - 1, true);
        else if (horiz && dx < -90) enterSite();
        else if (!horiz && dy > 0 && atWallTop()) go(cur - 1, true);
        return;
      }
      go(cur + (d < 0 ? 1 : -1), true);
    };
    const onMove = (e: TouchEvent) => {
      if (indexRef.current !== N) e.preventDefault();
    };
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
  }, [go, N, enterSite]);

  // The close: the full-screen scene shrinks into its framed print on the wall, cropped to the print's shape.
  useLayoutEffect(() => {
    if (index !== N) {
      setStageStyle({});
      return;
    }
    const wall = wallRef.current;
    if (wall) wall.scrollTop = 0;
    const frame = frameRefs.current[lastWork];
    if (!frame) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // Bring the print the scene lands in into view first (the wall opens scrolled to it).
    let r = frame.getBoundingClientRect();
    if (wall && r.bottom > vh - 48) {
      wall.scrollTop += r.bottom - vh + Math.min(120, (vh - r.height) / 2);
      r = frame.getBoundingClientRect();
    }
    const ta = r.width / r.height;
    let visW = vw, visH = vh;
    if (vw / vh > ta) visW = vh * ta;
    else visH = vw / ta;
    const ix = (vw - visW) / 2;
    const iy = (vh - visH) / 2;
    const scale = r.width / visW;
    const tx = r.left + r.width / 2 - vw / 2;
    const ty = r.top + r.height / 2 - vh / 2;
    setStageStyle({
      transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
      clipPath: `inset(${iy}px ${ix}px ${iy}px ${ix}px)`,
    });
  }, [index, N, lastWork]);

  const onStageClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a,button')) return;
    go(index + (e.clientX > window.innerWidth * 0.33 ? 1 : -1), true);
  };

  const onWall = index === N;
  const ch = chapters[Math.min(cap, N - 1)];

  return (
    <div className={`${s.root} ${reduced ? s.reduced : ''}`} data-mode={mode ?? 'pending'}>
      {/* The scene */}
      <div className={`${s.stage} ${onWall ? s.stageShrunk : ''}`} style={stageStyle} onClick={onStageClick} aria-hidden={onWall}>
        <canvas ref={canvasRef} className={s.canvas} style={{ display: mode === 'css' ? 'none' : undefined }} />
        {mode === 'css' && (
          <div className={s.layers}>
            {chapters.map((c, i) => {
              const state = i === (onWall ? lastWork : index) ? s.layerActive : i === prevIndex ? s.layerLeaving : '';
              return (
                <div key={c.slug} className={`${s.layer} ${state}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sized(c.slug, 1200)}
                    srcSet={`${sized(c.slug, 640)} 640w, ${sized(c.slug, 1200)} 1200w, ${sized(c.slug, 2048)} 2048w`}
                    sizes="100vw"
                    alt={c.title}
                    loading={Math.abs(i - index) <= 1 ? 'eager' : 'lazy'}
                    style={{ objectPosition: `${c.focal.x * 100}% ${c.focal.y * 100}%` }}
                  />
                </div>
              );
            })}
            <div className={s.cssFinish} />
          </div>
        )}
      </div>

      {/* Chapter type */}
      {phase === 'show' && !onWall && (
        <>
          <header className={s.bar}>
            {/* Plain anchor: a full navigation, so "/" is served as the normal home page (the intro has been seen). */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" className={s.brand} onClick={markExperienceSeen}>Sheldon Roth</a>
            <nav className={s.barNav}>
              <Link href="/shop">Shop</Link>
              <Link href="/collections">Galleries</Link>
              <button type="button" onClick={() => go(N, true)}>
                <span className={s.long}>The </span>Collection
              </button>
            </nav>
          </header>

          <div className={s.scrim} />
          <div className={`${s.caption} ${capOn ? s.captionOn : ''}`} aria-live="polite">
            <p className={s.count}>
              {pad(index + 1)} <span>/</span> {pad(N)}
            </p>
            <h1 className={s.title}>{ch.title}</h1>
            <p className={s.meta}>
              {ch.gallery} <span>·</span> {ch.tagline}
            </p>
            <p className={s.meta}>
              {ch.tier} <span>·</span> Limited edition of {ch.edition}
            </p>
            <Link href={`/shop/${ch.slug}`} className={s.view} tabIndex={capOn ? 0 : -1}>
              View the print
            </Link>
          </div>

          <nav className={s.ticks} aria-label="Works">
            {chapters.map((c, i) => (
              <button
                key={c.slug}
                type="button"
                className={i === index ? s.tickOn : ''}
                aria-label={c.title}
                aria-current={i === index}
                onClick={() => go(i, true)}
              />
            ))}
            <button type="button" className={s.tickWall} aria-label="The Collection" onClick={() => go(N, true)} />
          </nav>

          <div className={s.progress}>
            <span style={{ transform: `scaleX(${(index + 1) / (N + 1)})` }} />
          </div>

          <p className={`${s.hint} ${hint ? '' : s.hintGone}`}>Scroll, swipe or use ← → to move through the work</p>
          <button type="button" className={s.skip} onClick={() => enterSite()}>
            Skip intro
          </button>
        </>
      )}

      {/* The close: framed prints on a warm wall, each opening its shop page */}
      <section ref={wallRef} className={`${s.wall} ${onWall ? s.wallOn : ''}`} aria-hidden={!onWall}>
        <div className={s.wallInner}>
          <p className={s.wallEyebrow}>The Collection</p>
          <h2 className={s.wallTitle}>Ten works, each a strictly limited edition</h2>
          <p className={s.wallBody}>
            Signed and numbered, face-mounted to museum acrylic and made to order. Choose a work to see its sizes and edition.
          </p>
          <div className={s.prints}>
            {chapters.map((c, i) => (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}`}
                className={s.print}
                style={{ '--d': `${0.5 + i * 0.07}s`, '--ar': `${c.width / c.height}` } as CSSProperties}
                tabIndex={onWall ? 0 : -1}
              >
                <div className={s.frame}>
                  <div
                    className={s.photo}
                    ref={(el) => {
                      frameRefs.current[i] = el;
                    }}
                  >
                    <Image
                      src={`/works/${c.slug}.jpg`}
                      alt={c.title}
                      fill
                      sizes="(max-width: 700px) 86vw, (max-width: 1200px) 44vw, 30vw"
                      style={{ objectFit: 'cover', objectPosition: `${c.focal.x * 100}% ${c.focal.y * 100}%` }}
                    />
                  </div>
                </div>
                <span className={s.printTitle}>{c.title}</span>
                <span className={s.printMeta}>
                  Edition of {c.edition}
                  {c.from ? ` · From ${c.from}` : ''}
                </span>
              </Link>
            ))}
          </div>
          <div className={s.wallActions}>
            <Link href="/shop" className={s.btnDark}>Enter the shop</Link>
            <Link href="/collections/signature" className={s.btnLine}>Signature Works</Link>
            <button type="button" className={s.btnLine} onClick={() => go(0, true)}>Watch again</button>
          </div>
          <p className={s.wallFoot}>Sheldon Roth Fine Art · PO Box 283, Nathrop, CO 81236</p>
        </div>
      </section>

      {onWall && (
        <div className={s.enterBar}>
          <p className={s.enterNote}>
            {countdown !== null ? `Continuing to the site in ${countdown}` : 'Take your time with the collection'}
          </p>
          <button type="button" className={s.enterBtn} onClick={() => enterSite()}>
            Enter the site
          </button>
          {countdown !== null && (
            <span className={s.enterLine} style={{ animationDuration: `${AUTO_ENTER_SECONDS}s` }} aria-hidden />
          )}
        </div>
      )}

      {/* Closing fade into the normal site */}
      <div className={`${s.leave} ${leaving ? s.leaveOn : ''}`} aria-hidden />

      {/* The quiet opening */}
      {phase === 'intro' && (
        <div className={s.intro} aria-live="polite">
          <p className={s.introName} aria-label={NAME}>
            <span aria-hidden>{NAME.slice(0, typed)}</span>
            <span className={s.caret} aria-hidden />
            <span className={s.introRest} aria-hidden>{NAME.slice(typed)}</span>
          </p>
          <div className={s.introBar}>
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
          <p className={s.introSub}>Fine Art Photography</p>
          <button type="button" className={s.introSkip} onClick={() => enterSite()}>
            Skip intro
          </button>
        </div>
      )}
    </div>
  );
}
