"use client";
import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Lottie from "lottie-react";
import educationAnimation from "../../assets/animations/Education.json";
import skillsAnimation from "../../assets/animations/Skills.json";
import VariableProximity from "../animations/VariableProximity";
import { MapPin, BriefcaseBusiness, Code2, GraduationCap, Search, TrendingUp } from "lucide-react";
import StatsSection from "../StatsSection";

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full py-20 px-4 md:px-8 flex flex-col items-center"
      role="region"
      aria-labelledby="about-heading"
    >
      <VariableProximity
        label={"About me"}
        className={"text-3xl md:text-5xl font-heading font-bold mb-4 text-foreground text-center"}
        fromFontVariationSettings="'wght' 400, 'opsz' 9"
        toFontVariationSettings="'wght' 1000, 'opsz' 40"
        containerRef={sectionRef as React.RefObject<HTMLElement>}
        radius={100}
        falloff="linear"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-4 gap-4 grow max-w-6xl w-full"
      >
        {/* Main Hero Bento */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 sm:col-span-2 lg:col-span-4 lg:row-span-2 rounded-3xl p-8 flex flex-col justify-between glass border border-border/50 bg-card/40 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

          <motion.div
            animate={{
              y: [-25, 25, -25],
              x: [-15, 15, -15],
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 -right-20 w-64 h-64 bg-linear-to-tr from-blue-600/10 to-indigo-500/10 rounded-full blur-[80px] pointer-events-none z-0"
          />

          <div className="w-full relative z-10" ref={containerRef}>
            <VariableProximity
              label={"Architecting elegance. \nEngineering scale."}
              className="text-3xl/10 md:text-5xl/14 text-foreground tracking-tight mb-4"
              fromFontVariationSettings="'wght' 400, 'opsz' 30"
              toFontVariationSettings="'wght' 900, 'opsz' 80"
              containerRef={containerRef as React.RefObject<HTMLDivElement>}
              radius={50}
              falloff="linear"
            />

            <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl font-body leading-relaxed">
              I craft high-performance digital ecosystems where robust engineering meets intuitive design, transforming complex problems into seamless user experiences.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-2 text-foreground font-medium bg-background/50 backdrop-blur-sm w-fit px-4 py-2 rounded-full border border-border/50 relative z-10">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <MapPin className="text-red-500 w-5 h-5" />
            </motion.div>
            <span>Lucknow, India</span>
          </div>
        </motion.div>

        {/* Free Time Highlights */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 sm:col-span-1 lg:col-span-2 lg:row-span-1 rounded-3xl p-6 flex flex-col items-center justify-center glass border border-border/50 bg-card/40 relative overflow-hidden"
        >
          <h3 className="font-bold font-heading text-xl text-foreground mb-4 w-full text-center flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            Milestones
          </h3>
          <div className="w-full relative z-10">
            <StatsSection />
          </div>
        </motion.div>

        {/* Journey Quick View */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 sm:col-span-2 lg:row-span-2 lg:col-span-2 rounded-3xl p-6 lg:p-8 flex flex-col justify-center glass border border-border/50 bg-card/40 relative group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] z-0 group-hover:bg-primary/10 transition-colors duration-500" />

          <motion.div
            animate={{
              y: [15, -15, 15],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-10 -left-10 w-48 h-48 bg-linear-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-[60px] pointer-events-none z-0"
          />

          <h3 className="font-bold font-heading text-xl md:text-2xl mb-6 text-foreground flex items-center gap-2 relative z-10">
            <BriefcaseBusiness className="text-primary w-6 h-6" />
            Journey So Far
          </h3>
          <ul className="space-y-4 font-body relative z-10">
            {[
              {
                role: "React Native Developer",
                company: "VicDigit",
                duration: "Jan 2024 – Present",
              },
              {
                role: "React Developer",
                company: "UnOrg",
                duration: "Feb 2023 – April 2023",
              },
            ].map((exp, idx) => (
              <li key={idx} className="bg-background/40 backdrop-blur-sm border border-border/50 p-4 rounded-2xl hover:bg-background/60 transition-colors">
                <p className="text-base font-bold text-foreground">{exp.role}</p>
                <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground w-full">
                  <span className="font-medium text-primary">{exp.company}</span>
                  <span>{exp.duration}</span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Education */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 sm:col-span-1 lg:row-span-1 lg:col-span-2 rounded-3xl p-6 lg:p-8 flex flex-col justify-between glass border border-border/50 bg-card/40 relative overflow-hidden group"
        >
          <div className="relative z-10">
            <h3 className="font-bold font-heading text-xl mb-2 text-foreground flex items-center gap-2">
              <GraduationCap className="text-primary w-6 h-6" />
              Education
            </h3>
            <p className="text-base font-medium text-foreground">Bachelor of Technology</p>
            <p className="text-base font-bold text-foreground">MMMUT</p>
            <p className="text-sm text-muted-foreground mt-1">2020 – 2024</p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-50 group-hover:opacity-80 transition-opacity duration-300 w-32 h-32 pointer-events-none z-10">
            <Lottie animationData={educationAnimation} loop={false} />
          </div>

          <motion.div
            animate={{
              x: [-10, 10, -10],
              y: [10, -10, 10],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-linear-to-tr from-yellow-500/10 to-orange-500/10 rounded-full blur-2xl pointer-events-none z-0"
          />
        </motion.div>

        {/* What I Do */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 sm:col-span-2 lg:row-span-2 lg:col-span-2 rounded-3xl p-6 lg:p-8 flex flex-col justify-center items-center text-center glass border border-border/50 bg-card/40 relative group"
        >
          <div className="relative z-10 w-full flex flex-col items-center">
            <h3 className="font-bold font-heading text-xl mb-4 text-foreground flex items-center justify-center gap-2">
              <Code2 className="text-primary w-6 h-6" />
              What I Do
            </h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6 max-w-[250px]">
              Delivering pixel-perfect, scalable architectures using React, React Native & modern serverless paradigms.
            </p>
            <div className="w-3/4 max-w-[150px] opacity-80 group-hover:scale-105 transition-transform duration-500">
              <Lottie animationData={skillsAnimation} />
            </div>
          </div>
        </motion.div>

        {/* My Life */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 sm:col-span-1 lg:row-span-1 lg:col-span-2 rounded-3xl p-6 glass border border-border/50 bg-card/40 flex flex-col justify-center group"
        >
          <h3 className="font-bold font-heading text-lg mb-4 text-foreground flex items-center gap-2 relative">
            <span role="img" aria-label="sparkles">☕</span> My Life
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground font-body relative z-10">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
              <span className="text-foreground font-medium">Travel</span> Love my भारत
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
              <span className="text-foreground font-medium">Music</span> new tracks
            </li>
          </ul>
        </motion.div>

        {/* Currently Learning */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 sm:col-span-1 lg:col-span-2 rounded-3xl p-2 glass border border-border/50 bg-card/40 flex flex-col items-center justify-center font-heading"
        >
          <div className="w-full flex flex-col items-center">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              Currently Learning
            </h3>
            <div className="w-full max-w-[200px] h-10 rounded-full border border-border/50 bg-background/50 flex items-center justify-start px-4 overflow-hidden relative">
              <Search className="w-4 h-4 text-muted-foreground mr-2 shrink-0" />
              <motion.div
                className="flex font-body text-sm text-foreground whitespace-nowrap"
                animate={{ y: ["0%", "-33.3%", "-66.6%", "0%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex flex-col gap-4 py-1">
                  <span>Rust</span>
                  <span>System Design</span>
                  <span>WebGL</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default About;
