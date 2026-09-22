// ============================================================
// PROJECTS DATA
// ============================================================

export const projects = [
  {
    id: 1,
    title: "Multimodal Depression Detection",
    featured: true,
    description:
      "A machine learning system that processes both image and audio inputs to identify potential depression-related patterns using multimodal feature extraction and classification.",
    longDescription:
      "Developed using Python and ML libraries, this system validates preprocessing pipelines, feature extraction from images and audio, and multimodal fusion before running classification models. Tested across varied input conditions for robustness.",
    tech: ["Python", "Machine Learning", "Audio Processing", "Image Processing", "Scikit-learn"],
    category: "AI / ML",
    image: null, // ← add screenshot: '/projects/depression-detection.jpg'
    githubUrl: "https://github.com/Nidhishahikify/multimodal-depression-detection",
    liveUrl: null,
    color: "from-purple-600 to-violet-700",
    accentColor: "purple",
    highlights: [
      "Multimodal image + audio input processing",
      "Feature extraction & fusion pipeline",
      "ML classification model",
      "Validated across multiple input conditions",
    ],
  },
  {
    id: 2,
    title: "Skill Connect",
    featured: false,
    description:
      "A service-booking mobile application connecting skilled professionals with users seeking on-demand services, featuring Firebase authentication, Firestore data management, and an AI-powered feedback summarizer.",
    longDescription:
      "Built with Flutter and Firebase, Skill Connect handles real-time data sync through Firestore and secure authentication. An integrated AI feedback summarizer generates concise insights from service-provider reviews.",
    tech: ["Flutter", "Dart", "Firebase", "Firestore", "AI Integration"],
    category: "Mobile",
    image: null,
    githubUrl: "https://github.com/Nidhishahikify/skillconnect",
    liveUrl: "https://skillhubz-83837.web.app",
    color: "from-cyan-600 to-blue-700",
    accentColor: "cyan",
    highlights: [
      "Firebase Auth & Firestore",
      "AI-based feedback summarizer",
      "On-demand service booking",
      "Cross-platform Flutter app",
    ],
  },
  {
    id: 3,
    title: "SmartTrafficAI",
    featured: true,
    description:
      "An AI-powered Smart Traffic Prediction and Congestion Analysis System that predicts traffic congestion levels and provides interactive visualizations to support intelligent traffic management.",
    longDescription:
      "Built with React, FastAPI, Python, and Machine Learning. Features congestion prediction using Scikit-learn, an interactive analytics dashboard, hotspot mapping, GPS monitoring, and public transport insights — backed by the IEEE DataPort Urban Traffic Dataset.",
    tech: ["React", "FastAPI", "Python", "Scikit-learn", "Tailwind CSS", "Chart.js", "Axios"],
    category: "AI / ML",
    image: null,
    githubUrl: "https://github.com/Nidhishahikify/SmartTrafficAI",
    liveUrl: "https://smart-traffic-ai-sigma.vercel.app",
    color: "from-emerald-600 to-teal-700",
    accentColor: "emerald",
    highlights: [
      "ML-based congestion prediction",
      "Interactive analytics dashboard",
      "Hotspot mapping & GPS monitoring",
      "FastAPI backend + React frontend",
    ],
  },

];

export const projectCategories = ["All", "AI / ML", "Mobile", "Web"];
