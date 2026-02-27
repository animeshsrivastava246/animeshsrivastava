import React from "react";
import SkillsStore from "../SkillsStore";
import VariableProximity from "../animations/VariableProximity";
import { useRef } from "react";

const Skills = () => {
  const containerRef = useRef<HTMLElement>(null);
  return (
    <section className="w-full py-20 px-4 md:px-8" ref={containerRef}>
      <VariableProximity
        label={"What I Use"}
        className={"text-3xl md:text-5xl font-heading font-bold text-foreground text-center"}
        fromFontVariationSettings="'wght' 400, 'opsz' 9"
        toFontVariationSettings="'wght' 1000, 'opsz' 40"
        containerRef={containerRef as React.RefObject<HTMLElement>}
        radius={100}
        falloff="linear"
      />
      <div className="w-full max-w-6xl flex items-center justify-center mt-6 md:mt-12">
        <SkillsStore />
      </div>
    </section>
  );
};

export default Skills;