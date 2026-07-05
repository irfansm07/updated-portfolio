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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        {/* Bio */}
        <div>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.9', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
            Hi, I&apos;m <strong style={{ color: 'var(--text-primary)' }}>Shaik Mohammad Irfan</strong> — a Front-End Developer
            and Python Programmer passionate about building responsive, user-centric web applications that
            actually make a difference.
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.9', marginBottom: '2rem', fontSize: '1.05rem' }}>
            Currently pursuing B.Tech in Computer Science at VIT Bhopal, I combine strong fundamentals in
            HTML, CSS, JavaScript, and Python with growing full-stack expertise. I thrive under pressure,
            ship fast, and obsess over clean code and intuitive UX.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
              className="glass-card"
              style={{ padding: '0.85rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--accent-2)', textTransform: 'uppercase' }}>
                {item.label}
              </span>
              <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', textAlign: 'right', maxWidth: '55%' }}>
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
        @media (max-width: 768px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
