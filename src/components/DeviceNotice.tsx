"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DeviceNotice() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("desktopNoticeShown");
    if (alreadyShown) return;

    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    const isSmallScreen = window.innerWidth < 768;

    if (isMobileDevice || isSmallScreen) {
      setShowNotice(true);
      sessionStorage.setItem("desktopNoticeShown", "true");

      // Automatically hide after 10 seconds
      const timeout = setTimeout(() => {
        setShowNotice(false);
      }, 10000); // 10 seconds = 10000ms

      return () => clearTimeout(timeout); // cleanup
    }
  }, []);

  return (
    <AnimatePresence>
      {showNotice && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 50, x: "-50%" }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-6 left-1/2 bg-card glass border border-border/50 text-foreground px-4 py-2 rounded-full text-xs shadow-xl z-9999 max-w-xs w-[90%] text-center font-medium font-body flex items-center justify-between gap-3"
        >
          <span className="leading-snug text-left">For the best experience, view on a desktop.</span>
          <button
            onClick={() => setShowNotice(false)}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 shrink-0"
            aria-label="Close notice"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
