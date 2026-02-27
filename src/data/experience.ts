export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  type: "Internship" | "Full-Time" | "Contract";
  link: string;
  description: string[];
  skills: string[];
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "React Native Developer",
    company: "Vicdigit Technologies Pvt Ltd",
    period: "01/2024 - Present | Lucknow, India",
    type: "Full-Time",
    link: "https://www.linkedin.com/company/vicdigit",
    description: [
      "App Development & Optimization: Developed cross-platform apps (iOS/Android) using React Native, enhancing performance and UX.",
      "Collaboration: Worked with Product, Design, and Backend teams to implement features.",
      "Code Quality: Wrote maintainable code, followed best practices, and conducted code reviews.",
      "CI/CD: Contributed to pipeline improvements for faster deployment.",
      "Continuous Learning: Stayed updated on new tools and libraries."
    ],
    skills: ["React Native", "TypeScript", "iOS/Android", "CI/CD"],
  },
  {
    id: "exp-2",
    role: "React Developer Intern",
    company: "UnORG",
    period: "02/2023 - 04/2023 | Lucknow, India",
    type: "Internship",
    link: "https://www.linkedin.com/company/unorg",
    description: [
      "Built scalable React components using TypeScript and modern frontend architecture.",
      "Implemented UI features, state management, and performance optimizations.",
      "Collaborated in hybrid/on-site setups using agile workflows and Git-based version control.",
      "Gained hands-on experience with IT management and infrastructure-focused technologies."
    ],
    skills: ["React", "TypeScript", "Agile", "Git"],
  },
];
