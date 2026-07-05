'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Skill Data ──────────────────────────────────────────────────────────── */

const skillCategories = [
  {
    title: 'Frontend',
    description: 'Crafting responsive and interactive user experiences.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Responsive Design', 'DOM Manipulation', 'Vite'],
  },
  {
    title: 'Backend & Tools',
    description: 'Building robust backend systems and leveraging essential tools.',
    skills: ['Node.js', 'Supabase', 'Git', 'GitHub', 'Brevo', 'REST APIs'],
  },
  {
    title: 'Programming',
    description: 'Strong foundation in programming principles and languages.',
    skills: ['Python (OOP)', 'File Handling', 'C++ Basics', 'TypeScript'],
  },
  {
    title: 'Core Strengths',
    description: 'Key soft skills and practices that drive impactful results.',
    skills: ['Debugging', 'UI/UX Awareness', 'Clean Code', 'Time Management', 'Problem-Solving', 'Team Collaboration', 'Adaptability'],
  },
];

/* ─── Card Icons ──────────────────────────────────────────────────────────── */

const cardIcons: Record<string, React.ReactNode> = {
  Frontend: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  'Backend & Tools': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  Programming: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  'Core Strengths': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
};

/* ─── Tech Pill Icons ─────────────────────────────────────────────────────── */

