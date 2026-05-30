"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetTheme, setTargetTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    if (isAnimating) return;
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTargetTheme(nextTheme);
    setIsAnimating(true);

    setTimeout(() => {
      setTheme(nextTheme);
    }, 700);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full flex justify-center items-center">
        {/* Placeholder before hydration */}
        <div className="w-5 h-5 bg-muted rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggle}
        className="p-2 cursor-pointer rounded-full text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Toggle theme"
        data-cursor={resolvedTheme === "dark" ? "Light" : "Dark"}
      >
        <div className="relative w-5 h-5">
          <Sun
            className={`absolute inset-0 w-5 h-5 transition-transform duration-300 ease-in-out ${resolvedTheme === "dark" ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
          />
          <Moon
            className={`absolute inset-0 w-5 h-5 transition-transform duration-300 ease-in-out ${resolvedTheme === "dark" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`}
          />
        </div>
      </motion.button>

      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isAnimating && targetTheme && (
              <motion.div
                className="fixed inset-0 z-99999 pointer-events-none flex items-center justify-center overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className={`absolute inset-0 ${targetTheme === "light" ? "bg-[#ffffff]" : "bg-[#09090b]"
                    }`}
                  initial={{ clipPath: "circle(0% at 50% 50%)" }}
                  animate={{ clipPath: "circle(150% at 50% 50%)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />

                <div className="relative z-10 flex items-center justify-center">
                  <motion.div
                    className={`absolute ${targetTheme === "light" ? "text-black" : "text-white"
                      }`}
                    initial={{ rotate: 0, scale: 1, opacity: 1 }}
                    animate={{
                      rotate: targetTheme === "light" ? 90 : -90,
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {targetTheme === "light" ? (
                      <Moon size={140} strokeWidth={1} />
                    ) : (
                      <Sun size={140} strokeWidth={1} />
                    )}
                  </motion.div>

                  <motion.div
                    className={`absolute ${targetTheme === "light" ? "text-black" : "text-white"
                      }`}
                    initial={{
                      rotate: targetTheme === "light" ? -90 : 90,
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "backOut", delay: 0.2 }}
                  >
                    {targetTheme === "light" ? (
                      <Sun size={140} strokeWidth={1} />
                    ) : (
                      <Moon size={140} strokeWidth={1} />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
