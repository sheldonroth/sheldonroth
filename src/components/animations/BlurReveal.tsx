'use client';

import { ReactNode } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

interface BlurRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

export function BlurReveal({
  children,
  delay = 0,
  duration = 800,
  className = '',
  threshold = 0.15,
  direction = 'up',
  distance = 30,
}: BlurRevealProps) {
  const { ref, isInView } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin: '-50px',
  });

  const getTransform = () => {
    if (direction === 'none') return 'translate(0, 0)';
    const transforms = {
      up: `translateY(${distance}px)`,
      down: `translateY(-${distance}px)`,
      left: `translateX(${distance}px)`,
      right: `translateX(-${distance}px)`,
    };
    return transforms[direction];
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        filter: isInView ? 'blur(0px)' : 'blur(10px)',
        transform: isInView ? 'translate(0, 0)' : getTransform(),
        transition: `opacity ${duration}ms ease-out ${delay}ms, filter ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        willChange: 'opacity, filter, transform',
      }}
    >
      {children}
    </div>
  );
}
