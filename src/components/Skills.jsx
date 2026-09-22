import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { skillCategories, categoryColors, levelColors } from '../data/skills';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } },
});

const cardVariant = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  show:   { opacity: 1, scale: 1,    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function SkillCard({ skill, color, index }) {
  const c = categoryColors[color] || categoryColors.purple;
  const l = levelColors[skill.level] || levelColors.Learning;

  return (
    <motion.div
      variants={cardVariant}
      custom={index}
      whileHover={{ y: -4, scale: 1.03 }}
      className={`skill-card group relative glass-card p-4 flex flex-col items-center gap-3 cursor-default
        border ${c.border} transition-all duration-300 ${c.glow}`}
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl ${c.badge.replace('text-', 'bg-').replace('300', '500/15')} 
        flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110`}>
        {skill.icon}
      </div>

      {/* Name */}
      <p className="font-display font-semibold text-white text-sm text-center leading-tight">
        {skill.name}
      </p>

      {/* Level badge */}
      <span className={`text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full border
        ${l.bg} ${l.text} ${l.border}`}>
        {skill.level}
      </span>

      {/* Shimmer line on hover */}
      <div className="absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300
        bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />
    </motion.div>
  );
}

function CategorySection({ category, inView, sectionDelay }) {
  const c = categoryColors[category.color] || categoryColors.purple;

  return (
    <motion.div
      variants={fadeUp(sectionDelay)}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className="mb-12"
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-3 h-3 rounded-full ${c.dot}`} />
        <h3 className="font-display font-semibold text-lg text-white">{category.label}</h3>
        <div className="flex-1 h-px bg-white/5" />
        <span className={`text-xs font-mono px-2.5 py-1 rounded-full ${c.badge}`}>
          {category.skills.length} skills
        </span>
      </div>

      {/* Skills grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
        variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: sectionDelay + 0.1 } } }}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {category.skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} color={category.color} index={i} />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <section id="skills" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp(0)} initial="hidden" animate={inView ? 'show' : 'hidden'}
        >
          <span className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-3 block">
            // technical skills
          </span>
          <h2 className="section-title">My Tech Stack</h2>
          <p className="section-subtitle mx-auto mt-4">
            Technologies I work with to build full-stack, mobile, and AI-powered solutions.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mx-auto mt-6" />
        </motion.div>

        {/* Legend */}
        <motion.div
          className="flex flex-wrap items-center gap-4 justify-center mb-12"
          variants={fadeUp(0.1)} initial="hidden" animate={inView ? 'show' : 'hidden'}
        >
          {Object.entries(levelColors).map(([level, styles]) => (
            <span key={level} className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border ${styles.bg} ${styles.text} ${styles.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${styles.bg.replace('/15', '')}`} />
              {level}
            </span>
          ))}
        </motion.div>

        {/* Categories */}
        {skillCategories.map((cat, i) => (
          <CategorySection
            key={cat.id}
            category={cat}
            inView={inView}
            sectionDelay={i * 0.08 + 0.15}
          />
        ))}
      </div>
    </section>
  );
}
