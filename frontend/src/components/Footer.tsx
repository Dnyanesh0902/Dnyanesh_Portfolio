'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Heart, Code } from 'lucide-react';
import { Github, Linkedin } from '@/components/SocialIcons';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <Code size={24} color="#06b6d4" />
              <span>Dnyaneshwar<span className={styles.logoDot}>.Dev</span></span>
            </div>
            <p className={styles.tagline}>
              Results-driven Go & .NET Developer building scalable web applications and high-performance backend systems. Focus on clean code, REST APIs, and modern architecture.
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4>Navigation</h4>
              <Link href="/" className={styles.footerLink}>Home</Link>
              <Link href="/about" className={styles.footerLink}>About</Link>
              <Link href="/projects" className={styles.footerLink}>Projects</Link>
              <Link href="/contact" className={styles.footerLink}>Contact</Link>
            </div>

            <div className={styles.linkGroup}>
              <h4>Contact</h4>
              <a href="mailto:dnyaneshwarkokatevip@gmail.com" className={styles.footerLink}>
                dnyaneshwarkokatevip@gmail.com
              </a>
              <span className={styles.footerLink}>+91 9021852833</span>
              <span className={styles.footerLink}>Pune, India</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {currentYear} Dnyaneshwar Kokate. All rights reserved.</p>
          <div className={styles.socials}>
            <a 
              href="https://github.com/dnyaneshwarkokate" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.socialIcon}
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/dnyaneshwar-kokate" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.socialIcon}
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:dnyaneshwarkokatevip@gmail.com" 
              className={styles.socialIcon}
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
