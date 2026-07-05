'use client';
import { useEffect, useRef, useState } from 'react';
import MagicRings from './ui/MagicRings';

const projects = [
  {
    id: 1,
    name: 'VibeXpert',
    tag: 'Full-Stack · Live Production',
    tagColor: '#10b981',
    url: 'https://vibexpert.online',
    tech: ['Node.js', 'Supabase', 'Brevo', 'JavaScript'],
    description:
      'Campus-focused community platform featuring secure authentication, email onboarding flows, and real-time interaction. Live in production.',
    highlights: [
      'Designed, developed & deployed end-to-end',
      'Supabase for scalable backend services',
      'Brevo for automated email communication',
      'Optimized UI, performance & deployment pipeline',
    ],
  },
  {
    id: 2,
    name: 'ZippRide',
    tag: 'Mobile-First · PWA',
    tagColor: '#f59e0b',
    url: '#',
    tech: ['React', 'Vite', 'Supabase', 'PWA'],
    description:
      'High-performance ride-sharing app bridging traditional commuting and long-distance travel with real-time Indian Railways integration.',
    highlights: [
      'Multi-vehicle booking (Bikes, Cabs, Autos)',
      'Real-time train arrival data sync for driver pickups',
      'One-touch SOS broadcasting & Safety Center',
      'Gender-specific matching algorithms',
    ],
  },
];

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

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
    <section id="projects" ref={ref} className="section-wrapper fade-section">
      <div className="section-divider" style={{ marginBottom: '6rem' }} />
      <div className="section-label">/ projects</div>
      <h2 className="section-title">
        What I&apos;ve <span className="glow-text">Built</span>
      </h2>

      <div className="projects-grid">
        {projects.map((p, idx) => (
          <div
            key={p.id}
            className={`project-card glass-card ${activeCard === p.id ? 'active' : ''}`}
            onMouseEnter={() => setActiveCard(p.id)}
            onMouseLeave={() => setActiveCard(null)}
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            {/* Glow orb */}
            <div className="card-glow" />

            {/* Interactive MagicRings Background Effect */}
            <div className="magic-rings-bg">
              <MagicRings
                color={p.tagColor}
                colorTwo="#6366f1"
                ringCount={5}
                speed={0.6}
                attenuation={12}
                lineThickness={1.5}
                baseRadius={0.2}
                radiusStep={0.14}
                scaleRate={0.06}
                opacity={1}
                followMouse={true}
                mouseInfluence={0.12}
                hoverScale={1.15}
                parallax={0.04}
                clickBurst={true}
              />
            </div>

            <div className="project-card-content">
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <span
                    className="project-tag"
                    style={{ background: `${p.tagColor}18`, color: p.tagColor, borderColor: `${p.tagColor}44` }}
                  >
                    {p.tag}
                  </span>
                  <h3 className="project-name">{p.name}</h3>
                </div>
                {p.url !== '#' && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-btn"
                    aria-label={`Visit ${p.name}`}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </div>

              <p className="project-desc">{p.description}</p>

              {/* Highlights */}
              <ul className="project-highlights">
                {p.highlights.map((h) => (
                  <li key={h}>
                    <span className="highlight-dot" />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Tech stack */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
                {p.tech.map((t) => (
                  <span key={t} className="skill-tag" style={{ fontSize: '0.7rem', padding: '0.25rem 0.7rem' }}>
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

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.75rem;
        }

        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr; }
        }

        .project-card {
          position: relative;
          padding: 2rem;
          overflow: hidden;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          cursor: default;
        }

        .project-card:hover {
          transform: translateY(-6px);
        }

        .card-glow {
          position: absolute;
          top: -60px;
          right: -60px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
          pointer-events: none;
          transition: opacity 0.4s;
          opacity: 0;
        }

        .project-card:hover .card-glow {
          opacity: 1;
        }

        .magic-rings-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.12;
          transition: opacity 0.5s ease;
        }

        .project-card:hover .magic-rings-bg {
          opacity: 0.45;
        }

        .project-card-content {
          position: relative;
          z-index: 1;
          pointer-events: auto;
        }

        .project-tag {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          border: 1px solid;
          margin-bottom: 0.6rem;
          text-transform: uppercase;
        }

        .project-name {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .project-link-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid var(--border);
          color: var(--text-muted);
          text-decoration: none;
          transition: all 0.25s;
          flex-shrink: 0;
        }

        .project-link-btn:hover {
          border-color: var(--accent);
          color: var(--accent-2);
          background: rgba(99,102,241,0.1);
        }

        .project-desc {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.8;
          margin-bottom: 1.25rem;
        }

        .project-highlights {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .project-highlights li {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          color: var(--text-muted);
          font-size: 0.875rem;
          line-height: 1.6;
        }

        .highlight-dot {
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
          margin-top: 0.45rem;
        }

        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr; }
          .project-card {
            padding: 1.5rem;
          }
          .project-name {
            font-size: 1.35rem;
          }
        }

        @media (max-width: 576px) {
          .project-card {
            padding: 1.25rem;
          }
          .project-name {
            font-size: 1.2rem;
          }
          .project-desc {
            font-size: 0.875rem;
          }
          .project-highlights li {
            font-size: 0.8rem;
          }
          .project-card:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
