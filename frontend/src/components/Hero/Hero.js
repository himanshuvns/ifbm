'use client';

import { useState, useEffect } from 'react';
import { getApiUrl } from '@/config/api';
import useCountUp from '@/hooks/useCountUp';
import use3DTilt from '@/hooks/use3DTilt';
import useMagnetic from '@/hooks/useMagnetic';
import ReformScorecard from '@/components/ReformScorecard/ReformScorecard';
import ParticleField from '@/components/ParticleField/ParticleField';
import styles from './Hero.module.css';

function HeroStatBlock({ target, suffix, label, sublabel, icon }) {
  const { count, ref } = useCountUp(target);
  const tiltRef = use3DTilt(10, 1.05);

  return (
    <div
      className={styles.statBlock}
      ref={(node) => {
        ref.current = node;
        tiltRef.current = node;
      }}
    >
      <div className={styles.statHeader}>
        {icon && <span className={styles.statIcon}>{icon}</span>}
        <span className={styles.statNumber}>
          {count.toLocaleString('en-IN')}
          {suffix && <span className={styles.statSuffix}>{suffix}</span>}
        </span>
      </div>
      <span className={styles.statLabel}>{label}</span>
      {sublabel && <span className={styles.statSublabel}>{sublabel}</span>}
    </div>
  );
}

export default function Hero() {
  const [statsData, setStatsData] = useState({
    followers: 20200,
    posts: 28,
    movements: 1,
  });

  const ctaPrimaryRef = useMagnetic(0.35);
  const ctaSecondaryRef = useMagnetic(0.35);

  useEffect(() => {
    async function fetchStats() {
      try {
        const apiUrl = getApiUrl();
        const res = await fetch(`${apiUrl}/api/v1/stats`);
        if (res.ok) {
          const data = await res.json();
          if (data?.instagram?.followers) {
            setStatsData((prev) => ({
              ...prev,
              followers: data.instagram.followers,
              posts: data.movement?.campaign_posts || prev.posts,
            }));
          }
        }
      } catch {
        // Fallback static initial state
      }
    }
    fetchStats();
  }, []);

  return (
    <section id="home" className={styles.hero}>
      {/* Ambient stadium floating particle dust */}
      <ParticleField />

      {/* Background overlay */}
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <div className={styles.heroGrid}>
          <div className={styles.heroTextContent}>
            <h1 className={styles.headline}>
              INDIAN FOOTBALL
              <br />
              DESERVES BETTER.
            </h1>

            <p className={styles.subtext}>
              We don't lack talent. We don't lack passion.
              <br />
              We believe it's time to ask the right questions and work towards a
              stronger future for Indian football.
            </p>

            <div className={styles.ctas}>
              <a
                href="#join"
                ref={ctaPrimaryRef}
                className={`btn btn--primary ${styles.ctaPrimary}`}
              >
                JOIN THE MOVEMENT 🇮🇳
              </a>
              <a
                href="#why"
                ref={ctaSecondaryRef}
                className={`btn btn--outline-light ${styles.ctaSecondary}`}
              >
                WHY WE ARE HERE
              </a>
            </div>
          </div>

          {/* Interactive Indian Football Reform Scorecard Dashboard */}
          <div className={styles.hero3DWrapper}>
            <ReformScorecard />
          </div>
        </div>

        {/* Live Instagram & Campaign Stats directly in Home/Hero section */}
        <div className={styles.heroStats}>
          <HeroStatBlock
            target={statsData.followers}
            suffix="+"
            label="Instagram Followers"
            sublabel="@indianfootballbachaomovement"
          />
          <div className={styles.statDivider} aria-hidden="true"></div>
          <HeroStatBlock
            target={statsData.posts}
            suffix=""
            label="Campaign Posts"
            sublabel="Official Movement Releases"
          />
          <div className={styles.statDivider} aria-hidden="true"></div>
          <HeroStatBlock
            target={statsData.movements}
            suffix=""
            label="United Voice"
            sublabel="For Indian Football"
          />
        </div>
      </div>
    </section>
  );
}
