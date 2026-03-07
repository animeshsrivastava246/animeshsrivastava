"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { SiHashnode } from "react-icons/si";
import { basicDetails, LeetcodeSvg } from "../data/basic";

function Counter({ target, duration = 1.5, start = false }: { target: number; duration?: number; start?: boolean }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!start || target === 0) return;

    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / (duration * 1000), 1);
      const currentCount = Math.floor(progress * target);

      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [start, target, duration]);

  return <span>{count}</span>;
}

export default function StatsSection() {
  const [statsData, setStatsData] = useState({ leetcode: 0, blogs: 0 });
  const [dataLoaded, setDataLoaded] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leetRes, blogRes] = await Promise.all([
          fetch("/api/leetcode").then(r => r.json()).catch(() => ({ count: 632 })),
          fetch("/api/blogs").then(r => r.json()).catch(() => ({ totalBlogs: 2 }))
        ]);

        setStatsData({
          leetcode: leetRes.count || 632,
          blogs: blogRes.totalBlogs || blogRes.posts?.length || 2
        });
        setDataLoaded(true);
      } catch (error) {
        console.error("Stats fetch error:", error);
        setStatsData({ leetcode: 632, blogs: 2 });
        setDataLoaded(true);
      }
    };
    fetchData();
  }, []);

  const stats = [
    {
      label: "DSA Problems Solved",
      key: "leetcode",
      value: statsData.leetcode,
      link: basicDetails.socials.leetcode,
      icon: <LeetcodeSvg size={22} />,
      tooltip: "Leetcode",
    },
    {
      label: "Blogs Written",
      key: "blogs",
      value: statsData.blogs,
      link: basicDetails.socials.hashnode,
      icon: <SiHashnode size={22} />,
      tooltip: "Hashnode",
    },
  ];

  return (
    <motion.section
      onViewportEnter={() => setShouldAnimate(true)}
      viewport={{ once: true, margin: "-50px" }}
      className="flex w-full justify-around py-2"
    >
      {stats.map((stat, index) => {
        const StatContent = (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="relative flex flex-col items-center group cursor-pointer"
            key={stat.key}
          >
            {/* Tooltip */}
            {stat.tooltip && (
              <div className="absolute -top-10 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none whitespace-nowrap">
                {stat.tooltip}
              </div>
            )}

            <div className="text-3xl font-bold flex items-center gap-1.5 tabular-nums">
              <Counter target={stat.value} start={shouldAnimate && dataLoaded} />
              <span className="text-primary/80">{stat.icon}</span>
            </div>

            <p className="text-[10px] uppercase tracking-wider font-semibold mt-1 opacity-60">
              {stat.label}
            </p>
          </motion.div>
        );

        return stat.link ? (
          <a
            key={stat.key}
            href={stat.link}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            {StatContent}
          </a>
        ) : (
          <div key={stat.key}>{StatContent}</div>
        );
      })}
    </motion.section>
  );
}