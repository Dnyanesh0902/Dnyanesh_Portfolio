'use client';

import React, { useEffect, useState } from 'react';
import { ExternalLink, Code } from 'lucide-react';
import { Github } from '@/components/SocialIcons';
import styles from './page.module.css';
import { API_BASE_URL } from '@/config';

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string; // Comma separated list
  category: string;
  githubUrl: string;
  liveUrl?: string;
}

const fallbackProjects: ProjectItem[] = [
  {
    id: 1,
    title: 'Dynamic Project Workflow',
    description: 'Engineered a workflow automation backend utilizing Go (Golang), Gin, GORM, and MySQL.',
    longDescription: 'A robust workflow automation backend system built for enterprise process management. Integrated AWS S3 storage services for document uploads, implemented custom rate limiters to protect endpoints, and set up automated wkhtmltopdf PDF report exports for generation of work order reports.',
    technologies: 'Go, Gin, GORM, MySQL, AWS S3, wkhtmltopdf',
    category: 'Go Backend',
    githubUrl: 'https://github.com/dnyaneshwarkokate/dynamic-project-workflow',
  },
  {
    id: 2,
    title: 'Go Student Management API',
    description: 'Developed a high-performance Student Management REST API using Go (Golang), Gin, and SQL Server.',
    longDescription: 'A high-performance student registration and records API designed using Clean Architecture directory guidelines. Utilized GORM hooks for entity lifecycle management and implemented the Repository Pattern to separate business logic from the database layer.',
    technologies: 'Go, Gin, GORM, SQL Server, Clean Architecture, Repository Pattern',
    category: 'Go Backend',
    githubUrl: 'https://github.com/dnyaneshwarkokate/go-student-management-api',
  },
  {
    id: 3,
    title: 'Employee Management System',
    description: 'Engineered a secure, full-stack Employee Management System utilizing ASP.NET Core Web API and Angular.',
    longDescription: 'A secure, enterprise-grade human resources portal. Implemented secure JWT authentication and granular Role-Based Access Control (RBAC) to restrict admin settings. Structured using Repository Pattern and Dependency Injection for highly testable code.',
    technologies: 'ASP.NET Core, Angular, JWT, RBAC, Repository Pattern, Dependency Injection',
    category: 'Full Stack',
    githubUrl: 'https://github.com/dnyaneshwarkokate/employee-management-system',
  },
  {
    id: 4,
    title: 'Student Management System',
    description: 'Developed a robust Student Management REST API using ASP.NET Core, Entity Framework Core, and SQL Server.',
    longDescription: 'A comprehensive student management API structured with Clean Architecture guidelines. Decoupled internal data models from presentation models using Data Transfer Objects (DTOs) and AutoMapper. Documented API endpoints with Swagger/OpenAPI.',
    technologies: 'ASP.NET Core, EF Core, SQL Server, AutoMapper, DTOs, Swagger, Postman',
    category: '.NET Backend',
    githubUrl: 'https://github.com/dnyaneshwarkokate/student-management-system',
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/projects`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.success && Array.isArray(data.data)) {
            setProjects(data.data);
          } else if (data && Array.isArray(data)) {
            setProjects(data); // Support fallback direct array format
          }
        }
      } catch (err) {
        console.warn('Backend API offline. Using fallback project lists.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = ['All', 'Go Backend', '.NET Backend', 'Full Stack'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()) || activeFilter.toLowerCase().includes(p.category.toLowerCase()));

  return (
    <div className={styles.container}>
      {/* Intro */}
      <div className={`${styles.intro} animate-fade-in`}>
        <h2>My Projects</h2>
        <p>
          A selection of backend systems, full-stack tools, and APIs engineered with modern designs and clean architectures.
        </p>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`${styles.filterBtn} ${activeFilter === cat ? styles.activeFilter : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className={styles.projectsGrid}>
        {filteredProjects.map((project) => (
          <article key={project.id} className={styles.projectCard}>
            <div className={styles.cardContent}>
              <span className={styles.category}>{project.category}</span>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>
              
              <div className={styles.techList}>
                {project.technologies.split(',').map((tech) => (
                  <span key={tech} className={styles.techTag}>
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
            
            <div className={styles.cardFooter}>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <Github size={18} /> Code
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <ExternalLink size={18} /> Live Demo
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
