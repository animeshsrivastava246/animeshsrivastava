"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function BackgroundGlow() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 3000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -400]);
  const y3 = useTransform(scrollY, [0, 3000], [0, -600]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Existing Ambient Glows */}
      <motion.div
        animate={{ y: [-20, 20, -20], x: [-20, 20, -20], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary/5 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ y: [20, -20, 20], x: [20, -20, 20], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] right-[5%] w-120 h-120 bg-indigo-500/5 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ y: [-30, 30, -30], x: [30, -30, 30], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] left-[20%] w-100 h-100 bg-emerald-500/5 rounded-full blur-[100px]"
      />

      {/* Floating Parallax SVGs */}
      <motion.div style={{ y: y1 }} className="absolute top-[20%] right-[15%] opacity-20 hidden md:block">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <motion.path
            d="M12 2L2 12l10 10 10-10L12 2z"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute top-[60%] left-[10%] opacity-20 hidden md:block">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <motion.circle
            cx="12" cy="12" r="10" strokeDasharray="4 4"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </motion.div>

      <motion.div style={{ y: y3 }} className="absolute bottom-[20%] right-[25%] opacity-10 hidden md:block text-primary">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <motion.rect
            x="3" y="3" width="18" height="18" rx="2"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
