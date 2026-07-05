import { Navbar } from '@/components/Navbar';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Education } from '@/components/Education';
import { Contact } from '@/components/Contact';
import dynamic from 'next/dynamic';

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
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
    </>
  );
}
