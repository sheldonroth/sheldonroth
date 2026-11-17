'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface HeroSlide {
  slug: string;
  title: string;
  collection: string;
  editionSize: number;
  src: string;
  blurb: string;
}

const INTERVAL = 7000;

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
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured works"
    >
      {slides.map((s, i) => {
        const active = i === index;
        // Only mount the current, previous and next slides to keep the page light.
        const near = active || i === (index + 1) % slides.length || i === (index - 1 + slides.length) % slides.length;
        if (!near) return null;
        return (
          <div
            key={s.slug}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${active ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={!active}
          >
            <Image
              src={s.src}
              alt={`${s.title} by Sheldon Roth`}
              fill
              priority={i === 0}
              sizes="100vw"
              quality={80}
              className={`object-cover ${active ? 'kenburns' : ''}`}
            />
          </div>
        );
      })}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />

      <div className="absolute inset-x-0 bottom-0 pb-24 md:pb-28">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div key={current.slug} className="max-w-2xl">
            <p className="eyebrow fade-up text-accent-light" style={{ animationDelay: '150ms' }}>
              {current.collection}
            </p>
            <h1
              className="font-display fade-up mt-4 text-[2.9rem] leading-[1] text-white sm:text-6xl lg:text-[5.5rem]"
              style={{ animationDelay: '300ms' }}
            >
              {current.title}
            </h1>
            <p className="eyebrow fade-up mt-5 text-white/80" style={{ animationDelay: '450ms' }}>
              Limited Edition {current.editionSize}
            </p>
            <p
              className="fade-up mt-5 hidden max-w-lg text-[0.95rem] leading-relaxed text-white/70 sm:block"
              style={{ animationDelay: '600ms' }}
            >
              {current.blurb}
            </p>
            <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: '750ms' }}>
              <Link href={`/shop/${current.slug}`} className="btn btn-light">
                Discover
              </Link>
              <Link href="/collections" className="btn btn-outline">
                View Galleries
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="absolute bottom-8 right-6 flex items-center gap-3 lg:right-10">
        {slides.map((s, i) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show ${s.title}`}
            aria-current={i === index}
            className="group flex h-8 items-center"
          >
            <span className={`block h-px transition-all duration-500 ${i === index ? 'w-12 bg-white' : 'w-6 bg-white/40 group-hover:bg-white/70'}`} />
          </button>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="eyebrow text-[0.55rem] text-white/50">Scroll</span>
        <span className="scroll-cue block h-10 w-px bg-white/60" />
      </div>
    </section>
  );
}
