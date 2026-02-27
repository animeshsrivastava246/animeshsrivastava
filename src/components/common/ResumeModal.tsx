"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ResumeModal({ open, onClose }: Props) {

  /* Lock scroll */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  /* ESC close */
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", esc);

    return () =>
      window.removeEventListener("keydown", esc);

  }, [onClose]);

  return (
    <AnimatePresence>

      {open && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-200 flex items-center justify-center"
        >

          {/* BACKDROP */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* MODAL */}

          <motion.div
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22
            }}
            className="relative w-[95vw] max-w-6xl h-[90vh] rounded-3xl border border-white/20 overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.3)] bg-background/80 backdrop-blur-2xl"
          >

            {/* INSET GLOW AND NOISE */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-purple-500/10 to-transparent pointer-events-none" />

            {/* TOP BAR */}

            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-white/5 dark:bg-black/20 backdrop-blur-md relative z-10">

              <span className="font-heading font-bold text-lg bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">
                Resume.pdf
              </span>

              <div className="flex gap-4">

                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-muted hover:bg-muted/70 transition"
                >
                  <ExternalLink size={16} />
                  Open
                </a>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-muted hover:bg-muted/70 flex items-center justify-center transition"
                >
                  <X size={18} />
                </button>

              </div>

            </div>


            {/* IFRAME */}
            <div className="w-full h-[calc(100%-60px)] relative z-10 p-2">
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner border border-border/50 bg-muted/20">
                <iframe
                  src="/resume.pdf"
                  className="w-full h-full"
                />
              </div>
            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}