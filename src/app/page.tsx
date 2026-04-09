"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import DeviceNotice from "../components/DeviceNotice";
import Hero from "../components/sections/Hero";
import Skills from "../components/sections/Skills";
import About from "../components/sections/About";
import Contact from "../components/sections/Contact";
import Experience from "../components/sections/Experience";
import ProjectsSection from "../components/sections/Projects";
// import Life from "../components/sections/Life";
import { projects, ProjectId } from "../components/projects";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const projectParam = searchParams.get("project") as ProjectId | null;

  const scrollToParam = searchParams.get("scrollTo");

  const [selectedProject, setSelectedProject] = useState<ProjectId>(
    projectParam ?? "none"
  );

  const [prevProject, setPrevProject] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedProject !== "none") {
      setPrevProject(selectedProject);
    }

    setSelectedProject(projectParam ?? "none");
  }, [projectParam, selectedProject]);

  useEffect(() => {
    // When opening a project, scroll to top
    if (selectedProject !== "none") {
      window.scrollTo(0, 0);
    }

    // When closing a project and returning to main page
    if (selectedProject === "none" && (scrollToParam || prevProject)) {
      // First scroll to top, then scroll to target section
      window.scrollTo(0, 0);
      setTimeout(() => {
        const targetSection = scrollToParam || "projects";

        if (targetSection === "home") {
          window.scrollTo({ behavior: "smooth", top: 0 });
        } else {
          const section = document.getElementById(targetSection);
          if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }

        if (prevProject) {
          setPrevProject(null);
        }
      }, 500); // Increased from 300 to 500 to guarantee AnimatePresence (400ms duration) has completely unmounted the exiting component and mounted HomeContent
    }
  }, [selectedProject, scrollToParam, prevProject]);

  const openProject = (project: string) => {
    // Type checking project string ID locally, fallback to known project IDs.
    const isValidId = projects.some((p) => p.id === project);
    if (!isValidId) return;
    router.push(`/?project=${project}`, { scroll: false });
  };

  const goBack = () => {
    router.push("/?scrollTo=projects", { scroll: false });
  };

  const closeProject = () => {
    // Use scrollTo=home to instruct the layout to scroll to the top instead of falling back to 'projects'
    router.push("/?scrollTo=home", { scroll: false });
  };

  const renderProjects = () => {
    const project = projects.find((p) => p.id === selectedProject);
    if (project) {
      const SelectedComponent = project.component;
      return <SelectedComponent onBack={goBack} />;
    }
    return <ProjectsSection onSelectProject={openProject} />;
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground font-mono text-sm animate-pulse">Initializing HUD...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DeviceNotice />

      <div className="w-full h-full flex flex-col transition-colors duration-500">
        <Navbar
          isProjectOpen={selectedProject !== "none"}
          onCloseProject={closeProject}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProject}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="grow flex flex-col"
          >
            {selectedProject === "none" && (
              <>
                {/* Subtle Grid Background for HUD feel */}
                <aside className="fixed inset-0 pointer-events-none z-[-1] blur-[0.8px] bg-[linear-gradient(var(--primary)_2px,transparent_2px),linear-gradient(90deg,var(--primary)_2px,transparent_2px)] opacity-[0.2] dark:opacity-[0.2] bg-size-[32px_32px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,black_50%,transparent_120%)]" />

                <Hero />

                <div className="container-12 py-10 sm:py-20 space-y-24">
                  <Experience />
                  {renderProjects()}
                  <Skills />
                  <About />
                  {/* <Life /> */}
                  <Contact />
                </div>
              </>
            )}

            {selectedProject !== "none" && (
              <section className="grow scroll-mt-8">{renderProjects()}</section>
            )}
          </motion.div>
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground font-mono text-sm animate-pulse">Initializing HUD...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}

