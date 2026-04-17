"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import VariableProximity from "../animations/VariableProximity";
import { ArrowRightIcon } from "lucide-react";
import { projects } from "../projects";
import devImg from "../../assets/images/development.webp";

const Cooking = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="flex flex-col md:flex-row items-center justify-center h-full p-2 md:p-12 gap-4 md:gap-16"
      data-cursor="Developing"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        className="shrink-0"
      >
        <Image
          src={devImg}
          alt="Developing"
          className="w-40 h-32 md:w-96 md:h-80 shrink-0 rounded-4xl"
          placeholder="blur"
          sizes="512px"
          priority
          unoptimized={true}
        />
      </motion.div>
      <aside className="flex flex-col text-center md:text-left">
        <VariableProximity
          label="Building something new"
          className="font-heading font-bold text-xl md:text-5xl text-foreground mb-2 md:mb-4 cursor-default"
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={ref as React.RefObject<HTMLElement>}
          radius={80}
          falloff="linear"
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-muted-foreground font-body text-xs md:text-2xl max-w-xl"
        >
          Experimenting with a few new tools for an upcoming project. Stay tuned!
        </motion.p>
      </aside>
    </div>
  );
};

const Projects = ({ onSelectProject }: { onSelectProject: (id: string) => void }) => {
  const containerRef = useRef<HTMLElement>(null);
  return (
    <section id="projects" ref={containerRef} className="w-full py-20 px-4 md:px-8 scroll-mt-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="text-center mb-16 flex flex-col justify-center items-center">
          <VariableProximity
            label={"Featured Work"}
            className={"text-3xl md:text-5xl font-heading font-bold mb-4 text-foreground text-center"}
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef as React.RefObject<HTMLElement>}
            radius={100}
            falloff="linear"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-muted-foreground font-body max-w-2xl mx-auto"
          >
            A selection of projects that showcase my ability to solve problems across the stack.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full auto-rows-[350px] lg:auto-rows-[380px]">
          {projects.map((project, index) => {
            const isPortrait = project.layout === "portrait";

            // Landscape spans 7 columns, portrait spans 5 columns and 2 rows
            const colSpan = isPortrait ? 'md:col-span-5' : 'md:col-span-7';
            const rowSpan = isPortrait ? 'md:row-span-2' : '';

            return (
              <motion.div
                key={"Projects" + project.title + index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`group relative flex flex-col glass neumorphic border border-border/50 rounded-3xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 z-0 ${colSpan} ${rowSpan}`}
                onClick={() => onSelectProject(project.id)}
                data-cursor={project.title}
              >
                {/* Animated Glowing Orb Background */}
                <motion.div
                  animate={{
                    y: [-15, 15, -15],
                    x: [-10, 10, -10],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 6 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-12 -right-12 w-40 h-40 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl pointer-events-none z-[-1]"
                />

                {isPortrait ? (
                  // Full-bleed portrait specific card layout
                  <>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-90"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent group-hover:via-background/50 transition-colors duration-500" />

                    {/* Hover indicator CTA */}
                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md rounded-full p-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg z-20">
                      <ArrowRightIcon className="w-5 h-5 text-foreground -rotate-45" />
                    </div>

                    <div className="p-6 flex flex-col justify-end h-full relative z-10 w-full mt-auto group/text">
                      {/* Enhanced gradient for text readability */}
                      <div className="absolute inset-x-0 bottom-0 h-[70%] bg-linear-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />

                      <div className="relative z-10">
                        <h3 className="font-heading font-bold text-2xl text-white mb-2 group-hover:text-primary transition-colors drop-shadow-md">
                          {project.title}
                        </h3>
                        <p className="text-sm font-body text-white/90 mb-6 line-clamp-2 drop-shadow-sm font-medium">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 relative z-10">
                        {project.tech.map((tag, i) => (
                          <span
                            key={"Projects - Project Tech" + project.title + i}
                            className="text-xs font-semibold font-body rounded-md px-2.5 py-1 border border-white/20 bg-black/40 backdrop-blur-md text-white shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  // Landscape standard layout
                  <>
                    <div className="relative w-full h-32 sm:h-48 overflow-hidden bg-muted/50 border-b border-border/50 shrink-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />

                      <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md rounded-full p-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                        <ArrowRightIcon className="w-5 h-5 text-foreground -rotate-45" />
                      </div>
                    </div>

                    <div className="p-6 flex flex-col grow justify-between bg-card/40 relative z-10 w-full">
                      <div>
                        <h3 className="font-heading font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm font-body text-muted-foreground mb-6 line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tech.map((tag, i) => (
                          <span
                            key={"Projects Landscape - Project Tech" + project.title + i}
                            className="text-xs font-medium font-body rounded-md px-2.5 py-1 border border-border/60 bg-muted/50 text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: projects.length * 0.1, duration: 0.5 }}
            className="flex flex-col glass neumorphic border border-border/50 border-dashed rounded-3xl overflow-hidden cursor-default bg-card/10 hover:bg-card/30 transition-colors duration-500 z-0 relative md:col-span-12"
          >
            {/* Animated Glowing Orb Background for Cooking Card */}
            <motion.div
              animate={{
                y: [15, -15, 15],
                x: [10, -10, 10],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-12 -left-12 w-40 h-40 bg-linear-to-tr from-pink-500/10 to-orange-500/10 rounded-full blur-2xl pointer-events-none z-[-1]"
            />
            <Cooking />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
