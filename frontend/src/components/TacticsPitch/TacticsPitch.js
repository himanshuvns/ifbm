'use client';

import { useState } from 'react';
import use3DTilt from '@/hooks/use3DTilt';
import styles from './TacticsPitch.module.css';

const TACTICAL_NODES = [
  {
    id: 'grassroots',
    title: 'Grassroots & Academy Reform',
    icon: '🌱',
    pos: { top: '30%', left: '25%' },
    summary: 'Standardized coaching certifications, free community pitch access, and youth scout networks across all 28 states.',
    stat: '10,000+',
    statLabel: 'Certified Grassroots Coaches Needed',
  },
  {
    id: 'leagues',
    title: 'Youth Competitive Leagues',
    icon: '🏆',
    pos: { top: '65%', left: '40%' },
    summary: 'Tiered multi-division state and national youth leagues ensuring year-round competitive match play for U13, U15, and U18.',
    stat: '9 Months',
    statLabel: 'Annual Match Season Guarantee',
  },
  {
    id: 'governance',
    title: 'Transparent Governance & Audit',
    icon: '🏛️',
    pos: { top: '35%', left: '70%' },
    summary: 'Public financial disclosures, independent auditing, and merit-based executive election frameworks.',
    stat: '100%',
    statLabel: 'Public Financial Transparency',
  },
  {
    id: 'infrastructure',
    title: 'World-Class Infrastructure',
    icon: '🏟️',
    pos: { top: '70%', left: '75%' },
    summary: 'Modern high-performance training centers, sports science clinics, and FIFA-compliant turf fields nationwide.',
    stat: '100+',
    statLabel: 'High-Performance Training Hubs',
  },
];

export default function TacticsPitch() {
  const [activeNode, setActiveNode] = useState(TACTICAL_NODES[0]);
  const pitchTiltRef = use3DTilt(8, 1.02);

  return (
    <section className={`section ${styles.tacticsSection}`}>
      <div className="container">
        <div className="section__header section__header--center">
          <span className="section__subtitle">THE STRATEGIC GAME PLAN</span>
          <h2 className="section__title">TACTICAL ROADMAP FOR REFORM</h2>
          <p className="section__description">
            Explore the 4 core tactical pillars of the Indian Football Bachao Movement. Click any position marker on the pitch to inspect our game plan.
          </p>
        </div>

        <div className={styles.grid}>
          {/* 3D Perspective Tactical Pitch */}
          <div className={styles.pitchContainer} ref={pitchTiltRef}>
            <div className={styles.pitchBoard}>
              {/* Pitch markings */}
              <div className={styles.pitchCenterCircle} />
              <div className={styles.pitchHalfwayLine} />
              <div className={styles.pitchPenaltyBoxLeft} />
              <div className={styles.pitchPenaltyBoxRight} />

              {/* Tactical node markers */}
              {TACTICAL_NODES.map((node) => {
                const isActive = activeNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    className={`${styles.marker} ${
                      isActive ? styles.markerActive : ''
                    }`}
                    style={{ top: node.pos.top, left: node.pos.left }}
                    onClick={() => setActiveNode(node)}
                    aria-label={node.title}
                  >
                    <span className={styles.markerPulse} />
                    <span className={styles.markerIcon}>{node.icon}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Node detail display card */}
          <div className={styles.detailCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>{activeNode.icon}</span>
              <h3 className={styles.cardTitle}>{activeNode.title}</h3>
            </div>
            <p className={styles.cardSummary}>{activeNode.summary}</p>
            <div className={styles.statBox}>
              <span className={styles.statValue}>{activeNode.stat}</span>
              <span className={styles.statLabel}>{activeNode.statLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
