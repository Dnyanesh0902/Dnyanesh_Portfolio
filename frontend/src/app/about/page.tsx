'use client';

import React, { useEffect, useState } from 'react';
import { Briefcase, GraduationCap, Code2, Layers, ShieldCheck, Mail, MapPin } from 'lucide-react';
import styles from './page.module.css';
import { API_BASE_URL } from '@/config';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  isIntern: boolean;
}

interface SkillItem {
  id: number;
  name: string;
  category: string;
  level: number;
}

// Fallback data in case backend API is not reachable
const fallbackExperience: ExperienceItem[] = [
  {
    id: 1,
    title: 'Go Developer',
    company: 'Choice Tech Lab',
    location: 'Pune, India',
    period: 'Jun 2026 – Present',
    description: 'Architect and develop high-performance backend systems and RESTful APIs using Go (Golang), Gin, and GORM.\nIntegrate AWS S3 storage services and implement multi-role approval engines for business workflow automation.\nSecure API endpoints using custom authentication middleware, JWT, and Bcrypt hashing.\nManage MySQL/SQL Server databases, including query tuning and structuring database access layers.',
    isIntern: false,
  },
  {
    id: 2,
    title: 'Dot Net Developer',
    company: 'Electropneumatics',
    location: 'Pune, India',
    period: 'May 2025 – May 2026',
    description: 'Developed and maintained scalable enterprise web applications utilizing ASP.NET Core, C#, and SQL Server.\nImplemented MVC and Clean Architecture patterns to build modular, maintainable, and testable codebases.\nDesigned secure, high-throughput REST APIs and integrated Entity Framework Core query tracking for database optimization.\nLed collaborative code reviews, debugging activities, and established development guidelines.',
    isIntern: false,
  },
  {
    id: 3,
    title: 'Dot Net Core Developer Intern',
    company: 'Intern Choice',
    location: 'Pune, India',
    period: 'Nov 2024 – Apr 2025',
    description: 'Developed and optimized backend features for web applications using ASP.NET MVC and Entity Framework.\nWrote clean, maintainable C# code adhering to SOLID design principles and OOP standards.\nCollaborated with cross-functional development teams to build features and resolve database query bottlenecks.',
    isIntern: true,
  },
];

const fallbackSkills: SkillItem[] = [
  // Languages
  { id: 1, name: 'Go (Golang)', category: 'Languages', level: 90 },
  { id: 2, name: 'C# (.NET)', category: 'Languages', level: 85 },
  { id: 3, name: 'HTML5 / CSS3', category: 'Languages', level: 80 },
  { id: 4, name: 'JavaScript / ES6', category: 'Languages', level: 80 },
  { id: 5, name: 'SQL Server / MySQL', category: 'Languages', level: 85 },
  // Frameworks
  { id: 6, name: 'Gin (Go Framework)', category: 'Frameworks/Libraries', level: 90 },
  { id: 7, name: 'GORM (Go ORM)', category: 'Frameworks/Libraries', level: 88 },
  { id: 8, name: 'ASP.NET Core Web API', category: 'Frameworks/Libraries', level: 85 },
  { id: 9, name: 'ASP.NET MVC', category: 'Frameworks/Libraries', level: 80 },
  { id: 10, name: 'Entity Framework', category: 'Frameworks/Libraries', level: 82 },
  // Architecture
  { id: 11, name: 'Clean Architecture', category: 'Architecture', level: 90 },
  { id: 12, name: 'Repository Pattern', category: 'Architecture', level: 90 },
  { id: 13, name: 'MVC Pattern', category: 'Architecture', level: 85 },
  { id: 14, name: 'Dependency Injection', category: 'Architecture', level: 90 },
  // Tools
  { id: 15, name: 'Git / GitHub', category: 'Tools & Security', level: 85 },
  { id: 16, name: 'Swagger / OpenAPI', category: 'Tools & Security', level: 90 },
  { id: 17, name: 'Postman', category: 'Tools & Security', level: 90 },
  { id: 18, name: 'JWT Security', category: 'Tools & Security', level: 85 },
  { id: 19, name: 'Bcrypt Hashing', category: 'Tools & Security', level: 85 },
];

