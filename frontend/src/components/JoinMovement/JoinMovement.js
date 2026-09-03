'use client';

import { useState, useRef } from 'react';
import { getApiUrl } from '@/config/api';
import useFadeIn from '@/hooks/useFadeIn';
import FootballRain from '@/components/FootballRain/FootballRain';
import styles from './JoinMovement.module.css';

const CONTRIBUTE_OPTIONS = [
  { value: '', label: 'How would you like to contribute? (Optional)' },
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'content', label: 'Content Creation' },
  { value: 'research', label: 'Research' },
  { value: 'photography', label: 'Photography / Video' },
  { value: 'grassroots', label: 'Grassroots Football' },
  { value: 'events', label: 'Local Events' },
  { value: 'social', label: 'Social Media' },
  { value: 'other', label: 'Other' },
];

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal', 'Delhi', 'Chandigarh', 'Jammu & Kashmir', 'Ladakh',
  'Puducherry', 'Andaman & Nicobar', 'Dadra & Nagar Haveli', 'Lakshadweep',
];

export default function JoinMovement() {
  const sectionRef = useRef(null);
  useFadeIn(sectionRef);

  const [form, setForm] = useState({
    name: '',
    email: '',
    city: '',
    state: '',
    contribute: '',
    hp_field: '', // honeypot
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error | duplicate
  const [serverMsg, setServerMsg] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      errs.name = 'Please enter your name.';
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!form.city.trim() || form.city.trim().length < 2) {
      errs.city = 'Please enter your city.';
    }
    if (!form.state.trim()) {
      errs.state = 'Please select your state.';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check (client-side)
    if (form.hp_field) return;

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('loading');
    setErrors({});

    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/v1/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 201) {
        setStatus('success');
      } else if (res.status === 409) {
        setStatus('duplicate');
        setServerMsg(data.error || 'This email is already registered.');
      } else {
        setStatus('error');
        setServerMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setServerMsg('Unable to connect. Please try again later.');
    }
  };

  if (status === 'success') {
    return (
      <section id="join" className="section section--light">
        <FootballRain />
        <div className="container">
          <div className={styles.successState}>
            <span className={styles.successIcon}>🇮🇳</span>
            <h2 className={styles.successTitle}>Welcome to the movement!</h2>
            <p className={styles.successText}>
              Thank you for joining. Together, we can make Indian football
              better.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="join" className="section section--light">
      <div className="container" ref={sectionRef}>
        <span className="overline">Be Part of It</span>
        <h2 className="section-title">Join the Movement 🇮🇳</h2>
        <p className="section-description" style={{ marginBottom: '40px' }}>
          If you believe Indian football can and should be better, be part of
          the conversation.
        </p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Honeypot — hidden from humans */}
          <div className="hp-field" aria-hidden="true">
            <label htmlFor="hp_field">Leave empty</label>
            <input
              type="text"
              id="hp_field"
              name="hp_field"
              value={form.hp_field}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className={styles.row}>
            <div className="form-group">
              <label htmlFor="join-name" className="form-label">
                Name *
              </label>
              <input
                type="text"
                id="join-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`form-input form-input--light ${errors.name ? styles.inputError : ''}`}
                placeholder="Your name"
                required
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="join-email" className="form-label">
                Email *
              </label>
              <input
                type="email"
                id="join-email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`form-input form-input--light ${errors.email ? styles.inputError : ''}`}
                placeholder="you@example.com"
                required
              />
              {errors.email && (
                <span className="form-error">{errors.email}</span>
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className="form-group">
              <label htmlFor="join-city" className="form-label">
                City *
              </label>
              <input
                type="text"
                id="join-city"
                name="city"
                value={form.city}
                onChange={handleChange}
                className={`form-input form-input--light ${errors.city ? styles.inputError : ''}`}
                placeholder="Your city"
                required
              />
              {errors.city && (
                <span className="form-error">{errors.city}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="join-state" className="form-label">
                State *
              </label>
              <select
                id="join-state"
                name="state"
                value={form.state}
                onChange={handleChange}
                className={`form-select form-select--light ${errors.state ? styles.inputError : ''}`}
                required
              >
                <option value="">Select state</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.state && (
                <span className="form-error">{errors.state}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="join-contribute" className="form-label">
              Contribute
            </label>
            <select
              id="join-contribute"
              name="contribute"
              value={form.contribute}
              onChange={handleChange}
              className="form-select form-select--light"
            >
              {CONTRIBUTE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {status === 'error' && (
            <p className={styles.serverError}>{serverMsg}</p>
          )}
          {status === 'duplicate' && (
            <p className={styles.duplicateMsg}>
              ⚽ {serverMsg || "You're already part of the movement!"}
            </p>
          )}

          <button
            type="submit"
            className={`btn btn--primary btn--full ${styles.submitBtn}`}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <span className={styles.spinner}></span>
            ) : (
              'JOIN THE MOVEMENT'
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
