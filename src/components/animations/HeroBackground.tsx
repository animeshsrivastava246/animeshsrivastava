"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import HeroHUDFallback from "./HeroHUD/HeroHUDFallback";
import { checkWebGLSupport, checkIsLowEndDevice } from "../../lib/capabilities";
import { Sparkles, Cpu } from "lucide-react";

// Lazy-load Three.js bundle only when needed
const DynamicHero3D = dynamic(() => import("./Hero3D/Hero3D"), {
  ssr: false,
  loading: () => <HeroHUDFallback />,
});

export default function HeroBackground() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"3d" | "hud">("hud");
  const [canRun3D, setCanRun3D] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasWebGL = checkWebGLSupport();
    const isLowEnd = checkIsLowEndDevice();

    // Default to HUD for low-end / mobile with weak hardware, 3D for capable hardware
    if (hasWebGL && !isLowEnd) {
      setCanRun3D(true);
      setMode("3d");
    } else {
      setCanRun3D(hasWebGL);
      setMode("hud");
    }
  }, []);

  const toggleMode = () => {
    setMode((prev) => (prev === "3d" ? "hud" : "3d"));
  };

  // Static SSR & initial render fallback
  if (!mounted) {
    return <HeroHUDFallback />;
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      {mode === "3d" && canRun3D ? (
        <DynamicHero3D />
      ) : (
        <HeroHUDFallback />
      )}

      {/* Mode Switcher HUD Badge */}
      {canRun3D && (
        <div className="absolute top-20 right-4 sm:top-24 sm:right-8 z-20 pointer-events-auto">
          <button
            onClick={toggleMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono font-medium tracking-wider uppercase transition-all duration-300 border border-white/10 bg-black/40 backdrop-blur-md text-white/70 hover:text-white hover:border-white/30 hover:bg-black/60 shadow-lg cursor-pointer"
            title={mode === "3d" ? "Switch to High-Performance HUD" : "Switch to 3D Orbit"}
          >
            {mode === "3d" ? (
              <>
                <Cpu className="w-3 h-3 text-blue-400" />
                <span>3D ORBIT</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>TACTICAL HUD</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
