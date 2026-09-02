'use client';

import { useEffect, useState } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktops)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    let reqId;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Smooth lerp loop
    const animate = () => {
      currentX += (targetX - currentX) * 0.28;
      currentY += (targetY - currentY) * 0.28;
      setPos({ x: currentX, y: currentY });
      reqId = requestAnimationFrame(animate);
    };

    reqId = requestAnimationFrame(animate);

    // Check hover states on interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.closest('a, button, input, select, textarea, .btn, [role="button"]') !== null;
      setIsHovered(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.footballCursor} ${isHovered ? styles.hovered : ''} ${
        isClicking ? styles.clicking : ''
      }`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
      }}
      aria-hidden="true"
    >
      <div className={styles.ballWrapper}>
        <img
          src="/images/real-football.png"
          alt=""
          className={styles.realBallImg}
        />
        <div className={styles.ringGlow} />
      </div>
    </div>
  );
}
