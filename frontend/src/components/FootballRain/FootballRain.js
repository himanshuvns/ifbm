'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './FootballRain.module.css';

export default function FootballRain({ onAnimationComplete }) {
  const canvasRef = useRef(null);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Pre-rendered offscreen texture cache for 120 FPS performance
    const SIZES = [16, 24, 32, 42, 54];
    const offscreenTextures = [];
    let isTextureReady = false;

    const baseImg = new Image();
    baseImg.src = '/images/real-football.png';
    baseImg.onload = () => {
      SIZES.forEach((diameter) => {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = diameter;
        offCanvas.height = diameter;
        const offCtx = offCanvas.getContext('2d');

        offCtx.beginPath();
        offCtx.arc(diameter / 2, diameter / 2, diameter / 2, 0, Math.PI * 2);
        offCtx.clip();
        offCtx.drawImage(baseImg, 0, 0, diameter, diameter);

        offscreenTextures.push({
          canvas: offCanvas,
          size: diameter,
        });
      });
      isTextureReady = true;
    };

    // Pre-allocated particle pools organized into 3 static depth layers (no array sorting)
    const backgroundLayer = [];
    const midgroundLayer = [];
    const foregroundLayer = [];

    const TOTAL_BALLS = 180;
    let spawnedCount = 0;

    const createBall = () => {
      const depthType = Math.random(); // 0-0.3 bg, 0.3-0.75 mid, 0.75-1.0 fg
      let sizeIdx = 2;
      let layer = midgroundLayer;
      let opacity = 0.95;
      let zScale = 1;

      if (depthType < 0.3) {
        sizeIdx = Math.floor(Math.random() * 2); // 16px or 24px
        layer = backgroundLayer;
        opacity = 0.75;
        zScale = 0.6;
      } else if (depthType < 0.75) {
        sizeIdx = 2 + Math.floor(Math.random() * 2); // 32px or 42px
        layer = midgroundLayer;
        opacity = 0.95;
        zScale = 1.0;
      } else {
        sizeIdx = 4; // 54px
        layer = foregroundLayer;
        opacity = 1.0;
        zScale = 1.35;
      }

      const diameter = SIZES[sizeIdx];
      const radius = diameter / 2;

      const ball = {
        x: Math.random() * (width - diameter) + radius,
        y: -diameter * 2 - Math.random() * 300,
        radius,
        diameter,
        sizeIdx,
        opacity,
        vy: (Math.random() * 5 + 8) * zScale,
        vx: (Math.random() - 0.5) * 4,
        gravity: 0.45 * zScale,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.18,
        bounce: 0.45 + Math.random() * 0.2,
        stopped: false,
      };

      layer.push(ball);
    };

    // Initial burst
    for (let i = 0; i < 45; i++) {
      createBall();
      spawnedCount++;
    }

    // Smooth continuous spawn wave
    const spawnInterval = setInterval(() => {
      if (spawnedCount < TOTAL_BALLS) {
        for (let i = 0; i < 10; i++) {
          createBall();
          spawnedCount++;
        }
      } else {
        clearInterval(spawnInterval);
      }
    }, 50);

    // Card reveal timer
    const cardTimer = setTimeout(() => {
      setShowCard(true);
      if (onAnimationComplete) onAnimationComplete();
    }, 2000);

    let lastTime = performance.now();

    const render = (now) => {
      const dt = Math.min(2, (now - lastTime) / 16.66); // Delta time normalized to 60fps frame unit
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      const renderLayer = (layer) => {
        for (let i = 0; i < layer.length; i++) {
          const ball = layer[i];

          if (!ball.stopped) {
            ball.vy += ball.gravity * dt;
            ball.y += ball.vy * dt;
            ball.x += ball.vx * dt;
            ball.rotation += ball.vRot * dt;

            // Floor bounce
            const floor = height - ball.radius;
            if (ball.y >= floor) {
              ball.y = floor;
              ball.vy = -ball.vy * ball.bounce;
              ball.vx *= 0.8;
              ball.vRot *= 0.8;

              if (Math.abs(ball.vy) < 1.0) {
                ball.stopped = true;
                ball.vy = 0;
                ball.vx = 0;
              }
            }

            // Wall bounce
            if (ball.x - ball.radius <= 0) {
              ball.x = ball.radius;
              ball.vx = Math.abs(ball.vx) * 0.8;
            } else if (ball.x + ball.radius >= width) {
              ball.x = width - ball.radius;
              ball.vx = -Math.abs(ball.vx) * 0.8;
            }
          }

          // Render pre-clipped offscreen canvas texture (Zero CPU clipping overhead!)
          ctx.save();
          ctx.translate(ball.x, ball.y);
          ctx.rotate(ball.rotation);
          ctx.globalAlpha = ball.opacity;

          if (isTextureReady && offscreenTextures[ball.sizeIdx]) {
            const texture = offscreenTextures[ball.sizeIdx].canvas;
            ctx.drawImage(
              texture,
              -ball.radius,
              -ball.radius,
              ball.diameter,
              ball.diameter
            );
          } else {
            // Fallback circle
            ctx.beginPath();
            ctx.arc(0, 0, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#F7F7F2';
            ctx.fill();
          }

          ctx.restore();
        }
      };

      // Draw depth layers: background -> midground -> foreground
      renderLayer(backgroundLayer);
      renderLayer(midgroundLayer);
      renderLayer(foregroundLayer);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(spawnInterval);
      clearTimeout(cardTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [onAnimationComplete]);

  return (
    <div className={styles.overlay}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div
        className={`${styles.cardWrapper} ${
          showCard ? styles.cardVisible : ''
        }`}
      >
        <div className={styles.celebrationCard}>
          <div className={styles.badge}>
            <span>🇮🇳 UNITED FOR INDIAN FOOTBALL</span>
          </div>
          <h2 className={styles.title}>WELCOME TO THE MOVEMENT!</h2>
          <p className={styles.description}>
            Thank you for standing up for Indian football. Your voice adds to
            thousands of passionate fans, players, and coaches nationwide.
          </p>
          <div className={styles.actions}>
            <a
              href="https://www.instagram.com/indianfootballbachaomovement/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              FOLLOW US ON INSTAGRAM 📸
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
