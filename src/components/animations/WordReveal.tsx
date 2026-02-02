'use client';

import { useIntersectionObserver } from './useIntersectionObserver';

interface WordRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number; // Base delay before animation starts
  staggerDelay?: number; // Delay between each word
  duration?: number;
  threshold?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export function WordReveal({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  staggerDelay = 50,
  duration = 600,
  threshold = 0.2,
  as: Component = 'h2',
}: WordRevealProps) {
  const { ref, isInView } = useIntersectionObserver<HTMLElement>({
    threshold,
    rootMargin: '-30px',
  });

  const words = text.split(' ');

  return (
    // @ts-expect-error - Dynamic component type
    <Component ref={ref} className={`overflow-hidden ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block ${wordClassName}`}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(100%)',
            filter: isInView ? 'blur(0px)' : 'blur(4px)',
            transition: `opacity ${duration}ms ease-out ${delay + index * staggerDelay}ms, transform ${duration}ms ease-out ${delay + index * staggerDelay}ms, filter ${duration}ms ease-out ${delay + index * staggerDelay}ms`,
            willChange: 'opacity, transform, filter',
          }}
        >
          {word}
          {index < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </Component>
  );
}

// Character-by-character reveal for more dramatic effect
interface CharRevealProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  threshold?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export function CharReveal({
  text,
  className = '',
  charClassName = '',
  delay = 0,
  staggerDelay = 25,
  duration = 400,
  threshold = 0.2,
  as: Component = 'h2',
}: CharRevealProps) {
  const { ref, isInView } = useIntersectionObserver<HTMLElement>({
    threshold,
    rootMargin: '-30px',
  });

  const chars = text.split('');

  return (
    // @ts-expect-error - Dynamic component type
    <Component ref={ref} className={`overflow-hidden ${className}`}>
      {chars.map((char, index) => (
        <span
          key={index}
          className={`inline-block ${charClassName}`}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(100%)',
            transition: `opacity ${duration}ms ease-out ${delay + index * staggerDelay}ms, transform ${duration}ms ease-out ${delay + index * staggerDelay}ms`,
            willChange: 'opacity, transform',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Component>
  );
}
