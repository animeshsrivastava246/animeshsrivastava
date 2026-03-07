import { StaticImageData } from "next/image";
import NameTheGame from "./NameTheGame";
import DisneyUI from "./DisneyUI";
import Storyteller from "./Storyteller";
import NameTheGameCover from "../../assets/images/projects/NameTheGame.png";
import DisneyUICover from "../../assets/images/projects/DisneyUIclone.png";
import StorytellerCover from "../../assets/images/projects/storyteller/landingScreen.png";

export interface ProjectMetadata {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: StaticImageData | string;
  layout?: "landscape" | "portrait";
  component: React.ComponentType<{ onBack: () => void }>;
}

export const projects: ProjectMetadata[] = [
  {
    id: "namethegame",
    title: "Name The Game",
    description: "Find out what is stuck in your head through a gamer community!",
    tech: ["Next.js", "MaterialUI"],
    image: NameTheGameCover,
    component: NameTheGame,
  },
  {
    id: "storyteller",
    title: "Storyteller",
    description: "An AI-powered mobile app that turns a single sentence into a fully illustrated short story.",
    tech: ["React Native", "Expo", "Gemini AI"],
    layout: "portrait",
    image: StorytellerCover,
    component: Storyteller,
  },
  {
    id: "disneyui",
    title: "DisneyUI Clone",
    description: "A pixel-perfect, highly animated replica of the Disney+ interface built to run natively in standard browsers.",
    tech: ["React", "Tailwind CSS"],
    image: DisneyUICover,
    component: DisneyUI,
  },
];

export type ProjectId = "none" | typeof projects[number]["id"];
