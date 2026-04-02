import React, { useState, useEffect } from "react";
import { ImageItem } from "./types";
import { splitIntoColumns } from "./utils/splitIntoColumns";
import ScrollingColumn from "./ScrollingColumn";

type Props = {
  images: ImageItem[];
};

const MasonryScroller: React.FC<Props> = ({ images }) => {
  const [columnCount, setColumnCount] = useState(3);

  // Sync columns with window width for a true responsive experience
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 768) {
        setColumnCount(1);
      } else if (window.innerWidth < 1280) {
        setColumnCount(2);
      } else {
        setColumnCount(3);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const columns = splitIntoColumns(images, columnCount);

  return (
    <div className="relative w-full max-w-[1700px] mx-auto px-4 overflow-hidden py-16">
      {/* Professional Edge Fades - Longer and more integrated blur */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-40 bg-linear-to-b from-black via-black/80 to-transparent z-20" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-black via-black/80 to-transparent z-20" />
      
      {/* Decorative center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div 
        className="grid gap-6 transition-all duration-700 ease-in-out"
        style={{ 
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` 
        }}
      >
        {columns.map((col, index) => (
          <ScrollingColumn
            key={`col-${columnCount}-${index}`}
            images={col}
            direction={index % 2 === 0 ? "up" : "down"}
            speed={30 + index * 10}
          />
        ))}
      </div>
    </div>
  );
};

export default MasonryScroller;
