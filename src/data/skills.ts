export interface SkillItem {
  name: string;
  icon?: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Mobile Development",
    skills: [
      { name: "React Native", level: "Expert" },
      { name: "Redux", level: "Advanced" },
      { name: "React Navigation", level: "Advanced" },
      { name: "Native Modules", level: "Intermediate" },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "TypeScript", level: "Advanced" },
      { name: "JavaScript (ES6+)", level: "Expert" },
      { name: "Java", level: "Intermediate" },
      { name: "Python", level: "Intermediate" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js", level: "Expert" },
      { name: "Next.js", level: "Advanced" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "Bootstrap", level: "Advanced" },
    ],
  },
  {
    title: "Backend & Databases",
    skills: [
      { name: "Node.js", level: "Advanced" },
      { name: "Express.js", level: "Advanced" },
      { name: "GraphQL", level: "Intermediate" },
      { name: "REST APIs", level: "Expert" },
      { name: "SQL", level: "Intermediate" },
      { name: "MongoDB", level: "Intermediate" },
      { name: "Firestore", level: "Advanced" },
    ],
  },
  {
    title: "Cloud, DevOps & Practices",
    skills: [
      { name: "Firebase", level: "Advanced" },
      { name: "CI/CD", level: "Intermediate" },
      { name: "Git", level: "Expert" },
      { name: "GitHub Software", level: "Advanced" },
      { name: "Clean Code", level: "Expert" },
      { name: "SOLID Principles", level: "Advanced" },
      { name: "Agile (Scrum)", level: "Advanced" },
      { name: "Unit Testing", level: "Intermediate" },
    ],
  },
];
