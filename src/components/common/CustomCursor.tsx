"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Premium magnetic custom cursor.
 * – Outer ring: slow spring, mix-blend-difference, scales on hover
 * – Inner dot: fast spring, always centered on pointer
 * – Text mode: when hovering [data-cursor="text"], shows a label
 */
export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");

  // Raw position (updated on every mousemove)
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Outer ring — slow, laggy, mix-blend-difference
  const ringX = useSpring(rawX, { damping: 28, stiffness: 250, mass: 0.6 });
  const ringY = useSpring(rawY, { damping: 28, stiffness: 250, mass: 0.6 });

  // Inner dot — snappy, almost instant
  const dotX = useSpring(rawX, { damping: 60, stiffness: 800, mass: 0.2 });
  const dotY = useSpring(rawY, { damping: 60, stiffness: 800, mass: 0.2 });

  const observerRef = useRef<MutationObserver | null>(null);
  const hoveredElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "a, button, [data-cursor]"
      );
      if (target) {
        hoveredElementRef.current = target;
        setIsHovering(true);
        setCursorLabel(target.dataset.cursor ?? "");
      } else {
        hoveredElementRef.current = null;
        setIsHovering(false);
        setCursorLabel("");
      }
    };

    // Watch for attribute changes on the currently hovered element
    observerRef.current = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.target === hoveredElementRef.current
        ) {
          setCursorLabel(hoveredElementRef.current.dataset.cursor ?? "");
        }
      }
    });

    observerRef.current.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-cursor"],
    });

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", handleOver);
      observerRef.current?.disconnect();
    };
  }, [rawX, rawY]);

  // Don't render on server or touch devices
  if (!mounted) return null;

  return (
    <div className="hidden md:block" aria-hidden>
      {/* ── Outer ring (mix-blend-difference = inverts colours behind it) ── */}
      <motion.div
        className="pointer-events-none fixed z-9999 flex items-center justify-center mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isHovering ? 52 : 30,
          height: isHovering ? 52 : 30,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <div
          className="w-full h-full rounded-full border border-white transition-all duration-200"
          style={{ background: isHovering ? "rgba(255,255,255,0.08)" : "transparent" }}
        />
        {cursorLabel && (
          <span className="absolute text-[9px] font-dm font-semibold text-white uppercase tracking-widest whitespace-nowrap">
            {cursorLabel}
          </span>
        )}
      </motion.div>

      {/* ── Inner dot ── */}
      <motion.div
        className="pointer-events-none fixed z-9999 mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isHovering ? 5 : 7,
          height: isHovering ? 5 : 7,
          opacity: isHovering ? 0.6 : 1,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 600 }}
      >
        <div className="w-full h-full rounded-full border-4 border-white" />
      </motion.div>
    </div>
  );
}
