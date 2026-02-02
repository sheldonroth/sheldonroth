'use client';

import { ReactNode } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  scale?: number; // Starting scale (1 = no scale change)
}

export function FadeIn({
  children,
  delay = 0,
  duration = 700,
  className = '',
  threshold = 0.15,
  direction = 'up',
  distance = 40,
  scale = 1,
}: FadeInProps) {
  const { ref, isInView } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin: '-40px',
  });

  const getTransform = () => {
    const transforms = {
      up: `translateY(${distance}px)`,
      down: `translateY(-${distance}px)`,
      left: `translateX(${distance}px)`,
      right: `translateX(-${distance}px)`,
      none: 'translate(0, 0)',
    };
    const scaleTransform = scale !== 1 ? ` scale(${scale})` : '';
    return transforms[direction] + scaleTransform;
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translate(0, 0) scale(1)' : getTransform(),
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

// Section wrapper with fade and optional reveal line
interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  lineColor?: string;
  showLine?: boolean;
}

export function SectionReveal({
  children,
  className = '',
  lineColor = '#88744a',
  showLine = true,
}: SectionRevealProps) {
  const { ref, isInView } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '-50px',
  });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {showLine && (
        <div
          className="absolute left-0 top-0 w-px h-full origin-top"
          style={{
            backgroundColor: lineColor,
            opacity: 0.3,
            transform: isInView ? 'scaleY(1)' : 'scaleY(0)',
            transition: 'transform 1s ease-out',
          }}
        />
      )}
      <div
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateX(0)' : 'translateX(-20px)',
          transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
        }}
      >
        {children}
      </div>
    </div>
  );
}
