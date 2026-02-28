"use client";

import { motion } from "framer-motion";
import React, { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import myPic from "../../../public/og-image.png";
import VariableProximity from "../animations/VariableProximity";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <section
      className="w-full border-2 border-background rounded-4xl py-4 md:py-6 min-h-[calc(100vh-80px)] flex items-center justify-center relative overflow-hidden scroll-mt-6"
      aria-label="Hero Section main container"
      id="home"
    >
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10">

        {/* Left Content Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center items-start space-y-8"
        >
          <div className="space-y-4" ref={containerRef}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-semibold border border-green-500/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-90"></span>
                <span className="animate-pulse rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for new opportunities
            </motion.div>

            <h1 className="text-4xl/12 sm:text-5xl/14 lg:text-7xl/18 font-bold font-heading leading-tight tracking-tight text-foreground">
              Hi, I&apos;m <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Animesh</span>
              <br />
              <VariableProximity
                label={"Full-Stack\nDeveloper."}
                className="text-wrap"
                fromFontVariationSettings="'wght' 400, 'opsz' 30"
                toFontVariationSettings="'wght' 900, 'opsz' 80"
                containerRef={containerRef as React.RefObject<HTMLDivElement>}
                radius={50}
                falloff="gaussian"
              />
            </h1>

            <p className="max-w-xl text-lg sm:text-xl/7 text-muted-foreground font-body leading-relaxed">
              Software Developer with 2+ years of experience building and maintaining high-quality web and mobile applications for web, iOS and Android platforms. Proficient in MERN, Java, Python, and modern tech paradigms.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
          >
            {/* Primary CTA - View Projects */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const target = document.getElementById("projects");
                target?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative overflow-hidden w-full sm:w-auto px-9 py-4 rounded-full 
    bg-linear-to-r from-blue-600 to-purple-600 
    text-white font-semibold tracking-wide
    shadow-lg hover:shadow-blue-500/30 
    transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
            >
              {/* Shine effect */}
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />

              <span className="relative z-10">View My Work</span>

              <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>

            {/* Secondary CTA - Contact */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const target = document.getElementById("contact");
                target?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative w-full sm:w-auto px-9 py-4 rounded-full 
    bg-background border border-border/50
    text-foreground font-semibold tracking-wide
    shadow-lg hover:shadow-blue-500/20 
    transition-all duration-300
    flex items-center justify-center gap-3 cursor-pointer overflow-hidden"
            >
              <span className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10 group-hover:ring-blue-500/50 rounded-full transition-all duration-300" />
              <Mail className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:-rotate-12 group-hover:text-blue-500" />
              <span className="relative z-10 group-hover:text-blue-500 transition-colors duration-300">Let&apos;s Connect</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Image/Mockup Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative flex justify-center items-center lg:justify-end"
        >
          {/* Main Avatar Container */}
          <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-4 border-background shadow-2xl z-20 bg-muted">
            <Image
              src={myPic}
              alt="Animesh Srivastava Portrait"
              fill
              priority
              className="object-cover hover:scale-110 transition-transform duration-700 ease-in-out"
              sizes="(max-width: 768px) 280px, (max-width: 1024px) 350px, 400px"
            />
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute rounded-4xl bottom-10 left-14 md:left-16 glass p-3 flex items-center gap-1 shadow-xl cursor-pointer hover:scale-110 transition-scale duration-300"
              onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span className="text-sm font-bold text-foreground leading-tight">2+ Years Exp.</span>
            </motion.div>
          </div>

          {/* Abstract floating shapes behind avatar */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-10 -right-4 w-32 h-32 bg-linear-to-br from-blue-400 to-indigo-500 rounded-3xl blur-sm opacity-60 dark:opacity-40 -z-10"
          />
          <motion.div
            animate={{
              y: [10, -10, 10],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute -bottom-6 -left-6 w-40 h-40 bg-linear-to-tr from-purple-400 to-pink-500 rounded-full blur-sm opacity-60 dark:opacity-40 -z-10"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