export default function About() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(fallbackExperience);
  const [skills, setSkills] = useState<SkillItem[]>(fallbackSkills);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Languages');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expRes, skillsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/experience`),
          fetch(`${API_BASE_URL}/api/skills`)
        ]);
        
        if (expRes.ok) {
          const expData = await expRes.json();
          if (expData && expData.success && Array.isArray(expData.data)) {
            setExperiences(expData.data);
          } else if (expData && Array.isArray(expData)) {
            setExperiences(expData);
          }
        }
        if (skillsRes.ok) {
          const skillsData = await skillsRes.json();
          if (skillsData && skillsData.success && Array.isArray(skillsData.data)) {
            setSkills(skillsData.data);
          } else if (skillsData && Array.isArray(skillsData)) {
            setSkills(skillsData);
          }
        }
      } catch (err) {
        console.warn('Backend API offline. Using high-fidelity fallback data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getSkillsByCategory = (category: string) => {
    return skills.filter((s) => s.category.toLowerCase().includes(category.toLowerCase()));
  };

  return (
    <div className={styles.container}>
      {/* Intro Section */}
      <section className={`${styles.introSection} animate-fade-in`}>
        <div className={styles.bio}>
          <h2>About Me</h2>
          <p>
            I am a results-driven <span className={styles.highlightText}>Go (Golang) and .NET Developer</span> based in Pune, India, with over 1 year of professional experience building scalable web applications, microservices, and RESTful APIs.
          </p>
          <p>
            My backend engineering focus is centered around implementing <span className={styles.highlightText}>Clean Architecture</span>, SOLID design principles, and designing secure, high-throughput APIs utilizing JWT-based role authorizations and custom database access layers.
          </p>
          <p>
            I thrive in agile environments where I can leverage modern dev tools and database optimizations to deliver robust software workflows from design to deployment.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '2.5rem', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Personal Info</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Location</span>
              <span className={styles.infoValue} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <MapPin size={16} color="#06b6d4" /> Pune, India
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue} style={{ fontSize: '0.9rem' }}>dnyaneshwarkokatevip@gmail.com</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Phone</span>
              <span className={styles.infoValue}>+91-9021852833</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Experience</span>
              <span className={styles.infoValue}>1+ Year Professional</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={styles.skillsSection}>
        <h2 className="section-title">Technical Expertise</h2>
        
        {/* Horizontal Category Switcher Tabs on One Line */}
        <div className={styles.skillsTabs}>
          <button
            onClick={() => setActiveCategory('Languages')}
            className={`${styles.tabBtn} ${activeCategory === 'Languages' ? styles.activeTab : ''}`}
          >
            <Code2 size={18} /> Languages
          </button>
          <button
            onClick={() => setActiveCategory('Frameworks')}
            className={`${styles.tabBtn} ${activeCategory === 'Frameworks' ? styles.activeTab : ''}`}
          >
            <Layers size={18} /> Frameworks & Libraries
          </button>
          <button
            onClick={() => setActiveCategory('Architecture')}
            className={`${styles.tabBtn} ${activeCategory === 'Architecture' ? styles.activeTab : ''}`}
          >
            <Layers size={18} /> Architecture & Design
          </button>
          <button
            onClick={() => setActiveCategory('Tools')}
            className={`${styles.tabBtn} ${activeCategory === 'Tools' ? styles.activeTab : ''}`}
          >
            <ShieldCheck size={18} /> Tools & Security
          </button>
        </div>

        {/* Rendered Skill Cards (Animations Off) */}
        <div className={styles.skillsGrid} style={{ marginTop: '2rem' }}>
          {getSkillsByCategory(
            activeCategory === 'Languages' ? 'Language' :
            activeCategory === 'Frameworks' ? 'Framework' :
            activeCategory === 'Architecture' ? 'Architecture' : 'Tool'
          ).map((s) => (
            <div key={s.id} className={styles.skillCard}>
              <span className={styles.skillName}>{s.name}</span>
              <div className={styles.skillBarOuter}>
                <div className={styles.skillBarInner} style={{ width: `${s.level}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className={styles.timelineSection}>
        <h2 className="section-title">Work Experience</h2>
        <div className={styles.timeline}>
          {experiences.map((exp) => (
            <div key={exp.id} className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineHeader}>
                <div>
                  <h3 className={styles.roleTitle}>{exp.title}</h3>
                  <span className={styles.company}>{exp.company}</span>
                </div>
                <span className={styles.period}>{exp.period}</span>
              </div>
              <div className={styles.timelineContent}>
                <ul className={styles.timelineBullets}>
                  {exp.description.split('\n').map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className={styles.educationSection}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <GraduationCap size={32} color="#06b6d4" /> Education
        </h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>B.Tech / B.E. in Information Technology</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Pune University</p>
          </div>
          <span className={styles.period}>2024 Graduate</span>
        </div>
      </section>
    </div>
  );
}
