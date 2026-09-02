'use client';

import { useRef } from 'react';
import useFadeIn from '@/hooks/useFadeIn';
import use3DTilt from '@/hooks/use3DTilt';
import styles from './Vision.module.css';

const VISION_CARDS = [
  { icon: '🌱', title: 'Strong Grassroots' },
  { icon: '🧑‍🤝‍🧑', title: 'Better Youth Development' },
  { icon: '🏗️', title: 'Better Infrastructure' },
  { icon: '🏆', title: 'Stronger Clubs & Leagues' },
  { icon: '⚽', title: 'Growth of Women\'s Football' },
  { icon: '📊', title: 'Transparency & Accountability' },
];

function TiltVisionCard({ card }) {
  const tiltRef = use3DTilt(10, 1.04);
  return (
    <div ref={tiltRef} className="stripe-card stripe-card--light">
      <div className="stripe-card__icon">{card.icon}</div>
      <h3 className="stripe-card__title">{card.title}</h3>
    </div>
  );
}

export default function Vision() {
  const sectionRef = useRef(null);
  useFadeIn(sectionRef);

  return (
    <section id="vision" className="section section--light">
      <div className="container" ref={sectionRef}>
        <span className="overline">The Vision</span>
        <h2 className="section-title">Our Vision for Indian Football</h2>

        <blockquote className={styles.blockquote}>
          A stronger Indian football ecosystem where talented players get
          opportunities, grassroots football is supported, clubs can grow
          sustainably, fans are heard, and Indian football has a clear
          long-term roadmap.
        </blockquote>

        <div className={`grid-3 ${styles.cards}`}>
          {VISION_CARDS.map((card, i) => (
            <TiltVisionCard key={i} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
