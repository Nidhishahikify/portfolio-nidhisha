import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { certificates } from '../data/experience';
import { Award, Calendar, ExternalLink, Hash, ShieldCheck } from 'lucide-react';

const colorMap = {
  purple: {
    border: 'border-purple-500/25',
    badge: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    icon: 'text-purple-400',
    bg: 'bg-purple-500/8',
    glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.18)]',
    top: 'via-purple-500',
  },
  cyan: {
    border: 'border-cyan-500/25',
    badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    icon: 'text-cyan-400',
    bg: 'bg-cyan-500/8',
    glow: 'hover:shadow-[0_0_30px_rgba(34,211,238,0.18)]',
    top: 'via-cyan-500',
  },
  violet: {
    border: 'border-violet-500/25',
    badge: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    icon: 'text-violet-400',
    bg: 'bg-violet-500/8',
    glow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.18)]',
    top: 'via-violet-500',
  },
  blue: {
    border: 'border-blue-500/25',
    badge: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    icon: 'text-blue-400',
    bg: 'bg-blue-500/8',
    glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]',
    top: 'via-blue-500',
  },
};

/* Detect if a cert is a real one or an empty placeholder */
const isPlaceholder = (cert) =>
  cert.title === 'Add Certificate Here' || cert.viewUrl === '#';

function CertificateCard({ cert, index, inView }) {
  const c = colorMap[cert.color] || colorMap.purple;
  const ph = isPlaceholder(cert);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`group glass-card border ${c.border} ${c.glow}
        transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden
        ${ph ? 'opacity-50 hover:opacity-70' : ''}`}
    >
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent ${c.top}/60 to-transparent`} />

      {/* Image / visual area */}
      <div className="relative h-44 overflow-hidden">
        {cert.image ? (
          /* Real certificate image */
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Decorative placeholder */
          <div className={`w-full h-full ${c.bg} flex flex-col items-center justify-center gap-3`}>
            <div className={`w-14 h-14 rounded-2xl bg-white/5 border ${c.border} flex items-center justify-center`}>
              <Award size={28} className={`${c.icon} opacity-50`} />
            </div>
            {ph && (
              <p className="text-[10px] text-slate-600 font-mono text-center px-4">
                Add image to public/certificates/
              </p>
            )}
          </div>
        )}

        {/* Shimmer on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 shimmer" />
        </div>

        {/* Verified badge — real certs only */}
        {!ph && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-[10px] font-medium">
            <ShieldCheck size={10} />
            Verified
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-2.5">
        <div>
          <h3 className="font-display font-bold text-white text-sm leading-snug group-hover:text-purple-200 transition-colors duration-200">
            {ph ? 'Your Certificate Title' : cert.title}
          </h3>
          <p className={`text-xs font-semibold mt-1 ${c.icon}`}>
            {ph ? 'Issuing Organisation' : cert.issuer}
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <Calendar size={10} />
            {ph ? 'Month Year' : cert.date}
          </span>
          {cert.credentialId && (
            <span className="flex items-center gap-1">
              <Hash size={10} />
              {cert.credentialId}
            </span>
          )}
        </div>

        {/* View / placeholder CTA */}
        <div className="mt-auto pt-3 border-t border-white/5">
          {ph ? (
            <span className="text-[11px] text-slate-600 font-mono italic">
              Edit src/data/experience.js to add
            </span>
          ) : (
            <a
              href={cert.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-xs font-semibold ${c.icon} hover:opacity-75 transition-opacity`}
            >
              <ExternalLink size={11} />
              View Certificate
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Certificates() {
  const [ref, inView] = useInView({ threshold: 0.05 });

  return (
    <section id="certificates" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-amber-400 font-mono text-sm tracking-widest uppercase mb-3 block">
            // certifications
          </span>
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle mx-auto mt-4">
            Credentials that reflect my commitment to continuous learning and hands-on skill building.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-purple-500 rounded-full mx-auto mt-6" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certificates.map((cert, i) => (
            <CertificateCard key={cert.id} cert={cert} index={i} inView={inView} />
          ))}
        </div>

        {/* How-to add images note — discreet, at the bottom */}
        <motion.p
          className="text-center text-[11px] text-slate-700 mt-10 font-mono"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
        >
          To add certificate images: place files in <span className="text-slate-500">public/certificates/</span> and update <span className="text-slate-500">src/data/experience.js</span>
        </motion.p>
      </div>
    </section>
  );
}