function TechIcon({ name }: { name: string }) {
  const s = { width: 16, height: 16, flexShrink: 0 } as const;
  switch (name) {
    case 'HTML5':
      return <svg {...s} viewBox="0 0 24 24" fill="#E34F26"><path d="M1.5 0h21l-1.91 21.563L12 24l-8.59-2.437L1.5 0zm7.09 9.12l-.38-4.25h7.38l.12 1.35H10.7l.25 2.9h5.6l-.5 5.34L12 15.63l-4.03-1.17-.28-3.09h2.65l.14 1.58 1.52.41 1.52-.41.16-1.72H8.59z"/></svg>;
    case 'CSS3':
      return <svg {...s} viewBox="0 0 24 24" fill="#1572B6"><path d="M1.5 0h21l-1.91 21.563L12 24l-8.59-2.437L1.5 0zm17.09 4.87H5.42l.35 3.93h10.3l-.54 5.72-3.53.98-3.53-.98-.24-2.63h2.58l.12 1.34 1.07.29 1.07-.29.12-1.26H5.77l-.69-7.73h13.9l-.4 4.43z"/></svg>;
    case 'JavaScript':
      return <svg {...s} viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#F7DF1E"/><text x="12" y="17" fill="#000" fontSize="12" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">JS</text></svg>;
    case 'TypeScript':
      return <svg {...s} viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#3178C6"/><text x="12" y="17" fill="#fff" fontSize="12" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">TS</text></svg>;
    case 'React.js':
      return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.6"><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.5" fill="#61DAFB" stroke="none"/></svg>;
    case 'Vite':
      return <svg {...s} viewBox="0 0 24 24" fill="none"><path d="M21.7 4.4L12.5 21.2a.5.5 0 01-.9 0L2.3 4.4a.5.5 0 01.5-.75l9-1.5a.5.5 0 01.16 0l9 1.5a.5.5 0 01.5.75z" fill="#41D1FF"/><path d="M15.8 2.85l-6.3 1.08a.35.35 0 00-.29.33l-.7 11.4a.35.35 0 00.56.3l3.3-2.6a.35.35 0 01.5.05l2.06 2.84a.35.35 0 00.6-.1l2.6-12.68a.35.35 0 00-.42-.42z" fill="#BD34FE"/></svg>;
    case 'Node.js':
      return <svg {...s} viewBox="0 0 24 24" fill="#339933"><path d="M12 1.5a1.1 1.1 0 01.55.15l8.45 4.87a1.1 1.1 0 01.55.95v9.06a1.1 1.1 0 01-.55.95l-8.45 4.87a1.1 1.1 0 01-1.1 0L3 17.48a1.1 1.1 0 01-.55-.95V7.47a1.1 1.1 0 01.55-.95l8.45-4.87A1.1 1.1 0 0112 1.5z"/></svg>;
    case 'Git':
      return <svg {...s} viewBox="0 0 24 24" fill="#F05032"><path d="M23.55 10.9L13.1.45a1.53 1.53 0 00-2.17 0l-2.17 2.17 2.74 2.74a1.82 1.82 0 012.3 2.32l2.64 2.64a1.82 1.82 0 11-1.08 1.02L13 8.98v5.37a1.82 1.82 0 11-1.5-.08V8.68a1.82 1.82 0 01-1-2.38L7.84 3.63.45 11a1.53 1.53 0 000 2.17l10.45 10.45a1.53 1.53 0 002.17 0l10.48-10.5a1.53 1.53 0 000-2.17z"/></svg>;
    case 'GitHub':
      return <svg {...s} viewBox="0 0 24 24" fill="#E6EDF3"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.218.694.825.576C20.565 21.795 24 17.298 24 12 24 5.37 18.627 0 12 0z"/></svg>;
    case 'Supabase':
      return <svg {...s} viewBox="0 0 24 24" fill="none"><path d="M13.7 21.8c-.5.6-1.5.2-1.5-.6V13h8.3c1 0 1.5 1.2.8 1.9l-7.6 6.9z" fill="#3ECF8E"/><path d="M10.3 2.2c.5-.6 1.5-.2 1.5.6V11H3.5c-1 0-1.5-1.2-.8-1.9l7.6-6.9z" fill="#3ECF8E" opacity=".6"/></svg>;
    case 'Python (OOP)':
      return <svg {...s} viewBox="0 0 24 24" fill="none"><path d="M11.9 2C7.3 2 7.6 4 7.6 4l.01 2.1h4.5v.6H5.1S2 6.3 2 11.8s2.7 5.3 2.7 5.3h1.6v-2.6s-.1-2.7 2.7-2.7h4.6s2.6 0 2.6-2.5V5.7S16.7 2 11.9 2zm-2.5 2.2a.85.85 0 110 1.7.85.85 0 010-1.7z" fill="#306998"/><path d="M12.1 22c4.6 0 4.3-2 4.3-2l-.01-2.1h-4.5v-.6h7s3.1.4 3.1-5.1-2.7-5.3-2.7-5.3h-1.6v2.6s.1 2.7-2.7 2.7H10.4s-2.6 0-2.6 2.5v3.6S7.3 22 12.1 22zm2.5-2.2a.85.85 0 110-1.7.85.85 0 010 1.7z" fill="#FFD43B"/></svg>;
    case 'C++ Basics':
      return <svg {...s} viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#00599C"/><text x="12" y="16.5" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="system-ui" textAnchor="middle">C++</text></svg>;
    case 'File Handling':
      return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="#FB923C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>;
    case 'Responsive Design':
      return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>;
    case 'DOM Manipulation':
      return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
    case 'Brevo':
      return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="#0B996E" strokeWidth="2" strokeLinecap="round"><path d="M4 4l16 8-16 8V4z"/></svg>;
    case 'REST APIs':
      return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>;
    case 'Debugging':
      return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2v2M15 2v2M12 12v4M8 8h8M6 12h12"/><rect x="6" y="6" width="12" height="14" rx="3"/></svg>;
    case 'UI/UX Awareness':
      return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>;
    case 'Clean Code':
      return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
    case 'Time Management':
      return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
    case 'Problem-Solving':
      return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="#FACC15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/></svg>;
    case 'Team Collaboration':
      return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
    case 'Adaptability':
      return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="#FB7185" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>;
    default:
      return <svg {...s} viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/></svg>;
  }
}

/* ─── useInView Hook ─────────────────────────────────────────────────────── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ─── Animated Card ──────────────────────────────────────────────────────── */

