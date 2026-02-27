"use client";

import {
  useRef,
  useLayoutEffect,
  useEffect,
  useState,
  useMemo,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import ResumeModal from "./ResumeModal";
import user from "../../../public/og-image.png";
import { Menu, X } from "lucide-react";

const Navbar = ({
  isProjectOpen,
}: {
  isProjectOpen: boolean;
  onCloseProject?: () => void;
}) => {
  const menuItems = useMemo(
    () => ["Experience", "Projects", "Skills", "About", "Contact"],
    []
  );

  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const prevScroll = useRef(0);

  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  const [isDesktop, setIsDesktop] = useState(false);

  /* ---------------- SCROLL VISIBILITY ---------------- */

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current <= 0) setVisible(true);
      else setVisible(current < prevScroll.current);

      prevScroll.current = current;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- POSITION ---------------- */

  const updatePosition = (id: string) => {
    setActiveSection(id);

    const navItem = itemRefs.current[id];

    if (!navItem) {
      setPosition((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    setPosition({
      top: navItem.offsetTop,
      left: navItem.offsetLeft,
      width: navItem.offsetWidth,
      height: navItem.offsetHeight,
      opacity: 1,
    });
  };

  useLayoutEffect(() => {
    updatePosition("home");
  }, []);

  useEffect(() => {
    updatePosition(isProjectOpen ? "projects" : "home");
  }, [isProjectOpen]);

  /* ---------------- INTERSECTION ---------------- */

  useEffect(() => {
    if (isProjectOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            updatePosition(entry.target.id);
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0.1,
      }
    );

    menuItems.forEach((label) => {
      const el = document.getElementById(
        label.toLowerCase()
      );
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [menuItems, isProjectOpen]);

  /* ---------------- SCREEN SIZE ---------------- */

  useEffect(() => {
    const resize = () =>
      setIsDesktop(window.innerWidth >= 768);

    resize();

    window.addEventListener("resize", resize);

    return () =>
      window.removeEventListener("resize", resize);
  }, []);

  /* ---------------- CLICK ---------------- */

  const handleClick = (label: string) => {
    const id = label.toLowerCase();

    const el = document.getElementById(id);

    if (el)
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    updatePosition(id);

    setMenuOpen(false);
  };

  return (
    <>
      {/* DESKTOP NAV */}

      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: visible ? 0 : -90,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 28,
        }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-auto px-2"
      >
        <div className="hidden md:flex glass-island border border-border/50 pointer-events-auto items-center justify-between gap-0 p-2 rounded-full max-w-5xl w-full">

          {/* PROFILE */}

          <motion.button className={`flex items-center gap-2 transition-all duration-300 ${activeSection === "home" ? "scale-[1.1]" : "hover:scale-[1.05]"}`} onClick={() =>
            handleClick("home")
          }>

            <Image
              src={user}
              alt="profile"
              className="w-8 h-8 rounded-full"
            />

            <span className={`text-sm ${activeSection === "home" ? "font-extrabold" : "font-bold"}`}>
              Animesh <br /> Srivastava
            </span>
          </motion.button>

          {/* MENU */}

          <nav className="flex relative">

            <ul className="flex">

              {menuItems.map((label) => {

                const key = label.toLowerCase();

                const active =
                  activeSection === key;

                return (
                  <motion.li
                    key={key}
                    className="relative z-10"
                    ref={(el: HTMLLIElement | null) => {
                      itemRefs.current[key] = el;
                    }}
                  >
                    <button
                      onClick={() =>
                        handleClick(label)
                      }
                      className={`p-2 rounded-full text-md font-semibold transition-all duration-200
                      
                      ${active
                          ? "text-primary-foreground font-extrabold scale-[1.2]"
                          : "text-muted-foreground"
                        }

                      hover:bg-muted/70
                      hover:text-foreground
                      hover:scale-[1.05]
                      
                      `}
                    >
                      {label}
                      <span
                        className={`
                          absolute left-0 bottom-0.5 h-[2px] w-full bg-current
                          transition-transform duration-300 origin-left
                          ${active ? "scale-x-100" : "scale-x-0"}
                        `}
                      />
                    </button>
                  </motion.li>
                );
              })}
            </ul>

            {isDesktop &&
              position.opacity === 1 && (
                <motion.div
                  layoutId="pill"
                  className="absolute bg-primary rounded-full z-0"
                  animate={{
                    ...position,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
          </nav>

          {/* RIGHT */}

          <div className="hidden md:flex items-center gap-3">

            <ThemeToggle />

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setResumeOpen(true)}
              className="group relative overflow-hidden w-full sm:w-auto p-2 rounded-4xl 
    bg-linear-to-r from-blue-600 to-purple-600 
    text-white font-semibold tracking-wide
    shadow-lg hover:shadow-blue-500/30 
    transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
            >
              {/* Shine effect */}
              <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
              <span>
                Resume
              </span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE FLOATING NAV */}

      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: visible ? 0 : 100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-50"
      >

        <div className="glass-island flex items-center justify-between w-full px-4 py-2">

          <Image
            src={user}
            alt="Animesh Srivastava"
            className={`w-8 h-8 rounded-full transition-all duration-300 cursor-pointer ${activeSection === "home" ? "scale-[1.15] ring-2 ring-primary" : "hover:scale-[1.05]"}`}
            onClick={() =>
              handleClick("home")
            }
          />


          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setResumeOpen(true)}
            className="group relative overflow-hidden px-2 py-1 rounded-full 
    bg-linear-to-r from-blue-600 to-purple-600 
    text-white font-semibold tracking-wide
    shadow-lg hover:shadow-blue-500/30 
    transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
          >
            {/* Shine effect */}
            <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />

            <span className="relative z-10">Resume</span>
          </motion.button>

          <ThemeToggle />

          {/* MENU BUTTON */}

          <motion.button
            animate={{ rotate: menuOpen ? 90 : 0 }}
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="rounded-full bg-muted flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="x"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

        </div>

        {/* MENU */}

        <AnimatePresence>

          {menuOpen && (

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: -10 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-16 left-0 right-0 glass-island rounded-2xl p-6 w-full max-h-[50vh] overflow-y-auto hide-scrollbar"
            >
              <ul className="flex flex-col gap-2 w-full">

                {menuItems.map((label, key) => {
                  const id = label.toLowerCase();
                  const active = activeSection === id;
                  return (

                    <motion.li
                      key={key}
                      className="z-10"
                      ref={(el: HTMLLIElement | null) => {
                        itemRefs.current[key] = el;
                      }}
                    >
                      <button
                        onClick={() => handleClick(label)}
                        className={`
      relative inline-flex flex-col items-center
      p-2 text-md font-medium
      transition-all duration-200
      
      ${active
                            ? "text-primary-foreground font-extrabold scale-[1.2]"
                            : "text-muted-foreground"
                          }

      hover:text-foreground
      hover:scale-[1.05]
    `}
                      >
                        <span className="relative w-fit">
                          {label}

                          <span
                            className={`
          absolute left-0 -bottom-1 h-[2px] w-full bg-current
          origin-left transition-transform duration-300
          ${active ? "scale-x-100" : "scale-x-0"}
        `}
                          />
                        </span>
                      </button>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
};

export default Navbar;