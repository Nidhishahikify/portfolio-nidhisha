import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code2, Heart, ArrowUp } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/Nidhishahikify', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/nidhisha-n-899266294', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:shreejithesh@gmail.com', label: 'Email' },
];

function scrollTo(href) {
  const id = href.slice(1);
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      {/* Background mesh */}
      <div className="absolute inset-0 bg-[#030712]" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full bg-purple-600/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-14 grid md:grid-cols-3 gap-10 lg:gap-16">

          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-glow-purple">
                <Code2 size={17} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Nidhisha<span className="text-purple-400"> N.</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Computer Science Engineering Student passionate about software quality assurance, manual & automation testing, and building reliable digital products.
            </p>
            <div className="flex gap-3 pt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-slate-500 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-5 tracking-wide">Navigation</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navLinks.map(link => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-slate-500 hover:text-purple-300 transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Let's connect column */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-5 tracking-wide">Let's Connect</h4>
            <div className="space-y-3 text-sm text-slate-500">
              <p className="flex items-center gap-2">
                <Mail size={13} className="text-purple-400 shrink-0" />
                shreejithesh@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <Github size={13} className="text-purple-400 shrink-0" />
                github.com/Nidhishahikify
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => scrollTo('#contact')}
                className="btn-primary text-sm py-2.5 px-5"
              >
                Hire Me
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs flex items-center gap-1.5">
            © {new Date().getFullYear()} Nidhisha N. · Designed & Built with
            <Heart size={11} className="text-pink-500 fill-pink-500 mx-0.5" />
            and passion.
          </p>
          <p className="text-slate-700 text-xs font-mono">
            React · Vite · Tailwind · Framer Motion
          </p>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        onClick={scrollTop}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 hover:bg-purple-500/30 hover:text-white transition-all duration-200 shadow-glow-purple"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowUp size={17} />
      </motion.button>
    </footer>
  );
}
