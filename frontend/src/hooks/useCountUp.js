'use client';

import { useState, useRef, useEffect } from 'react';

/**
 * Hook that animates a number counting up from 0 to `target`
 * when the element is scrolled into view.
 *
 * @param {number} target - The target number to count to
 * @param {number} duration - Animation duration in ms (default 2000)
 * @returns {{ count: number, ref: React.RefObject }}
 */
export default function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    if (hasAnimatedRef.current) return;

    // Small delay ensures DOM ref is attached after hydration
    const timer = setTimeout(() => {
      const node = ref.current;
      if (!node || hasAnimatedRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        setCount(target);
        hasAnimatedRef.current = true;
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            observer.disconnect();

            const startTime = performance.now();
            const step = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(eased * target));

              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                setCount(target);
              }
            };
            requestAnimationFrame(step);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(node);

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [target, duration]);

  return { count, ref };
}
