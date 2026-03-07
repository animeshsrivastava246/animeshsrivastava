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
import BlogsModal from "./BlogsModal";
import user from "../../app/icon0.svg";
import { Menu, X } from "lucide-react";
import { basicDetails } from "../../data/basic";

const Navbar = ({
  isProjectOpen,
  onCloseProject,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isBlogsModalOpen, setIsBlogsModalOpen] = useState(false);
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

    let observer: IntersectionObserver;

    // Delay the observer instantiation to allow AnimatePresence to finish rendering sections
    const timeout = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              updatePosition(entry.target.id);
            }
          });
        },
        {
          rootMargin: "-20% 0px -60% 0px",
          threshold: 0.1,
        }
      );

      ["home", ...menuItems].forEach((label) => {
        const el = document.getElementById(label.toLowerCase());
        if (el) observer.observe(el);
      });
    }, 600); // Wait for AnimatePresence transitions (typically 300-500ms)

    return () => {
      clearTimeout(timeout);
      if (observer) observer.disconnect();
    };
  }, [menuItems, isProjectOpen]);

  /* ---------------- SCREEN SIZE ---------------- */

  useEffect(() => {
    const resize = () => setIsDesktop(window.innerWidth >= 768);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ---------------- SYNC ON RETURN ---------------- */

  useEffect(() => {
    // When returning from a project, wait for the layout to settle, then figure out where we are
    if (!isProjectOpen) {
      const syncTimeout = setTimeout(() => {
        // Fallback: Manually check intersecting section if observer missed it during animation
        const sections = ["home", ...menuItems].map(label => document.getElementById(label.toLowerCase()));

        // Find the section closest to the top of the viewport
        let closestSection = "home";
        let minDistance = Infinity;

        sections.forEach((el) => {
          if (el) {
            const rect = el.getBoundingClientRect();
            // We care about sections near the top third of the viewport
            const distance = Math.abs(rect.top);
            if (distance < minDistance) {
              minDistance = distance;
              closestSection = el.id;
            }
          }
        });

        // Only update if we're not already there, to avoid jitter
        if (activeSection !== closestSection) {
          updatePosition(closestSection);
        } else {
          // Even if it's correct, re-fire the position update just in case refs have moved
          updatePosition(activeSection);
        }

      }, 1200); // Wait for AnimatePresence (400ms) + page.tsx scrollTo trigger (500ms) + smooth scroll duration (~300ms) = 1200ms

      return () => clearTimeout(syncTimeout);
    }
  }, [isProjectOpen, menuItems]);

  /* ---------------- CLICK ---------------- */

  const handleClick = (label: string) => {
    const id = label.toLowerCase();

    // Always close mobile menu on selection
    setIsMenuOpen(false);

    // If a project is open, any navigation just forces a return home (with deferral logic relying on page.tsx)
    if (isProjectOpen) {
      if (id === "home") {
        onCloseProject?.();
      } else {
        // If they clicked "Experience" while in project, we could set url params, 
        // but for simplicity currently onCloseProject just goes to home top.
        onCloseProject?.();
      }
      return;
    }

    if (id === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      const el = document.getElementById(id);

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }

    updatePosition(id);
  };

  return (
    <>
      {/* DESKTOP NAV */}

      <motion.header
        initial={{ top: 24, opacity: 1 }}
        animate={{
          top: visible ? 24 : -90,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        className="fixed left-0 right-0 z-50 flex justify-center pointer-events-auto px-2"
      >
        <div className="hidden md:flex glass-island border border-border/50 pointer-events-auto items-center justify-between gap-0 p-2 rounded-full max-w-5xl w-full">

          {/* PROFILE */}

          <motion.a href="#home" className={`flex items-center gap-2 transition-all duration-300 ${activeSection === "home" ? "scale-[1.1] translate-x-2" : "hover:scale-[1.05] hover:translate-x-1"}`} onClick={(e) => {
            e.preventDefault();
            handleClick("home");
          }}>

            <Image
              src={user}
              alt={basicDetails.name}
              className="w-8 h-8 rounded-full"
            />

            <span className={`text-sm ${activeSection === "home" ? "font-extrabold" : "font-bold"}`}>
              {basicDetails.firstName} <br /> {basicDetails.lastName}
            </span>
          </motion.a>

          {/* MENU */}

          <nav className="flex relative">

            <div className={`flex ${isProjectOpen ? "opacity-0 pointer-events-none absolute hidden md:flex" : ""}`}>
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
                      <a
                        href={`#${key}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(label);
                        }}
                        className={`px-2.5 py-1 rounded-full text-md font-semibold transition-all duration-200
                         
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
                             absolute left-1/2 -translate-x-1/2 bottom-0.5 h-[2px] w-[80%] bg-current
                             transition-transform duration-300 origin-center
                             ${active ? "scale-x-100" : "scale-x-0"}
                           `}
                        />
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

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

            <button
              onClick={() => setIsBlogsModalOpen(true)}
              className="hidden md:flex items-center gap-2 px-6 py-2.5
            bg-foreground border border-border/50
            text-background font-semibold tracking-wide rounded-full
            shadow-lg hover:shadow-primary/20
            transition-all duration-300 hover:scale-[1.02] active:scale-95
            cursor-pointer"
            >
              Blogs
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsResumeModalOpen(true)}
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

      <motion.header
        initial={{ bottom: 24, opacity: 1 }}
        animate={{
          bottom: visible ? 24 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        className="md:hidden fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-50"
      >

        <div className="glass-island flex items-center justify-between w-full px-4 py-2">

          <a href="#home" onClick={(e) => {
            e.preventDefault();
            handleClick("home");
          }} className="flex items-center">
            <Image
              src={user}
              alt={basicDetails.name}
              className={`w-8 h-8 rounded-full transition-all duration-300 cursor-pointer ${activeSection === "home" ? "scale-[1.15] ring-2 ring-primary" : "hover:scale-[1.05]"}`}
            />
          </a>

          {!isProjectOpen && (
            <button
              onClick={() => setIsBlogsModalOpen(true)}
              className="px-2 py-1 rounded-full bg-foreground text-background font-semibold tracking-wide shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:bg-foreground/90 custom-cursor"
            >
              Blogs
            </button>
          )}

          {!isProjectOpen && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsResumeModalOpen(true)}
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
          )}

          <ThemeToggle />

          {/* MENU BUTTON */}

          <motion.button
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            onClick={() =>
              setIsMenuOpen(!isMenuOpen)
            }
            className={`rounded-full flex items-center justify-center ${isProjectOpen ? "opacity-0 pointer-events-none" : "bg-muted"}`}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
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

          {isMenuOpen && (

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: -10 }}
              exit={{ opacity: 0, y: 20 }}
              className={`absolute bottom-16 left-0 right-0 glass-island rounded-2xl p-6 w-full max-h-[50vh] overflow-y-auto hide-scrollbar ${isProjectOpen ? "opacity-0 pointer-events-none hidden" : ""}`}
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
                      <a
                        href={`#${id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(label);
                        }}
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
                      </a>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.header>

      <BlogsModal
        isOpen={isBlogsModalOpen}
        closeModal={() => setIsBlogsModalOpen(false)}
      />

      <ResumeModal
        open={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </>
  );
};

export default Navbar;