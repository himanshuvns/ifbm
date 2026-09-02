'use client';

import { useRef } from 'react';
import useFadeIn from '@/hooks/useFadeIn';
import styles from './TakeAction.module.css';

const ACTIONS = [
  {
    icon: '📱',
    title: 'Follow',
    text: 'Follow the movement on Instagram and stay updated with the latest.',
    href: 'https://www.instagram.com/indianfootballbachaomovement/',
    external: true,
  },
  {
    icon: '🔁',
    title: 'Share',
    text: 'Share campaign content with other football fans and spread the word.',
    href: null,
    external: false,
  },
  {
    icon: '🤝',
    title: 'Volunteer',
    text: 'Help with content, research, events or community activities.',
    href: '#join',
    external: false,
  },
  {
    icon: '💬',
    title: 'Participate',
    text: 'Take part in discussions and future football-related activities.',
    href: '#join',
    external: false,
  },
];

export default function TakeAction() {
  const sectionRef = useRef(null);
  useFadeIn(sectionRef);

  return (
    <section id="action" className="section section--light">
      <div className="container" ref={sectionRef}>
        <span className="overline">Get Involved</span>
        <h2 className="section-title">You Can Help</h2>
        <p className="section-description" style={{ marginBottom: '48px' }}>
          Every action counts. Here's how you can support Indian football.
        </p>

        <div className="grid-4">
          {ACTIONS.map((action, i) => {
            const Tag = action.href ? 'a' : 'div';
            const linkProps = action.href
              ? {
                  href: action.href,
                  ...(action.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {}),
                }
              : {};

            return (
              <Tag key={i} className={styles.card} {...linkProps}>
                <span className={styles.icon}>{action.icon}</span>
                <h3 className={styles.title}>{action.title}</h3>
                <p className={styles.text}>{action.text}</p>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
