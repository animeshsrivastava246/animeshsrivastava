"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const navItems = [
  {
    icon: <FaGithub size={22} />,
    label: "GitHub",
    color: "text-foreground",
    bg: "bg-muted/50",
    link: "https://github.com/animeshsrivastava246",
  },
  {
    icon: <FaLinkedinIn size={22} />,
    label: "LinkedIn",
    color: "text-[#0A66C2]",
    bg: "bg-muted/50",
    link: "https://www.linkedin.com/in/animesh246",
  },
  {
    icon: <FaWhatsapp size={22} />,
    label: "WhatsApp",
    color: "text-[#25D366]",
    bg: "bg-muted/50",
    link: "https://wa.me/918299224409",
  },
  {
    icon: <HiOutlineMail size={22} />,
    label: "Gmail",
    color: "text-[#EA4335]",
    bg: "bg-muted/50",
    link: "mailto:animeshsrivastava246246@gmail.com",
  },
];

export default function SocialMedia() {
  return (
    <div className="w-fit flex items-center flex-wrap justify-center gap-3 px-6 py-3 rounded-full glass border border-border/50 bg-card/40 shadow-xl">
      {navItems.map((item, idx) => (
        <motion.a
          key={idx}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 2, y: -4 }}
          className="group relative"
        >
          {/* Tooltip */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-background border border-border/50 text-foreground text-[8px] font-medium p-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-20 whitespace-nowrap shadow-lg">
            {item.label}
          </div>

          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 border border-transparent group-hover:border-border/50 ${item.bg || "bg-muted/50"
              } hover:bg-background/80`}
          >
            <span className={`${item.color} opacity-80 group-hover:opacity-100 transition-opacity`}>{item.icon}</span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}