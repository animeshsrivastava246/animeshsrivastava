import React from "react";
import ImageSlider from "../animations/ImageGallery";
import VariableProximity from "../animations/VariableProximity";
import { motion } from "framer-motion";
import bgImage from "../../assets/images/BeachViewBackground.jpg";
import { colors } from "@/src/lib/colors";
import { BookOpen, Landmark } from "lucide-react";

const Life = () => {
  const containerRef = React.useRef<HTMLElement>(null);
  return (
    <section
      ref={containerRef}
      className="w-full py-20"
      aria-labelledby="contact-heading"
      role="region"
    >
      <div className="rounded-4xl py-20 w-full flex flex-col items-center text-center" style={{ backgroundImage: `url(${bgImage.src})` }}>
        <div className="flex flex-col justify-center items-center w-full">
          <VariableProximity
            label={"Beyond debugging and development"}
            className={"text-3xl sm:text-4xl md:text-5xl mb-8 text-white font-heading font-bold text-center"}
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef as React.RefObject<HTMLElement>}
            radius={100}
            falloff="linear"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-md sm:text-xl font-bold"
          style={{ color: colors.blue.dark }}
        >
          Driven by flavors, movement, and journeys with meaning
        </motion.p>

        <div className="max-w-screen my-6">
          <ImageSlider />
        </div>

        {/* Life Interests SVGs */}
        <div className="flex justify-center gap-12 md:gap-24 flex-wrap pb-12">
          {/* Books */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center gap-4 text-white/80 hover:text-white transition-colors"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full glass flex items-center justify-center neumorphic shadow-white/10 hover:shadow-white/30 transition-shadow duration-300">
              <BookOpen className="w-10 h-10 md:w-12 md:h-12" />
            </div>
            <span className="font-body font-bold text-sm tracking-widest textShadow">BOOKS</span>
          </motion.div>

          {/* Indian History & Culture */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center gap-4 text-white/80 hover:text-white transition-colors"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full glass flex items-center justify-center neumorphic shadow-white/10 hover:shadow-white/30 transition-shadow duration-300">
              <Landmark className="w-10 h-10 md:w-12 md:h-12" />
            </div>
            <span className="font-body font-bold text-sm tracking-widest textShadow uppercase text-center">Indian Culture<br />& History</span>
          </motion.div>

          {/* Batman */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center gap-4 text-white/80 hover:text-white transition-colors"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full glass flex items-center justify-center neumorphic shadow-white/10 hover:shadow-white/30 transition-shadow duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-10 h-10 md:w-14 md:h-14">
                <path d="M508.4 207.6c-4.4-4-11.2-5.6-17.6-4.8c-26 3.6-56 12.8-82.4 28.8c-20-13.6-43.6-26.4-69.6-36.8c12.4-23.2 24.8-49.6 36-79.6c2.4-6 0-12.8-5.6-16.4c-5.6-3.6-13.2-3.2-18.4 1.2c-15.2 12.4-30 25.6-44 39.6c-5.6-7.2-11.2-12-16.8-14.8c-7.6-4-15.6-6-23.6-6v38.8c0 2.8-2.4 5.2-5.2 5.2c-2.8 0-5.2-2.4-5.2-5.2V118.8c-8 0-16 2-23.6 6c-5.6 2.8-11.2 7.6-16.8 14.8c-14-14-28.8-27.2-44-39.6c-5.2-4.4-12.8-4.8-18.4-1.2c-5.6 3.6-8 10.4-5.6 16.4c11.2 30 23.6 56.4 36 79.6c-26 10.4-49.6 23.2-69.6 36.8c-26.4-16-56.4-25.2-82.4-28.8c-6.4-.8-13.2.8-17.6 4.8c-4.4 4-6.4 10.8-4.8 17.2C13.6 288 32.8 322 66 348c27.6 21.6 63.2 34 102.8 34c22 0 42.8-5.2 61.6-14c11.6-5.6 22-12.8 30.8-20.8c8.8 8 19.2 15.2 30.8 20.8c18.8 8.8 39.6 14 61.6 14c39.6 0 75.2-12.4 102.8-34c33.2-26 52.4-60 67.2-122.8c1.6-6.4-.4-13.2-4.8-17.2z" />
              </svg>
            </div>
            <span className="font-body font-bold text-sm tracking-widest textShadow uppercase">Batman</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Life;
