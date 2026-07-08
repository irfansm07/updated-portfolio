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

type ProjectType = typeof projects[number];

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

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

      <div className="project-cards-container">
        {projects.map((project) => {
          const initials = project.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
          return (
            <div
              key={project.id}
              className="project-card-item"
              onClick={() => setSelectedProject(project)}
            >
              <div className="preview-top-stripe" style={{ backgroundColor: project.tagColor }} />
              <div className="preview-inner">
                <div className="preview-header-row">
                  <div className="preview-icon-wrapper" style={{ borderColor: `${project.tagColor}55`, color: project.tagColor }}>
                    <span className="preview-icon-text">{initials}</span>
                  </div>
                </div>
                <div className="preview-subtitle">{project.tag}</div>
                <h3 className="preview-title">{project.name}</h3>
                <div className="preview-cta">
                  Details <span className="arrow-icon">→</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal Overlay */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-card glass-card" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="modal-close-btn" onClick={() => setSelectedProject(null)} aria-label="Close modal">
              ✕
            </button>

            {/* Magic Rings Ambient Background (Inside Modal) */}
            <div className="modal-rings-wrap">
              <MagicRings
                color={selectedProject.tagColor}
                colorTwo="#6366f1"
                ringCount={6}
                speed={0.7}
                attenuation={9}
                lineThickness={2.2}
                baseRadius={0.3}
                radiusStep={0.12}
                scaleRate={0.06}
                opacity={0.8}
                followMouse={true}
                mouseInfluence={0.15}
                clickBurst={true}
              />
            </div>

            {/* Detailed Content */}
            <div className="modal-content-inner">
              <div className="modal-header">
                <span className="modal-tag" style={{ color: selectedProject.tagColor, background: `${selectedProject.tagColor}15`, borderColor: `${selectedProject.tagColor}35` }}>
                  {selectedProject.tag}
                </span>
                <h3 className="modal-title">{selectedProject.name}</h3>
              </div>

              <p className="modal-desc">{selectedProject.description}</p>

              <h4 className="modal-section-subtitle">Key Highlights</h4>
              <ul className="modal-highlights">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i}>
                    <span className="modal-highlight-dot" style={{ backgroundColor: selectedProject.tagColor }} />
                    {h}
                  </li>
                ))}
              </ul>

              <h4 className="modal-section-subtitle">Tech Stack</h4>
              <div className="modal-tech-stack">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="skill-tag">
                    {t}
                  </span>
                ))}
              </div>

              {selectedProject.url !== '#' && (
                <div className="modal-action">
                  <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="btn-primary modal-btn">
                    🚀 Visit Live Site
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
        #projects {
          padding-bottom: 2rem !important;
        }

        /* Project Cards Container Grid */
        .project-cards-container {
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: 2rem;
          max-width: 820px;
          margin: 2rem auto 4rem auto;
          width: 100%;
        }

        /* Premium Monogram Card */
        .project-card-item {
          flex: 1;
          min-width: 280px;
          max-width: 360px;
          height: 220px;
          background: #12151C; /* Custom premium dark background */
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(91, 141, 239, 0.15); /* Soft glowing border */
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          text-align: left;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.3s, box-shadow 0.3s;
        }

        .project-card-item:hover {
          transform: translateY(-8px);
          border-color: rgba(99, 102, 241, 0.4);
          box-shadow: 0 15px 35px rgba(99, 102, 241, 0.15), 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .preview-top-stripe {
          height: 4px;
          width: 100%;
        }

        .preview-inner {
          padding: 1.75rem; /* p-6 to p-8 padding */
          display: flex;
          flex-direction: column;
          align-items: flex-start; /* Left-aligned */
          height: 100%;
          text-align: left;
        }

        .preview-header-row {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          margin-bottom: 0.8rem;
        }

        .preview-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 8px; /* Rounded square */
          border: 1.5px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.02);
          transition: transform 0.3s ease;
        }

        .project-card-item:hover .preview-icon-wrapper {
          transform: scale(1.05);
        }

        .preview-icon-text {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .preview-subtitle {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 500;
          color: #8A8F9C; /* Muted gray label */
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.35rem;
        }

        .preview-title {
          font-family: var(--font-heading);
          font-size: 1.5rem; /* bold, text-2xl/3xl */
          font-weight: 700;
          color: #EDEFF3; /* Off-white text */
          margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }

        .preview-cta {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-2);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
          margin-top: auto; /* Anchor to bottom */
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          border-bottom: 1px solid rgba(129, 140, 248, 0.3);
          padding-bottom: 2px;
          transition: border-color 0.3s;
        }

        .project-card-item:hover .preview-cta {
          border-color: var(--accent-2);
        }

        .arrow-icon {
          transition: transform 0.2s ease;
        }

        .project-card-item:hover .arrow-icon {
          transform: translateX(4px);
        }

        /* Modal Overlay & Card styling */
        .project-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
          animation: modalFadeIn 0.3s ease forwards;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .project-modal-card {
          width: 100%;
          max-width: 620px;
          background: rgba(10, 10, 30, 0.7) !important;
          border: 1px solid var(--border) !important;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          padding: 2.5rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.15);
          animation: modalScaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes modalScaleUp {
          from { transform: scale(0.9) translateY(20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }

        .modal-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-muted);
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s;
          z-index: 10;
        }

        .modal-close-btn:hover {
          background: rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
          transform: rotate(90deg);
        }

        .modal-rings-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.4;
        }

        .modal-content-inner {
          position: relative;
          z-index: 1;
        }

        .modal-header {
          margin-bottom: 1.5rem;
        }

        .modal-tag {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          border: 1px solid;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
        }

        .modal-title {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .modal-desc {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .modal-section-subtitle {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .modal-highlights {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
          padding: 0;
        }

        .modal-highlights li {
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .modal-highlight-dot {
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 0.5rem;
        }

        .modal-tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .modal-action {
          margin-top: 2.5rem;
        }

        .modal-btn {
          width: 100%;
          justify-content: center;
          padding: 0.85rem;
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          .project-cards-container {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }
          .project-card-item {
            width: 100%;
            max-width: 400px;
          }
          .project-modal-card {
            padding: 1.75rem;
          }
          .modal-title {
            font-size: 1.8rem;
          }
          .modal-desc {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
}
