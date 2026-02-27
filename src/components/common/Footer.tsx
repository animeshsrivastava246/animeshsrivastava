'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiFramer } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full text-foreground py-8 flex flex-col items-center text-sm px-4 mt-12 border-t border-border/50"
    >
      <div className="flex items-center flex-wrap justify-center gap-3 text-muted-foreground w-full max-w-4xl">
        <span>Built with</span>
        <FaHeart className="text-red-500 animate-pulse hover:scale-125 transition-transform" />
        <span>using</span>

        <div className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer">
          <SiNextdotjs className="" />
          <span className="font-medium">Next.js</span>
        </div>

        <div className="flex items-center gap-1.5 hover:text-sky-400 transition-colors cursor-pointer">
          <SiTailwindcss className="" />
          <span className="font-medium">Tailwind CSS</span>
        </div>

        <div className="flex items-center gap-1.5 hover:text-pink-400 transition-colors cursor-pointer">
          <SiFramer className="" />
          <span className="font-medium">Framer Motion</span>
        </div>
      </div>

      <div className="mt-6 text-muted-foreground text-center font-heading text-xs tracking-wider uppercase flex flex-col items-center gap-1">
        <span>© {currentYear} Animesh Srivastava. All rights reserved.</span>
        <span className="md:hidden text-[10px] text-yellow-600/60 dark:text-yellow-400/60 font-semibold mt-2">
          Note: For best experience, view on desktop.
        </span>
      </div>
    </motion.footer>
  );
};

export default Footer;
