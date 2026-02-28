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
        const section = document.getElementById(targetSection);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        if (prevProject) {
          setPrevProject(null);
        }
      }, 300);
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
    router.push("/", { scroll: false });
  };

  const renderProjects = () => {
    const project = projects.find((p) => p.id === selectedProject);
    if (project) {
      const SelectedComponent = project.component;
      return <SelectedComponent onBack={goBack} />;
    }
    return <ProjectsSection onSelectProject={openProject} />;
  };

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

                <Hero />

                <Experience />

                {renderProjects()}

                <Skills />

                <About />

                {/* <Life /> */}

                <Contact />
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}

