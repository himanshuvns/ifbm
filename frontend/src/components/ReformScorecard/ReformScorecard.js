'use client';

import { useState } from 'react';
import use3DTilt from '@/hooks/use3DTilt';
import styles from './ReformScorecard.module.css';

const REFORM_METRICS = [
  {
    id: 'ranking',
    label: 'FIFA World Ranking',
    icon: '🏆',
    current: '#124',
    target: 'Top 50',
    currentSub: 'Needs structured long-term roadmap',
    targetSub: 'Achievable with proper youth pipeline',
    progress: 35,
    status: 'CRITICAL NEED FOR REFORM',
  },
  {
    id: 'grassroots',
    label: 'Grassroots Academy Coverage',
    icon: '🌱',
    current: '12%',
    target: '100%',
    currentSub: 'Limited access outside metro hubs',
    targetSub: 'Free academy in all 28 states & UTs',
    progress: 12,
    status: 'URGENT EXPANSION REQUIRED',
  },
  {
    id: 'matches',
    label: 'Youth Competitive Match Days',
    icon: '⚽',
    current: '18 Days/Yr',
    target: '270 Days/Yr',
    currentSub: 'Fragmented short tournament schedules',
    targetSub: '9-Month continuous competitive league',
    progress: 25,
    status: 'LEAGUE RESTRUCTURE NEEDED',
  },
  {
    id: 'governance',
    label: 'Financial Transparency & Audits',
    icon: '📊',
    current: 'Opaque',
    target: '100% Public',
    currentSub: 'No public financial disclosure',
    targetSub: 'Annual independent public audits',
    progress: 5,
    status: 'TRANSPARENCY DEMANDED',
  },
];

export default function ReformScorecard() {
  const [activeTab, setActiveTab] = useState(REFORM_METRICS[0]);
  const cardTiltRef = use3DTilt(8, 1.02);

  return (
    <div className={styles.scorecardContainer} ref={cardTiltRef}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <span className={styles.liveDot} />
          <span>LIVE CAMPAIGN AUDIT SCORECARD</span>
        </div>
        <h3 className={styles.title}>CURRENT STATUS vs REFORM GOALS</h3>
      </div>

      {/* Metric Selector Tabs */}
      <div className={styles.tabs}>
        {REFORM_METRICS.map((metric) => (
          <button
            key={metric.id}
            className={`${styles.tabBtn} ${
              activeTab.id === metric.id ? styles.tabBtnActive : ''
            }`}
            onClick={() => setActiveTab(metric)}
          >
            <span className={styles.tabIcon}>{metric.icon}</span>
            <span className={styles.tabLabel}>{metric.label}</span>
          </button>
        ))}
      </div>

      {/* Active Metric Comparison Card */}
      <div className={styles.comparisonBody}>
        <div className={styles.statusPill}>{activeTab.status}</div>

        <div className={styles.valuesGrid}>
          {/* Current Status Box */}
          <div className={styles.valueBoxCurrent}>
            <span className={styles.valueTag}>CURRENT STATUS</span>
            <span className={styles.valueNumber}>{activeTab.current}</span>
            <span className={styles.valueSub}>{activeTab.currentSub}</span>
          </div>

          {/* Arrow Divider */}
          <div className={styles.arrowCol}>
            <span className={styles.arrowIcon}>➔</span>
          </div>

          {/* Campaign Target Box */}
          <div className={styles.valueBoxTarget}>
            <span className={styles.valueTagTarget}>CAMPAIGN GOAL</span>
            <span className={styles.valueNumberTarget}>{activeTab.target}</span>
            <span className={styles.valueSubTarget}>{activeTab.targetSub}</span>
          </div>
        </div>

        {/* Reform Progress Meter */}
        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <span>Current Reform Index</span>
            <span className={styles.progressPct}>{activeTab.progress}%</span>
          </div>
          <div className={styles.progressBarBg}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${activeTab.progress}%` }}
            />
          </div>
        </div>

        <div className={styles.footerAction}>
          <a href="#join" className={styles.actionBtn}>
            DEMAND THIS REFORM NOW 🇮🇳
          </a>
        </div>
      </div>
    </div>
  );
}
