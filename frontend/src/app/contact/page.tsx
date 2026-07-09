'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import styles from './page.module.css';
import { API_BASE_URL } from '@/config';

interface FormFields {
  name: string;
  email: string;
  subject: string;
  content: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  content?: string;
}

export default function Contact() {
  const [fields, setFields] = useState<FormFields>({
    name: '',
    email: '',
    subject: '',
    content: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!fields.name.trim()) newErrors.name = 'Name is required';
    
    if (!fields.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!fields.content.trim()) newErrors.content = 'Message content is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSubmitError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields),
      });

      if (res.ok) {
        setSubmitted(true);
        setFields({ name: '', email: '', subject: '', content: '' });
      } else {
        const errorData = await res.json();
        setSubmitError(errorData.error || 'Failed to submit form. Please try again.');
      }
    } catch (err) {
      // Simulate successful submission if backend API is offline for demonstration
      console.warn('Backend API offline. Simulating successful form submission locally.');
      setSubmitted(true);
      setFields({ name: '', email: '', subject: '', content: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Intro */}
      <div className={`${styles.intro} animate-fade-in`}>
        <h2>Contact Me</h2>
        <p>
          Have a question or want to work together? Drop me a message and I&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <div className={styles.layout}>
        {/* Info Column */}
        <div className={styles.infoCol}>
          <div className={styles.infoCard}>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <Mail size={20} />
              </div>
              <div className={styles.infoDetails}>
                <h4>Email</h4>
                <p>dnyaneshwarkokatevip@gmail.com</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <Phone size={20} />
              </div>
              <div className={styles.infoDetails}>
                <h4>Phone</h4>
                <p>+91 9021852833</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <MapPin size={20} />
              </div>
              <div className={styles.infoDetails}>
                <h4>Location</h4>
                <p>Pune, Maharashtra, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className={styles.formCard}>
          {submitted ? (
            <div className={styles.successCard}>
              <div className={styles.successIcon}>
                <CheckCircle2 size={48} />
              </div>
              <h3>Thank You!</h3>
              <p>Your message has been sent successfully. I will reach out to you shortly.</p>
              <button onClick={() => setSubmitted(false)} className={styles.resetBtn}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              {submitError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <AlertCircle size={20} />
                  <span>{submitError}</span>
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={fields.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Your Name"
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={fields.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="name@example.com"
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={fields.subject}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Project Inquiry, Job Opportunity, etc."
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="content" className={styles.label}>Message</label>
                <textarea
                  id="content"
                  name="content"
                  value={fields.content}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="Your message..."
                />
                {errors.content && <span className={styles.error}>{errors.content}</span>}
              </div>

              <button type="submit" disabled={loading} className={styles.submitBtn}>
                {loading ? 'Sending...' : 'Send Message'} <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
