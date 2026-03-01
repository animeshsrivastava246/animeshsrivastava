'use client';
import { motion } from 'framer-motion';
import { SiNextdotjs, SiTailwindcss, SiFramer } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full text-foreground pt-12 flex flex-col items-center text-sm px-4 border-t border-border/50"
    >
      <div className="flex items-center flex-wrap justify-center gap-2 text-muted-foreground w-full max-w-4xl">
        <p>Built using</p>

        <div className="opacity-50 flex items-center gap-1.5 hover:opacity-100 hover:text-foreground transition-all duration-200 cursor-pointer">
          <SiNextdotjs className="" />
          <span className="font-medium">Next.js</span>
        </div>

        <div className="opacity-50 flex items-center gap-1.5 hover:opacity-100 hover:text-sky-400 transition-all duration-200 cursor-pointer">
          <SiTailwindcss className="" />
          <span className="font-medium">Tailwind CSS</span>
        </div>

        <div className="opacity-50 flex items-center gap-1.5 hover:opacity-100 hover:text-pink-400 transition-all duration-200 cursor-pointer">
          <SiFramer className="" />
          <span className="font-medium">Framer Motion</span>
        </div>
      </div>

      <div className="mt-4 text-muted-foreground text-center font-heading text-xs tracking-wider uppercase flex flex-col items-center gap-1">
        <span>&copy; {currentYear} Animesh Srivastava. All rights reserved.</span>
        <span className="md:hidden text-[10px] text-yellow-600/60 dark:text-yellow-400/60 font-semibold mt-2">
          Note: For best experience, view on desktop.
        </span>
      </div>
    </motion.footer>
  );
};

export default Footer;
