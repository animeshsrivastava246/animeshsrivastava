"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaWhatsapp, FaYoutube, FaDiscord } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { SiZoho } from "react-icons/si";
import { SiHashnode } from "react-icons/si";
import { basicDetails, LeetcodeSvg } from "../../data/basic";

const navItems = [
  {
    icon: <FaGithub size={22} />,
    label: "GitHub",
    color: "text-foreground",

    link: basicDetails.socials.github,
  },
  {
    icon: <FaLinkedinIn size={22} />,
    label: "LinkedIn",
    color: "text-[#0A66C2]",

    link: basicDetails.socials.linkedin,
  },
  {
    icon: <FaWhatsapp size={22} />,
    label: "WhatsApp",
    color: "text-[#25D366]",

    link: basicDetails.socials.whatsapp,
  },
  {
    icon: <HiOutlineMail size={22} />,
    label: "Gmail",
    color: "text-[#EA4335]",

    link: basicDetails.socials.gmail,
  },
  {
    icon: <SiZoho size={26} />,
    label: "Zoho Mail",
    color: "text-[#089949]",

    link: basicDetails.socials.zoho,
  },

  {
    icon: <FaYoutube size={22} />,
    label: "YouTube",
    color: "text-[#FF0000]",
    link: basicDetails.socials.youtube,
  },
  {
    icon: <LeetcodeSvg />,
    label: "Leetcode",
    color: "text-[#F79F1F]",
    link: basicDetails.socials.leetcode,
  },
  {
    icon: <SiHashnode size={22} />,
    label: "Hashnode",
    color: "text-[#2962FF]",
    link: basicDetails.socials.hashnode,
  },
  {
    icon: <FaDiscord size={22} />,
    label: "Discord",
    color: "text-violet-500",
    link: basicDetails.socials.discord,
  }
];

export default function SocialMedia() {
  return (
    <div className="w-fit flex items-center flex-wrap justify-center gap-1 p-1 rounded-full glass-island border border-border/50 bg-card/40 shadow-xl">
      {navItems.map((item, idx) => (
        <motion.a
          key={idx}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 3 }}
          className="group relative"
        >
          {/* Tooltip */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-background border border-border/50 text-foreground text-[8px] font-medium py-0.5 px-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-20 whitespace-nowrap shadow-lg">
            {item.label}
          </div>

          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 border border-transparent group-hover:border-border/50 hover:bg-background/80`}
          >
            <span className={`${item.color} opacity-75 group-hover:opacity-100 transition-opacity`}>{item.icon}</span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}