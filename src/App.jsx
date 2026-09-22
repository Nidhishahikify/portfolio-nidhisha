import { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import BeyondCoding from './components/BeyondCoding';
import Contact from './components/Contact';
import Footer from './components/Footer';

/* ── Subtle cursor glow that follows the mouse ── */
function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const onMove = (e) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return <div ref={glowRef} className="cursor-glow hidden lg:block" aria-hidden="true" />;
}

export default function App() {
  return (
    <div className="relative bg-[#050508] text-slate-100 min-h-screen overflow-x-hidden">
      {/* Cursor glow — desktop only */}
      <CursorGlow />

      {/* Fixed navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <BeyondCoding />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
