'use client';

import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface HeroSlide {
  slug: string;
  title: string;
  collection: string;
  editionSize: number;
  src: string;
  blurb: string;
  /** Focal-point CSS variables from focalStyle(), so the subject stays centred at every screen size. */
  focal?: CSSProperties;
}

const INTERVAL = 7000;

/**
 * Hero carousel matched to lik.com: 70vh tall (630px at 1440x900), centred copy (15px/700/0.14em eyebrow, 48px/300/0.04em title,
 * 12px/700 underlined CTA) on the measured bottom-up scrim linear-gradient(to top, .6, .3, 0).
 */
export default function HeroSlideshow({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, go, slides.length]);

  const current = slides[index];

  return (
    <section
      className="lk-hero-h relative w-full overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured works"
    >
      {slides.map((s, i) => {
        const active = i === index;
        const near = active || i === (index + 1) % slides.length || i === (index - 1 + slides.length) % slides.length;
        if (!near) return null;
        return (
          <div key={s.slug} className={`focal-box absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${active ? 'opacity-100' : 'opacity-0'}`} aria-hidden={!active}>
            <Image quality={80} src={s.src} alt={`${s.title} by Sheldon Roth`} fill priority={i === 0} sizes="100vw" style={s.focal} className={`focal-img object-cover ${active ? 'kenburns' : ''}`} />
          </div>
        );
      })}

      <div className="lk-scrim pointer-events-none absolute inset-0" />

      <div className="lk-hero-copy absolute inset-x-0 bottom-0 px-5 pb-[70px] text-center text-white md:pb-[90px]">
        <div key={current.slug}>
          <p className="lk-hero-eyebrow fade-up">{current.collection}</p>
          <h1 className="lk-hero-title fade-up mx-auto mt-4 max-w-3xl" style={{ animationDelay: '120ms' }}>{current.title}</h1>
          <p className="fade-up mt-5" style={{ animationDelay: '240ms' }}>
            <Link href={`/shop/${current.slug}`} className="lk-cta-link">Discover the Artwork</Link>
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2.5">
        {slides.map((s, i) => (
          <button key={s.slug} type="button" onClick={() => go(i)} aria-label={`Show ${s.title}`} aria-current={i === index} className="flex h-6 w-6 items-center justify-center">
            <span className={`block h-2 w-2 rounded-full border border-white transition-colors ${i === index ? 'bg-white' : 'bg-transparent'}`} />
          </button>
        ))}
      </div>

      <button type="button" onClick={() => go(index - 1)} aria-label="Previous work" className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-white/90 hover:text-white md:flex">
        <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.25} viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg>
      </button>
      <button type="button" onClick={() => go(index + 1)} aria-label="Next work" className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-white/90 hover:text-white md:flex">
        <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.25} viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
      </button>
    </section>
  );
}
