import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Send, Github, Linkedin, Mail, MapPin, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
});

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    handle: '@Nidhishahikify',
    href: 'https://github.com/Nidhishahikify',
    color: 'hover:text-white',
    bg: 'hover:bg-white/10 hover:border-white/20',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    handle: 'nidhisha-n-899266294',
    href: 'https://linkedin.com/in/nidhisha-n-899266294',
    color: 'hover:text-blue-400',
    bg: 'hover:bg-blue-500/10 hover:border-blue-500/25',
  },
  {
    icon: Mail,
    label: 'Email',
    handle: 'shreejithesh@gmail.com',
    href: 'mailto:shreejithesh@gmail.com',
    color: 'hover:text-purple-400',
    bg: 'hover:bg-purple-500/10 hover:border-purple-500/25',
  },
];

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const formRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required.';
    if (!formData.email.trim()) errs.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Enter a valid email.';
    if (!formData.message.trim()) errs.message = 'Message is required.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'a2b8c05c-6546-4aa3-bf25-92ccbe8abc18', // ← replace with your key from web3forms.com
          subject: `Portfolio contact from ${formData.name}`,
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
          replyto: formData.email,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-purple-600/8 blur-3xl pointer-events-none" />

      <div ref={ref} className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp(0)} initial="hidden" animate={inView ? 'show' : 'hidden'}
        >
          <span className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-3 block">
            // contact
          </span>
          <h2 className="section-title">Let's Connect</h2>
          <p className="section-subtitle mx-auto mt-4">
            Looking for SDET roles, internships, or just want to talk test engineering? Reach out.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* ── Left: Info panel ── */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={fadeUp(0.15)} initial="hidden" animate={inView ? 'show' : 'hidden'}
          >
            {/* Intro */}
            <div className="glass-card border border-purple-500/20 p-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                <MessageSquare size={22} className="text-purple-400" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">Get In Touch</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                I'm currently looking for SDET internships and test engineering roles.
                If you have an opportunity or just want to connect, my inbox is always open.
              </p>
              <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
                <MapPin size={14} className="text-purple-400" />
                Belthangady, Karnataka
              </div>
            </div>

            {/* Social links */}
            <div className="space-y-3">
              {socialLinks.map(({ icon: Icon, label, handle, href, color, bg }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 glass-card border border-white/10 p-4 transition-all duration-200 ${bg} group`}
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                    <Icon size={16} className={`text-slate-400 group-hover:text-current transition-colors ${color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-mono">{label}</p>
                    <p className="text-sm text-white font-medium">{handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeUp(0.25)} initial="hidden" animate={inView ? 'show' : 'hidden'}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="glass-card border border-white/10 p-8 space-y-5"
            >
              <h3 className="font-display font-bold text-xl text-white mb-2">Send a Message</h3>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nidhisha N."
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-slate-500
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 text-sm
                    ${errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'}`}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-slate-500
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 text-sm
                    ${errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'}`}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Nidhisha, I'd love to collaborate on..."
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-slate-500
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 text-sm resize-none
                    ${errors.message ? 'border-red-500/50' : 'border-white/10 focus:border-purple-500/50'}`}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === 'sending' ? (
                  <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Sending...</>
                ) : status === 'success' ? (
                  <><CheckCircle2 size={16} /> Message Sent!</>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </motion.button>

              {status === 'success' && (
                <motion.p
                  className="text-sm text-emerald-400 text-center flex items-center justify-center gap-1.5"
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle2 size={14} />
                  Thanks! I'll get back to you soon.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  className="text-sm text-red-400 text-center flex items-center justify-center gap-1.5"
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} />
                  Something went wrong. Please try again.
                </motion.p>
              )}            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
