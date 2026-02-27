import { StaticImageData } from "next/image";
import NameTheGame from "./NameTheGame";
import DisneyUI from "./DisneyUI";
import NameTheGameCover from "../../assets/images/projects/NameTheGame.png";
import DisneyUICover from "../../assets/images/projects/DisneyUIclone.png";

export interface ProjectMetadata {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: StaticImageData | string;
  component: React.ComponentType<{ onBack: () => void }>;
}

export const projects: ProjectMetadata[] = [
  {
    id: "namethegame",
    title: "Name The Game",
    description: "An interactive, multiplayer web gaming trivia platform to test your knowledge against friends in real-time.",
    tech: ["Next.js", "WebSockets", "Tailwind CSS"],
    image: NameTheGameCover,
    component: NameTheGame,
  },
  {
    id: "disneyui",
    title: "DisneyUI Clone",
    description: "A pixel-perfect, highly animated replica of the Disney+ interface built to run natively in standard browsers.",
    tech: ["React", "Framer Motion", "Tailwind CSS"],
    image: DisneyUICover,
    component: DisneyUI,
  },
];

export type ProjectId = "none" | typeof projects[number]["id"];
