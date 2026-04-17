"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import coverImage from "../../assets/images/projects/storyteller/landingScreen.webp";
import storyImage from "../../assets/images/projects/storyteller/story.webp";
import historyImage from "../../assets/images/projects/storyteller/history.webp";
import { MdArrowBackIos } from "react-icons/md"

const Storyteller = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="w-full font-sans max-w-6xl mx-auto md:mt-24 overflow-hidden">
      {/* Subtle Grid Background for HUD feel */}
      <aside className="fixed inset-0 pointer-events-none z-[-1] blur-[0.8px] bg-[linear-gradient(var(--primary)_2px,transparent_2px),linear-gradient(90deg,var(--primary)_2px,transparent_2px)] opacity-[0.2] dark:opacity-[0.2] bg-size-[32px_32px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,black_50%,transparent_120%)]" />
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="opacity-75 text-md font-semibold flex items-center gap-2 m-2 hover:text-primary hover:scale-110 hover:cursor-pointer hover:opacity-100 transition-all duration-300 text-muted-foreground"
      >
        <MdArrowBackIos /> Back to Projects
      </motion.button>

      {/* Hero Banner animated */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="flex flex-col justify-center h-full order-2 md:order-1 space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl font-heading font-black text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-red-400 mb-6 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
              Storyteller
            </h1>
            <p className="text-white text-lg md:text-xl font-medium bg-black/20 p-4 rounded-2xl backdrop-blur-md shadow-lg border border-white/5 leading-relaxed">
              An AI-powered app that turns a single sentence into a fully illustrated short story.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="relative w-full h-[60vh] max-h-[600px] rounded-4xl overflow-hidden glass border border-white/10 shadow-[0_0_60px_rgba(168,85,247,0.15)] group order-1 md:order-2 self-center flex items-center justify-center p-4 bg-muted/20"
        >
          <div className="relative w-full h-full">
            <Image
              src={coverImage}
              alt="Storyteller Banner"
              fill
              loading="eager"
              className="object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </motion.div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-4 space-y-6"
        >
          <div className="glass-island p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
            <h3 className="font-heading font-bold text-xl text-foreground mb-4">Project Details</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Tech Stack</span>
                <span className="text-foreground font-semibold">React Native, Expo, Gemini AI</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Platform</span>
                <span className="text-foreground font-semibold">Mobile (Cross-platform)</span>
              </li>
              <li className="flex justify-between pt-2">
                <span>Source Code</span>
                <a href="https://github.com/animeshsrivastava246/storyteller" target="_blank" rel="noopener noreferrer" className="font-bold text-purple-400 hover:text-purple-300 transition-colors">GitHub &rarr;</a>
              </li>
            </ul>
          </div>

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
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-8 space-y-8"
        >
          <div className="glass p-8 rounded-3xl border border-white/10 neumorphic-inset">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1.5 h-8 bg-purple-500 rounded-full" />
              <h2 className="text-3xl font-heading font-black text-purple-400 tracking-wide">The Concept</h2>
            </div>
            <p className="text-foreground/90 leading-relaxed text-xl">
              Creating compelling stories takes time and illustration takes even longer. The goal with Storyteller was to bridge the gap between imagination and execution by letting users generate complete, vivid, and beautifully illustrated stories from just a single prompt.
            </p>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/10 neumorphic relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl z-0" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl z-0" />
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-1.5 h-8 bg-pink-500 rounded-full" />
              <h2 className="text-3xl font-heading font-black text-pink-400 tracking-wide">The Execution</h2>
            </div>
            <p className="text-foreground/90 leading-relaxed text-xl relative z-10">
              Built with React Native and Expo, the application provides a smooth, cross-platform mobile experience with neon glass aesthetics. It seamlessly integrates Gemini AI to generate narrative structures and utilizes AI image endpoints to craft rich accompanying visuals, all while supporting offline story history through SQLite.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Storyteller;
