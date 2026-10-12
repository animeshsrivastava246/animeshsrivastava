"use client";

import coverImage from "../../assets/images/projects/DisneyUIclone2.webp";
import ProjectTemplate from "./ProjectTemplate";

const DisneyUI = ({ onBack }: { onBack: () => void }) => {
  return (
    <ProjectTemplate
      onBack={onBack}
      title="DisneyUI Clone"
      tagline="A pixel-perfect, highly animated replica of the Disney+ mobile/TV interface."
      coverImage={coverImage}
      coverAlt="DisneyUI Clone Banner"
      bannerShadowClass="shadow-[0_0_60px_rgba(59,130,246,0.15)]"
      titleGradientClass="from-blue-400 via-indigo-400 to-purple-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
      taglineBgClass="bg-black/20 p-2 rounded-2xl"
      details={[
        { label: "Tech Stack", value: "React, Tailwind" },
        { label: "Timeline", value: "2 Weeks" },
        {
          label: "Live View",
          value: (
            <a
              href="https://disney-clone-animesh246.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              View Site &rarr;
            </a>
          ),
        },
      ]}
      firstCard={{
        title: "The Challenge",
        barColor: "bg-blue-500",
        textColor: "text-blue-400",
        content:
          "Recreating the Disney+ interface is a challenge in fluid animation, video rendering, and carousel performance. The goal was to build a UI that feels entirely native and performant while running in a standard web browser.",
      }}
      secondCard={{
        title: "Implementation",
        barColor: "bg-purple-500",
        textColor: "text-purple-400",
        glowTop: "bg-purple-500/10",
        glowBottom: "bg-blue-500/10",
        content:
          "Leveraged Tailwind CSS to manage the complex, nested flex layouts and absolute positioning required by the TV-style overlapping panels.",
      }}
    />
  );
};

export default DisneyUI;
