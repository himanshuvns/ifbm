'use client';

import { useRef } from 'react';
import useFadeIn from '@/hooks/useFadeIn';
import styles from './LatestCampaign.module.css';

const PLACEHOLDER_POSTS = [
  {
    id: 1,
    title: 'The Grassroots Crisis',
    caption: 'Why thousands of young footballers struggle to find opportunities in India.',
    date: 'Coming Soon',
  },
  {
    id: 2,
    title: 'Infrastructure Gap',
    caption: 'A look at the state of football infrastructure across Indian cities.',
    date: 'Coming Soon',
  },
  {
    id: 3,
    title: 'Players Deserve Better',
    caption: 'Stories of talented players navigating an underdeveloped football ecosystem.',
    date: 'Coming Soon',
  },
];

export default function LatestCampaign() {
  const sectionRef = useRef(null);
  useFadeIn(sectionRef);

  return (
    <section id="campaign" className="section section--dark">
      <div className="container" ref={sectionRef}>
        <span className="overline">Stay Updated</span>
        <h2 className="section-title">Latest from the Movement</h2>
        <p className="section-description" style={{ marginBottom: '48px' }}>
          Campaign content, discussions and updates from the Indian Football
          Bachao Movement.
        </p>

        <div className={styles.grid}>
          {PLACEHOLDER_POSTS.map((post) => (
            <div key={post.id} className={styles.card}>
              <div className={styles.imagePlaceholder}>
                <span className={styles.placeholderIcon}>⚽</span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardCaption}>{post.caption}</p>
                <span className={styles.cardDate}>{post.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ctaWrap}>
          <a
            href="https://www.instagram.com/indianfootballbachaomovement/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline-light"
          >
            FOLLOW US ON INSTAGRAM →
          </a>
        </div>
      </div>
    </section>
  );
}
