"use client";

import coverImage from "../../assets/images/projects/NameTheGame2.webp";
import ProjectTemplate from "./ProjectTemplate";

const NameTheGame = ({ onBack }: { onBack: () => void }) => {
  return (
    <ProjectTemplate
      onBack={onBack}
      title="NameTheGame"
      tagline="Find out what is stuck in your head through a gamer community!"
      coverImage={coverImage}
      coverAlt="NameTheGame Banner"
      bannerShadowClass="shadow-[0_0_60px_rgba(168,85,247,0.15)]"
      titleGradientClass="from-purple-400 via-pink-400 to-red-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"
      taglineBgClass="bg-black/40 p-2 rounded-2xl"
      details={[
        { label: "Tech Stack", value: "Next.js, MaterialUI" },
        { label: "Timeline", value: "1 Month" },
        {
          label: "Live View",
          value: (
            <a
              href="https://name-the-game.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-purple-400 hover:text-purple-300 transition-colors"
            >
              Explore Now &rarr;
            </a>
          ),
        },
      ]}
      firstCard={{
        title: "The Problem",
        barColor: "bg-purple-500",
        textColor: "text-purple-400",
        content:
          "Ever stuck about recalling the name of a game that you remember vaguely or have only some video or image, but cannot find it through simple search?",
      }}
      secondCard={{
        title: "The Solution",
        barColor: "bg-pink-500",
        textColor: "text-pink-400",
        glowTop: "bg-red-500/10",
        glowBottom: "bg-purple-500/10",
        content:
          "This project helps you find out the name of a game you cannot think of with the help of a community. Help and answer others also if you can. The purpose of this project is to help all the gaming audience out there to find out what is on their mind.",
      }}
    />
  );
};

export default NameTheGame;
