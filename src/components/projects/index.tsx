import React from "react";
import { StaticImageData } from "next/image";
import dynamic from "next/dynamic";
import NameTheGameCover from "../../assets/images/projects/NameTheGame.webp";
import DisneyUICover from "../../assets/images/projects/DisneyUIclone.webp";
import StorytellerCover from "../../assets/images/projects/storyteller/landingScreen.webp";
import NetflixYTCover from "../../assets/images/projects/NetflixYTclone.webp";

const LoadingProjectFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    <span className="text-xs font-mono text-muted-foreground animate-pulse">Loading Mission Data...</span>
  </div>
);

const NetflixYT = dynamic(() => import("./NetflixYT"), {
  loading: LoadingProjectFallback,
});

const NameTheGame = dynamic(() => import("./NameTheGame"), {
  loading: LoadingProjectFallback,
});

const Storyteller = dynamic(() => import("./Storyteller"), {
  loading: LoadingProjectFallback,
});

const DisneyUI = dynamic(() => import("./DisneyUI"), {
  loading: LoadingProjectFallback,
});

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
