'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import './Lanyard.css';

interface LanyardProps {
  onReady?: () => void;
}

export default function Lanyard({ onReady }: LanyardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Physics state
  const angle     = useRef(0);        // current rotation angle (deg)
  const velocity  = useRef(0);        // angular velocity
  const dragging  = useRef(false);
  const dragStartX = useRef(0);
  const lastX     = useRef(0);
  const rafId     = useRef<number>(0);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pendulum simulation loop
  const tick = useCallback(() => {
    if (!dragging.current) {
      // Spring back + damping
      velocity.current += -angle.current * 0.04;  // spring
      velocity.current *= 0.88;                    // damping
      angle.current += velocity.current;

      if (cardRef.current) {
        cardRef.current.style.transform = `rotate(${angle.current}deg)`;
      }
    }
    rafId.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(tick);
    onReady?.();
    return () => cancelAnimationFrame(rafId.current);
  }, [tick, onReady]);

  // ── Pointer handlers ──────────────────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    dragStartX.current = e.clientX;
    lastX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    document.body.style.cursor = 'grabbing';

    // Long-press → preview
    longPressTimer.current = setTimeout(() => {
      dragging.current = false;
      document.body.style.cursor = '';
      setPreviewOpen(true);
    }, 500);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    angle.current = Math.max(-35, Math.min(35, angle.current + dx * 0.35));
    velocity.current = dx * 0.35;
    if (cardRef.current) {
      cardRef.current.style.transform = `rotate(${angle.current}deg)`;
    }
  }, []);

  const onPointerUp = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    dragging.current = false;
    document.body.style.cursor = '';
  }, []);

  // Close preview on Escape
  useEffect(() => {
    if (!previewOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setPreviewOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [previewOpen]);

  return (
    <div className="lyd-scene">
      {/* ── String ── */}
      <div className="lyd-string-wrap">
        <div className="lyd-string" />
      </div>

      {/* ── Swinging assembly ── */}
      <div className="lyd-pivot">
        <div
          ref={cardRef}
          className="lyd-card-wrap"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{ cursor: 'grab' }}
        >
          {/* Clip + string connector */}
          <div className="lyd-clip" />

          {/* ── Card ── */}
          <div className="lyd-card">
            {/* Top blue section */}
            <div className="lyd-card-top">
              <div className="lyd-dots">
                {Array.from({ length: 15 }).map((_, i) => <span key={i} className="lyd-dot" />)}
              </div>
              <div className="lyd-circle-deco" />

              <div className="lyd-avatar">
                <span>SMI</span>
              </div>

              <h3 className="lyd-name">Shaik Mohammad Irfan</h3>

              <div className="lyd-badge">
                <span className="lyd-badge-icon">&lt;/&gt;</span>
                <span className="lyd-badge-text">SOFTWARE DEVELOPER</span>
              </div>

              <div className="lyd-info-box">
                <div className="lyd-info-icon">🚀</div>
                <div className="lyd-info-text">
                  <span>Building my own startup.</span>
                  <span>Currently working on <b>Vibexpert</b> as <b>Head.</b></span>
                </div>
              </div>
            </div>

            {/* Wave divider */}
            <div className="lyd-wave">
              <svg viewBox="0 0 600 40" preserveAspectRatio="none">
                <path d="M0,20 C150,0 450,40 600,15 L600,40 L0,40 Z" fill="#eef1f8" />
              </svg>
            </div>

            {/* Bottom white section */}
            <div className="lyd-card-bottom">
              <div className="lyd-row">
                <div className="lyd-row-icon">&lt;/&gt;</div>
                <div>
                  <div className="lyd-row-label">DEGREE</div>
                  <div className="lyd-row-value">B.Tech — Computer Science</div>
                </div>
              </div>
              <div className="lyd-divider" />
              <div className="lyd-row">
                <div className="lyd-row-icon lyd-row-icon--email">✉</div>
                <div>
                  <div className="lyd-row-label">EMAIL</div>
                  <div className="lyd-row-value">smirfan9247@gmail.com</div>
                </div>
              </div>
              <div className="lyd-divider" />
              <div className="lyd-quote">
                <span className="lyd-quote-mark">&ldquo;</span>
                <div className="lyd-quote-bar" />
                <div>
                  <div>Code. Build. Solve.</div>
                  <div>Turning ideas into real impact.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Long-press full-screen preview ── */}
      {previewOpen && (
        <div
          className="lyd-preview-overlay"
          onClick={() => setPreviewOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="lyd-preview-inner" onClick={e => e.stopPropagation()}>
            <button
              className="lyd-preview-close"
              onClick={() => setPreviewOpen(false)}
              aria-label="Close"
            >✕</button>
            <div className="lyd-preview-card">
              <div className="lyd-card-top">
                <div className="lyd-dots">
                  {Array.from({ length: 15 }).map((_, i) => <span key={i} className="lyd-dot" />)}
                </div>
                <div className="lyd-circle-deco" />
                <div className="lyd-avatar"><span>SMI</span></div>
                <h3 className="lyd-name">Shaik Mohammad Irfan</h3>
                <div className="lyd-badge">
                  <span className="lyd-badge-icon">&lt;/&gt;</span>
                  <span className="lyd-badge-text">SOFTWARE DEVELOPER</span>
                </div>
                <div className="lyd-info-box">
                  <div className="lyd-info-icon">🚀</div>
                  <div className="lyd-info-text">
                    <span>Building my own startup.</span>
                    <span>Currently working on <b>Vibexpert</b> as <b>Head.</b></span>
                  </div>
                </div>
              </div>
              <div className="lyd-wave">
                <svg viewBox="0 0 600 40" preserveAspectRatio="none">
                  <path d="M0,20 C150,0 450,40 600,15 L600,40 L0,40 Z" fill="#eef1f8" />
                </svg>
              </div>
              <div className="lyd-card-bottom">
                <div className="lyd-row">
                  <div className="lyd-row-icon">&lt;/&gt;</div>
                  <div>
                    <div className="lyd-row-label">DEGREE</div>
                    <div className="lyd-row-value">B.Tech — Computer Science</div>
                  </div>
                </div>
                <div className="lyd-divider" />
                <div className="lyd-row">
                  <div className="lyd-row-icon lyd-row-icon--email">✉</div>
                  <div>
                    <div className="lyd-row-label">EMAIL</div>
                    <div className="lyd-row-value">smirfan9247@gmail.com</div>
                  </div>
                </div>
                <div className="lyd-divider" />
                <div className="lyd-quote">
                  <span className="lyd-quote-mark">&ldquo;</span>
                  <div className="lyd-quote-bar" />
                  <div>
                    <div>Code. Build. Solve.</div>
                    <div>Turning ideas into real impact.</div>
                  </div>
                </div>
              </div>
            </div>
            <p className="lyd-preview-hint">Tap outside or Esc to close</p>
          </div>
        </div>
      )}
    </div>
  );
}
