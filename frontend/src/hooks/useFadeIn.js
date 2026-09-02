'use client';

import { useEffect } from 'react';

/**
 * Hook that adds the 'visible' class to children with the 'fade-in' class
 * when they enter the viewport. Also applies 'fade-in' to direct children
 * of the container ref if they don't already have it.
 *
 * @param {React.RefObject} containerRef - Ref to the container element
 * @param {Object} options - IntersectionObserver options
 */
export default function useFadeIn(containerRef, options = {}) {
  useEffect(() => {
    if (!containerRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    // Add fade-in class to the container itself
    const el = containerRef.current;
    if (!el.classList.contains('fade-in')) {
      el.classList.add('fade-in');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
        ...options,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [containerRef, options]);
}
