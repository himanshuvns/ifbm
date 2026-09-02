'use client';

import { useEffect, useRef } from 'react';

export default function use3DTilt(maxTilt = 12, scale = 1.04) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Only apply on fine pointer devices (desktops)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let reqId;

    const handleMouseMove = (e) => {
      if (reqId) cancelAnimationFrame(reqId);

      reqId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(
          2
        )}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;

        // Pass relative mouse percentage for specular glare background
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        el.style.setProperty('--glare-x', `${percentX}%`);
        el.style.setProperty('--glare-y', `${percentY}%`);
        el.style.setProperty('--glare-opacity', `0.25`);
      });
    };

    const handleMouseLeave = () => {
      if (reqId) cancelAnimationFrame(reqId);
      el.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      el.style.setProperty('--glare-opacity', `0`);
    };

    el.style.transition = 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    el.style.willChange = 'transform';

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (reqId) cancelAnimationFrame(reqId);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, scale]);

  return cardRef;
}
