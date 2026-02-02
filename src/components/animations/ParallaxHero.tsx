'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ParallaxHeroProps {
  children: ReactNode;
  imageSrc: string;
  imageAlt: string;
  speed?: number; // 0.3-0.5 works best for subtle parallax
  overlayOpacity?: number;
}

export function ParallaxHero({
  children,
  imageSrc,
  imageAlt,
  speed = 0.4,
  overlayOpacity = 0.3,
}: ParallaxHeroProps) {
  const [offset, setOffset] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          // Only apply parallax when hero is in view
          const container = containerRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            if (rect.bottom > 0) {
              setOffset(scrollY * speed);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${offset}px) scale(1.1)`,
          willChange: 'transform',
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className={`object-cover transition-all duration-1000 ${
            isLoaded ? 'scale-100 blur-0' : 'scale-105 blur-sm'
          }`}
          priority
          sizes="100vw"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      
      {/* Sophisticated gradient overlays */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: isLoaded ? 1 : 0.5 }}
      >
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
          style={{ '--tw-gradient-from-position': '0%', '--tw-gradient-via-position': '40%' } as React.CSSProperties}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div 
        className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        {children}
      </div>
    </section>
  );
}
