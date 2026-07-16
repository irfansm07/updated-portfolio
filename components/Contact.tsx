'use client';
import { useEffect, useRef, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Load Lanyard client-side only — it needs WebGL/Canvas APIs
const Lanyard = dynamic(() => import('./Lanyard'), { ssr: false });

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const lanyardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [lanyardMounted, setLanyardMounted] = useState(false);
  const [lanyardReady, setLanyardReady] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  // Status state: 'idle' | 'loading' | 'success' | 'error'
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // ─── Web3Forms Access Key ───
  // Get yours free at https://web3forms.com (enter your email, receive the key)
  const WEB3FORMS_KEY = '1aed6ce8-2a5d-4bca-9eb9-c9f00a742190';

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

  // Mount Lanyard only when it scrolls near the viewport — avoids blocking page load
  useEffect(() => {
    const el = lanyardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLanyardMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' }   // start loading 200px before it enters view
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('smirfan9247@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMsg('Please fill out all required fields.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name,
          email,
          subject: subject || 'New Portfolio Contact',
          message,
          from_name: 'Portfolio Contact Form',
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        // Revert back to idle after showing success message
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setErrorMsg(result.message || 'Something went wrong. Please try again.');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const socialLinks = [
    {
      label: 'GitHub',
      handle: 'irfansm07',
      href: 'https://github.com/irfansm07',
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      handle: 'Irfan SM',
      href: 'https://linkedin.com/in/irfan-sm',
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: 'Email',
      handle: 'smirfan9247@gmail.com',
      href: 'mailto:smirfan9247@gmail.com',
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" ref={ref} className="section-wrapper fade-section">
      <div className="section-divider" style={{ marginBottom: '6rem' }} />
      <div className="section-label">/ contact</div>
      <h2 className="section-title">
        Let&apos;s <span className="glow-text">Connect</span>
      </h2>

      <div className="lanyard-hero" ref={lanyardRef}>
        {/* Skeleton shown until Lanyard canvas is ready */}
        {!lanyardReady && (
          <div className="lanyard-skeleton">
            <div className="lanyard-skeleton-band" />
            <div className="lanyard-skeleton-card">
              <div className="lanyard-skeleton-avatar" />
              <div className="lanyard-skeleton-line w70" />
              <div className="lanyard-skeleton-line w50" />
              <div className="lanyard-skeleton-divider" />
              <div className="lanyard-skeleton-line w80" />
              <div className="lanyard-skeleton-line w60" />
            </div>
            <p className="lanyard-skeleton-hint">Loading card…</p>
          </div>
        )}
        {lanyardMounted && (
          <div style={{ opacity: lanyardReady ? 1 : 0, transition: 'opacity 0.5s ease', height: '100%' }}>
            <Suspense fallback={null}>
              <Lanyard
                position={[0, 0, 8]}
                gravity={[0, -40, 0]}
                fov={28}
                lanyardWidth={0.8}
                onReady={() => setLanyardReady(true)}
              />
            </Suspense>
          </div>
        )}
      </div>

      <div className="contact-grid">
        {/* Left Column: socials */}
        <div className="contact-info">
          <p className="contact-intro">
            Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is always open.
            I&apos;m actively looking for exciting opportunities.
          </p>
          
          <div className="social-links-list">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card social-link-card"
              >
                <span className="social-icon">{link.icon}</span>
                <div>
                  <div className="social-label">{link.label}</div>
                  <div className="social-handle">{link.handle}</div>
                </div>
                <svg
                  className="arrow-icon"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>

          <div className="contact-actions">
            <button
              onClick={copyEmail}
              className="btn-primary copy-email-btn"
            >
              {copied ? '✓ Copied!' : '📋 Copy Email Address'}
            </button>
            <a href="tel:+919347702626" className="btn-outline call-me-btn">
              📞 Call Me
            </a>
          </div>
        </div>

        {/* Right Column: Mailing Form */}
        <div className="glass-card contact-form-card">
          <div className="form-header">
            <span className="form-header-badge"></span>
            <h3 className="form-header-title">Send Me a Message</h3>
          </div>

          {status === 'success' ? (
            <div className="success-message">
              <div className="success-icon-wrap">
                <svg className="success-icon" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h4 className="success-title">Message Sent!</h4>
              <p className="success-desc">
                Thank you so much for reaching out. I have received your message and will get back to you as soon as possible!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    disabled={status === 'loading'}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                    disabled={status === 'loading'}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Project collaboration, hiring, etc."
                  disabled={status === 'loading'}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  rows={5}
                  required
                  disabled={status === 'loading'}
                />
              </div>

              {status === 'error' && (
                <div className="error-banner">
                  ⚠️ {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className={`btn-primary submit-btn ${status === 'loading' ? 'loading' : ''}`}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <span className="spinner-wrap">
                    <span className="spinner"></span> Sending...
                  </span>
                ) : (
                  <>🚀 Send Message</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="footer-bar">
        <span className="footer-copyright">
          © {new Date().getFullYear()} Shaik Mohammad Irfan. Crafted with passion.
        </span>
        <span className="footer-tech">
          Built with Next.js · Three.js · GSAP
        </span>
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
        
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          align-items: start;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* ── Lanyard hero (full-width above the grid) ── */
        .lanyard-hero {
          width: 100%;
          height: 700px;
          margin-bottom: 3rem;
          position: relative;
          overflow: visible;
        }

        /* ── Skeleton placeholder ── */
        .lanyard-skeleton {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0;
          pointer-events: none;
        }

        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }

        .lanyard-skeleton-band {
          width: 12px;
          height: 160px;
          border-radius: 6px;
          background: linear-gradient(90deg, #1e1e3a 25%, #2d2d5e 50%, #1e1e3a 75%);
          background-size: 600px 100%;
          animation: shimmer 1.6s infinite linear;
          margin-bottom: -2px;
        }

        .lanyard-skeleton-card {
          width: min(260px, 80vw);
          background: rgba(35, 72, 200, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 18px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .lanyard-skeleton-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(90deg, #1e1e3a 25%, #2d2d5e 50%, #1e1e3a 75%);
          background-size: 600px 100%;
          animation: shimmer 1.6s infinite linear;
        }

        .lanyard-skeleton-line {
          height: 12px;
          border-radius: 6px;
          width: 100%;
          background: linear-gradient(90deg, #1e1e3a 25%, #2d2d5e 50%, #1e1e3a 75%);
          background-size: 600px 100%;
          animation: shimmer 1.6s infinite linear;
        }
        .lanyard-skeleton-line.w70 { width: 70%; }
        .lanyard-skeleton-line.w50 { width: 50%; }
        .lanyard-skeleton-line.w80 { width: 80%; }
        .lanyard-skeleton-line.w60 { width: 60%; }

        .lanyard-skeleton-divider {
          width: 100%;
          height: 1px;
          background: rgba(99,102,241,0.15);
          margin: 0.25rem 0;
        }

        .lanyard-skeleton-hint {
          margin-top: 1rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.08em;
        }

        .contact-intro {
          color: var(--text-muted);
          font-size: 1.05rem;
          line-height: 1.9;
        }

        .social-links-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .social-link-card {
          padding: 1.2rem 1.5rem;
          display: flex;
          gap: 1rem;
          align-items: center;
          text-decoration: none;
          color: inherit;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
        }
        .social-link-card:hover {
          transform: translateX(6px) !important;
          border-color: rgba(99, 102, 241, 0.4);
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.08);
        }

        .social-icon {
          color: var(--accent-2);
          display: flex;
          align-items: center;
        }

        .social-label {
          font-family: var(--font-heading);
          fontWeight: 600;
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .social-handle {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.15rem;
        }

        .arrow-icon {
          margin-left: auto;
          color: var(--text-muted);
          transition: transform 0.3s ease;
        }
        .social-link-card:hover .arrow-icon {
          transform: translateX(3px);
          color: var(--accent-2);
        }

        .contact-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }

        .copy-email-btn, .call-me-btn {
          font-size: 0.9rem;
          cursor: pointer;
        }

        .copy-email-btn {
          border: none;
        }

        /* Form Card Styling */
        .contact-form-card {
          padding: 2.5rem;
          background: rgba(10, 10, 30, 0.45);
          border: 1px solid var(--border);
          border-radius: 16px;
          backdrop-filter: blur(20px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .form-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .form-header-badge {
          width: 14px;
          height: 14px;
          background: var(--accent-2);
          border-radius: 3px;
          box-shadow: 0 0 10px var(--accent);
          display: inline-block;
        }

        .form-header-title {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-2);
        }

        .form-group input,
        .form-group textarea {
          background: rgba(5, 5, 20, 0.6);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 8px;
          color: var(--text-primary);
          padding: 0.85rem 1.2rem;
          font-size: 0.95rem;
          font-family: var(--font-body);
          transition: all 0.3s ease;
          width: 100%;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(148, 163, 184, 0.4);
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: var(--accent);
          outline: none;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.25);
          background: rgba(10, 10, 30, 0.8);
        }

        .form-group input:disabled,
        .form-group textarea:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error-banner {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          font-size: 0.85rem;
          text-align: center;
        }

        .submit-btn {
          width: 100%;
          border: none;
          justify-content: center;
          padding: 0.9rem 1.75rem;
          font-size: 0.95rem;
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
          cursor: pointer;
        }
        
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 0 35px rgba(99, 102, 241, 0.5);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Success State */
        .success-message {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 3rem 1rem;
          animation: fadeInUp 0.5s ease forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .success-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: #10b981;
          box-shadow: 0 0 25px rgba(16, 185, 129, 0.15);
        }

        .success-icon {
          width: 32px;
          height: 32px;
        }

        .success-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .success-desc {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 320px;
        }

        /* Footer Bar */
        .footer-bar {
          margin-top: 6rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-copyright, .footer-tech {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .lanyard-hero {
            height: 580px;
          }
        }

        @media (max-width: 768px) {
          .lanyard-hero {
            height: 500px;
          }
          .contact-form-card {
            padding: 1.75rem;
          }
          
          .form-row-2 {
            grid-template-columns: 1fr;
          }

          .contact-intro {
            font-size: 0.95rem;
          }

          .form-group input,
          .form-group textarea {
            min-height: 48px;
            font-size: 1rem;
          }

          .submit-btn {
            min-height: 48px;
          }

          .success-message {
            padding: 2rem 0.75rem;
          }
        }

        @media (max-width: 576px) {
          .lanyard-hero {
            height: 420px;
          }
          .contact-form-card {
            padding: 1.25rem;
          }

          .form-header-title {
            font-size: 1.1rem;
          }

          .contact-intro {
            font-size: 0.9rem;
          }

          .social-link-card {
            padding: 0.9rem 1rem;
          }

          .contact-actions {
            flex-direction: column;
          }

          .contact-actions .copy-email-btn,
          .contact-actions .call-me-btn {
            width: 100%;
            justify-content: center;
            text-align: center;
          }

          .footer-bar {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .footer-copyright,
          .footer-tech {
            font-size: 0.65rem;
          }

          .success-message {
            padding: 1.5rem 0.5rem;
          }

          .success-title {
            font-size: 1.25rem;
          }

          .success-desc {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}
