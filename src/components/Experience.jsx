import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { experiences } from '../data/experience';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const colorMap = {
  purple: {
    dot: 'bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]',
    border: 'border-purple-500/25',
    badge: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    bullet: 'text-purple-400',
    line: 'from-purple-500/50',
  },
  cyan: {
    dot: 'bg-cyan-500 shadow-[0_0_12px_rgba(34,211,238,0.6)]',
    border: 'border-cyan-500/25',
    badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    bullet: 'text-cyan-400',
    line: 'from-cyan-500/50',
  },
  violet: {
    dot: 'bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.6)]',
    border: 'border-violet-500/25',
    badge: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    bullet: 'text-violet-400',
    line: 'from-violet-500/50',
  },
  emerald: {
    dot: 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]',
    border: 'border-emerald-500/25',
    badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    bullet: 'text-emerald-400',
    line: 'from-emerald-500/50',
  },
};

// Human-readable type labels
const typeLabels = {
  internship: 'Internship',
  ambassador: 'Ambassador',
  achievement: 'Achievement',
  volunteering: 'Volunteer',
  experience: 'Experience',
};

function TimelineItem({ exp, index, inView, isLast }) {
  const c = colorMap[exp.color] || colorMap.purple;

  return (
    <motion.div
      className="relative flex gap-6 md:gap-10"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.7, delay: index * 0.15 + 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Timeline spine ── */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-4 h-4 rounded-full ${c.dot} z-10 mt-1.5 shrink-0`} />
        {!isLast && (
          <motion.div
            className={`w-px flex-1 mt-2 bg-gradient-to-b ${c.line} via-purple-500/20 to-transparent min-h-[60px]`}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
          />
        )}
      </div>

      {/* ── Content card ── */}
      <div className={`flex-1 glass-card border ${c.border} p-6 mb-8 hover:-translate-y-1 transition-transform duration-300`}>
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl">{exp.icon}</span>
              <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${c.badge} capitalize`}>
                {typeLabels[exp.type] || exp.type}
              </span>
            </div>
            <h3 className="font-display font-bold text-xl text-white">{exp.title}</h3>
            <p className={`font-medium text-sm mt-0.5`} style={{ color: 'var(--tw-color)' }}>
              <span className="text-slate-300">{exp.organisation}</span>
            </p>
          </div>

          <div className="flex flex-col items-end gap-1 text-right shrink-0">
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <Calendar size={12} />
              {exp.period}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin size={12} />
              {exp.location}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{exp.description}</p>

        {/* Bullet points */}
        <ul className="space-y-2">
          {exp.bullets.map((b, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-2.5 text-sm text-slate-400"
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: index * 0.15 + i * 0.07 + 0.5 }}
            >
              <CheckCircle2 size={14} className={`${c.bullet} shrink-0 mt-0.5`} />
              {b}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <section id="experience" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div ref={ref} className="relative max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-3 block">
            // experience
          </span>
          <h2 className="section-title">My Journey</h2>
          <p className="section-subtitle mx-auto mt-4">
            Internships, ambassador roles, achievements, and volunteering that have shaped my growth.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mx-auto mt-6" />
        </motion.div>

        {/* Timeline */}
        <div className="pl-2">
          {experiences.map((exp, i) => (
            <TimelineItem
              key={exp.id}
              exp={exp}
              index={i}
              inView={inView}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
