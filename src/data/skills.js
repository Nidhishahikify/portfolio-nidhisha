// ============================================================
// SKILLS DATA
// ============================================================

export const skillCategories = [
  {
    id: "languages",
    label: "Programming Languages",
    color: "purple",
    skills: [
      { name: "Python", icon: "🐍", level: "Intermediate" },
      { name: "Java", icon: "☕", level: "Proficient" },
      { name: "JavaScript", icon: "𝐉𝐒", level: "Intermediate" },
      { name: "Dart", icon: "🎯", level: "Proficient" },
    ],
  },
  {
    id: "web",
    label: "Web Development",
    color: "cyan",
    skills: [
      { name: "React", icon: "⚛️", level: "Proficient" },
      { name: "HTML", icon: "🌐", level: "Proficient" },
      { name: "CSS", icon: "🎨", level: "Proficient" },
      { name: "Tailwind CSS", icon: "💨", level: "Intermediate" },
      { name: "Bootstrap", icon: "🅱️", level: "Intermediate" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile Development",
    color: "violet",
    skills: [
      { name: "Flutter", icon: "📱", level: "Proficient" },
      { name: "Android Studio", icon: "🤖", level: "Intermediate" },
    ],
  },
  {
    id: "backend",
    label: "Database & Backend",
    color: "blue",
    skills: [
      { name: "Firebase", icon: "🔥", level: "Intermediate" },
      { name: "Firestore", icon: "☁️", level: "Intermediate" },
      { name: "SQL / MySQL", icon: "🗄️", level: "Proficient" },
    ],
  },
  {
    id: "testing",
    label: "Testing",
    color: "pink",
    skills: [
      { name: "Manual Testing", icon: "🧪", level: "Intermediate" },
      { name: "Functional Testing", icon: "✅", level: "Intermediate" },
      { name: "Test Case Design", icon: "📋", level: "Intermediate" },
      { name: "Bug Reporting", icon: "🐛", level: "Intermediate" },
      { name: "Automation Testing", icon: "🔄", level: "Learning" },
      { name: "Selenium", icon: "⚙️", level: "Learning" },
    ],
  },
  {
    id: "ai",
    label: "AI / Machine Learning",
    color: "amber",
    skills: [
      { name: "Machine Learning", icon: "🧠", level: "Learning" },
      { name: "Multimodal ML", icon: "🔬", level: "Learning" },
      { name: "Scikit-learn", icon: "📊", level: "Learning" },
      { name: "AI Integration", icon: "💡", level: "Learning" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    color: "emerald",
    skills: [
      { name: "Git", icon: "🌿", level: "Proficient" },
      { name: "GitHub", icon: "🐙", level: "Proficient" },
      { name: "VS Code", icon: "💻", level: "Proficient" },
    ],
  },
];

export const allSkills = skillCategories.flatMap((cat) => cat.skills);

export const levelColors = {
  Proficient: { bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/25" },
  Intermediate: { bg: "bg-blue-500/15", text: "text-blue-400", border: "border-blue-500/25" },
  Learning: { bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/25" },
};

export const categoryColors = {
  purple: { border: "border-purple-500/30", glow: "hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]", badge: "bg-purple-500/15 text-purple-300", icon: "text-purple-400", dot: "bg-purple-400" },
  cyan: { border: "border-cyan-500/30", glow: "hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]", badge: "bg-cyan-500/15 text-cyan-300", icon: "text-cyan-400", dot: "bg-cyan-400" },
  violet: { border: "border-violet-500/30", glow: "hover:shadow-[0_0_25px_rgba(139,92,246,0.2)]", badge: "bg-violet-500/15 text-violet-300", icon: "text-violet-400", dot: "bg-violet-400" },
  blue: { border: "border-blue-500/30", glow: "hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]", badge: "bg-blue-500/15 text-blue-300", icon: "text-blue-400", dot: "bg-blue-400" },
  pink: { border: "border-pink-500/30", glow: "hover:shadow-[0_0_25px_rgba(236,72,153,0.2)]", badge: "bg-pink-500/15 text-pink-300", icon: "text-pink-400", dot: "bg-pink-400" },
  amber: { border: "border-amber-500/30", glow: "hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]", badge: "bg-amber-500/15 text-amber-300", icon: "text-amber-400", dot: "bg-amber-400" },
  emerald: { border: "border-emerald-500/30", glow: "hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]", badge: "bg-emerald-500/15 text-emerald-300", icon: "text-emerald-400", dot: "bg-emerald-400" },
};
