'use client';

import { useState, useEffect } from 'react';
import { getApiUrl } from '@/config/api';
import useCountUp from '@/hooks/useCountUp';
import styles from './Stats.module.css';

function StatBlock({ target, suffix, label, sublabel }) {
  const { count, ref } = useCountUp(target);

  return (
    <div className={styles.statBlock} ref={ref}>
      <span className={styles.number}>
        {count.toLocaleString('en-IN')}
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </span>
      <span className={styles.label}>{label}</span>
      {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
    </div>
  );
}

export default function Stats() {
  const [statsData, setStatsData] = useState({
    followers: 19200,
    posts: 28,
    movements: 1,
  });

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
        // Fallback to static initial state if API is offline
      }
    }
    fetchStats();
  }, []);

  return (
    <section id="stats" className={`section section--dark ${styles.section}`}>
      <div className="container">
        <div className={styles.grid}>
          <StatBlock
            target={statsData.followers}
            suffix="+"
            label="Instagram Followers"
            sublabel="Updated recently"
          />
          <div className={styles.divider} aria-hidden="true"></div>
          <StatBlock
            target={statsData.posts}
            suffix=""
            label="Campaign Posts"
          />
          <div className={styles.divider} aria-hidden="true"></div>
          <StatBlock
            target={statsData.movements}
            suffix=""
            label="Movement"
          />
        </div>
      </div>
    </section>
  );
}
