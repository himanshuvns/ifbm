'use client';

import { useRef } from 'react';
import useFadeIn from '@/hooks/useFadeIn';
import styles from './WhyIndianFootball.module.css';

const CHALLENGES = [
  {
    icon: '🌱',
    title: 'Grassroots Development',
    text: 'Young players need better access to football, coaching, competitions and development pathways.',
  },
  {
    icon: '⚡',
    title: 'Youth Development',
    text: 'India needs stronger pathways from youth football to professional football.',
  },
  {
    icon: '🏟️',
    title: 'Infrastructure',
    text: 'Players need access to quality grounds, training facilities and football infrastructure.',
  },
  {
    icon: '🔄',
    title: 'Sustainable Ecosystem',
    text: 'Clubs, leagues and football organizations need sustainable long-term development.',
  },
  {
    icon: '🎯',
    title: 'Opportunities for Players',
    text: 'Talented players need clearer opportunities to progress and showcase their abilities.',
  },
  {
    icon: '📋',
    title: 'Accountability & Transparency',
    text: 'Football fans deserve meaningful communication, transparency and long-term planning.',
  },
];

export default function WhyIndianFootball() {
  const sectionRef = useRef(null);
  useFadeIn(sectionRef);

  return (
    <section id="why" className="section section--dark">
      <div className="container" ref={sectionRef}>
        <span className="overline">The Challenges</span>
        <h2 className="section-title">Why Are We Here?</h2>
        <p className="section-description" style={{ marginBottom: '48px' }}>
          Indian football faces real challenges that need honest conversation
          and collective action. Here's why this movement exists.
        </p>

        <div className="grid-3">
          {CHALLENGES.map((item, i) => (
            <div
              key={i}
              className="stripe-card"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="stripe-card__icon">{item.icon}</div>
              <h3 className="stripe-card__title">{item.title}</h3>
              <p className="stripe-card__text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