function AnimatedCard({
  category,
  position,
  delay,
}: {
  category: typeof skillCategories[0];
  position: 'tl' | 'tr' | 'bl' | 'br';
  delay: number;
}) {
  const { ref, inView } = useInView(0.12);
  const [hoveredPill, setHoveredPill] = useState<string | null>(null);

  const slideDirection = {
    tl: { x: -60, y: -40 },
    tr: { x: 60, y: -40 },
    bl: { x: -60, y: 40 },
    br: { x: 60, y: 40 },
  }[position];

  return (
    <div
      ref={ref}
      className={`sk-card sk-card-${position}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? 'translate(0, 0) scale(1)'
          : `translate(${slideDirection.x}px, ${slideDirection.y}px) scale(0.92)`,
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      <div className="sk-card-header">
        <div
          className="sk-card-icon"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
            transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay + 0.3}s`,
          }}
        >
          {cardIcons[category.title]}
        </div>
        <div>
          <h3
            className="sk-card-title"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-20px)',
              transition: `all 0.5s ease ${delay + 0.35}s`,
            }}
          >
            {category.title}
          </h3>
          <p
            className="sk-card-desc"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-20px)',
              transition: `all 0.5s ease ${delay + 0.45}s`,
            }}
          >
            {category.description}
          </p>
        </div>
      </div>
      <div className="sk-pills">
        {category.skills.map((skill, i) => (
          <span
            key={skill}
            className={`sk-pill ${hoveredPill === skill ? 'sk-pill-hovered' : ''}`}
            onMouseEnter={() => setHoveredPill(skill)}
            onMouseLeave={() => setHoveredPill(null)}
            style={{
              opacity: inView ? 1 : 0,
              transform: inView
                ? 'translateY(0) scale(1)'
                : 'translateY(20px) scale(0.8)',
              transition: `opacity 0.5s ease ${delay + 0.5 + i * 0.07}s, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay + 0.5 + i * 0.07}s, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease`,
            }}
          >
            <TechIcon name={skill} />
            <span>{skill}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Component ───────────────────────────────────────────────────────────── */

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isGlowing, setIsGlowing] = useState(false);
  const { ref: headerRef, inView: headerInView } = useInView(0.2);
  const { ref: centerRef, inView: centerInView } = useInView(0.3);
  const { ref: footerRef, inView: footerInView } = useInView(0.2);

  /* Particle system for center diamond */
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 260;
    canvas.height = 260;

    type Particle = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number };
    const particles: Particle[] = [];
    let animId: number;

    function spawn() {
      const angle = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 20;
      particles.push({
        x: 130 + Math.cos(angle) * dist,
        y: 130 + Math.sin(angle) * dist,
        vx: Math.cos(angle) * (0.3 + Math.random() * 0.5),
        vy: Math.sin(angle) * (0.3 + Math.random() * 0.5),
        life: 0,
        maxLife: 60 + Math.random() * 40,
        size: 1 + Math.random() * 2,
      });
    }

    function tick() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.3) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life >= p.maxLife) { particles.splice(i, 1); continue; }
        const alpha = 1 - p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${alpha * 0.6})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(tick);
    }

    tick();
    return () => cancelAnimationFrame(animId);
  }, []);

  const toggleGlow = useCallback(() => setIsGlowing(prev => !prev), []);

  return (
    <section id="skills" ref={sectionRef} className="sk">
      <div className="sk-divider" />

      {/* Badge + Heading — animated */}
      <div ref={headerRef}>
        <div className="sk-badge-row">
          <span
            className="sk-badge"
            style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.9)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0s',
            }}
          >
            MY TECHNICAL ARSENAL
          </span>
        </div>

        <h2
          className="sk-heading"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          Technical <span className="sk-heading-glow">Arsenal</span>
        </h2>
        <p
          className="sk-subtitle"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.35s',
          }}
        >
          A powerful combination of modern technologies and core competencies<br />
          to build robust, scalable, and user-centric solutions.
        </p>
      </div>

      {/* Grid + Center Diamond */}
      <div className={`sk-grid-wrap ${isGlowing ? 'sk-active' : ''}`}>
        {/* Card 1 — Top Left */}
        <AnimatedCard category={skillCategories[0]} position="tl" delay={0} />

        {/* Card 2 — Top Right */}
        <AnimatedCard category={skillCategories[1]} position="tr" delay={0.15} />

        {/* Center Diamond */}
        <div
          className="sk-center"
          ref={centerRef}
          style={{
            opacity: centerInView ? 1 : 0,
            transition: 'opacity 1s ease 0.3s',
          }}
        >
          <canvas
            ref={canvasRef}
            className="sk-particles"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 260,
              height: 260,
              pointerEvents: 'none',
              zIndex: 4,
            }}
          />
          <div className="sk-glow-ring" />
          <div className="sk-glow-ring sk-glow-ring-2" />
          <div className="sk-glow-ring sk-glow-ring-3" />
          <button
            className={`sk-diamond ${isGlowing ? 'sk-diamond-active' : ''}`}
            onClick={toggleGlow}
            aria-label="Toggle glow effect"
          >
            <span className="sk-diamond-text">&lt;/&gt;</span>
          </button>
          <div className="sk-platform" />
        </div>

        {/* Card 3 — Bottom Left */}
        <AnimatedCard category={skillCategories[2]} position="bl" delay={0.3} />

        {/* Card 4 — Bottom Right */}
        <AnimatedCard category={skillCategories[3]} position="br" delay={0.45} />
      </div>

      {/* Footer CTA */}
      <div
        ref={footerRef}
        className="sk-footer"
        style={{
          opacity: footerInView ? 1 : 0,
          transform: footerInView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
        }}
      >
        <div className="sk-footer-left">
          <div
            className="sk-footer-icon"
            style={{
              opacity: footerInView ? 1 : 0,
              transform: footerInView ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-90deg)',
              transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/>
              <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
            </svg>
          </div>
          <div>
            <p className="sk-footer-title">Always Learning. Always Building.</p>
            <p className="sk-footer-desc">Continuously exploring new technologies and improving every day.</p>
          </div>
        </div>
        <div className="sk-footer-right">
          <span className="sk-footer-cta">Let&apos;s build something<br />amazing together.</span>
          <a href="#contact" className="sk-footer-btn" aria-label="Go to contact">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>
        </div>
      </div>

      <style jsx global>{`
        /* ── Section ── */
        .sk {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 32px 48px;
        }

        .sk-divider {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          margin-bottom: 56px;
        }

        /* ── Badge ── */
        .sk-badge-row { text-align: center; margin-bottom: 20px; }
        .sk-badge {
          display: inline-block;
          padding: 8px 20px;
          border-radius: 999px;
          border: 1px solid rgba(124,92,255,0.2);
          background: rgba(124,92,255,0.06);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          color: rgba(167,139,250,0.8);
        }

        /* ── Heading ── */
        .sk-heading {
          text-align: center;
          font-family: var(--font-heading);
          font-size: clamp(3rem, 6vw, 4.5rem);
          font-weight: 700;
          color: #F8FAFC;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 16px;
        }
        .sk-heading-glow {
          background: linear-gradient(135deg, #C4B5FD, #7C5CFF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: sk-text-shimmer 3s ease-in-out infinite;
          background-size: 200% auto;
        }
        @keyframes sk-text-shimmer {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
        .sk-subtitle {
          text-align: center;
          max-width: 580px;
          margin: 0 auto 56px;
          font-size: 0.95rem;
          color: #94A3B8;
          line-height: 1.7;
        }

        /* ── Grid Wrapper ── */
        .sk-grid-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 80px;
          position: relative;
          margin-bottom: 48px;
        }

        /* ── Cards ── */
        .sk-card {
          background: rgba(11,16,34,0.8);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          backdrop-filter: blur(12px);
          transition: border-color 0.4s, box-shadow 0.4s, transform 0.4s;
          position: relative;
          z-index: 2;
          will-change: transform, opacity;
        }
        .sk-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(124,92,255,0.06), transparent 40%);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
          z-index: -1;
        }
        .sk-card:hover::before { opacity: 1; }
        .sk-card:hover {
          transform: translateY(-6px) !important;
          border-color: rgba(124,92,255,0.35);
          box-shadow:
            0 8px 40px rgba(124,92,255,0.12),
            0 0 0 1px rgba(124,92,255,0.15),
            0 0 80px rgba(124,92,255,0.05);
        }

        /* Glow state */
        .sk-active .sk-card {
          border-color: rgba(124,92,255,0.25);
          box-shadow: 0 0 40px rgba(124,92,255,0.08);
          animation: sk-card-pulse 3s ease-in-out infinite alternate;
        }
        @keyframes sk-card-pulse {
          0%   { box-shadow: 0 0 20px rgba(124,92,255,0.06); }
          100% { box-shadow: 0 0 50px rgba(124,92,255,0.18); border-color: rgba(167,139,250,0.4); }
        }

        /* Curved inner corners — matching the mockup */
        .sk-card-tl { border-radius: 20px 20px 100px 20px; }
        .sk-card-tr { border-radius: 20px 20px 20px 100px; }
        .sk-card-bl { border-radius: 20px 100px 20px 20px; }
        .sk-card-br { border-radius: 100px 20px 20px 20px; }

        /* ── Card Inner ── */
        .sk-card-header {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .sk-card-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: rgba(124,92,255,0.08);
          border: 1px solid rgba(124,92,255,0.15);
          display: flex;
          align-items: center; justify-content: center;
          flex-shrink: 0;
          color: #A78BFA;
          transition: background 0.3s, border-color 0.3s, transform 0.3s;
          will-change: transform;
        }
        .sk-card:hover .sk-card-icon {
          background: rgba(124,92,255,0.18);
          border-color: rgba(124,92,255,0.4);
          transform: scale(1.1) rotate(5deg);
        }
        .sk-card-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 4px;
        }
        .sk-card-desc {
          font-size: 0.85rem;
          color: #64748B;
          line-height: 1.4;
        }

        /* ── Pills ── */
        .sk-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .sk-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 38px;
          padding: 0 14px;
          border-radius: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          font-family: var(--font-body);
          font-size: 0.8rem;
          color: #CBD5E1;
          cursor: default;
          white-space: nowrap;
          will-change: transform, opacity;
          position: relative;
          overflow: hidden;
        }
        .sk-pill::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(124,92,255,0.15), rgba(99,102,241,0.08));
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .sk-pill-hovered::before { opacity: 1; }
        .sk-pill-hovered {
          transform: scale(1.08) translateY(-2px) !important;
          border-color: rgba(124,92,255,0.3) !important;
          box-shadow: 0 4px 20px rgba(124,92,255,0.15);
          color: #F8FAFC;
        }

        /* ── Center Diamond ── */
        .sk-center {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
        }
        .sk-glow-ring {
          position: absolute;
          width: 160px; height: 160px;
          border-radius: 50%;
          border: 1px solid rgba(124,92,255,0.1);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation: sk-ring-pulse 4s ease-in-out infinite;
        }
        .sk-glow-ring-2 {
          width: 220px; height: 220px;
          border-color: rgba(124,92,255,0.05);
          animation-delay: 1s;
        }
        .sk-glow-ring-3 {
          width: 280px; height: 280px;
          border-color: rgba(124,92,255,0.03);
          animation-delay: 2s;
          animation-duration: 5s;
        }
        @keyframes sk-ring-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50%       { transform: translate(-50%, -50%) scale(1.12); opacity: 1; }
        }

        .sk-diamond {
          width: 80px; height: 80px;
          background: linear-gradient(145deg, rgba(11,16,34,0.95), rgba(20,24,50,0.9));
          border: 1.5px solid rgba(124,92,255,0.35);
          border-radius: 18px;
          transform: rotate(45deg);
          display: flex;
          align-items: center; justify-content: center;
          cursor: pointer;
          pointer-events: auto;
          position: relative;
          z-index: 10;
          box-shadow:
            0 0 30px rgba(124,92,255,0.2),
            inset 0 0 20px rgba(124,92,255,0.08);
          animation: sk-float 3s ease-in-out infinite;
          transition: border-color 0.4s, box-shadow 0.4s, background 0.4s;
        }
        .sk-diamond:hover {
          border-color: rgba(124,92,255,0.6);
          box-shadow:
            0 0 50px rgba(124,92,255,0.4),
            inset 0 0 30px rgba(124,92,255,0.15);
        }
        .sk-diamond-active {
          border-color: rgba(167,139,250,0.8) !important;
          background: linear-gradient(145deg, rgba(124,92,255,0.15), rgba(20,24,50,0.9)) !important;
          box-shadow:
            0 0 60px rgba(124,92,255,0.5),
            0 0 120px rgba(167,139,250,0.2),
            inset 0 0 30px rgba(167,139,250,0.2) !important;
          animation: sk-float 3s ease-in-out infinite, sk-diamond-glow 2s ease-in-out infinite alternate !important;
        }
        @keyframes sk-diamond-glow {
          0%   { box-shadow: 0 0 40px rgba(124,92,255,0.4), inset 0 0 20px rgba(167,139,250,0.15); }
          100% { box-shadow: 0 0 80px rgba(124,92,255,0.6), 0 0 140px rgba(167,139,250,0.25), inset 0 0 40px rgba(167,139,250,0.3); }
        }
        .sk-diamond-text {
          transform: rotate(-45deg);
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          text-shadow: 0 0 12px rgba(167,139,250,0.8);
          user-select: none;
        }
        @keyframes sk-float {
          0%, 100% { transform: rotate(45deg) translateY(0); }
          50%       { transform: rotate(45deg) translateY(-10px); }
        }

        .sk-platform {
          width: 100px; height: 24px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(124,92,255,0.3), transparent 70%);
          margin-top: 12px;
          animation: sk-platform-pulse 3s ease-in-out infinite;
        }
        @keyframes sk-platform-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%       { transform: scale(1.15); opacity: 1; }
        }

        /* ── Particles canvas ── */
        .sk-particles {
          opacity: 0.7;
          mix-blend-mode: screen;
        }

        /* ── Footer ── */
        .sk-footer {
          background: rgba(11,16,34,0.6);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 28px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          backdrop-filter: blur(12px);
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          will-change: transform, opacity;
        }
        .sk-footer:hover {
          border-color: rgba(124,92,255,0.2);
          box-shadow: 0 4px 30px rgba(124,92,255,0.06);
        }
        .sk-footer-left {
          display: flex; align-items: center; gap: 16px;
        }
        .sk-footer-icon {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(124,92,255,0.08);
          border: 1px solid rgba(124,92,255,0.15);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: #A78BFA;
          will-change: transform;
        }
        .sk-footer-title {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 600;
          color: #A78BFA;
          margin-bottom: 2px;
        }
        .sk-footer-desc {
          font-size: 0.82rem;
          color: #64748B;
        }
        .sk-footer-right {
          display: flex; align-items: center; gap: 20px;
        }
        .sk-footer-cta {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 500;
          color: #F8FAFC;
          line-height: 1.4;
          text-align: right;
        }
        .sk-footer-btn {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7C5CFF, #6D28D9);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          box-shadow: 0 0 20px rgba(124,92,255,0.3);
          transition: transform 0.3s, box-shadow 0.3s;
          flex-shrink: 0;
          animation: sk-btn-glow 2.5s ease-in-out infinite alternate;
        }
        @keyframes sk-btn-glow {
          0%   { box-shadow: 0 0 20px rgba(124,92,255,0.3); }
          100% { box-shadow: 0 0 35px rgba(124,92,255,0.5), 0 0 60px rgba(167,139,250,0.15); }
        }
        .sk-footer-btn:hover {
          transform: scale(1.15) rotate(15deg);
          box-shadow: 0 0 40px rgba(124,92,255,0.6);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .sk-grid-wrap { gap: 48px; }
          .sk-card-tl, .sk-card-tr { border-radius: 20px 20px 60px 20px; }
          .sk-card-tr { border-radius: 20px 20px 20px 60px; }
          .sk-card-bl { border-radius: 20px 60px 20px 20px; }
          .sk-card-br { border-radius: 60px 20px 20px 20px; }
          .sk-diamond { width: 64px; height: 64px; }
          .sk-diamond-text { font-size: 1.2rem; }
          .sk-glow-ring { width: 120px; height: 120px; }
          .sk-glow-ring-2 { width: 160px; height: 160px; }
          .sk-glow-ring-3 { width: 200px; height: 200px; }
        }
        @media (max-width: 768px) {
          .sk { padding: 48px 16px 32px; }
          .sk-grid-wrap {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .sk-card-tl, .sk-card-tr, .sk-card-bl, .sk-card-br {
            border-radius: 20px !important;
          }
          .sk-card { padding: 24px; }
          .sk-center { display: none; }
          .sk-heading { font-size: 2.5rem; }
          .sk-subtitle { margin-bottom: 32px; }
          .sk-divider { margin-bottom: 32px; }
          .sk-footer {
            flex-direction: column;
            align-items: flex-start;
            padding: 24px;
            gap: 20px;
          }
          .sk-footer-right { width: 100%; justify-content: space-between; }
        }
      `}</style>
    </section>
  );
}
