'use client';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-logo">SM Irfan</a>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn-primary nav-cta" style={{ fontSize: '0.75rem', padding: '0.5rem 1.2rem' }}>
          Hire Me
        </a>

        {/* Hamburger toggle – mobile only */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="bar bar1" />
          <span className="bar bar2" />
          <span className="bar bar3" />
        </button>
      </nav>

      {/* Fullscreen mobile menu overlay */}
      <div className={`mobile-menu ${menuOpen ? 'visible' : ''}`}>
        <ul className="mobile-links">
          {links.map((l, i) => (
            <li key={l.href} style={{ transitionDelay: menuOpen ? `${0.05 * i}s` : '0s' }}>
              <a href={l.href} onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="btn-primary mobile-cta"
          onClick={() => setMenuOpen(false)}
        >
          Hire Me
        </a>
      </div>

      <style jsx>{`
        /* ── Hamburger Button ─────────────────────────────── */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 44px;
          height: 44px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 8px;
          cursor: pointer;
          z-index: 110;
          padding: 0;
          -webkit-tap-highlight-color: transparent;
          transition: border-color 0.3s;
        }

        .hamburger:hover {
          border-color: var(--accent);
        }

        .bar {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: transform 0.35s cubic-bezier(0.77, 0, 0.18, 1),
                      opacity 0.25s ease;
          transform-origin: center;
        }

        /* Animate to X */
        .hamburger.open .bar1 {
          transform: translateY(7px) rotate(45deg);
        }
        .hamburger.open .bar2 {
          opacity: 0;
          transform: scaleX(0);
        }
        .hamburger.open .bar3 {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* ── Mobile Menu Overlay ──────────────────────────── */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 105;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.4s ease, visibility 0.4s ease;
        }

        .mobile-menu.visible {
          opacity: 1;
          visibility: visible;
        }

        .mobile-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .mobile-links li {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }

        .mobile-menu.visible .mobile-links li {
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-links a {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.25s;
          padding: 0.5rem 1rem;
          display: block;
        }

        .mobile-links a:hover {
          color: var(--accent-2);
        }

        .mobile-cta {
          font-size: 0.9rem;
          padding: 0.75rem 2rem;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.4s ease 0.3s, transform 0.4s ease 0.3s,
                      box-shadow 0.3s, background 0.3s;
        }

        .mobile-menu.visible .mobile-cta {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Responsive Rules ─────────────────────────────── */
        @media (max-width: 768px) {
          .hamburger {
            display: flex;
          }
          .nav-cta {
            margin-right: 0.5rem;
          }
        }

        @media (max-width: 576px) {
          .nav-cta {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
