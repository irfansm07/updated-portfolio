'use client';
import { useEffect, useRef, useState } from 'react';

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

/* ─── Brand Colors Mapping ────────────────────────────────────────────────── */

const brandColors: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  HTML5: { border: 'rgba(227, 79, 38, 0.2)', bg: 'rgba(227, 79, 38, 0.04)', text: '#e34f26', glow: 'rgba(227, 79, 38, 0.15)' },
  CSS3: { border: 'rgba(21, 114, 182, 0.2)', bg: 'rgba(21, 114, 182, 0.04)', text: '#38bdf8', glow: 'rgba(21, 114, 182, 0.15)' },
  JavaScript: { border: 'rgba(247, 223, 30, 0.15)', bg: 'rgba(247, 223, 30, 0.03)', text: '#facc15', glow: 'rgba(247, 223, 30, 0.1)' },
  'React.js': { border: 'rgba(97, 218, 251, 0.2)', bg: 'rgba(97, 218, 251, 0.04)', text: '#61dafb', glow: 'rgba(97, 218, 251, 0.15)' },
  'Responsive Design': { border: 'rgba(129, 140, 248, 0.2)', bg: 'rgba(129, 140, 248, 0.04)', text: '#818cf8', glow: 'rgba(129, 140, 248, 0.15)' },
  'DOM Manipulation': { border: 'rgba(167, 139, 250, 0.2)', bg: 'rgba(167, 139, 250, 0.04)', text: '#a78bfa', glow: 'rgba(167, 139, 250, 0.15)' },
  Vite: { border: 'rgba(189, 52, 254, 0.2)', bg: 'rgba(189, 52, 254, 0.04)', text: '#bd34fe', glow: 'rgba(189, 52, 254, 0.15)' },
  'Node.js': { border: 'rgba(51, 153, 51, 0.2)', bg: 'rgba(51, 153, 51, 0.04)', text: '#4ade80', glow: 'rgba(51, 153, 51, 0.15)' },
  Supabase: { border: 'rgba(62, 207, 142, 0.2)', bg: 'rgba(62, 207, 142, 0.04)', text: '#3ecf8e', glow: 'rgba(62, 207, 142, 0.15)' },
  Git: { border: 'rgba(240, 80, 50, 0.2)', bg: 'rgba(240, 80, 50, 0.04)', text: '#f05032', glow: 'rgba(240, 80, 50, 0.15)' },
  GitHub: { border: 'rgba(230, 237, 243, 0.2)', bg: 'rgba(230, 237, 243, 0.04)', text: '#cbd5e1', glow: 'rgba(230, 237, 243, 0.12)' },
  Brevo: { border: 'rgba(11, 153, 110, 0.2)', bg: 'rgba(11, 153, 110, 0.04)', text: '#0b996e', glow: 'rgba(11, 153, 110, 0.15)' },
  'REST APIs': { border: 'rgba(34, 211, 238, 0.2)', bg: 'rgba(34, 211, 238, 0.04)', text: '#22d3ee', glow: 'rgba(34, 211, 238, 0.15)' },
  'Python (OOP)': { border: 'rgba(48, 105, 152, 0.2)', bg: 'rgba(48, 105, 152, 0.04)', text: '#38bdf8', glow: 'rgba(48, 105, 152, 0.15)' },
  'File Handling': { border: 'rgba(251, 146, 60, 0.2)', bg: 'rgba(251, 146, 60, 0.04)', text: '#fb923c', glow: 'rgba(251, 146, 60, 0.15)' },
  'C++ Basics': { border: 'rgba(0, 89, 156, 0.2)', bg: 'rgba(0, 89, 156, 0.04)', text: '#60a5fa', glow: 'rgba(0, 89, 156, 0.15)' },
  TypeScript: { border: 'rgba(49, 120, 198, 0.2)', bg: 'rgba(49, 120, 198, 0.04)', text: '#3178c6', glow: 'rgba(49, 120, 198, 0.15)' },
  Debugging: { border: 'rgba(248, 113, 113, 0.2)', bg: 'rgba(248, 113, 113, 0.04)', text: '#f87171', glow: 'rgba(248, 113, 113, 0.15)' },
  'UI/UX Awareness': { border: 'rgba(192, 132, 252, 0.2)', bg: 'rgba(192, 132, 252, 0.04)', text: '#c084fc', glow: 'rgba(192, 132, 252, 0.15)' },
  'Clean Code': { border: 'rgba(74, 222, 128, 0.2)', bg: 'rgba(74, 222, 128, 0.04)', text: '#4ade80', glow: 'rgba(74, 222, 128, 0.15)' },
  'Time Management': { border: 'rgba(96, 165, 250, 0.2)', bg: 'rgba(96, 165, 250, 0.04)', text: '#60a5fa', glow: 'rgba(96, 165, 250, 0.15)' },
  'Problem-Solving': { border: 'rgba(250, 204, 21, 0.2)', bg: 'rgba(250, 204, 21, 0.04)', text: '#facc15', glow: 'rgba(250, 204, 21, 0.15)' },
  'Team Collaboration': { border: 'rgba(56, 189, 248, 0.2)', bg: 'rgba(56, 189, 248, 0.04)', text: '#38bdf8', glow: 'rgba(56, 189, 248, 0.15)' },
  Adaptability: { border: 'rgba(251, 113, 133, 0.2)', bg: 'rgba(251, 113, 133, 0.04)', text: '#fb7185', glow: 'rgba(251, 113, 133, 0.15)' },
};

