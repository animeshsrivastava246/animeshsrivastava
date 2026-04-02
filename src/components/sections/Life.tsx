import React, { useState, useEffect, useMemo } from "react";
import VariableProximity from "../animations/VariableProximity";
import { motion } from "framer-motion";
import MasonryScroller from "./Life/MasonryScroller";

// Import images from centralized index
import { lifeImages } from "../../assets/images/life";
import { ImageItem } from "./Life/types";

// Utility to shuffle array
const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const GlassmorphicBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large radial gradients for "base" vibes */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-purple-600/5 blur-[150px]" />
      
      {/* Intentional floating glassmorphic shapes */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/5 border border-white/10 backdrop-blur-3xl rounded-full"
          initial={{ 
            x: `${15 + i * 20}%`, 
            y: `${20 + (i % 3) * 25}%`,
            rotate: 0,
            scale: 0.8 + Math.random() * 0.4
          }}
          animate={{ 
            y: ["0%", "5%", "0%"],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 10 + i * 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{
            width: `${100 + i * 40}px`,
            height: `${100 + i * 40}px`,
          }}
        />
      ))}
    </div>
  );
};

const Life = () => {
  const containerRef = React.useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const galleryImages: ImageItem[] = useMemo(() => {
    if (!isMounted) return [];
    return shuffle(lifeImages).map((img, idx) => ({
      id: idx + 1,
      url: img.url,
      title: img.title
    }));
  }, [isMounted]);
  
  return (
    <section
      ref={containerRef}
      className="w-full min-h-screen py-16 flex flex-col justify-center scroll-mt-4 relative overflow-hidden"
      id="life"
      aria-labelledby="life-heading"
      role="region"
    >
      <GlassmorphicBackground />

      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="flex flex-col justify-center items-center w-full px-6 mb-16 max-w-5xl mx-auto">
          <VariableProximity
            label={"Beyond debugging and development"}
            className={"text-4xl sm:text-6xl md:text-7xl text-white font-heading font-black text-center leading-tight tracking-tighter"}
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef as React.RefObject<HTMLElement>}
            radius={150}
            falloff="linear"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-8"
          >
            <div className="absolute -inset-1 blur-lg bg-linear-to-r from-blue-500 to-indigo-500 opacity-30 animate-pulse" />
            <p className="relative px-6 py-2 text-sm sm:text-base md:text-lg font-bold tracking-[0.2em] uppercase bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white/90">
              Driven by flavors, movement, and journeys with meaning
            </p>
          </motion.div>
        </div>

        {/* Masonry Scroller Section */}
        <div className="w-full">
          {isMounted && <MasonryScroller images={galleryImages} />}
        </div>
      </div>
    </section>
  );
};

export default Life;
