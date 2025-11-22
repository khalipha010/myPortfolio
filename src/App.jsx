import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StickySidebar from "./components/StickySidebar";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Employ from "./Pages/Employ";
import NotFound from "./Pages/NotFound";
import CursorGlow from "./components/CursorGlow";

const App = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (section) => {
    const refs = {
      home: homeRef,
      about: aboutRef,
      projects: projectsRef,
      contact: contactRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#013220] text-white overflow-x-hidden">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar scrollToSection={scrollToSection} />
                <StickySidebar />
                {/* Main content with padding to prevent sidebar overlap */}
                <div className="px-4 md:px-20 lg:px-24">
                  <div id="home-content" ref={homeRef}>
                    <HeroSection />
                  </div>
                  <div ref={aboutRef}>
                    <About />
                  </div>
                  <div ref={projectsRef}>
                    <Projects />
                  </div>
                  <div ref={contactRef}>
                    <Contact />
                  </div>
                  <Footer />
                </div>
              </>
            }
          />
          <Route path="/employ" element={<Employ />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <CursorGlow />
    </div>
  );
};

export default App;