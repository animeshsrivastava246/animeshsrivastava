import { motion } from "framer-motion";
import Image from "next/image";
import { ImageItem } from "./types";

type Props = {
  images: ImageItem[];
  direction?: "up" | "down";
  speed?: number;
};

const ScrollingColumn: React.FC<Props> = ({
  images,
  direction = "up",
  speed = 40,
}) => {
  // Use 3 sets of images for a seamless loop
  const loopImages = [...images, ...images, ...images];

  return (
    <div className="relative overflow-hidden h-[850px] group/col rounded-2xl bg-white/1 border border-white/10 backdrop-blur-3xl shadow-inner-xl">
      <div
        className={`flex flex-col gap-6 py-6 animate-infinite-scroll ${direction === "down" ? "animate-infinite-scroll-reverse" : ""
          } group-hover/col:[animation-play-state:paused]`}
        style={{
          "--animation-duration": `${speed}s`,
        } as React.CSSProperties}
      >
        {loopImages.map((img, idx) => (
          <motion.div
            key={`${img.id}-${idx}`}
            className="relative w-full shrink-0 px-5"
            whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
          >
            <div className="relative overflow-hidden rounded-2xl group/img border border-white/10 bg-black/40 shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-blue-500/10 hover:border-white/20">
              {/* Premium Glare Effect */}
              <div className="absolute inset-0 bg-linear-to-br from-white/15 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />

              <Image
                src={img.url}
                alt={img.alt || img.title || "Gallery image"}
                className="w-full h-auto transition-all duration-1000 group-hover/img:scale-110 group-hover/img:brightness-110 group-hover/img:rotate-1"
                loading="lazy"
                sizes="512px"
              />

              {/* Glassmorphic Caption */}
              <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover/img:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-20 backdrop-blur-[3px]">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-white text-xl font-black tracking-tight leading-none">
                    {img.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-[2px] bg-linear-to-r from-blue-500 to-indigo-500 rounded-full" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50">Capture</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .animate-infinite-scroll {
          animation: scroll var(--animation-duration) linear infinite;
        }
        .animate-infinite-scroll-reverse {
          animation: scroll-reverse var(--animation-duration) linear infinite;
        }
        @keyframes scroll {
          from { transform: translateY(0); }
          to { transform: translateY(-33.33%); }
        }
        @keyframes scroll-reverse {
          from { transform: translateY(-33.33%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ScrollingColumn;
