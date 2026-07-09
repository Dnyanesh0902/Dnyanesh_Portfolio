import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code2, Terminal, Cpu, Database } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Background Ambient Glows */}
      <div className="ambient-glow" />
      <div className="ambient-glow-2" />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={`${styles.content} animate-fade-in`}>
            <div className={styles.badge}>Welcome to my portfolio</div>
            <h1 className={styles.title}>
              Building Scalable <br />
              <span className="text-gradient">Backend Systems</span>
            </h1>
            <h2 className={styles.subtitle}>Go (Golang) & .NET (C#) Developer</h2>
            <p className={styles.description}>
              Hi, I&apos;m Dnyaneshwar Kokate. I am a results-driven backend developer with 1+ years of experience designing robust architectures, high-throughput REST APIs, and automated business workflows.
            </p>
            <div className={styles.actions}>
              <Link href="/projects" className={styles.btnPrimary}>
                View Projects <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className={styles.btnSecondary}>
                Get in Touch
              </Link>
            </div>
          </div>

          <div className={`${styles.visual} animate-float`}>
            <div className={styles.techCube} />
            <div className={`${styles.codeWindow} glass-card`} style={{ padding: '1.5rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '1.25rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }}></span>
              </div>
              <div style={{ color: '#8b5cf6' }}>package <span style={{ color: '#ec4899' }}>main</span></div>
              <br />
              <div style={{ color: '#06b6d4' }}>import <span style={{ color: '#10b981' }}>&quot;fmt&quot;</span></div>
              <br />
              <div style={{ color: '#3b82f6' }}>type <span style={{ color: '#eab308' }}>Developer</span> struct &#123;</div>
              <div style={{ paddingLeft: '1rem', color: '#f3f4f6' }}>
                Name  string<br />
                Stack []string<br />
                Focus string<br />
              </div>
              <div style={{ color: '#3b82f6' }}>&#125;</div>
              <br />
              <div style={{ color: '#3b82f6' }}>func <span style={{ color: '#eab308' }}>main</span>() &#123;</div>
              <div style={{ paddingLeft: '1rem', color: '#f3f4f6' }}>
                me := Developer&#123;<br />
                <span style={{ paddingLeft: '1rem' }}>Name:  <span style={{ color: '#10b981' }}>&quot;Dnyaneshwar Kokate&quot;</span>,</span><br />
                <span style={{ paddingLeft: '1rem' }}>Stack: []string&#123;<span style={{ color: '#10b981' }}>&quot;Go&quot;</span>, <span style={{ color: '#10b981' }}>&quot;C#&quot;</span>, <span style={{ color: '#10b981' }}>&quot;SQL&quot;</span>&#125;,</span><br />
                <span style={{ paddingLeft: '1rem' }}>Focus: <span style={{ color: '#10b981' }}>&quot;High-Performance APIs&quot;</span>,</span><br />
                &#125;<br />
                fmt.Println(<span style={{ color: '#10b981' }}>&quot;Hello, world!&quot;</span>)<br />
              </div>
              <div style={{ color: '#3b82f6' }}>&#125;</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>1+</div>
            <div className={styles.statLabel}>Years Experience</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>4+</div>
            <div className={styles.statLabel}>Key Projects Built</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>API Reliability</div>
          </div>
        </div>
      </section>

      {/* Highlights / Services Section */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="section-title">Core Expertise</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          
          <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '0.75rem', borderRadius: '12px', width: 'fit-content' }}>
              <Terminal size={28} color="#06b6d4" />
            </div>
            <h3>Go (Golang) Development</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Building highly concurrent backend applications using Gin, GORM, and SQL databases. Experienced in implementing rate limiters, AWS S3 integrations, and custom middleware.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.75rem', borderRadius: '12px', width: 'fit-content' }}>
              <Cpu size={28} color="#3b82f6" />
            </div>
            <h3>ASP.NET Core Web APIs</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Designing enterprise RESTful APIs with clean architecture, Repository Pattern, and Dependency Injection. Secured with JWT role-based authentication.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '0.75rem', borderRadius: '12px', width: 'fit-content' }}>
              <Database size={28} color="#8b5cf6" />
            </div>
            <h3>Database & Performance Tuning</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Optimizing queries, indexing, schema design, and Entity Framework Core query tracking for SQL Server, MySQL, and SQLite databases.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
