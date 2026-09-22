import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Github, Linkedin, Sparkles } from 'lucide-react';

/* ── Typewriter hook ── */
function useTypewriter(words, speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

/* ── Particle canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Spawn particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        hue: Math.random() > 0.5 ? 270 : 190, // purple or cyan
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="particles-canvas" />;
}

/* ── Floating shape ── */
function FloatingOrb({ className, size = 300, color = 'purple', delay = 0 }) {
  const colors = {
    purple: 'bg-purple-600',
    cyan: 'bg-cyan-500',
    violet: 'bg-violet-600',
  };
  return (
    <motion.div
      className={`absolute rounded-full blur-[80px] opacity-15 pointer-events-none ${colors[color]} ${className}`}
      style={{ width: size, height: size }}
      animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

const typeWords = [
  'SDET',
  'Manual Tester',
  'Automation Tester',
  'Test Engineer',
  'AI/ML Enthusiast',
];

export default function Hero() {
  const typed = useTypewriter(typeWords, 75, 2000);

  const scrollToWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  /* stagger variants */
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-mesh"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Glow orbs */}
      <FloatingOrb className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" size={500} color="purple" delay={0} />
      <FloatingOrb className="bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2" size={400} color="cyan" delay={2} />
      <FloatingOrb className="top-3/4 left-1/2 -translate-x-1/2" size={300} color="violet" delay={4} />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-28 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        {/* ── Left text column ── */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Status badge */}
          <motion.div variants={item} className="inline-flex items-center gap-2 mb-6">
            <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to SDET opportunities
              <Sparkles size={13} />
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={item} className="font-display font-black text-5xl sm:text-6xl md:text-7xl xl:text-8xl leading-none text-white mb-4">
            Hi, I'm{' '}
            <span className="gradient-text text-glow-purple block sm:inline">
              Nidhisha N.
            </span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div variants={item} className="text-2xl sm:text-3xl font-display font-semibold text-slate-300 mb-6 h-10">
            <span className="text-purple-400">&lt;</span>
            <span className="typewriter-cursor">{typed}</span>
            <span className="text-purple-400"> /&gt;</span>
          </motion.div>

          {/* Subtitle */}
          <motion.p variants={item} className="text-slate-400 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            Computer Science Engineering Student with a passion for{' '}
            <span className="text-white font-medium">software development and test engineering</span>{' '}
            — writing automated tests, building test frameworks, and ensuring quality at every layer of the stack.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4 justify-center lg:justify-start mb-12">
            <motion.button
              onClick={scrollToWork}
              className="btn-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              View My Work
              <ArrowDown size={16} />
            </motion.button>

            <motion.button
              onClick={scrollToContact}
              className="btn-outline"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Mail size={16} />
              Contact Me
            </motion.button>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center gap-4 justify-center lg:justify-start">
            <span className="text-slate-500 text-sm">Find me on</span>
            <div className="flex gap-3">
              {/* ── Replace href values with your actual profiles ── */}
              <a
                href="https://github.com/Nidhishahikify"
                target="_blank" rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-200"
              >
                <Github size={17} />
              </a>
              <a
                href="https://linkedin.com/in/nidhisha-n-899266294"
                target="_blank" rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-200"
              >
                <Linkedin size={17} />
              </a>
              <a
                href="mailto:shreejithesh@gmail.com"
                aria-label="Email"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-200"
              >
                <Mail size={17} />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right — Profile image ── */}
        <motion.div
          className="flex-shrink-0 relative"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-[-20px] rounded-full border border-dashed border-purple-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-[-40px] rounded-full border border-dashed border-violet-500/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          />

          {/* Glow behind image */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/40 to-cyan-500/20 blur-2xl scale-110" />

          {/* Profile image container */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden border-2 border-purple-500/30 shadow-[0_0_60px_rgba(168,85,247,0.3)]">
            {/*
              ── HOW TO ADD YOUR PHOTO ─────────────────────────────────
              1. Copy your photo into the  public/  folder and name it  profile.jpg
              2. Delete the placeholder <div> below
              3. Uncomment the <img> tag
              ─────────────────────────────────────────────────────────
            */}

            <img src="/profile.jpeg" alt="Nidhisha N." className="w-full h-full object-cover object-top" />
          </div>

          {/* Floating badge — CGPA */}
          <motion.div
            className="absolute -bottom-4 -left-8 glass-card px-4 py-2.5 shadow-card"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="text-xs text-slate-400">CGPA</p>
            <p className="font-display font-bold text-xl text-white">8.93</p>
          </motion.div>

          {/* Floating badge — CSE */}
          <motion.div
            className="absolute -top-4 -right-8 glass-card px-4 py-2.5 shadow-card"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <p className="text-xs text-slate-400">Degree</p>
            <p className="font-display font-bold text-sm text-white">CSE '27</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        onClick={scrollToWork}
      >
        <span className="text-slate-500 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-purple-500 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
