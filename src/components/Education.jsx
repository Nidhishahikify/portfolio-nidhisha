import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { education } from '../data/experience';
import { GraduationCap, Calendar, Award, CheckCircle2, BookOpen } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
});

const colorMap = {
  purple: {
    border: 'border-purple-500/25',
    icon: 'text-purple-400',
    bg: 'bg-purple-500/10',
    award: 'bg-purple-500/10 border-purple-500/20',
    dot: 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]',
    line: 'from-purple-500/50',
  },
  cyan: {
    border: 'border-cyan-500/25',
    icon: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    award: 'bg-cyan-500/10 border-cyan-500/20',
    dot: 'bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.6)]',
    line: 'from-cyan-500/50',
  },
  violet: {
    border: 'border-violet-500/25',
    icon: 'text-violet-400',
    bg: 'bg-violet-500/10',
    award: 'bg-violet-500/10 border-violet-500/20',
    dot: 'bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.6)]',
    line: 'from-violet-500/50',
  },
};

export default function Education() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="education" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div ref={ref} className="relative max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp(0)} initial="hidden" animate={inView ? 'show' : 'hidden'}
        >
          <span className="text-violet-400 font-mono text-sm tracking-widest uppercase mb-3 block">
            // education
          </span>
          <h2 className="section-title">Academic Background</h2>
          <p className="section-subtitle mx-auto mt-4">
            A strong academic foundation across school, pre-university, and engineering levels.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto mt-6" />
        </motion.div>

        {/* Timeline */}
        <div className="pl-2">
          {education.map((edu, i) => {
            const c = colorMap[edu.color] || colorMap.purple;
            const isLast = i === education.length - 1;
            const isBE = i === 0;

            return (
              <motion.div
                key={edu.id}
                className="relative flex gap-6 md:gap-10"
                variants={fadeUp(i * 0.15 + 0.1)}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
              >
                {/* Spine */}
                <div className="flex flex-col items-center shrink-0">
                  <div className={`w-4 h-4 rounded-full ${c.dot} z-10 mt-2 shrink-0`} />
                  {!isLast && (
                    <motion.div
                      className={`w-px flex-1 mt-2 bg-gradient-to-b ${c.line} via-purple-500/20 to-transparent min-h-[60px]`}
                      initial={{ scaleY: 0, originY: 0 }}
                      animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 0.8, delay: i * 0.15 + 0.5 }}
                    />
                  )}
                </div>

                {/* Card */}
                <div className={`flex-1 glass-card border ${c.border} p-6 mb-8
                  hover:border-opacity-60 transition-all duration-300
                  ${isBE ? 'hover:shadow-[0_0_40px_rgba(168,85,247,0.1)]' : ''}`}>

                  {/* Top accent */}
                  {isBE && (
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
                  )}

                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-11 h-11 rounded-xl ${c.bg} border ${c.award} flex items-center justify-center shrink-0`}>
                        {isBE
                          ? <GraduationCap size={20} className={c.icon} />
                          : <BookOpen size={18} className={c.icon} />
                        }
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-white leading-tight">
                          {edu.degree}
                        </h3>
                        <p className={`font-semibold text-sm mt-0.5 ${c.icon}`}>{edu.field}</p>
                        <p className="text-slate-400 text-xs mt-1 leading-snug">{edu.institution}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                      <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar size={12} />
                        {edu.period}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${edu.status === 'Ongoing'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'}`}>
                        {edu.status}
                      </span>
                    </div>
                  </div>

                  {/* CGPA / Percentage highlight */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex items-center gap-3 glass-card px-4 py-2.5 border ${c.award}`}>
                      <Award size={16} className={c.icon} />
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                          {edu.cgpa.includes('%') ? 'Percentile' : 'CGPA'}
                        </p>
                        <p className={`font-display font-black text-lg ${c.icon}`}>{edu.cgpa}</p>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  {edu.highlights.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-2">
                      {edu.highlights.map((h, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-slate-400"
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ delay: idx * 0.07 + i * 0.15 + 0.5 }}
                        >
                          <CheckCircle2 size={13} className={`${c.icon} shrink-0`} />
                          {h}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
