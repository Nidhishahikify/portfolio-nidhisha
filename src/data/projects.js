// ============================================================
// PROJECTS DATA
// ============================================================

export const projects = [
  {
    id: 1,
    title: "Multimodal Depression Detection",
    featured: true,
    description:
      "A machine learning system that processes both image and audio inputs to identify depression-related patterns — with a strong focus on model validation, edge case testing, and pipeline robustness.",
    longDescription:
      "Developed using Python and ML libraries. Validated preprocessing pipelines, feature extraction from images and audio, and multimodal fusion across varied input conditions. Applied systematic test scenarios to ensure classification reliability.",
    tech: ["Python", "Machine Learning", "Audio Processing", "Image Processing", "Scikit-learn"],
    category: "AI / ML",
    image: null,
    githubUrl: "https://github.com/Nidhishahikify/multimodal-depression-detection",
    liveUrl: null,
    color: "from-purple-600 to-violet-700",
    accentColor: "purple",
    highlights: [
      "Multimodal image + audio pipeline testing",
      "Edge case & boundary condition validation",
      "ML model accuracy verification",
      "Systematic input condition test scenarios",
    ],
  },
  {
    id: 2,
    title: "Skill Connect",
    featured: false,
    description:
      "A service-booking mobile app built with Flutter and Firebase — tested end-to-end for functional correctness, auth flows, Firestore sync, and AI feedback summarizer output quality.",
    longDescription:
      "Built with Flutter and Firebase. Performed functional, integration, and UI testing across booking workflows, authentication, and real-time Firestore data sync. Validated AI feedback summarizer outputs for accuracy and consistency.",
    tech: ["Flutter", "Dart", "Firebase", "Firestore", "AI Integration"],
    category: "Mobile",
    image: null,
    githubUrl: "https://github.com/Nidhishahikify/skillconnect",
    liveUrl: "https://skillhubz-83837.web.app",
    color: "from-cyan-600 to-blue-700",
    accentColor: "cyan",
    highlights: [
      "End-to-end functional testing",
      "Firebase Auth & Firestore flow validation",
      "AI summarizer output quality checks",
      "Cross-platform UI test coverage",
    ],
  },
  {
    id: 3,
    title: "SmartTrafficAI",
    featured: true,
    description:
      "An AI-powered Smart Traffic Prediction and Congestion Analysis System — built and tested with React, FastAPI, Python, and ML to deliver reliable real-time traffic insights.",
    longDescription:
      "Built with React, FastAPI, Python, and Scikit-learn. Validated ML prediction accuracy, API endpoint correctness via Postman, and frontend data visualisation integrity. Features congestion prediction, hotspot mapping, GPS monitoring backed by the IEEE DataPort Urban Traffic Dataset.",
    tech: ["React", "FastAPI", "Python", "Scikit-learn", "Tailwind CSS", "Chart.js", "Axios"],
    category: "AI / ML",
    image: null,
    githubUrl: "https://github.com/Nidhishahikify/SmartTrafficAI",
    liveUrl: "https://smart-traffic-ai-sigma.vercel.app",
    color: "from-emerald-600 to-teal-700",
    accentColor: "emerald",
    highlights: [
      "API endpoint testing with Postman",
      "ML prediction accuracy validation",
      "Frontend data integrity checks",
      "FastAPI backend + React frontend",
    ],
  },

];

export const projectCategories = ["All", "AI / ML", "Mobile", "Web"];
