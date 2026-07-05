import { Navbar } from '@/components/Navbar';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Education } from '@/components/Education';
import { Contact } from '@/components/Contact';
import CurvedLoop from '@/components/ui/CurvedLoop';
import ScrollVelocity from '@/components/ui/ScrollVelocity';
import dynamic from 'next/dynamic';
import FolderProjects from '@/components/FolderProjects';

// Load the Three.js hero only on client side (no SSR)
const HeroSection = dynamic(
  () => import('@/components/ui/horizon-hero-section').then((m) => m.Component),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── Three.js Cosmic Hero ─────────────────────────── */}
      <HeroSection />

      {/* ── Portfolio Content ────────────────────────────── */}
      <main id="portfolio-content">
        <About />
        <CurvedLoop 
          marqueeText="CREATIVE DEVELOPER ✦ FRONT-END ARCHITECT ✦ PROBLEM SOLVER ✦ SHAPING INTUITIVE EXPERIENCE ✦ "
          speed={1.6}
          curveAmount={140}
          direction="left"
          interactive={true}
        />
        <Skills />
        <Projects />
        <FolderProjects />
        <Experience />
        <Education />
        <ScrollVelocity 
          texts={[
            <span className="velocity-text-indigo" key="1">PASSIONATE TO CREATE ✦ SHIP EXCELLENT CODE ✦ NEXT-GEN WEB APPS ✦</span>,
            <span className="velocity-text-purple" key="2">ALWAYS BUILDING ✦ CONSTANTLY LEARNING ✦ SOLVING COMPLEX PROBLEMS ✦</span>
          ]}
          velocity={60}
        />
        <Contact />
      </main>
    </>
  );
}
