import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Sparkles, GraduationCap, Code2, Brain, ArrowRight } from 'lucide-react';

const stats = [
  { value: '8.93', label: 'CGPA', icon: GraduationCap, color: 'purple' },
  { value: '3+', label: 'Projects', icon: Code2, color: 'cyan' },
  { value: 'CSE', label: 'Student', icon: Sparkles, color: 'violet' },
  { value: 'AI', label: 'Enthusiast', icon: Brain, color: 'pink' },
];

const colorMap = {
  purple: { icon: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', glow: 'group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]' },
  cyan: { icon: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', glow: 'group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]' },
  violet: { icon: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', glow: 'group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]' },
  pink: { icon: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20', glow: 'group-hover:shadow-[0_0_20px_rgba(236,72,153,0.2)]' },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
});

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section id="about" className="relative section-padding overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp(0)} initial="hidden" animate={inView ? 'show' : 'hidden'}
        >
          <span className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-3 block">
            // about me
          </span>
          <h2 className="section-title">Who I Am</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mx-auto mt-4" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Profile image card ── */}
          <motion.div
            className="relative"
            variants={fadeUp(0.1)} initial="hidden" animate={inView ? 'show' : 'hidden'}
          >
            <div className="relative mx-auto max-w-sm">
              {/* Decorative frame */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-purple-500/10 to-cyan-500/5 blur-xl" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/3 aspect-[4/5] shadow-card">
                {/* ↓ Profile photo */}
                <img src="/profile.jpeg" alt="Nidhisha N." className="w-full h-full object-cover object-top" />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent" />

                {/* Name badge at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-display font-bold text-xl text-white">Nidhisha N.</p>
                  <p className="text-purple-300 text-sm">CSE Student · SDET Aspirant</p>
                </div>
              </div>

              {/* Floating dots decoration */}
              <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-purple-500 blur-sm opacity-60" />
              <div className="absolute -bottom-3 -left-3 w-4 h-4 rounded-full bg-cyan-500 blur-sm opacity-60" />
            </div>
          </motion.div>

          {/* ── Right: Bio + stats ── */}
          <div className="space-y-8">
            <motion.div
              variants={fadeUp(0.2)} initial="hidden" animate={inView ? 'show' : 'hidden'}
            >
              <h3 className="font-display font-bold text-3xl text-white mb-5">
                Aspiring{' '}
                <span className="gradient-text">SDET Engineer</span>
              </h3>
              <div className="space-y-4 text-slate-400 leading-relaxed text-[15px]">
                <p>
                  I'm a Computer Science Engineering student at Vivekananda College of Engineering and Technology, Puttur,
                  with a strong academic record (CGPA 8.93) and a focused interest in{' '}
                  <span className="text-white">Software Development Engineer in Test (SDET)</span> — where coding meets quality.
                </p>
                <p>
                  I bridge development and testing — writing <span className="text-white">automated test scripts, designing test frameworks,</span> and performing functional validation to ship software that actually works. My goal is to build the tools that catch bugs before users do.
                </p>
                <p>
                  Currently interning at <span className="text-purple-300 font-medium">Akanksha Charitable Trust</span> performing component-level testing on a Flutter app, and serving as a <span className="text-purple-300 font-medium">Google Student Ambassador</span> on campus.
                </p>
              </div>
            </motion.div>

            {/* Quick-links */}
            <motion.div
              variants={fadeUp(0.3)} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="flex flex-wrap gap-3"
            >
              {['Test Automation', 'Selenium', 'Manual Testing', 'CI/CD', 'Python', 'Java'].map(tag => (
                <span key={tag} className="tech-badge">{tag}</span>
              ))}
            </motion.div>

            {/* Stats grid */}
            <motion.div
              variants={fadeUp(0.35)} initial="hidden" animate={inView ? 'show' : 'hidden'}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {stats.map(({ value, label, icon: Icon, color }) => {
                const c = colorMap[color];
                return (
                  <div
                    key={label}
                    className={`group glass-card p-4 text-center transition-all duration-300 hover:-translate-y-1 border ${c.border} ${c.glow}`}
                  >
                    <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center mx-auto mb-2`}>
                      <Icon size={17} className={c.icon} />
                    </div>
                    <p className={`font-display font-black text-xl ${c.icon}`}>{value}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{label}</p>
                  </div>
                );
              })}
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeUp(0.4)} initial="hidden" animate={inView ? 'show' : 'hidden'}
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                View My Projects
                <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
