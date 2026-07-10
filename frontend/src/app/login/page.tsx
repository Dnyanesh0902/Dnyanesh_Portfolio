'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Mail, Lock, ArrowRight, Key, CornerDownLeft, CheckCircle } from 'lucide-react';
import { API_BASE_URL } from '@/config';

export default function LoginPage() {
  // Login states
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  
  // Forgot password flow states
  const [mode, setMode] = useState<'login' | 'forgot-request' | 'forgot-reset'>('login');
  const [resetEmail, setResetEmail] = useState('');
  const [resetOTP, setResetOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // Feedback states
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/dashboard';
    }
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
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

  const handleForgotPasswordRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send verification code.');
      }

      setSuccess('Verification code sent successfully! Check your email inbox (or Render backend logs if using a free SMTP tier).');
      setMode('forgot-reset');
    } catch (err: any) {
      setError(err.message || 'Server error. Please check your email.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: resetEmail,
          otp: resetOTP,
          newPassword: newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to verify OTP or reset password.');
      }

      setSuccess('Your password has been successfully reset! You can now log in.');
      setMode('login');
      setPassword('');
      setIdentifier(resetEmail);
    } catch (err: any) {
      setError(err.message || 'Error resetting password.');
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
        maxWidth: '460px',
        width: '100%',
        padding: '3rem',
        borderRadius: '24px',
        boxShadow: 'var(--card-shadow)'
      }}>
        
        {/* Header Icons & Title */}
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
            {mode === 'login' ? <ShieldCheck size={32} /> : <Key size={32} />}
          </div>
          
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {mode === 'login' && 'Administrator Login'}
            {mode === 'forgot-request' && 'Reset Password'}
            {mode === 'forgot-reset' && 'Verify Email OTP'}
          </h2>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
            {mode === 'login' && 'Enter your email or phone number to access dashboard settings'}
            {mode === 'forgot-request' && 'Enter your registered email address to receive a 6-digit OTP code'}
            {mode === 'forgot-reset' && `We sent a verification OTP code to: ${resetEmail}`}
          </p>
        </div>

        {/* Feedback Messages */}
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

        {success && (
          <div style={{
            background: 'rgba(34, 197, 94, 0.05)',
            border: '1px solid rgba(34, 197, 94, 0.15)',
            color: '#22c55e',
            padding: '1rem',
            borderRadius: '10px',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircle size={16} /> {success}
          </div>
        )}

        {/* FORM 1: Mode Login */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
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
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => { setMode('forgot-request'); setError(''); setSuccess(''); }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--accent-cyan)',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Forgot Password?
                </button>
              </div>
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
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue), var(--accent-indigo))',
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
                boxShadow: '0 10px 20px rgba(8, 145, 178, 0.2)',
                marginTop: '0.5rem'
              }}
            >
              {loading ? 'Verifying...' : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        )}

        {/* FORM 2: Mode Forgot Request */}
        {mode === 'forgot-request' && (
          <form onSubmit={handleForgotPasswordRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Account Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="enterYourEmail@gmail.com"
                  required
                  style={{
                    width: '100%',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    padding: '1rem 1.35rem 1rem 3rem',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
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
                boxShadow: '0 10px 20px rgba(8, 145, 178, 0.15)'
              }}
            >
              {loading ? 'Sending Code...' : 'Send Verification OTP'}
            </button>

            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
              style={{
                background: 'transparent',
                border: '1px solid var(--input-border)',
                color: 'var(--text-secondary)',
                padding: '1rem',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
            >
              <CornerDownLeft size={16} /> Back to Login
            </button>
          </form>
        )}

        {/* FORM 3: Mode Forgot Reset */}
        {mode === 'forgot-reset' && (
          <form onSubmit={handleForgotPasswordReset} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                6-Digit Verification OTP *
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                  <ShieldCheck size={18} />
                </span>
                <input
                  type="text"
                  maxLength={6}
                  value={resetOTP}
                  onChange={(e) => setResetOTP(e.target.value)}
                  placeholder="e.g. 123456"
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
                    letterSpacing: '0.2em',
                    fontWeight: 700
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Create New Password *
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="minimum 6 characters"
                  required
                  style={{
                    width: '100%',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    padding: '1rem 1.35rem 1rem 3rem',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
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
                boxShadow: '0 10px 20px rgba(8, 145, 178, 0.15)'
              }}
            >
              {loading ? 'Saving Password...' : 'Reset & Save Password'}
            </button>

            <button
              type="button"
              onClick={() => { setMode('forgot-request'); setError(''); setSuccess(''); }}
              style={{
                background: 'transparent',
                border: '1px solid var(--input-border)',
                color: 'var(--text-secondary)',
                padding: '1rem',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <CornerDownLeft size={16} /> Re-request OTP code
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
