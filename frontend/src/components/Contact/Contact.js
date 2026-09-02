'use client';

import { useState, useRef } from 'react';
import useFadeIn from '@/hooks/useFadeIn';
import styles from './Contact.module.css';

export default function Contact() {
  const sectionRef = useRef(null);
  useFadeIn(sectionRef);

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    hp_field: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverMsg, setServerMsg] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      errs.name = 'Please enter your name.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Please enter a valid email.';
    if (!form.message.trim() || form.message.trim().length < 10)
      errs.message = 'Please enter a message (at least 10 characters).';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.hp_field) return;

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('loading');
    setErrors({});

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const res = await fetch(`${apiUrl}/api/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.status === 201) {
        setStatus('success');
      } else {
        const data = await res.json();
        setStatus('error');
        setServerMsg(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setServerMsg('Unable to connect. Please try again later.');
    }
  };

  return (
    <section id="contact" className="section section--dark">
      <div className="container" ref={sectionRef}>
        <div className={styles.layout}>
          <div className={styles.formCol}>
            <span className="overline">Reach Out</span>
            <h2 className="section-title">Get in Touch</h2>

            {status === 'success' ? (
              <div className={styles.successMsg}>
                <span className={styles.successIcon}>✓</span>
                <p>Thank you for reaching out! We'll get back to you.</p>
              </div>
            ) : (
              <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Honeypot */}
                <div className="hp-field" aria-hidden="true">
                  <input
                    type="text"
                    name="hp_field"
                    value={form.hp_field}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-name" className={`form-label ${styles.label}`}>
                    Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`form-input form-input--dark ${errors.name ? styles.inputError : ''}`}
                    placeholder="Your name"
                    required
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className={`form-label ${styles.label}`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`form-input form-input--dark ${errors.email ? styles.inputError : ''}`}
                    placeholder="you@example.com"
                    required
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className={`form-label ${styles.label}`}>
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className={`form-textarea form-textarea--dark ${errors.message ? styles.inputError : ''}`}
                    placeholder="Tell us how you'd like to help or what's on your mind..."
                    rows={5}
                    required
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                {status === 'error' && (
                  <p className={styles.errorMsg}>{serverMsg}</p>
                )}

                <button
                  type="submit"
                  className={`btn btn--primary ${styles.submitBtn}`}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>

          <div className={styles.infoCol}>
            <h3 className={styles.infoTitle}>Follow the Movement</h3>
            <p className={styles.infoText}>
              Stay updated with the latest campaigns, discussions and
              initiatives.
            </p>
            <a
              href="https://www.instagram.com/indianfootballbachaomovement/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <svg
                className={styles.socialIcon}
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @indianfootballbachaomovement
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
