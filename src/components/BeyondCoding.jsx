import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  { src: '/i1.jpeg', alt: 'Photography 1' },
  { src: '/i2.jpeg', alt: 'Photography 2' },
  { src: '/i3.jpeg', alt: 'Photography 3' },
  { src: '/i4.jpeg', alt: 'Photography 4' },
  { src: '/i5.jpeg', alt: 'Photography 5' },
  { src: '/i6.jpeg', alt: 'Photography 6' },
  { src: '/i7.jpeg', alt: 'Photography 7' },
  { src: '/i8.jpeg', alt: 'Photography 8' },
  { src: '/i9.jpeg', alt: 'Photography 9' },
  { src: '/i10.jpeg', alt: 'Photography 10' },
  { src: '/i11.jpeg', alt: 'Photography 11' },


];

function Lightbox({ index, onClose, onPrev, onNext }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close */}
        <button
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        {/* Prev */}
        <button
          className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Image */}
        <motion.img
          key={index}
          src={photos[index].src}
          alt={photos[index].alt}
          className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        />

        {/* Next */}
        <button
          className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <ChevronRight size={20} />
        </button>

        {/* Counter */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {photos.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-cyan-400 scale-125' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function BeyondCoding() {
  const [ref, inView] = useInView({ threshold: 0.05 });
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
  const nextPhoto = () => setLightboxIndex((i) => (i + 1) % photos.length);

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-purple-600/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3 block">
            // beyond the code
          </span>
          <h2 className="section-title">More About Me</h2>
          <p className="section-subtitle mx-auto mt-4">
            Outside of building apps, I love capturing the world through my camera.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto mt-6" />
        </motion.div>

        {/* Photography card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card border border-cyan-500/20 p-6 sm:p-8"
        >
          {/* Title row */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-3xl shrink-0">
              📸
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Photography</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-xs font-mono text-cyan-400">Interest</span>
              </div>
            </div>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            I shoot my own photographs — capturing moments, landscapes, and everyday details through my lens. Photography is my creative escape from screens.
          </p>

          {/* Photo grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map(({ src, alt }, i) => (
              <div
                key={src}
                className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square border border-white/5"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-mono bg-black/50 px-2 py-1 rounded-md">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </section>
  );
}
