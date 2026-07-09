'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Mail, Phone, Lock, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '@/config';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/dashboard';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed. Please check credentials.');
      }

      // Store auth state
      const tokenVal = data?.data?.token || data?.token;
      const userVal = data?.data?.user || data?.user;

      if (!tokenVal) {
        throw new Error(data.error || 'Invalid token returned.');
      }

      localStorage.setItem('token', tokenVal);
      localStorage.setItem('user', JSON.stringify(userVal));

      // Redirect
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message || 'Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 120px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      background: 'var(--bg-primary)'
    }}>
      <div className="glass-card" style={{
        maxWidth: '450px',
        width: '100%',
        padding: '3rem',
        borderRadius: '24px',
        boxShadow: 'var(--card-shadow)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            background: 'rgba(8, 145, 178, 0.08)',
            border: '1px solid rgba(8, 145, 178, 0.15)',
            padding: '1rem',
            borderRadius: '50%',
            color: 'var(--accent-cyan)',
            marginBottom: '1rem'
          }}>
            <ShieldCheck size={32} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Administrator Login
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
            Enter your email or phone number to access dashboard settings
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.15)',
            color: '#ef4444',
            padding: '1rem',
            borderRadius: '10px',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              Email or Mobile Number
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Mail size={18} />
              </span>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="dnyaneshwarkokatevip@gmail.com"
                required
                style={{
                  width: '100%',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  padding: '1rem 1.35rem 1rem 3rem',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all var(--transition-fast)'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Lock size={18} />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  padding: '1rem 1.35rem 1rem 3rem',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all var(--transition-fast)'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue), var(--accent-indigo))',
              backgroundSize: '200% 200%',
              color: '#ffffff',
              padding: '1.1rem',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              transition: 'all var(--transition-fast)',
              boxShadow: '0 10px 20px rgba(8, 145, 178, 0.2)',
              marginTop: '1rem'
            }}
          >
            {loading ? 'Verifying...' : (
              <>
                Sign In <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
