"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import VariableProximity from "../animations/VariableProximity";
import { ArrowRightIcon } from "lucide-react";
import chefAnimation from "../../assets/animations/chef.json";
import Lottie from "lottie-react";
import { projects } from "../projects";

const Cooking = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });
  const lottieRef = useRef<import("lottie-react").LottieRefCurrentProps>(null);

  useEffect(() => {
    if (isInView && lottieRef.current) {
      lottieRef.current.play();
    } else if (!isInView && lottieRef.current) {
      lottieRef.current.stop();
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="flex flex-col justify-center items-center h-full p-8 text-center"
    >
      <div className="w-32 md:w-40 opacity-80 mb-6">
        <Lottie
          lottieRef={lottieRef}
          animationData={chefAnimation}
          loop={true}
          autoplay={false}
        />
      </div>
      <h3 className="font-heading font-bold text-xl text-foreground mb-2">Currently Cooking</h3>
      <p className="text-muted-foreground font-body text-sm max-w-[250px]">
        Experimenting with a few new tools for an upcoming project. Stay tuned!
      </p>
    </div>
  );
};

const Projects = ({ onSelectProject }: { onSelectProject: (id: string) => void }) => {
  const containerRef = useRef<HTMLElement>(null);
  return (
    <section ref={containerRef} className="w-full py-20 px-4 md:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {projects.map((project, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative flex flex-col glass neumorphic border border-border/50 rounded-3xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 z-0"
                onClick={() => onSelectProject(project.id)}
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

                <div className="relative w-full h-40 sm:h-52 overflow-hidden bg-muted/50 border-b border-border/50">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle overlay for better text contrast/consistency */}
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />

                  {/* Hover indicator CTA */}
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md rounded-full p-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                    <ArrowRightIcon className="w-5 h-5 text-foreground -rotate-45" />
                  </div>
                </div>

                <div className="p-6 flex flex-col grow justify-between bg-card/40 relative z-10">
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
                        key={i}
                        className="text-xs font-medium font-body rounded-md px-2.5 py-1 border border-border/60 bg-muted/50 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: projects.length * 0.1, duration: 0.5 }}
            className="flex flex-col glass neumorphic border border-border/50 border-dashed rounded-3xl overflow-hidden cursor-default bg-card/10 hover:bg-card/30 transition-colors duration-500 z-0 relative"
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
            <div className="relative z-10 w-full h-full flex flex-col justify-center">
              <Cooking />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
