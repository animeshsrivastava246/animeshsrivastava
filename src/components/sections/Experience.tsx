"use client";

import { motion } from "framer-motion";
import { type Experience, experiences } from "../../data/experience";
import { useRef } from "react";
import VariableProximity from "../animations/VariableProximity";
import Link from "next/link";
import { ExternalLink, Terminal } from "lucide-react";

const ExperienceCard = ({ exp, index }: { exp: Experience; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative pl-8 sm:pl-12 py-4 group"
    >
      {/* HUD Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-primary/50 via-primary/20 to-transparent group-last:bottom-auto group-last:h-full group-hover:from-blue-400 group-hover:via-purple-400 transition-colors duration-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]" />

      {/* HUD Timeline Node */}
      <div className="absolute left-[-4px] top-6 w-2 h-2 rounded-sm bg-primary ring-2 ring-background z-10 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(59,130,246,0.8)] group-hover:bg-blue-400" />
      <div className="absolute left-[-8px] top-[20px] w-4 h-4 rounded-sm border border-primary/40 z-0 animate-[spin_4s_linear_infinite] group-hover:border-blue-400" />

      {/* Compact HUD Card */}
      <div className="bg-card/20 border-l-2 border-l-primary/50 border-y border-y-border/20 border-r border-r-border/20 text-card-foreground p-5 rounded-r-2xl backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:-translate-y-1 hover:border-l-blue-500 transition-all duration-300 relative z-0 overflow-hidden group/card glass">

        {/* Scanning Line Effect */}
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite]" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Terminal className="w-4 h-4 text-primary" />
              <h3 className="text-lg font-bold font-heading text-foreground tracking-wide group-hover:text-primary transition-colors">
                {exp.role}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors">
              <Link
                href={exp.link}
                target="_blank"
                className="hover:text-blue-400 flex items-center gap-1 transition-colors z-20 relative"
              >
                <span className="text-foreground">{exp.company}</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <span className="text-primary/50">{"//"}</span>
              <span className="uppercase tracking-widest">{exp.type}</span>
            </div>
          </div>
          <div className="text-[10px] sm:text-xs font-mono font-semibold px-3 py-1 bg-primary/10 text-primary border border-primary/20 shadow-[0_0_5px_rgba(59,130,246,0.2)]">
            {exp.period}
          </div>
        </div>

        <ul className="space-y-2 mb-4 text-muted-foreground text-xs sm:text-sm font-mono text-left relative z-10">
          {exp.description.map((desc, i) => (
            <li key={i} className="flex gap-2 leading-relaxed group/item">
              <span className="text-primary/70 mt-0.5 shrink-0 opacity-50 group-hover/item:opacity-100 transition-opacity">{">"}</span>
              <span className="group-hover/item:text-foreground/90 transition-colors">{desc}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 relative z-10">
          {exp.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 text-[10px] sm:text-xs font-mono font-medium bg-black/20 text-foreground/80 border border-primary/20 hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all duration-300"
            >
              [{skill}]
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function ExperienceSection() {
  const containerRef = useRef<HTMLElement>(null);
  return (
    <section ref={containerRef} className="py-24 px-4 md:px-8 w-full relative">
      {/* Subtle Grid Background for HUD feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,black_10%,transparent_100%)] pointer-events-none z-[-1]" />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 flex flex-col justify-center items-center"
        >
          <VariableProximity
            label={"SYSTEM.LOG: EXPERIENCE"}
            className={"text-3xl md:text-5xl font-heading font-bold mb-4 text-foreground text-center"}
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef as React.RefObject<HTMLElement>}
            radius={100}
            falloff="linear"
          />
          <p className="text-muted-foreground max-w-xl mx-auto font-mono text-xs sm:text-sm uppercase tracking-widest opacity-70">
            Scanning operational history and deployed architecture.
          </p>
        </motion.div>

        <div className="flex flex-col">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
