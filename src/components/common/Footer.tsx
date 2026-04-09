import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SiNextdotjs, SiTailwindcss, SiFramer } from 'react-icons/si';
import { basicDetails } from "../../data/basic";

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentYear = mounted ? new Date().getFullYear() : "2026";

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full text-foreground pt-12 pb-8 flex flex-col items-center text-sm px-4 mt-auto"
    >
      <div className="flex items-center flex-wrap justify-center gap-4 text-muted-foreground w-full max-w-4xl">
        <p className="font-medium">Built using</p>

        <div className="flex items-center gap-4">
          <div className="opacity-50 flex items-center gap-1.5 hover:opacity-100 hover:text-foreground transition-all duration-200 cursor-pointer">
            <SiNextdotjs className="w-4 h-4" />
            <span className="font-semibold">Next.js</span>
          </div>

          <div className="opacity-50 flex items-center gap-1.5 hover:opacity-100 hover:text-sky-400 transition-all duration-200 cursor-pointer">
            <SiTailwindcss className="w-4 h-4" />
            <span className="font-semibold">Tailwind</span>
          </div>

          <div className="opacity-50 flex items-center gap-1.5 hover:opacity-100 hover:text-pink-400 transition-all duration-200 cursor-pointer">
            <SiFramer className="w-4 h-4" />
            <span className="font-semibold">Framer</span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-border/10 w-full text-center text-muted-foreground font-heading text-xs tracking-wider uppercase flex flex-col items-center gap-2">
        <span>&copy; {currentYear} {basicDetails.name}. All rights reserved.</span>
        <span className="md:hidden text-[9px] text-yellow-600/50 dark:text-yellow-400/50 font-bold">
          High Performance Portfolio | Optimal on Desktop
        </span>
      </div>
    </motion.footer>
  );
};

export default Footer;
