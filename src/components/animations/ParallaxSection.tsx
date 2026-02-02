'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number; // 0 = no movement, 1 = normal scroll, < 1 = slower (parallax)
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className = '',
  imageClassName = '',
  overlayClassName = '',
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          // Calculate how far through the viewport the element is
          const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
          
          // Only apply parallax when element is in viewport
          if (progress >= 0 && progress <= 1) {
            // Scale factor determines how much the image moves
            const parallaxRange = rect.height * (1 - speed);
            const newOffset = (progress - 0.5) * parallaxRange;
            setOffset(newOffset);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        className={`absolute inset-0 ${imageClassName}`}
        style={{
          transform: `translateY(${offset}px) scale(1.1)`,
          willChange: 'transform',
        }}
      >
        {/* Children will be rendered inside for image content */}
      </div>
      <div className={`absolute inset-0 ${overlayClassName}`} />
      {children}
    </div>
  );
}

// Simpler variant just for wrapping any content with parallax
interface ParallaxWrapperProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxWrapper({ children, speed = 0.3, className = '' }: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = element.getBoundingClientRect();
          const scrolled = window.scrollY;
          const elementTop = rect.top + scrolled;
          const parallaxOffset = (scrolled - elementTop) * speed;
          setOffset(parallaxOffset);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
