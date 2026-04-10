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
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.7], [0, 60]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-dvh overflow-hidden bg-background"
      id="home"
    >
      {/* Background */}
      <Hero3D />
      <div className="absolute inset-0 bg-black/30 pointer-events-none z-0" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[60px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[60px] pointer-events-none z-0" />
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">

        <div
          ref={containerRef}
          className="relative w-full h-full flex flex-col justify-center"
        >
          <motion.div
            style={
              typeof window !== "undefined" && window.innerWidth < 768
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity, scale, y }
            }
            className="relative flex flex-col gap-6 will-change-transform"
          >
            {/* OG */}
            <div className="w-40 h-40 rounded-3xl overflow-hidden">
              <Image
                src={myPic}
                alt={basicDetails.name}
                sizes="144px"
                loading="eager"
                className="object-cover"
              />
            </div>

            {/* Badge */}
            <div className="flex items-center gap-3 px-5 py-2 glass-island w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-sm font-semibold">
                Available for Opportunities
              </span>
            </div>

            {/* Heading */}
            <h2 className="relative text-5xl md:text-8xl font-black leading-[0.9]">
              <VariableProximity label={"Hi, I'm"}
                className="block opacity-90 hover:opacity-100 transition-opacity duration-700 text-white"
                fromFontVariationSettings="'wght' 300, 'opsz' 20"
                toFontVariationSettings="'wght' 900, 'opsz' 90"
                containerRef={containerRef as React.RefObject<HTMLDivElement>}
                radius={150}
                falloff="gaussian" />
              <VariableProximity label={basicDetails.firstName.toUpperCase()}
                className="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500 pb-2 sm:pb-4 lg:pb-6"
                fromFontVariationSettings="'wght' 300, 'opsz' 20"
                toFontVariationSettings="'wght' 900, 'opsz' 90"
                containerRef={containerRef as React.RefObject<HTMLDivElement>}
                radius={200}
                falloff="gaussian" />
            </h2>

            <motion.p initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl text-white sm:text-lg lg:text-xl font-medium tracking-tight leading-relaxed mb-0 sm:mb-10">
              Crafting high-precision digital ecosystems with scalable architecture and immersive design with {basicDetails.experienceYears} Years of Experience. Focus on performance, aesthetics, and user impact.
            </motion.p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 lg:justify-end lg:items-center mt-15 sm:mt-0">
            <a
              href="#contact"
              className="group relative overflow-hidden px-8 py-4 rounded-4xl bg-linear-to-r from-blue-600 to-purple-600 text-white text-sm font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/30"
              data-cursor="Let's Talk"
            >
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
              <Mail className="relative z-10 w-4 h-4 group-hover:rotate-12 transition" />
              <span className="relative z-10">LET'S TALK</span>
            </a>
            <a
              href="#projects"
              className="group relative overflow-hidden px-8 py-4 rounded-4xl border border-white/40 text-white text-sm font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:bg-white hover:text-black"
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