"use client";

import coverImage from "../../assets/images/projects/NetflixYTclone2.webp";
import ProjectTemplate from "./ProjectTemplate";

const NetflixYT = ({ onBack }: { onBack: () => void }) => {
  return (
    <ProjectTemplate
      onBack={onBack}
      title="NetflixYT Clone"
      tagline="Explore a world of entertainment with NetflixYT Clone! A modern video streaming platform built with React.js, combining the best of Netflix and YouTube with a seamless, intuitive interface."
      coverImage={coverImage}
      coverAlt="NetflixYT Banner"
      bannerShadowClass="shadow-[0_0_60px_rgba(168,85,247,0.15)]"
      titleGradientClass="from-purple-400 via-pink-400 to-red-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"
      taglineBgClass="bg-black/40 p-2 rounded-2xl"
      details={[
        { label: "Tech Stack", value: "React.js, TailwindCSS, Firebase, TMDB" },
        { label: "Timeline", value: "1 Month" },
        {
          label: "Live View",
          value: (
            <a
              href="https://netflix-yt-1.web.app/"
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
          "Want a cool search engine to interactively search and list movies and youtube videos? This is the perfect place for you. I've created a seamless interface to search and list your favorite movies and youtube videos.",
      }}
      secondCard={{
        title: "The Solution",
        barColor: "bg-pink-500",
        textColor: "text-pink-400",
        glowTop: "bg-red-500/10",
        glowBottom: "bg-purple-500/10",
        content:
          "This project is a seamless, interactive search engine for movies and YouTube videos. I've created a smooth, modern interface where you can search for, and explore your favorite movies and videos effortlessly.",
      }}
    />
  );
};

export default NetflixYT;
