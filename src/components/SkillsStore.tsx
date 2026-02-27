"use client";

import React, { ReactNode, useState } from "react";
import {
  FaCode,
  FaServer,
  FaDatabase,
  FaTools,
  FaMobileAlt,
} from "react-icons/fa";
import { TbLayoutDashboard } from "react-icons/tb";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import skillsData from "../lib/skills";
import user from "../../public/og-image.png";
import { FiSearch } from "react-icons/fi";

interface SkillItem {
  name: string;
  desc: string;
  badge?: string;
  icon: ReactNode;
  banner?: string;
  image?: StaticImageData | string;
}

interface SkillCategory {
  featured: SkillItem[];
  skills: SkillItem[];
  learning: SkillItem[];
  recent: SkillItem[];
}

const categories = [
  { icon: <FaCode />, name: "All" },
  { icon: <TbLayoutDashboard />, name: "Frontend" },
  { icon: <FaServer />, name: "Backend" },
  { icon: <FaDatabase />, name: "Database" },
  { icon: <FaTools />, name: "Tools" },
  { icon: <FaMobileAlt />, name: "Mobile Development" },
];

export default function SkillsStore() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  function getCombinedData(): SkillCategory {
    return skillsData[selectedCategory];
  }

  const searchFilter = (arr?: SkillItem[]) =>
    arr?.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [];

  const filteredData = getCombinedData();

  return (
    <div className="flex flex-col md:flex-row glass neumorphic rounded-4xl w-full max-w-6xl h-[700px] overflow-hidden border border-border/50 relative z-0 shadow-2xl">
      {/* Mobile Dropdown */}
      <div className="md:hidden w-full p-6 border-b border-border/50 bg-background/50 backdrop-blur-md">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-3 bg-muted/80 text-foreground font-semibold rounded-xl neumorphic-inset focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {categories.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-card/30 backdrop-blur-lg p-6 gap-4 border-r border-border/50 relative z-10 shadow-xl shadow-black/5">
        <div className="flex gap-2 mb-6">
          <div className="w-3.5 h-3.5 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]" />
          <div className="w-3.5 h-3.5 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
          <div className="w-3.5 h-3.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
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
        <div className="mt-auto text-xs font-semibold text-muted-foreground border-t border-border/50 pt-6 flex items-center gap-3">
          <Image
            src={user}
            alt="user profile image"
            className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5 object-cover"
          />
          Er. Animesh
        </div>
      </aside>

      {/* Main Content */}
      <main className="hide-scrollbar flex-1 p-6 md:p-12 overflow-y-auto space-y-12 bg-background/20 backdrop-blur-sm relative z-0">
        <div className="hidden md:block border-b border-border/50 pb-4">
          <h1 className="text-3xl font-heading font-bold text-foreground">{selectedCategory}</h1>
        </div>

        {/* Featured Cards */}
        {searchFilter(filteredData.featured)?.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + "-features"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {searchFilter(filteredData.featured).map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="flex flex-col justify-between h-full space-y-4 glass neumorphic border border-border rounded-3xl p-6 bg-card/40 shadow-[8px_8px_16px_var(--neu-shadow),-8px_-8px_16px_var(--neu-highlight)] hover:shadow-[12px_12px_24px_var(--neu-shadow),-12px_-12px_24px_var(--neu-highlight)] transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div className="text-xs font-bold tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                      {item.badge}
                    </div>
                  </div>
                  <div className="text-xl font-heading font-bold text-foreground">{item.name}</div>
                  <div className="text-sm font-body text-muted-foreground line-clamp-2 leading-relaxed">
                    {item.desc}
                  </div>
                  {item?.image ? (
                    <div className="h-44 w-full mt-4 rounded-2xl overflow-hidden flex justify-center items-center bg-muted/50 border border-border/50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={176}
                        height={176}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div
                      className={`h-44 mt-auto rounded-xl flex justify-center items-center bg-linear-to-br ${item.banner}`}
                    >
                      {React.cloneElement(
                        item.icon as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
                        {
                          className: `${(item.icon as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props
                            .className || ""
                            } text-white text-6xl`,
                        }
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Skills Section */}
        {searchFilter(filteredData.skills)?.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-heading font-bold text-foreground">{selectedCategory} Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchFilter(filteredData.skills).map((app, index) => (
                <motion.div
                  whileHover={{ x: 5 }}
                  key={index}
                  className="flex items-start gap-4 border-b border-border pb-4 transition-transform duration-300"
                >
                  <div className="text-3xl font-semibold flex items-center justify-center w-12 h-12 rounded-xl bg-card/50 text-primary neumorphic glass shadow-md border border-border">
                    {app.icon}
                  </div>
                  <div className="flex-1 mt-1">
                    <div className="text-base font-bold text-foreground">{app.name}</div>
                    <div className="text-sm text-muted-foreground mt-1 max-w-[90%] leading-relaxed">{app.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Learning Section */}
        {searchFilter(filteredData.learning)?.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-heading font-bold text-foreground">
              Installing / Currently Learning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchFilter(filteredData.learning).map((skill, index) => (
                <motion.div
                  whileHover={{ x: 5 }}
                  key={index}
                  className="flex items-start gap-4 border-b border-border pb-4 transition-transform duration-300"
                >
                  <div className="text-3xl font-semibold flex items-center justify-center w-12 h-12 rounded-xl bg-card/50 text-blue-400 neumorphic glass shadow-md border border-border">
                    {skill.icon}
                  </div>
                  <div className="flex-1 mt-1">
                    <div className="text-base font-bold text-foreground">{skill.name}</div>
                    <div className="text-sm text-muted-foreground mt-1 leading-relaxed">{skill.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Recently Used Section */}
        {searchFilter(filteredData.recent)?.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-heading font-bold text-foreground">Recently used</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchFilter(filteredData.recent).map((skill, index) => (
                <motion.div
                  whileHover={{ x: 5 }}
                  key={index}
                  className="flex items-start gap-4 border-b border-border pb-4 transition-transform duration-300"
                >
                  <div className="text-3xl font-semibold flex items-center justify-center w-12 h-12 rounded-xl bg-card/50 text-purple-400 neumorphic glass shadow-md border border-border">
                    {skill.icon}
                  </div>
                  <div className="flex-1 mt-1">
                    <div className="text-base font-bold text-foreground">{skill.name}</div>
                    <div className="text-sm text-muted-foreground mt-1 leading-relaxed">{skill.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
