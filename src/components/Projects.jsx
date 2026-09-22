import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { projects, projectCategories } from '../data/projects';
import { Github, ExternalLink, Star, ArrowRight, Layers } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
});

/* Gradient colours per project */
const accentMap = {
  purple: { border: 'border-purple-500/30', glow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.2)]', badge: 'bg-purple-500/15 text-purple-300 border-purple-500/25' },
  cyan: { border: 'border-cyan-500/30', glow: 'hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]', badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25' },
  violet: { border: 'border-violet-500/30', glow: 'hover:shadow-[0_0_40px_rgba(139,92,246,0.2)]', badge: 'bg-violet-500/15 text-violet-300 border-violet-500/25' },
  pink: { border: 'border-pink-500/30', glow: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.2)]', badge: 'bg-pink-500/15 text-pink-300 border-pink-500/25' },
};

function ProjectCard({ project, index, featured = false }) {
  const [hovered, setHovered] = useState(false);
  const accent = accentMap[project.accentColor] || accentMap.purple;

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] } },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`group relative glass-card border ${accent.border} ${accent.glow}
        transition-all duration-500 overflow-hidden flex flex-col
        ${featured ? 'lg:col-span-2' : ''}`}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <Star size={10} fill="currentColor" />
          Featured
        </div>
      )}

      {/* Project visual */}
      <div className={`relative overflow-hidden ${featured ? 'h-64' : 'h-48'}`}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <div className={`w-full h-full bg-gradient-to-br ${project.color} opacity-25`} />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Layers size={28} className="text-white/30" />
              </div>
              <p className="text-[10px] text-white/20 font-mono">
                Add project screenshot in public/projects/
              </p>
            </div>
          </>
        )}

        {/* Image hover overlay */}
        <motion.div
          className="absolute inset-0 project-card-overlay"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: hovered ? 0.75 : 0.45 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Category + name */}
        <div>
          <span className={`text-xs font-mono font-medium px-2.5 py-1 rounded-full border ${accent.badge} mb-3 inline-block`}>
            {project.category}
          </span>
          <h3 className="font-display font-bold text-xl text-white group-hover:text-purple-200 transition-colors duration-200">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed flex-1">
          {hovered && project.longDescription ? project.longDescription : project.description}
        </p>

        {/* Highlights (featured only) */}
        {featured && (
          <ul className="space-y-1.5">
            {project.highlights.map(h => (
              <li key={h} className="flex items-center gap-2 text-sm text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-2 border-t border-white/5">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200 font-medium"
          >
            <Github size={15} />
            Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo of ${project.title}`}
              className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium"
            >
              <ExternalLink size={15} />
              Live Demo
            </a>
          )}
          {featured && (
            <motion.div
              className="ml-auto flex items-center gap-1.5 text-purple-400 text-sm font-medium cursor-pointer"
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              Details
              <ArrowRight size={14} />
            </motion.div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05 });
  const [activeFilter, setFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={fadeUp(0)} initial="hidden" animate={inView ? 'show' : 'hidden'}
        >
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3 block">
            // projects
          </span>
          <h2 className="section-title">Things I've Built</h2>
          <p className="section-subtitle mx-auto mt-4">
            A collection of projects that showcase my skills across web, mobile, and AI development.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto mt-6" />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          variants={fadeUp(0.1)} initial="hidden" animate={inView ? 'show' : 'hidden'}
        >
          {projectCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${activeFilter === cat
                  ? 'bg-purple-500/20 text-white border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white hover:border-white/20'}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            exit={{ opacity: 0 }}
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                featured={project.featured && activeFilter === 'All'}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* GitHub CTA */}
        <motion.div
          className="text-center mt-14"
          variants={fadeUp(0.4)} initial="hidden" animate={inView ? 'show' : 'hidden'}
        >
          <p className="text-slate-400 mb-5">Want to see more of my work?</p>
          <a
            href="https://github.com/Nidhishahikify"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex"
          >
            <Github size={17} />
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
