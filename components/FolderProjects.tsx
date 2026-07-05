'use client';

import { useState } from 'react';
import Folder from './Folder';
import ProjectCard from './ProjectCard';
import MagicRings from './ui/MagicRings';

const projects = [
  {
    id: 1,
    name: 'VibeXpert',
    tag: 'Full-Stack · Live Production',
    tagColor: '#22c55e',
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
    tagColor: '#f97316',
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
  {
    id: 3,
    name: 'VibeXpert Shop',
    tag: 'E-Commerce · Online Store',
    tagColor: '#ec4899',
    url: 'https://www.vibexpert.shop',
    tech: ['Next.js', 'Stripe', 'Supabase', 'TailwindCSS'],
    description:
      'Modern e-commerce platform for campus merchandise with seamless checkout experience, inventory management, and order tracking system.',
    highlights: [
      'Secure payment integration with Stripe',
      'Real-time inventory management',
      'Order tracking and notification system',
      'Responsive design optimized for mobile shopping',
    ],
  },
];

export default function FolderProjects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <>
      <div style={{ height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '280px 0 20px 0', pointerEvents: 'auto', position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ position: 'absolute', top: '10%', left: '0', color: '#94A3B8', fontSize: '1rem', fontWeight: '500', textAlign: 'right', width: '150px', opacity: 1 }}>
          3 Main Projects
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '6px' }}>
            <div style={{ width: '200px', height: '2px', background: '#5227FF' }}></div>
            <div style={{ width: '0', height: '0', borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '10px solid #5227FF' }}></div>
          </div>
        </div>
        <div style={{ position: 'absolute', top: '10%', right: '0', color: '#94A3B8', fontSize: '1rem', fontWeight: '500', textAlign: 'left', width: '150px', opacity: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '6px' }}>
            <div style={{ width: '0', height: '0', borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderRight: '10px solid #5227FF' }}></div>
            <div style={{ width: '200px', height: '2px', background: '#5227FF' }}></div>
          </div>
          1 College Project
        </div>
        <div style={{ position: 'absolute', bottom: '20%', left: '0', color: '#94A3B8', fontSize: '1rem', fontWeight: '500', textAlign: 'right', width: '160px', opacity: 1 }}>
          2 Fully Functional<br />Live Websites
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '6px' }}>
            <div style={{ width: '200px', height: '2px', background: '#5227FF' }}></div>
            <div style={{ width: '0', height: '0', borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '10px solid #5227FF' }}></div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '20%', right: '0', color: '#94A3B8', fontSize: '1rem', fontWeight: '500', textAlign: 'left', width: '160px', opacity: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '6px' }}>
            <div style={{ width: '0', height: '0', borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderRight: '10px solid #5227FF' }}></div>
            <div style={{ width: '200px', height: '2px', background: '#5227FF' }}></div>
          </div>
          Startup Ready<br />Live Projects
        </div>
        <div style={{ position: 'absolute', top: '45%', left: '0', color: '#94A3B8', fontSize: '0.9rem', fontWeight: '500', textAlign: 'right', width: '170px', opacity: 0.9, fontStyle: 'italic' }}>
          More to be listed<br />Work in Progress
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '6px' }}>
            <div style={{ width: '200px', height: '2px', background: '#5227FF' }}></div>
            <div style={{ width: '0', height: '0', borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '10px solid #5227FF' }}></div>
          </div>
        </div>
        <Folder size={1.2} color="#5227FF" items={[
          <ProjectCard 
            key="vibexpert"
            initials="VX" 
            category="WEB PLATFORM" 
            title="VibeXpert" 
            color="#22c55e" 
            onClick={() => setSelectedProject(projects[0])}
          />,
          <ProjectCard 
            key="zippride"
            initials="ZR" 
            category="MOBILE APP" 
            title="ZippRide" 
            color="#f97316" 
            onClick={() => setSelectedProject(projects[1])}
          />,
          <ProjectCard 
            key="vibexpertshop"
            initials="VS" 
            category="E-COMMERCE" 
            title="VibeXpert Shop" 
            color="#ec4899" 
            onClick={() => setSelectedProject(projects[2])}
          />
        ]} />
      </div>

      {/* Details Modal Overlay */}
      {selectedProject && (
        <div className="folder-project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="folder-project-modal-card" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="modal-close-btn" onClick={() => setSelectedProject(null)} aria-label="Close modal">
              ✕
            </button>

            {/* Magic Rings Ambient Background */}
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
        .folder-project-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 4rem;
          padding-top: 15vh;
          animation: modalFadeIn 0.3s ease forwards;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .folder-project-modal-card {
          width: 90%;
          max-width: 500px;
          background: rgba(10, 10, 30, 0.9);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 20px;
          overflow-y: auto;
          position: relative;
          padding: 2rem;
          max-height: 85vh;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.15);
          animation: modalScaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .folder-project-modal-card::-webkit-scrollbar {
          width: 6px;
        }

        .folder-project-modal-card::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }

        .folder-project-modal-card::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.4);
          border-radius: 3px;
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
          color: #8A8F9C;
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
          color: #EDEFF3;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .modal-desc {
          color: #8A8F9C;
          font-size: 1rem;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .modal-section-subtitle {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 600;
          color: #EDEFF3;
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
          color: #8A8F9C;
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

        .skill-tag {
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: #EDEFF3;
          padding: 0.35rem 0.85rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .modal-action {
          margin-top: 2.5rem;
        }

        .modal-btn {
          width: 100%;
          justify-content: center;
          padding: 0.85rem;
          font-size: 0.95rem;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none;
          border-radius: 10px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        }

        @media (max-width: 768px) {
          .folder-project-modal-card {
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
    </>
  );
}
