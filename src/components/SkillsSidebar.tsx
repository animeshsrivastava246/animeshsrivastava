import { ReactNode } from "react";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import user from "../../public/og-image.png";
import { FiMinus, FiSquare, FiX } from "react-icons/fi";

const windowControls = [
  { color: "bg-red-500", shadow: "shadow-red-500/50", icon: <FiX size={12} /> },
  { color: "bg-yellow-400", shadow: "shadow-yellow-400/50", icon: <FiMinus size={12} /> },
  { color: "bg-green-500", shadow: "shadow-green-500/50", icon: <FiSquare size={10} /> },
];

export interface Category {
  icon: ReactNode;
  name: string;
}

interface SkillsSidebarProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function SkillsSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
}: SkillsSidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-72 bg-card/30 backdrop-blur-lg p-6 gap-4 border-r border-border/50 relative z-10 shadow-xl shadow-black/5">
      <div className="flex gap-1.5 mb-2">
        {windowControls.map((control, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full flex items-center justify-center 
      ${control.color} ${control.shadow} shadow-md cursor-not-allowed
      text-black/70`}
          >
            {control.icon}
          </div>
        ))}
      </div>
      <div className="relative w-full mb-4">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search skills..."
          className="w-full pl-11 pr-4 py-2.5 bg-background/50 border border-border/50 rounded-xl text-sm placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-inner"
        />
      </div>
      <div className="text-muted-foreground text-xs font-bold tracking-widest uppercase mb-2 ml-2">Categories</div>
      <div className="space-y-1 ">
        {categories.map(({ icon, name }) => (
          <div
            key={name}
            onClick={() => setSelectedCategory(name)}
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 border ${selectedCategory === name
              ? "bg-primary text-primary-foreground neumorphic-inset border-primary/20 font-extrabold scale-[1.05]"
              : "bg-card/30 text-muted-foreground font-light hover:text-foreground neumorphic border-border/50 hover:scale-[1.1]"
              }`}
          >
            <div className={`text-xl ${selectedCategory === name ? "text-primary-foreground" : "text-primary"}`}>{icon}</div>
            <span className="text-sm">{name}</span>
          </div>
        ))}
      </div>
      <div
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="mt-auto text-lg font-bold text-foreground border-t border-border/50 pt-4 flex items-center gap-3 cursor-pointer"
      >
        <Image
          src={user}
          alt="user profile image"
          className="w-12 h-12 rounded-full border-2 border-primary/20 p-0.5 object-cover"
        />
        Er. Animesh
      </div>
    </aside>
  );
}
