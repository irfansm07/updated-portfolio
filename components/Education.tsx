'use client';
import { useEffect, useRef } from 'react';

const education = [
  {
    degree: 'Bachelor of Technology – Computer Science',
    institution: 'VIT Bhopal University',
    period: 'In Progress',
    note: 'Currently pursuing B.Tech in CS with focus on web development and software engineering.',
    status: 'ongoing',
  },
  {
    degree: 'Intermediate (Class 12) – MPC Stream',
    institution: 'Excellencia Junior College',
    period: '2023',
    note: 'Mathematics, Physics, and Chemistry stream.',
    status: 'completed',
  },
  {
    degree: 'CBSE 10th Standard',
    institution: 'Wisewoods International School',
    period: '2021',
    note: 'Strong academic foundation with excellence in science and mathematics.',
    status: 'completed',
  },
];

export function Education() {
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
    <section id="education" ref={ref} className="section-wrapper fade-section">
      <div className="section-divider" style={{ marginBottom: '6rem' }} />
      <div className="section-label">/ education</div>
      <h2 className="section-title">
        Academic <span className="glow-text">Journey</span>
      </h2>

      <div className="edu-timeline">
        {education.map((edu, idx) => (
          <div key={idx} className="edu-item timeline-item">
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    {edu.degree}
                  </h3>
                  <p style={{ color: 'var(--accent-2)', fontSize: '0.95rem', fontWeight: 500 }}>{edu.institution}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-2)', background: 'rgba(99,102,241,0.1)', border: '1px solid var(--border)', borderRadius: '999px', padding: '0.25rem 0.75rem' }}>
                    {edu.period}
                  </span>
                  {edu.status === 'ongoing' && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#10b981', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '999px', padding: '0.2rem 0.65rem' }}>
                      Ongoing
                    </span>
                  )}
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.75rem', lineHeight: 1.7 }}>
                {edu.note}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Key Highlights */}
      <div style={{ marginTop: '4rem' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          Key Highlights
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          {[
            '🚀 Developed and launched a full-stack production-ready platform (VibeXpert)',
            '⚡ Completed a 24-hour client project, demonstrating exceptional efficiency',
            '📚 Actively upskilling in React.js and modern frontend technologies',
            '🎨 Strong passion for intuitive UI design and scalable web applications',
          ].map((highlight) => (
            <div key={highlight} className="glass-card" style={{ padding: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{highlight}</p>
            </div>
          ))}
        </div>
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
        .edu-timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .edu-item {
          padding-left: 2.5rem;
          margin-bottom: 2rem;
        }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(2"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
