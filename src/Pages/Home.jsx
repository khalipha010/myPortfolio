import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/HeroSection";
import AboutMe from "../components/About";
import Projects from "../components/Projects";
import StickySidebar from "../components/StickySidebar";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { PulseLoader } from "react-spinners";
import { animateScroll as scroll } from "react-scroll";

// Memoize components to prevent unnecessary re-renders
const MemoNavbar = React.memo(Navbar);
const MemoHero = React.memo(Hero);
const MemoAboutMe = React.memo(AboutMe);
const MemoProjects = React.memo(Projects);
const MemoStickySidebar = React.memo(StickySidebar);
const MemoContact = React.memo(Contact);
const MemoFooter = React.memo(Footer);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Use useCallback for scrollToSection to prevent re-creation on every render
  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      scroll.scrollTo(section.offsetTop, {
        duration: 500,
        smooth: "easeInOutQuad",
        offset: -70, // Adjust if Navbar height differs
      });
    } else {
      console.warn(`Section with ID "${sectionId}" not found in the DOM`); // Use warn instead of error for non-critical logs
    }
  }, []); // Empty dependency array since it doesn't depend on any state/props

  // Optimize image preloading with parallel loading and error handling
  useEffect(() => {
    const imagePromises = [
      "/assets/MeKha.jpg",
      "/assets/chat.png",
      "/assets/weatherApp.jpg",
      "/assets/AgriCat.png",
      "/assets/portfolio.png",
    ].map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      });
    });

    Promise.allSettled(imagePromises)
      .then((results) => {
        const failedImages = results
          .filter((result) => result.status === "rejected")
          .map((result) => result.reason.message);
        if (failedImages.length > 0) {
          console.warn("Some images failed to load:", failedImages);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error preloading images:", error);
        setIsLoading(false); // Fallback to show content even if some images fail
      });

    return () => {
      // Cleanup (optional, but ensures no lingering effects)
      imagePromises.forEach((promise) => promise.then(() => {}, () => {}));
    };
  }, []);

  if (isLoading) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-[#013220] text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }} // Faster transition for better performance
      >
        <PulseLoader color="#00ff00" size={15} /> {/* Smaller size for performance */}
      </motion.div>
    );
  }

  return (
    <div className="w-full" id="home-content">
      <MemoNavbar scrollToSection={scrollToSection} />
      <MemoHero scrollToSection={scrollToSection} />
      <MemoStickySidebar />
      <MemoAboutMe id="about" />
      <MemoProjects id="projects" />
      <MemoContact id="contact" />
      <MemoFooter />
    </div>
  );
};

export default React.memo(Home); // Memoize the entire Home component