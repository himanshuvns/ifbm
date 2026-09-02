'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './BackgroundMusic.module.css';

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.22;

    const tryPlay = () => {
      if (hasStartedRef.current) return;

      audio
        .play()
        .then(() => {
          hasStartedRef.current = true;
          setIsPlaying(true);
          cleanup();
        })
        .catch(() => {
          // Browser blocked — will retry on next interaction
        });
    };

    const events = ['click', 'keydown', 'touchstart', 'scroll', 'mousemove', 'pointerdown'];

    const cleanup = () => {
      events.forEach((evt) => window.removeEventListener(evt, tryPlay));
      audio.removeEventListener('canplaythrough', tryPlay);
    };

    // 1. Try autoplay immediately
    tryPlay();

    // 2. Retry once audio file is loaded
    audio.addEventListener('canplaythrough', tryPlay);

    // 3. Retry on any user interaction
    events.forEach((evt) => {
      window.addEventListener(evt, tryPlay, { passive: true });
    });

    // 4. Retry periodically for first 5 seconds (catches delayed hydration)
    const retryInterval = setInterval(() => {
      if (hasStartedRef.current) {
        clearInterval(retryInterval);
        return;
      }
      tryPlay();
    }, 500);

    setTimeout(() => clearInterval(retryInterval), 5000);

    return () => {
      cleanup();
      clearInterval(retryInterval);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          hasStartedRef.current = true;
          setIsPlaying(true);
        })
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className={styles.playerWidget}>
      <audio ref={audioRef} src="/audio/anthem.mp3" loop preload="auto" />

      <button
        onClick={togglePlay}
        className={`${styles.playBtn} ${isPlaying ? styles.playBtnActive : ''}`}
        aria-label={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
      >
        <span className={styles.btnIcon}>{isPlaying ? '⏸' : '🎵'}</span>
        <span className={styles.btnText}>
          {isPlaying ? 'CAMPAIGN ANTHEM' : 'PLAY ANTHEM 🎵'}
        </span>

        {isPlaying && (
          <div className={styles.equalizer}>
            <span className={styles.eqBar} />
            <span className={styles.eqBar} />
            <span className={styles.eqBar} />
            <span className={styles.eqBar} />
          </div>
        )}
      </button>

      {isPlaying && (
        <button
          onClick={toggleMute}
          className={styles.muteBtn}
          aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      )}
    </div>
  );
}
