'use client';
import { useEffect, useRef } from 'react';

const experiences = [
  {
    title: 'Full-Stack Developer',
    company: 'VibeXpert',
    period: '2024 – Present',
    type: 'Personal Project / Founder',
    tech: ['Node.js', 'Supabase', 'Brevo'],
    points: [
      'Designed, developed & deployed vibexpert.online — a live campus community platform',
      'Built secure authentication and email onboarding flows',
      'Integrated Supabase for scalable backend and Brevo for automated emails',
      'Optimized performance, UI flow, and deployment pipeline for production',
    ],
  },
  {
    title: 'Front-End Developer Intern',
    company: 'AdThrive',
    period: '2024',
    type: 'Remote Freelance',
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub'],
    points: [
      'Delivered a complete client project within 24 hours',
      'Built responsive, mobile-friendly interfaces aligned with client requirements',
      'Integrated ad scripts and enhanced UI performance metrics',
      'Collaborated remotely with content teams for accurate implementation',
    ],
  },
  {
    title: 'Web Developer Intern',
    company: 'YugaYatra',
    period: '2024',
    type: 'Internship',
    tech: ['HTML', 'CSS', 'JavaScript'],
    points: [
      'Contributed to multiple live projects in the YugaYatra team',
      'Built frontend features for LinkCab, a cab-booking platform',
      'Developed responsive UI components for FreshIn10, a quick-commerce app',
      'Collaborated with cross-functional teams to deliver scalable, clean code',
    ],
  },
];

export function Experience() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={ref} className="section-wrapper fade-section">
      <div className="section-divider" style={{ marginBottom: '6rem' }} />
      <div className="section-label">/ experience</div>
      <h2 className="section-title">
        Where I&apos;ve <span className="glow-text">Worked</span>
      </h2>

      <div className="exp-timeline">
        {experiences.map((exp, idx) => (
          <div key={idx} className="exp-item timeline-item">
            <div className="exp-card glass-card">
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {exp.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.25rem' }}>
                    <span style={{ color: 'var(--accent-2)', fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
                      {exp.company}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>·</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{exp.type}</span>
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--accent-2)',
                    background: 'rgba(99,102,241,0.1)',
                    border: '1px solid var(--border)',
                    borderRadius: '999px',
                    padding: '0.25rem 0.75rem',
                  }}
                >
                  {exp.period}
                </span>
              </div>

              {/* Points */}
              <ul style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {exp.points.map((point) => (
                  <li key={point} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.55rem', display: 'block', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent)' }} />
                    {point}
                  </li>
                ))}
              </ul>

              {/* Tech */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem' }}>
                {exp.tech.map((t) => (
                  <span key={t} className="skill-tag" style={{ fontSize: '0.7rem', padding: '0.2rem 0.65rem' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .fade-section {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fade-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .exp-timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .exp-item {
          padding-left: 2.5rem;
          margin-bottom: 2rem;
        }

        .exp-card {
          padding: 1.75rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .exp-card:hover {
          transform: translateX(6px);
        }
      `}</style>
    </section>
  );
}
