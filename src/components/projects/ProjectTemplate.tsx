"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { MdArrowBackIos } from "react-icons/md";
import type { ReactNode } from "react";

export interface ProjectDetailItem {
  label: string;
  value: ReactNode;
}

export interface ContentCard {
  title: string;
  barColor: string;
  textColor: string;
  content: string;
  glowTop?: string;
  glowBottom?: string;
}

export interface ProjectTemplateProps {
  onBack: () => void;
  title: string;
  tagline: string;
  coverImage: StaticImageData | string;
  coverAlt: string;
  heroLayout?: "landscape" | "split";
  bannerShadowClass?: string;
  titleGradientClass: string;
  taglineBgClass?: string;
  details: ProjectDetailItem[];
  sidebarExtra?: ReactNode;
  firstCard: ContentCard;
  secondCard: ContentCard;
}

const ProjectTemplate = ({
  onBack,
  title,
  tagline,
  coverImage,
  coverAlt,
  heroLayout = "landscape",
  bannerShadowClass = "shadow-[0_0_60px_rgba(168,85,247,0.15)]",
  titleGradientClass,
  taglineBgClass = "bg-black/20 p-2 rounded-2xl",
  details,
  sidebarExtra,
  firstCard,
  secondCard,
}: ProjectTemplateProps) => {
  return (
    <div className="w-full font-sans max-w-6xl mx-auto md:mt-24 overflow-hidden">
      {/* Subtle Grid Background for HUD feel */}
      <aside className="fixed inset-0 pointer-events-none z-[-1] blur-[0.8px] bg-[linear-gradient(var(--primary)_2px,transparent_2px),linear-gradient(90deg,var(--primary)_2px,transparent_2px)] opacity-[0.2] dark:opacity-[0.2] bg-size-[32px_32px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,black_50%,transparent_120%)]" />

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="opacity-75 text-md font-semibold flex items-center gap-2 m-2 hover:text-primary hover:scale-110 hover:cursor-pointer hover:opacity-100 transition-all duration-300 text-muted-foreground"
      >
        <MdArrowBackIos /> Back to Projects
      </motion.button>

      {/* Hero Banner animated */}
      {heroLayout === "split" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="flex flex-col justify-center h-full order-2 md:order-1 space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className={`text-4xl md:text-6xl font-heading font-black text-transparent bg-clip-text bg-linear-to-r ${titleGradientClass} mb-6`}>
                {title}
              </h1>
              <p className={`text-white text-lg md:text-xl font-medium backdrop-blur-md shadow-lg leading-relaxed ${taglineBgClass}`}>
                {tagline}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className={`relative w-full h-[60vh] max-h-150 rounded-4xl overflow-hidden glass border border-white/10 ${bannerShadowClass} group order-1 md:order-2 self-center flex items-center justify-center p-4 bg-muted/20`}
          >
            <div className="relative w-full h-full">
              <Image
                src={coverImage}
                alt={coverAlt}
                fill
                loading="eager"
                className="object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className={`relative w-full h-[40vh] md:h-[50vh] rounded-4xl overflow-hidden glass border border-white/10 ${bannerShadowClass} mb-12 group`}
        >
          <Image
            src={coverImage}
            alt={coverAlt}
            fill
            loading="eager"
            className="object-contain group-hover:scale-105 transition-transform duration-700 opacity-60"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className={`text-4xl md:text-6xl font-heading font-black text-transparent bg-clip-text bg-linear-to-r ${titleGradientClass} mb-4`}>
                {title}
              </h1>
              <p className={`text-white text-lg md:text-xl font-medium max-w-2xl backdrop-blur-md inline-block shadow-lg ${taglineBgClass}`}>
                {tagline}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-4 space-y-6"
        >
          <div className="glass-island p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
            <h3 className="font-heading font-bold text-xl text-foreground mb-4">Project Details</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {details.map((item, index) => (
                <li
                  key={item.label}
                  className={`flex justify-between ${index !== details.length - 1 ? "border-b border-white/5 pb-2" : "pt-2"}`}
                >
                  <span>{item.label}</span>
                  {typeof item.value === "string" ? (
                    <span className="text-foreground font-semibold">{item.value}</span>
                  ) : (
                    item.value
                  )}
                </li>
              ))}
            </ul>
          </div>
          {sidebarExtra}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-8 space-y-8"
        >
          <div className="glass p-8 rounded-3xl border border-white/10 neumorphic-inset">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-1.5 h-8 ${firstCard.barColor} rounded-full`} />
              <h2 className={`text-3xl font-heading font-black ${firstCard.textColor} tracking-wide`}>
                {firstCard.title}
              </h2>
            </div>
            <p className="text-foreground/90 leading-relaxed text-xl">
              {firstCard.content}
            </p>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/10 neumorphic relative overflow-hidden">
            {secondCard.glowTop && (
              <div className={`absolute top-0 right-0 w-32 h-32 ${secondCard.glowTop} rounded-full blur-3xl z-0`} />
            )}
            {secondCard.glowBottom && (
              <div className={`absolute bottom-0 left-0 w-32 h-32 ${secondCard.glowBottom} rounded-full blur-3xl z-0`} />
            )}
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className={`w-1.5 h-8 ${secondCard.barColor} rounded-full`} />
              <h2 className={`text-3xl font-heading font-black ${secondCard.textColor} tracking-wide`}>
                {secondCard.title}
              </h2>
            </div>
            <p className="text-foreground/90 leading-relaxed text-xl relative z-10">
              {secondCard.content}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectTemplate;
