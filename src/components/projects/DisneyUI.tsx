"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import coverImage from "../../assets/images/projects/DisneyUIclone2.png";
import { MdArrowBackIos } from "react-icons/md"

const DisneyUI = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="w-full font-sans max-w-6xl mx-auto pb-12 pt-6 overflow-hidden">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="opacity-75 text-md font-semibold flex items-center gap-2 m-2 hover:text-primary hover:scale-110 hover:cursor-pointer hover:opacity-100 transition-all duration-300 text-muted-foreground"
      >
        <MdArrowBackIos /> Back to Projects
      </motion.button>

      {/* Hero Banner animated */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        className="relative w-full h-[40vh] md:h-[50vh] rounded-4xl overflow-hidden glass border border-white/10 shadow-[0_0_60px_rgba(59,130,246,0.15)] mb-12 group"
      >
        <Image
          src={coverImage}
          alt="DisneyUI Clone Banner"
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-700 opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-6xl font-heading font-black text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 mb-4 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
              DisneyUI Clone
            </h1>
            <p className="text-lg md:text-xl text-foreground font-medium max-w-2xl bg-black/20 p-2 rounded-xl backdrop-blur-md inline-block shadow-lg">
              A pixel-perfect, highly animated replica of the Disney+ mobile/TV interface.
            </p>
          </motion.div>
        </div>
      </motion.div>

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
                <span className="text-foreground font-semibold">React, Tailwind</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Timeline</span>
                <span className="text-foreground font-semibold">2 Weeks</span>
              </li>
              <li className="flex justify-between pt-2">
                <span>Live View</span>
                <a href="#" className="font-bold text-blue-400 hover:text-blue-300 transition-colors">View Site &rarr;</a>
              </li>
            </ul>
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
            <h2 className="text-2xl font-heading font-bold mb-4 text-blue-400">The Challenge</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Recreating the Disney+ interface is a challenge in fluid animation, video rendering, and carousel performance. The goal was to build a UI that feels entirely native and performant while running in a standard web browser.
            </p>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/10 neumorphic relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
            <h2 className="text-2xl font-heading font-bold mb-4 text-purple-400 relative z-10">Implementation</h2>
            <p className="text-muted-foreground leading-relaxed text-lg relative z-10">
              Leveraged Framer Motion for high-framerate spring animations. Tailwind CSS was utilized to manage the complex, nested flex layouts and absolute positioning required by the TV-style overlapping panels.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DisneyUI;
