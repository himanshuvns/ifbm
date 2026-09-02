'use client';

import { useRef } from 'react';
import useFadeIn from '@/hooks/useFadeIn';
import styles from './About.module.css';

const AIMS = [
  'Start meaningful conversations about the state of Indian football',
  'Highlight the real challenges holding Indian football back',
  'Encourage better development pathways for players',
  'Support grassroots football across India',
  'Give football fans a collective, constructive voice',
  'Promote discussion around the long-term future of Indian football',
];

export default function About() {
  const sectionRef = useRef(null);
  useFadeIn(sectionRef);

  return (
    <section id="about" className="section section--light">
      <div className="container">
        <div className={styles.layout} ref={sectionRef}>
          <div className={styles.content}>
            <span className="overline">About the Movement</span>
            <h2 className="section-title">
              What is Indian Football Bachao?
            </h2>

            <p className={styles.statement}>
              Indian Football Bachao Movement is a community-driven initiative
              created by football fans who believe Indian football has the
              talent, passion and potential to grow — but needs a stronger
              ecosystem to make it happen.
            </p>

            <p className={styles.body}>
              We believe Indian football has enormous potential. The goal is not
              simply to criticize — it is to start conversations, highlight
              problems, support solutions and give football fans a stronger
              collective voice.
            </p>

            <ul className={styles.aims}>
              {AIMS.map((aim, i) => (
                <li key={i} className={styles.aimItem}>
                  <span className={styles.aimBullet}>⚽</span>
                  <span>{aim}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.accent} aria-hidden="true">
            <div className={styles.accentStripe}></div>
            <div className={styles.accentStripe}></div>
            <div className={styles.accentStripe}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
