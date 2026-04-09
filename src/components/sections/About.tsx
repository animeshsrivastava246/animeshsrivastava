"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView, Variants, AnimatePresence } from "framer-motion";
import VariableProximity from "../animations/VariableProximity";
import { MapPin, BriefcaseBusiness, GraduationCap, Search, TrendingUp, CodeXml,  Coffee, Sparkles, Palmtree, Music, Camera, BookOpen, Gamepad2 } from "lucide-react";

const IconMap: Record<string, any> = {
  Coffee,
  Sparkles,
  Palmtree,
  Music,
  Camera,
  BookOpen,
  Gamepad2,
  CodeXml
};
import StatsSection from "../StatsSection";
import { basicDetails } from "../../data/basic";

const IntersectionVideo = ({ src, className }: { src: string; className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { margin: "-50px" });

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play();
    } else if (!isInView && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isInView]);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      preload="none"
      className={className || "w-full h-full object-contain"}
    />
  );
};

const LearningTicker = ({ items }: { items: string[] }) => {
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="flex-1 h-full flex items-center overflow-hidden ml-2">
      <AnimatePresence mode="wait">
        <motion.span
          key={"About" + items[index] + index}
          initial={{ y: 15, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -15, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="text-sm font-body text-foreground/80 font-medium"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full py-24 px-4 md:px-8 flex flex-col items-center scroll-mt-4 overflow-hidden"
      role="region"
      aria-labelledby="about-heading"
    >
      <div className="relative mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-12 -left-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none"
        />
        <VariableProximity
          label={"About me"}
          className={"text-4xl md:text-7xl font-heading font-black tracking-tighter text-foreground text-center"}
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={sectionRef as React.RefObject<HTMLElement>}
          radius={150}
          falloff="linear"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8 max-w-7xl w-full"
      >
        {/* Main Hero Card - The Pinterest "Anchor" */}
        <motion.div
          variants={itemVariants}
          className="break-inside-avoid rounded-[2.5rem] p-10 flex flex-col justify-between glass border border-white/10 dark:border-white/5 bg-linear-to-br from-card/60 to-card/20 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-radial-gradient(circle at 0% 0%, var(--color-primary) / 0.05, transparent 50%) transition-opacity duration-700 opacity-50 group-hover:opacity-100" />

          <div className="relative z-10" ref={containerRef}>
            <VariableProximity
              label={basicDetails.heroDescription}
              className="text-3xl/12 md:text-4xl/12 font-heading font-bold text-foreground tracking-tight mb-8"
              fromFontVariationSettings="'wght' 400, 'opsz' 30"
              toFontVariationSettings="'wght' 900, 'opsz' 80"
              containerRef={containerRef as React.RefObject<HTMLDivElement>}
              radius={60}
              falloff="linear"
            />

            <p className="text-md md:text-lg/6 text-muted-foreground/90 font-body leading-relaxed max-w-prose">
              {basicDetails.aboutDescription}
            </p>
          </div>

          <div className="mt-12 flex items-center gap-3 w-fit px-6 py-3 rounded-4xl glass border border-white/10 bg-white/5 shadow-inner relative z-10">
            <MapPin className="text-red-500 w-5 h-5 animate-bounce" />
            <span className="text-sm font-heading font-bold tracking-wide uppercase text-foreground/80">{basicDetails.location}</span>
          </div>
        </motion.div>

        {/* Milestones Card - Minimalist Glass */}
        <motion.div
          variants={itemVariants}
          className="break-inside-avoid rounded-4xl p-8 flex flex-col items-center glass border border-white/5 bg-card/30 relative overflow-hidden group hover:bg-card/40 transition-colors duration-500"
        >
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl" />
          <h3 className="font-heading font-bold text-sm tracking-[0.2em] uppercase text-muted-foreground mb-8 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-400" />
            Performance Metrics
          </h3>
          <div className="w-full relative z-10">
            <StatsSection />
          </div>
        </motion.div>

        {/* Journey Card - Interactive List */}
        <motion.div
          variants={itemVariants}
          className="break-inside-avoid rounded-[2.2rem] p-8 lg:p-10 flex flex-col glass border border-white/5 bg-card/30 relative group shadow-lg"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-bl from-primary/10 to-transparent rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          <h3 className="font-heading font-bold text-xl mb-8 text-foreground flex items-center gap-3">
            <BriefcaseBusiness className="text-primary w-6 h-6" />
            Experience Journey
          </h3>
          <div className="space-y-5 relative z-10">
            {basicDetails.experience.map((exp, idx) => (
              <motion.div
                key={"Experience" + exp.company + idx}
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 group/item"
              >
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary ring-4 ring-primary/10" />
                <div className="flex-1">
                  <p className="text-base font-bold text-foreground leading-none">{exp.role}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-primary/80">{exp.company}</span>
                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground">{exp.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Currently Learning Card - "The Search bar" */}
        <motion.div
          variants={itemVariants}
          className="break-inside-avoid rounded-4xl p-8 glass border border-white/5 bg-card/30 flex flex-col gap-6 group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-bold text-foreground flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              Focus
            </h3>
          </div>

          <div className="w-full h-14 rounded-4xl border border-white/10 bg-background/40 backdrop-blur-xl flex items-center px-4 relative group-hover:border-primary/30 transition-colors shadow-inner">
            <div className="flex items-center gap-2 flex-1 h-full">
              <Search className="w-4 h-4 text-muted-foreground/60" />
              <div className="h-4 w-px bg-white/10 mx-1" />
              <div className="flex flex-col flex-1 h-full justify-center">
                <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-primary/60 mb-0.5">Currently Learning</span>
                <LearningTicker items={basicDetails.learning} />
              </div>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map(i => <div key={"About - Currently Learning" + i} className="w-1.5 h-1.5 rounded-full bg-white/5" />)}
            </div>
          </div>

          <p className="text-sm text-muted-foreground font-body leading-relaxed px-1">
            Diversifying my technical stack with a focus on systems programming and graphic performances.
          </p>
        </motion.div>

        {/* Education & Dev Video - Merged Aesthetic */}
        <motion.div
          variants={itemVariants}
          className="break-inside-avoid rounded-[2.5rem] p-0 glass border border-white/5 bg-card/30 relative overflow-hidden group flex flex-col"
        >
          <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-75 transition-opacity duration-500">
            <IntersectionVideo src="/Development.webm" className="w-full h-full object-cover" />
          </div>

          <div className="relative z-10 p-10 mt-auto">
            <h3 className="font-heading font-bold text-xl text-foreground mb-3 flex items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <GraduationCap className="text-primary w-6 h-6" />
              </div>
              Academia
            </h3>
            <div className="space-y-1">
              <p className="text-lg font-extrabold text-foreground/90">{basicDetails.education.university}</p>
              <p className="text-sm font-bold text-muted-foreground">{basicDetails.education.degree}</p>
              <span className="text-xs font-heading font-extrabold tracking-widest text-primary">{basicDetails.education.duration}</span>
            </div>
          </div>
        </motion.div>

        {/* Interests - Grid Style */}
        <motion.div
          variants={itemVariants}
          className="break-inside-avoid rounded-4xl p-8 glass border border-black/10 dark:border-white/5 bg-slate-50/50 dark:bg-card/30 flex flex-col group shadow-xl shadow-black/3 dark:shadow-none"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <Sparkles className="text-yellow-500 w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-xl text-foreground">Beyond Code</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {basicDetails.interests.flatMap(category => category.items).map((item, idx) => {
              const Icon = IconMap[item.icon as string] || IconMap.Sparkles;
              return (
                <motion.div
                  key={"About" + item.label + idx}
                  whileHover={{ scale: 1.02, translateY: -2 }}
                  className="p-4 rounded-4xl glass"
                >
                  <div className="flex flex-col items-center gap-4 opacity-60 hover:opacity-100 transition-opacity duration-100 ">
                    <div className="flex items-center justify-start gap-4 w-full">
                      <Icon size={22} />
                      <span className="text-md font-bold text-foreground leading-none mb-1">{item.label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="pt-6 text-xs italic text-muted-foreground/60 text-center font-body">
            "Software is a tool, but life is the craft."
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default About;
