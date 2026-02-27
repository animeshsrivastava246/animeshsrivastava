"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full flex justify-center items-center">
        {/* Placeholder before hydration */}
        <div className="w-5 h-5 bg-muted rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label="Toggle theme"
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
  );
}