const defaultColor = { border: 'rgba(148, 163, 184, 0.15)', bg: 'rgba(148, 163, 184, 0.03)', text: '#cbd5e1', glow: 'rgba(148, 163, 184, 0.08)' };

/* ─── Card Icons ──────────────────────────────────────────────────────────── */

const cardIcons: Record<string, React.ReactNode> = {
  Frontend: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  'Backend & Tools': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  Programming: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  'Core Strengths': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
};

/* ─── Tech Pill Icons ─────────────────────────────────────────────────────── */

function TechIcon({ name }: { name: string }) {
  const s = { width: 14, height: 14, flexShrink: 0 } as const;
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

function useInView(threshold = 0.1) {
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

/* ─── Animated Bento Card ────────────────────────────────────────────────── */

function BentoCard({
  category,
  gridClass,
  delay,
}: {
  category: typeof skillCategories[0];
  gridClass: string;
  delay: number;
}) {
  const { ref, inView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`bento-card ${gridClass}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      <div className="bento-card-header">
        <div className="bento-card-icon">{cardIcons[category.title]}</div>
        <div>
          <h3 className="bento-card-title">{category.title}</h3>
          <p className="bento-card-desc">{category.description}</p>
        </div>
      </div>
      <div className="bento-pills">
        {category.skills.map((skill, i) => {
          const col = brandColors[skill] || defaultColor;
          return (
            <span
              key={skill}
              className="bento-pill"
              style={{
                '--pill-text': col.text,
                '--pill-bg': col.bg,
                '--pill-border': col.border,
                '--pill-glow': col.glow,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.4s ease ${delay + 0.3 + i * 0.05}s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay + 0.3 + i * 0.05}s`,
              } as React.CSSProperties}
            >
              <TechIcon name={skill} />
              <span>{skill}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Component ───────────────────────────────────────────────────────────── */

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: headerRef, inView: headerInView } = useInView(0.2);
  const { ref: footerRef, inView: footerInView } = useInView(0.2);

  return (
    <section id="skills" ref={sectionRef} className="sk">
      <div className="sk-divider" />

      {/* Header */}
      <div ref={headerRef} className="sk-header">
        <div className="sk-badge-row">
          <span
            className="sk-badge"
            style={{
              opacity: headerInView ? 1 : 0,
              transform: headerInView ? 'translateY(0)' : 'translateY(-12px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            MY TECHNICAL ARSENAL
          </span>
        </div>

        <h2
          className="sk-heading"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          }}
        >
          Technical <span className="sk-heading-glow">Arsenal</span>
        </h2>
        <p
          className="sk-subtitle"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.6s ease 0.25s',
          }}
        >
          A powerful combination of modern technologies and core competencies<br />
          to build robust, scalable, and user-centric solutions.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="bento-grid">
        {/* Row 1: Frontend (span 2) & Backend (span 1) */}
        <BentoCard category={skillCategories[0]} gridClass="span-2" delay={0} />
        <BentoCard category={skillCategories[1]} gridClass="span-1" delay={0.15} />

        {/* Row 2: Programming (span 1) & Core Strengths (span 2) */}
        <BentoCard category={skillCategories[2]} gridClass="span-1" delay={0.3} />
        <BentoCard category={skillCategories[3]} gridClass="span-2" delay={0.45} />
      </div>

      {/* Footer CTA */}
      <div
        ref={footerRef}
        className="sk-footer"
        style={{
          opacity: footerInView ? 1 : 0,
          transform: footerInView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
        }}
      >
        <div className="sk-footer-left">
          <div className="sk-footer-icon">
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
        /* ── Section Wrapper ── */
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

        .sk-header {
          text-align: center;
          margin-bottom: 56px;
        }

        /* ── Badge ── */
        .sk-badge-row { margin-bottom: 20px; }
        .sk-badge {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 999px;
          border: 1px solid rgba(124,92,255,0.15);
          background: rgba(124,92,255,0.04);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: rgba(167,139,250,0.75);
        }

        /* ── Heading ── */
        .sk-heading {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          font-weight: 700;
          color: #F8FAFC;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 16px;
        }
        .sk-heading-glow {
          background: linear-gradient(135deg, #a5b4fc, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .sk-subtitle {
          max-width: 580px;
          margin: 0 auto;
          font-size: 0.95rem;
          color: #94A3B8;
          line-height: 1.7;
        }

        /* ── Bento Grid ── */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 48px;
        }

        /* Bento Cards */
        .bento-card {
          background: rgba(10, 10, 25, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s ease,
                      box-shadow 0.4s ease;
          position: relative;
          z-index: 1;
        }

        .bento-card.span-2 {
          grid-column: span 2;
        }
        .bento-card.span-1 {
          grid-column: span 1;
        }

        .bento-card:hover {
          transform: translateY(-4px);
          border-color: rgba(99, 102, 241, 0.25);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.04),
                      0 0 1px rgba(99, 102, 241, 0.15),
                      inset 0 0 12px rgba(99, 102, 241, 0.02);
        }

        /* Bento Card Header */
        .bento-card-header {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .bento-card-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(99, 102, 241, 0.06);
          border: 1px solid rgba(99, 102, 241, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #818cf8;
          flex-shrink: 0;
          transition: background 0.3s, border-color 0.3s, color 0.3s;
        }

        .bento-card:hover .bento-card-icon {
          background: rgba(99, 102, 241, 0.12);
          border-color: rgba(99, 102, 241, 0.3);
          color: #a5b4fc;
        }

        .bento-card-title {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 4px;
        }

        .bento-card-desc {
          font-size: 0.88rem;
          color: #94A3B8;
          line-height: 1.45;
        }

        /* Minimalist Tech Pills */
        .bento-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }

        .bento-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 34px;
          padding: 0 12px;
          border-radius: 8px;
          background: var(--pill-bg);
          border: 1px solid var(--pill-border);
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--pill-text);
          cursor: default;
          white-space: nowrap;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.25s,
                      box-shadow 0.25s,
                      background-color 0.25s;
        }

        .bento-pill:hover {
          transform: scale(1.04) translateY(-1px);
          border-color: var(--pill-text);
          background-color: rgba(255, 255, 255, 0.02);
          box-shadow: 0 2px 10px var(--pill-glow);
        }

        /* ── Footer ── */
        .sk-footer {
          background: rgba(10, 10, 25, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          padding: 24px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: border-color 0.3s;
        }
        .sk-footer:hover {
          border-color: rgba(99, 102, 241, 0.15);
        }
        .sk-footer-left {
          display: flex; align-items: center; gap: 16px;
        }
        .sk-footer-icon {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.06);
          border: 1px solid rgba(99, 102, 241, 0.12);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: #818cf8;
        }
        .sk-footer-title {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 600;
          color: #818cf8;
          margin-bottom: 2px;
        }
        .sk-footer-desc {
          font-size: 0.8rem;
          color: #94A3B8;
        }
        .sk-footer-right {
          display: flex; align-items: center; gap: 20px;
        }
        .sk-footer-cta {
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 500;
          color: #F8FAFC;
          line-height: 1.4;
          text-align: right;
        }
        .sk-footer-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.25);
          transition: transform 0.3s, box-shadow 0.3s;
          flex-shrink: 0;
        }
        .sk-footer-btn:hover {
          transform: scale(1.1) rotate(15deg);
          box-shadow: 0 0 25px rgba(99, 102, 241, 0.45);
        }

        /* ── Responsive Grid ── */
        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: 1fr 1fr;
          }
          .bento-card.span-2 {
            grid-column: span 2;
          }
          .bento-card.span-1 {
            grid-column: span 1;
          }
        }

        @media (max-width: 768px) {
          .sk { padding: 48px 16px 32px; }
          .bento-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .bento-card.span-2,
          .bento-card.span-1 {
            grid-column: span 1;
          }
          .bento-card { padding: 24px; }
          .sk-heading { font-size: 2.2rem; }
          .sk-subtitle { margin-bottom: 32px; }
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
