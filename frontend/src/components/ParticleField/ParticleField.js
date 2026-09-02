'use client';

import { useEffect, useRef } from 'react';
import styles from './ParticleField.module.css';

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Floating stadium dust particles
    const PARTICLE_COUNT = 60;
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        color: Math.random() > 0.4 ? 'rgba(212, 103, 38, ' : 'rgba(247, 247, 242, ',
        alpha: Math.random() * 0.4 + 0.15,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.3 - 0.1, // Gently floating upwards
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.pulse += p.pulseSpeed;
        const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.1;

        // Subtle mouse attraction drift
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const factor = (200 - dist) / 200;
          p.x -= (dx / dist) * factor * 0.6;
          p.y -= (dy / dist) * factor * 0.6;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.max(0.05, currentAlpha) + ')';
        ctx.shadowBlur = p.radius * 3;
        ctx.shadowColor = 'rgba(212, 103, 38, 0.4)';
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.particleCanvas} aria-hidden="true" />;
}
