'use client';
import { useEffect, useRef } from 'react';

export function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="section-wrapper fade-section">
      <div className="section-label">/ about me</div>
      <h2 className="section-title">
        Shaping the web,<br />
        <span className="glow-text">one experience at a time.</span>
      </h2>

      <div className="about-grid">
        {/* Bio */}
        <div>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.9', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
            Hi, I&apos;m <strong style={{ color: 'var(--text-primary)' }}>Shaik Mohammad Irfan</strong> — a Front-End Developer
            and Python Programmer currently pursuing B.Tech in Computer Science at VIT Bhopal. I build
            responsive, user-centric web applications from idea through to production deployment.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.9', marginBottom: '2rem', fontSize: '1.05rem' }}>
            I designed, built, and shipped <strong style={{ color: 'var(--text-primary)' }}>VibeXpert</strong> — a
            campus community platform — end-to-end as a solo project, and delivered a complete client
            website for AdThrive within a single 24-hour window. I care about the details: accessible
            markup, consistent design, and code that&apos;s easy for the next person to pick up.
          </p>
          <div className="about-buttons">
            <a
              href="mailto:smirfan9247@gmail.com"
              className="btn-primary"
              style={{ fontSize: '0.85rem' }}
            >
              Get In Touch
            </a>
            <a
              href="https://github.com/irfansm07"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ fontSize: '0.85rem' }}
            >
              GitHub
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ fontSize: '0.85rem' }}
              download
            >
              ↓ Resume
            </a>
          </div>
        </div>

        {/* Quick facts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { label: 'Location', value: 'India' },
            { label: 'Degree', value: 'B.Tech – Computer Science (In Progress)' },
            { label: 'University', value: 'VIT Bhopal University' },
            { label: 'Email', value: 'smirfan9247@gmail.com' },
            { label: 'Phone', value: '+91 93477 02626' },
            { label: 'Focus', value: 'Front-End · Full-Stack · UI/UX' },
          ].map((item) => (
            <div
              key={item.label}
              className="glass-card fact-card"
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--accent-2)', textTransform: 'uppercase' }}>
                {item.label}
              </span>
              <span className="fact-value">
                {item.value}
              </span>
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
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        .about-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .fact-card {
          padding: 0.85rem 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .fact-value {
          color: var(--text-primary);
          font-size: 0.9rem;
          text-align: right;
          max-width: 55%;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .about-buttons {
            flex-direction: column;
          }
          .about-buttons :global(.btn-primary),
          .about-buttons :global(.btn-outline) {
            width: 100%;
            text-align: center;
          }
          .fact-value {
            max-width: 65%;
          }
        }
        @media (max-width: 576px) {
          .about-grid {
            gap: 1.5rem;
          }
          .fact-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.35rem;
            padding: 0.75rem 1rem;
          }
          .fact-value {
            max-width: 100%;
            text-align: left;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}
