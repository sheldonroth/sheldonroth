'use client';

import { ReactNode, Children, isValidElement, cloneElement } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

interface StaggerGridProps {
  children: ReactNode;
  staggerDelay?: number; // Delay between each item (ms)
  baseDelay?: number; // Initial delay before first item (ms)
  duration?: number;
  className?: string;
  threshold?: number;
}

export function StaggerGrid({
  children,
  staggerDelay = 100,
  baseDelay = 0,
  duration = 700,
  className = '',
  threshold = 0.1,
}: StaggerGridProps) {
  const { ref, isInView } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin: '-30px',
  });

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;
        
        const delay = baseDelay + (index * staggerDelay);
        
        return (
          <StaggerItem
            key={index}
            isInView={isInView}
            delay={delay}
            duration={duration}
          >
            {child}
          </StaggerItem>
        );
      })}
    </div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  isInView: boolean;
  delay: number;
  duration: number;
}

function StaggerItem({ children, isInView, delay, duration }: StaggerItemProps) {
  return (
    <div
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        filter: isInView ? 'blur(0px)' : 'blur(8px)',
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms, filter ${duration}ms ease-out ${delay}ms`,
        willChange: 'opacity, transform, filter',
      }}
    >
      {children}
    </div>
  );
}

// Alternative: Each item observes itself (for long grids where items may enter at different times)
interface StaggerItemSelfProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function StaggerItemSelf({
  children,
  delay = 0,
  duration = 700,
  className = '',
}: StaggerItemSelfProps) {
  const { ref, isInView } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: '-20px',
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.98)',
        filter: isInView ? 'blur(0px)' : 'blur(6px)',
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms, filter ${duration}ms ease-out ${delay}ms`,
        willChange: 'opacity, transform, filter',
      }}
    >
      {children}
    </div>
  );
}
