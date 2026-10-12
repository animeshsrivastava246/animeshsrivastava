"use client";

import Image from "next/image";
import coverImage from "../../assets/images/projects/storyteller/landingScreen.webp";
import storyImage from "../../assets/images/projects/storyteller/story.webp";
import historyImage from "../../assets/images/projects/storyteller/history.webp";
import ProjectTemplate from "./ProjectTemplate";

const Storyteller = ({ onBack }: { onBack: () => void }) => {
  return (
    <ProjectTemplate
      onBack={onBack}
      title="Storyteller"
      tagline="An AI-powered app that turns a single sentence into a fully illustrated short story."
      coverImage={coverImage}
      coverAlt="Storyteller Banner"
      heroLayout="split"
      bannerShadowClass="shadow-[0_0_60px_rgba(168,85,247,0.15)]"
      titleGradientClass="from-purple-400 via-pink-400 to-red-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"
      taglineBgClass="bg-black/20 p-4 rounded-2xl border border-white/5"
      details={[
        { label: "Tech Stack", value: "React Native, Expo, Gemini AI" },
        { label: "Platform", value: "Mobile (Cross-platform)" },
        {
          label: "Source Code",
          value: (
            <a
              href="https://github.com/animeshsrivastava246/storyteller"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-purple-400 hover:text-purple-300 transition-colors"
            >
              GitHub &rarr;
            </a>
          ),
        },
      ]}
      sidebarExtra={
        <div className="glass-island p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
          <h3 className="font-heading font-bold text-xl text-foreground mb-4">Screenshots</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative w-full aspect-9/19 rounded-xl overflow-hidden glass border border-white/5 bg-background shadow-inner">
              <Image src={storyImage} alt="Story view" fill className="object-contain" sizes="(max-width: 768px) 100vw, 400px" />
            </div>
            <div className="relative w-full aspect-9/19 rounded-xl overflow-hidden glass border border-white/5 bg-background shadow-inner">
              <Image src={historyImage} alt="History view" fill className="object-contain" sizes="(max-width: 768px) 100vw, 400px" />
            </div>
          </div>
        </div>
      }
      firstCard={{
        title: "The Concept",
        barColor: "bg-purple-500",
        textColor: "text-purple-400",
        content:
          "Creating compelling stories takes time and illustration takes even longer. The goal with Storyteller was to bridge the gap between imagination and execution by letting users generate complete, vivid, and beautifully illustrated stories from just a single prompt.",
      }}
      secondCard={{
        title: "The Execution",
        barColor: "bg-pink-500",
        textColor: "text-pink-400",
        glowTop: "bg-red-500/10",
        glowBottom: "bg-purple-500/10",
        content:
          "Built with React Native and Expo, the application provides a smooth, cross-platform mobile experience with neon glass aesthetics. It seamlessly integrates Gemini AI to generate narrative structures and utilizes AI image endpoints to craft rich accompanying visuals, all while supporting offline story history through SQLite.",
      }}
    />
  );
};

export default Storyteller;
