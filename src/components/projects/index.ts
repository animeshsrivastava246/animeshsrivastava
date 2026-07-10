import { StaticImageData } from "next/image";
import NameTheGame from "./NameTheGame";
import DisneyUI from "./DisneyUI";
import Storyteller from "./Storyteller";
import NetflixYT from "./NetflixYT";
import NameTheGameCover from "../../assets/images/projects/NameTheGame.webp";
import DisneyUICover from "../../assets/images/projects/DisneyUIclone.webp";
import StorytellerCover from "../../assets/images/projects/storyteller/landingScreen.webp";
import NetflixYTCover from "../../assets/images/projects/NetflixYTclone.webp";

export interface ProjectMetadata {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: StaticImageData | string;
  layout?: "landscape" | "portrait" | "full";
  component: React.ComponentType<{ onBack: () => void }>;
}

export const projects: ProjectMetadata[] = [
  {
    id: "netflixyt",
    title: "NetflixYT Clone",
    description: "A modern video streaming platform built with React.js, combining the best of Netflix and YouTube with a seamless, intuitive interface. Have a smooth Netflix-like browsing. Powered by React, TypeScript. Tailwind adds sleek design. Bun ensures fast builds. Firebase secures user sessions. TMDB feeds fresh movies.",
    tech: ["React.js", "TailwindCSS", "Firebase", "TMDB"],
    layout: "full",
    image: NetflixYTCover,
    component: NetflixYT,
  },
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
