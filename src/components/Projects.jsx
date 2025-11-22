import React, { useState, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaReact, FaGithub, FaNodeJs } from "react-icons/fa";
import { SiFirebase, SiDart, SiFlutter, SiPostgresql } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";

// Import images
import chatImage from "../assets/chat.png";
import weatherAppImage from "../assets/WeatherApp.jpg";
import examMasterImage from "../assets/ExamMaster.png";
import portfolioImage from "../assets/portfolio.png";
import miniBlogImage from "../assets/MiniBlog.png";
import myPortfolioImage from "../assets/MyPortfolio.png";
import bizCoachImage from "../assets/BizCoach.png";
import jobTracker from "../assets/jobTracker.png";

const projects = [
  {
    name: "ExamMaster",
    image: examMasterImage,
    technologies: [<FaReact color="#61DAFB" />, <SiFirebase color="#FFA611" />],
    github: "https://github.com/khalipha010/ExamMaster",
    live: "https://exam-master-edu.vercel.app/",
    description: "A comprehensive exam preparation platform."
  },
  {
    name: "MiniBlog",
    image: miniBlogImage,
    technologies: [<FaReact color="#61DAFB" />, <SiPostgresql color="#336791" />, <FaNodeJs color="#3C873A" />],
    github: "https://github.com/khalipha010/mini-blog-frontend",
    live: "https://mini-blog-frontend-nine.vercel.app/",
    description: "A lightweight blogging platform with rich text editing."
  },
  {
    name: "BizCoach",
    image: bizCoachImage,
    technologies: [<FaReact color="#61DAFB" />, <SiFirebase color="#FFA611" />],
    github: "https://github.com/khalipha010/bizcoach-ai",
    live: "https://bizcoach-ai.vercel.app/",
    description: "AI-powered business coaching assistant."
  },
  {
    name: "JobTracker",
    image: jobTracker,
    technologies: [<FaReact color="#61DAFB" />, <SiPostgresql color="#336791" />, <FaNodeJs color="#3C873A" />],
    github: "https://github.com/khalipha010/jobtracker_frontend",
    live: "https://jobtracker-frontend-eta.vercel.app/",
    description: "Track job applications and interview status."
  },
  {
    name: "MyPortfolio",
    image: myPortfolioImage,
    technologies: [<FaReact color="#61DAFB" />, <SiFirebase color="#FFA611" />],
    github: "https://github.com/khalipha010/myPortfolio",
    live: "https://khaliphajibreel.vercel.app/",
    description: "The portfolio you are currently viewing."
  },
  {
    name: "Chat App",
    image: chatImage,
    technologies: [<SiFlutter color="#02569B" />, <SiDart color="#00C4B3" />, <SiFirebase color="#FFA611" />],
    github: "https://github.com/khalipha010/ChatApp",
    live: "https://khalipha010.github.io/KhalifaJibreel.github.io/#/",
    description: "Real-time messaging application."
  },
  {
    name: "Weather App",
    image: weatherAppImage,
    technologies: [<SiFlutter color="#02569B" />, <SiDart color="#00C4B3" />, <SiFirebase color="#FFA611" />],
    github: "https://github.com/khalipha010/World-Time-App",
    live: "",
    description: "Global weather forecasts and time zones."
  },
  {
    name: "Responsive Flutter Site",
    image: portfolioImage,
    technologies: [<SiFlutter color="#02569B" />, <SiDart color="#00C4B3" />, <SiFirebase color="#FFA611" />],
    github: "",
    live: "https://khalipha-jibreel.web.app/#/",
    description: "A fully responsive website built with Flutter Web."
  },
];

const ProjectCard = ({ project, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mouseX.set(0);
    mouseY.set(0);
  };

  const glareBackground = useTransform(
    [mouseX, mouseY],
    ([latestX, latestY]) =>
      `radial-gradient(
        600px circle at ${latestX}px ${latestY}px,
        rgba(255, 255, 255, 0.1),
        transparent 40%
      )`
  );

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[400px] rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Glare Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: glareBackground,
        }}
      />

      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 rounded-xl overflow-hidden shadow-2xl"
      >
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
      </div>

      <div
        style={{ transform: "translateZ(50px)" }}
        className="absolute bottom-8 left-8 right-8 z-20"
      >
        <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
        <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
          {project.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            {project.technologies.map((tech, i) => (
              <div key={i} className="bg-black/60 p-2 rounded-full backdrop-blur-md border border-white/20">
                {React.cloneElement(tech, { size: 18, color: "#ffffff" })}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-black/60 rounded-full hover:bg-emerald-500 hover:text-white transition-colors backdrop-blur-md border border-white/20"
                aria-label="View Source Code"
              >
                <FaGithub size={20} color="#ffffff" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-black/60 rounded-full hover:bg-emerald-500 hover:text-white transition-colors backdrop-blur-md border border-white/20"
                aria-label="View Live Demo"
              >
                <FiExternalLink size={20} color="#ffffff" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [splashes, setSplashes] = useState([]);

  const getRandomGradient = useMemo(() => {
    const colors = [
      "rgba(16, 185, 129, 0.8)", // Emerald
      "rgba(20, 184, 166, 0.8)", // Teal
      "rgba(52, 211, 153, 0.8)", // Light Emerald
      "rgba(45, 212, 191, 0.8)", // Light Teal
    ];
    return () => {
      const color1 = colors[Math.floor(Math.random() * colors.length)];
      const color2 = colors[Math.floor(Math.random() * colors.length)];
      return `radial-gradient(circle, ${color1}, ${color2}, transparent)`;
    };
  }, []);

  const handleInteraction = (event) => {
    const { clientX, clientY } = event;
    const newSplash = {
      x: clientX,
      y: clientY,
      id: Date.now(),
      gradient: getRandomGradient(),
    };

    setSplashes((prev) => [...prev, newSplash]);

    setTimeout(() => {
      setSplashes((prev) => prev.filter((s) => s.id !== newSplash.id));
    }, 1000);
  };

  return (
    <section
      id="projects"
      className="min-h-screen px-6 py-20 relative overflow-hidden flex items-center justify-center"
      onClick={handleInteraction}
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
      onTouchMove={handleInteraction}
    >
      {/* Splash Effect */}
      {splashes.map((splash) => (
        <div
          key={splash.id}
          className="splash absolute w-[100px] h-[100px] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: splash.x,
            top: splash.y,
            background: splash.gradient,
            zIndex: 0
          }}
        />
      ))}

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <motion.div
          className="mb-16 text-center md:text-left"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-emerald-400 font-mono text-lg">02.</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Featured Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default Projects;
