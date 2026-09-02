'use client';

import { useEffect, useRef } from 'react';

export default function useMagnetic(strength = 0.35) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!window.matchMedia('(pointer: fine)').matches) return;

    let reqId;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      if (reqId) cancelAnimationFrame(reqId);

      reqId = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${distanceX * strength}px, ${
          distanceY * strength
        }px, 0) scale(1.03)`;
      });
    };

    const handleMouseLeave = () => {
      if (reqId) cancelAnimationFrame(reqId);
      el.style.transform = 'translate3d(0, 0, 0) scale(1)';
    };

    el.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    el.style.willChange = 'transform';

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (reqId) cancelAnimationFrame(reqId);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
}
