'use client';

import { useEffect, type RefObject } from 'react';

type Options = {
  threshold?: number;
  rootMargin?: string;
};

export function useScrollReveal(
  containerRef: RefObject<HTMLElement | null>,
  options: Options = {},
) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = options;

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>('.reveal, .reveal-scale');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef, threshold, rootMargin]);
}
