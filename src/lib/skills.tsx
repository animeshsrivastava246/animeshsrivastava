import { JSX } from "react";
import {
  FaReact,
  FaHtml5,
  FaJs,
  FaServer,
  FaDatabase,
  FaGitAlt,
  FaNodeJs,
  FaPython,
  FaMobileAlt,
  FaCode,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiFramer,
  SiRedis,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiPostman,
  SiVercel,
  SiExpo,
  SiRealm,
} from "react-icons/si";
import { BsBootstrap } from "react-icons/bs";
import reactNative from "../assets/images/React_Native.png";
import mernStack from "../assets/images/MERN_Stack.png";
import { StaticImageData } from "next/image";

export type SkillItem = {
  name: string;
  desc: string;
  icon: JSX.Element;
  badge: string;
};

export type FeaturedItem = {
  name: string;
  desc: string;
  badge: string;
  icon: JSX.Element;
  banner?: string;
  image?: StaticImageData | string;
};

export type CategoryData = {
  featured: FeaturedItem[];
  skills: SkillItem[];
  learning: SkillItem[];
  recent: SkillItem[];
};

export type SkillsData = {
  [category: string]: CategoryData;
};

const skillsData: SkillsData = {
  Frontend: {
    skills: [
      {
        name: "React.js",
        desc: "Architecting dynamic, component-driven web interfaces with seamless state management.",
        badge: "CORE UI",
        icon: <FaReact className="text-cyan-400" />,
      },
      {
        name: "HTML5 & CSS3",
        desc: "Crafting responsive, accessible, and semantic web foundations.",
        badge: "WEB STRUCTURE",
        icon: <FaHtml5 className="text-orange-500" />,
      },
      {
        name: "Bootstrap",
        desc: "Accelerating clean layouts with battle-tested responsive grids.",
        badge: "GRID LAYOUT",
        icon: <BsBootstrap className="text-indigo-400" />,
      },
      {
        name: "JavaScript",
        desc: "Powering complex front-end logic and dynamic asynchronous behaviors.",
        badge: "DOM & LOGIC",
        icon: <FaJs className="text-yellow-300" />,
      },
      {
        name: "TypeScript",
        desc: "Enforcing scalable, type-safe architectures to eradicate runtime anomalies.",
        badge: "STRICT TYPING",
        icon: <SiTypescript className="text-blue-500" />,
      },
      {
        name: "Tailwind CSS",
        desc: "Styling fluid, modern interfaces with utility-first precision.",
        badge: "UTILITY STYLING",
        icon: <SiTailwindcss className="text-sky-400" />,
      },
    ],
    recent: [
      {
        name: "Tailwind CSS",
        desc: "Styling fluid, modern interfaces with utility-first precision.",
        badge: "UTILITY STYLING",
        icon: <SiTailwindcss className="text-sky-400" />,
      },
      {
        name: "TypeScript",
        desc: "Enforcing scalable, type-safe architectures to eradicate runtime anomalies.",
        badge: "STRICT TYPING",
        icon: <SiTypescript className="text-blue-500" />,
      },
    ],
    featured: [
      {
        name: "Tailwind CSS",
        desc: "Mastering fluid layouts and rapid prototyping via utility-driven design.",
        badge: "DESIGN TOOLKIT",
        icon: <SiTailwindcss className="text-sky-400 text-4xl" />,
        banner: "from-sky-400 via-blue-300 to-blue-500",
      },
      {
        name: "Next.js",
        desc: "Leveraging static generation and SSR for lightning-fast, SEO-optimized web apps.",
        badge: "FULLSTACK UI",
        icon: <SiNextdotjs className="text-black text-4xl" />,
        banner: "from-neutral-800 via-gray-900 to-black",
      },
    ],
    learning: [
      {
        name: "Next.js",
        desc: "Delving deep into advanced edge rendering and customized API architectures.",
        badge: "FRAMEWORK",
        icon: <SiNextdotjs className="text-black" />,
      },
      {
        name: "Framer Motion",
        desc: "Orchestrating fluid, physics-based micro-interactions and page transitions.",
        badge: "ANIMATIONS",
        icon: <SiFramer className="text-pink-400" />,
      },
    ],
  },

  Backend: {
    skills: [
      {
        name: "Node.js",
        desc: "Engineering high-throughput, non-blocking asynchronous backend services.",
        badge: "RUNTIME ENGINE",
        icon: <FaNodeJs className="text-green-500" />,
      },
      {
        name: "Express.js",
        desc: "Designing robust RESTful APIs and secure server-side middleware pipelines.",
        badge: "API GATEWAY",
        icon: <FaServer className="text-gray-300" />,
      },
      {
        name: "Python",
        desc: "Executing data automation, complex logic processing, and algorithmic problem-solving.",
        badge: "VERSATILE LOGIC",
        icon: <FaPython className="text-blue-400" />,
      },
    ],
    recent: [
      {
        name: "Node.js",
        desc: "Engineering high-throughput, non-blocking asynchronous backend services.",
        badge: "RUNTIME ENGINE",
        icon: <FaNodeJs className="text-green-500" />,
      },
    ],
    featured: [
      {
        name: "Node.js",
        desc: "Orchestrating scalable microservices and robust server-side processing architectures.",
        badge: "SYSTEM BACKBONE",
        icon: <FaNodeJs className="text-green-500 text-4xl" />,
        banner: "from-green-400 via-emerald-500 to-green-600",
      },
    ],
    learning: [
      {
        name: "Redis",
        desc: "Implementing high-speed caching and distributed session management ecosystems.",
        badge: "IN-MEMORY CACHE",
        icon: <SiRedis className="text-red-500" />,
      },
    ],
  },

  Database: {
    skills: [
      {
        name: "MongoDB",
        desc: "Structuring flexible, horizontally scalable NoSQL document data models.",
        badge: "DOCUMENT STORE",
        icon: <SiMongodb className="text-green-600" />,
      },
      {
        name: "Firestore",
        desc: "Synchronizing live global data states seamlessly across concurrent client applications.",
        badge: "REAL-TIME CLOUD",
        icon: <SiFirebase className="text-yellow-400" />,
      },
      {
        name: "RealmDB",
        desc: "Embedding high-performance, offline-first local databases for mobile architectures.",
        badge: "OFFLINE STORAGE",
        icon: <SiRealm className="text-indigo-500" />,
      },
      {
        name: "MySQL",
        desc: "Optimizing relational data integrity and complex enterprise query pathways.",
        badge: "RELATIONAL DB",
        icon: <SiMysql className="text-blue-500" />,
      },
      {
        name: "SQL",
        desc: "Structuring complex queries for robust relational data analysis and manipulation.",
        badge: "DATA QUERYING",
        icon: <FaDatabase className="text-purple-400" />,
      },
    ],
    recent: [
      {
        name: "RealmDB",
        desc: "Embedding high-performance, offline-first local databases for mobile architectures.",
        badge: "OFFLINE STORAGE",
        icon: <SiRealm className="text-indigo-500" />,
      },
    ],
    featured: [
      {
        name: "Firestore",
        desc: "Deploying instantaneous data propagation and continuous syncing across ecosystems.",
        badge: "REAL-TIME SYNC",
        icon: <SiFirebase className="text-orange-500 text-4xl" />,
        banner: "from-yellow-300 via-orange-400 to-red-500",
      },
    ],
    learning: [],
  },

  Tools: {
    skills: [
      {
        name: "Firebase",
        desc: "Integrating rapid cloud infrastructure, seamless auth, and secure analytics solutions.",
        badge: "BAAS PLATFORM",
        icon: <SiFirebase className="text-yellow-400" />,
      },
      {
        name: "Git",
        desc: "Maintaining immaculate version histories and collaborative continuous-integration branching.",
        badge: "VERSION CONTROL",
        icon: <FaGitAlt className="text-orange-400" />,
      },
      {
        name: "Postman",
        desc: "Automating rigorous API testing frameworks and meticulous endpoint documentation workflows.",
        badge: "API QA",
        icon: <SiPostman className="text-orange-300" />,
      },
      {
        name: "Vercel",
        desc: "Streamlining resilient continuous deployment pipelines for edge-optimized front-end hosting.",
        badge: "EDGE HOSTING",
        icon: <SiVercel className="text-black" />,
      },
    ],
    recent: [],
    featured: [
      {
        name: "Firebase",
        desc: "Utilizing comprehensive cloud-native solutions to rapidly iterate scalable product lifecycles.",
        badge: "CLOUD ARCHITECTURE",
        icon: <SiFirebase className="text-yellow-400 text-4xl" />,
        banner: "from-yellow-300 via-orange-400 to-amber-500",
      },
    ],
    learning: [
      {
        name: "Postman",
        desc: "Extending API coverage through sophisticated automated collection runners and scripting.",
        badge: "AUTOMATION",
        icon: <SiPostman className="text-orange-300" />,
      },
    ],
  },

  "Mobile Development": {
    skills: [
      {
        name: "React Native",
        desc: "Forging dynamic, cross-platform mobile experiences with native-grade performance benchmarks.",
        badge: "MOBILE UI",
        icon: <FaReact className="text-cyan-400" />,
      },
      {
        name: "Expo",
        desc: "Accelerating mobile iteration cycles with comprehensive, out-of-the-box native module integrations.",
        badge: "MOBILE TOOLKIT",
        icon: <SiExpo className="text-black" />,
      },
      {
        name: "RealmDB",
        desc: "Embedding high-performance, offline-first local databases directly into mobile client boundaries.",
        badge: "LOCAL SYNC",
        icon: <SiRealm className="text-indigo-500" />,
      },
      {
        name: "NativeWind",
        desc: "Unifying web and mobile styling paradigms through native, fluid utility class rendering.",
        badge: "NATIVE STYLING",
        icon: <SiTailwindcss className="text-sky-400" />,
      },
    ],
    recent: [],
    featured: [
      {
        name: "React Native",
        desc: "Pioneering unified codebases capable of delivering bespoke iOS and Android native experiences.",
        badge: "CROSS-PLATFORM",
        icon: <FaReact className="text-cyan-400 text-4xl" />,
        banner: "from-blue-400 via-cyan-500 to-teal-400",
      },
    ],
    learning: [],
  },

  All: {
    skills: [
      {
        name: "React Native",
        desc: "Forging dynamic, cross-platform mobile experiences with native-grade performance benchmarks.",
        badge: "MOBILE UI",
        icon: <FaReact className="text-cyan-400" />,
      },
      {
        name: "Expo",
        desc: "Accelerating mobile iteration cycles with comprehensive, out-of-the-box native module integrations.",
        badge: "MOBILE TOOLKIT",
        icon: <SiExpo className="text-black" />,
      },
      {
        name: "Python",
        desc: "Executing data automation, complex logic processing, and algorithmic problem-solving.",
        badge: "VERSATILE LOGIC",
        icon: <FaPython className="text-blue-400" />,
      },
      {
        name: "React.js",
        desc: "Architecting dynamic, component-driven web interfaces with seamless state management.",
        badge: "CORE UI",
        icon: <FaReact className="text-cyan-400" />,
      },
      {
        name: "Next.js",
        desc: "Leveraging static generation and SSR for lightning-fast, SEO-optimized web apps.",
        badge: "FULLSTACK UI",
        icon: <SiNextdotjs className="text-black text-4xl" />,
      },
      {
        name: "TypeScript",
        desc: "Enforcing scalable, type-safe architectures to eradicate runtime anomalies.",
        badge: "STRICT TYPING",
        icon: <SiTypescript className="text-blue-500" />,
      },
      {
        name: "Tailwind CSS",
        desc: "Styling fluid, modern interfaces with utility-first precision.",
        badge: "UTILITY STYLING",
        icon: <SiTailwindcss className="text-sky-400" />,
      },
      {
        name: "NativeWind",
        desc: "Unifying web and mobile styling paradigms through native, fluid utility class rendering.",
        badge: "NATIVE STYLING",
        icon: <SiTailwindcss className="text-sky-400" />,
      },
      {
        name: "HTML5 & CSS3",
        desc: "Crafting responsive, accessible, and semantic web foundations.",
        badge: "WEB STRUCTURE",
        icon: <FaHtml5 className="text-orange-500" />,
      },
      {
        name: "JavaScript",
        desc: "Powering complex front-end logic and dynamic asynchronous behaviors.",
        badge: "DOM & LOGIC",
        icon: <FaJs className="text-yellow-300" />,
      },
      {
        name: "Bootstrap",
        desc: "Accelerating clean layouts with battle-tested responsive grids.",
        badge: "GRID LAYOUT",
        icon: <BsBootstrap className="text-indigo-400" />,
      },
      {
        name: "Node.js",
        desc: "Engineering high-throughput, non-blocking asynchronous backend services.",
        badge: "RUNTIME ENGINE",
        icon: <FaNodeJs className="text-green-500" />,
      },
      {
        name: "Firestore",
        desc: "Synchronizing live global data states seamlessly across concurrent client applications.",
        badge: "REAL-TIME CLOUD",
        icon: <SiFirebase className="text-yellow-400" />,
      },
      {
        name: "RealmDB",
        desc: "Embedding high-performance, offline-first local databases for mobile architectures.",
        badge: "OFFLINE STORAGE",
        icon: <SiRealm className="text-indigo-500" />,
      },
      {
        name: "Firebase",
        desc: "Integrating rapid cloud infrastructure, seamless auth, and secure analytics solutions.",
        badge: "BAAS PLATFORM",
        icon: <SiFirebase className="text-yellow-400" />,
      },
      {
        name: "Vercel",
        desc: "Streamlining resilient continuous deployment pipelines for edge-optimized front-end hosting.",
        badge: "EDGE HOSTING",
        icon: <SiVercel className="text-black" />,
      },
      {
        name: "MongoDB",
        desc: "Structuring flexible, horizontally scalable NoSQL document data models.",
        badge: "DOCUMENT STORE",
        icon: <SiMongodb className="text-green-600" />,
      },
      {
        name: "MySQL",
        desc: "Optimizing relational data integrity and complex enterprise query pathways.",
        badge: "RELATIONAL DB",
        icon: <SiMysql className="text-blue-500" />,
      },
      {
        name: "SQL",
        desc: "Structuring complex queries for robust relational data analysis and manipulation.",
        badge: "DATA QUERYING",
        icon: <FaDatabase className="text-purple-400" />,
      },
      {
        name: "Git",
        desc: "Maintaining immaculate version histories and collaborative continuous-integration branching.",
        badge: "VERSION CONTROL",
        icon: <FaGitAlt className="text-orange-400" />,
      },
      {
        name: "Postman",
        desc: "Automating rigorous API testing frameworks and meticulous endpoint documentation workflows.",
        badge: "API QA",
        icon: <SiPostman className="text-orange-300" />,
      },
      {
        name: "Express.js",
        desc: "Designing robust RESTful APIs and secure server-side middleware pipelines.",
        badge: "API GATEWAY",
        icon: <FaServer className="text-gray-300" />,
      },
    ],

    recent: [
      {
        name: "Tailwind CSS",
        desc: "Styling fluid, modern interfaces with utility-first precision.",
        badge: "UTILITY STYLING",
        icon: <SiTailwindcss className="text-sky-400" />,
      },
      {
        name: "TypeScript",
        desc: "Enforcing scalable, type-safe architectures to eradicate runtime anomalies.",
        badge: "STRICT TYPING",
        icon: <SiTypescript className="text-blue-500" />,
      },
      {
        name: "Node.js",
        desc: "Engineering high-throughput, non-blocking asynchronous backend services.",
        badge: "RUNTIME ENGINE",
        icon: <FaNodeJs className="text-green-500" />,
      },
      {
        name: "RealmDB",
        desc: "Embedding high-performance, offline-first local databases for mobile architectures.",
        badge: "OFFLINE STORAGE",
        icon: <SiRealm className="text-indigo-500" />,
      },
    ],

    featured: [
      {
        name: "MERN Stack",
        desc: "Architecting end-to-end JavaScript infrastructures unifying React front-ends with resilient Node back-ends.",
        badge: "WEB FAVORITE",
        icon: <FaCode className="text-green-400 text-4xl" />,
        banner: "from-green-400 via-green-500 to-green-600",
        image: mernStack,
      },
      {
        name: "React Native",
        desc: "Pioneering unified codebases capable of delivering bespoke iOS and Android native experiences.",
        badge: "MOBILE FAVORITE",
        icon: <FaMobileAlt className="text-blue-400 text-4xl" />,
        banner: "from-blue-400 via-blue-500 to-blue-600",
        image: reactNative,
      },
    ],

    learning: [
      {
        name: "Next.js",
        desc: "Delving deep into advanced edge rendering and customized API architectures.",
        badge: "FRAMEWORK",
        icon: <SiNextdotjs className="text-black" />,
      },
      {
        name: "Framer Motion",
        desc: "Orchestrating fluid, physics-based micro-interactions and page transitions.",
        badge: "ANIMATIONS",
        icon: <SiFramer className="text-pink-400" />,
      },
      {
        name: "Redis",
        desc: "Implementing high-speed caching and distributed session management ecosystems.",
        badge: "IN-MEMORY CACHE",
        icon: <SiRedis className="text-red-500" />,
      },
      {
        name: "Postman",
        desc: "Extending API coverage through sophisticated automated collection runners and scripting.",
        badge: "AUTOMATION",
        icon: <SiPostman className="text-orange-300" />,
      },
    ],
  },
};

export default skillsData;
