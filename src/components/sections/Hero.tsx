"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import myPic from "../../../public/og-image.webp";
import VariableProximity from "../animations/VariableProximity";
import { basicDetails } from "../../data/basic";
import Hero3D from "../animations/Hero3D";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.7], [0, 60]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-dvh flex flex-col justify-center bg-background overflow-x-clip pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16"
      id="home"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <Hero3D />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[60px] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        <div
          ref={containerRef}
          className="relative w-full flex flex-col justify-center max-w-6xl"
        >
          <motion.div
            style={
              typeof window !== "undefined" && window.innerWidth < 768
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity, scale, y }
            }
            className="relative flex flex-col gap-4 sm:gap-6 will-change-transform"
          >
            {/* OG Avatar */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 shrink-0">
              <Image
                src={myPic}
                alt={basicDetails.name}
                sizes="(max-width: 640px) 96px, 144px"
                width={160}
                height={160}
                priority
                loading="eager"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Badge */}
            <div className="flex items-center gap-3 px-4 py-1.5 sm:px-5 sm:py-2 glass-island w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-xs sm:text-sm font-semibold">
                Available for Opportunities
              </span>
            </div>

            {/* Heading */}
            <h2 className="relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight">
              <VariableProximity
                label={"Hi, I'm"}
                className="block opacity-90 hover:opacity-100 transition-opacity duration-700 text-white"
                fromFontVariationSettings="'wght' 300, 'opsz' 20"
                toFontVariationSettings="'wght' 900, 'opsz' 90"
                containerRef={containerRef as React.RefObject<HTMLDivElement>}
                radius={150}
                falloff="gaussian"
              />
              <VariableProximity
                label={basicDetails.firstName.toUpperCase()}
                className="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500 pb-1 sm:pb-3"
                fromFontVariationSettings="'wght' 300, 'opsz' 20"
                toFontVariationSettings="'wght' 900, 'opsz' 90"
                containerRef={containerRef as React.RefObject<HTMLDivElement>}
                radius={200}
                falloff="gaussian"
              />
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl text-white text-sm sm:text-base lg:text-lg font-medium tracking-tight leading-relaxed"
            >
              Crafting high-precision digital ecosystems with scalable architecture and immersive design with {basicDetails.experienceYears} Years of Experience. Focus on performance, aesthetics, and user impact.
            </motion.p>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-6 sm:mt-8 z-10">
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, "contact")}
              className="group relative overflow-hidden px-6 py-3.5 sm:px-8 sm:py-4 rounded-4xl bg-linear-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/30"
              data-cursor="Let's Talk"
            >
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
              <Mail className="relative z-10 w-4 h-4 group-hover:rotate-12 transition" />
              <span className="relative z-10">LET&apos;S TALK</span>
            </a>
            <a
              href="#projects"
              onClick={(e) => handleScroll(e, "projects")}
              className="group relative overflow-hidden px-6 py-3.5 sm:px-8 sm:py-4 rounded-4xl border border-white/40 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:bg-white hover:text-black"
              data-cursor="Explore Work"
            >
              <span className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
              <span className="relative z-10">EXPLORE WORK</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;