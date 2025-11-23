import React, { useState, useMemo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaReact, FaGithub, FaNodeJs } from "react-icons/fa";
import { SiFirebase, SiDart, SiFlutter, SiPostgresql } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";

// Import images
import examMasterImage from "../assets/ExamMaster.png";
import miniBlogImage from "../assets/MiniBlog.png";
import bizCoachImage from "../assets/BizCoach.png";
import jobTracker from "../assets/jobTracker.png";

const projects = [
  {
    name: "ExamMaster",
    image: examMasterImage,
    technologies: [<FaReact color="#00D8FF" />, <SiFirebase color="#FFC107" />],
    github: "https://github.com/khalipha010/ExamMaster",
    live: "https://exam-master-edu.vercel.app/",
    description: "A comprehensive exam preparation platform designed to help students master their subjects through interactive tests and real-time progress tracking."
  },
  {
    name: "MiniBlog",
    image: miniBlogImage,
    technologies: [<FaReact color="#00D8FF" />, <SiPostgresql color="#336791" />, <FaNodeJs color="#8CC84B" />],
    github: "https://github.com/khalipha010/mini-blog-frontend",
    live: "https://mini-blog-frontend-nine.vercel.app/",
    description: "A lightweight, feature-rich blogging platform offering a seamless writing experience with rich text editing and instant publishing capabilities."
  },
  {
    name: "BizCoach",
    image: bizCoachImage,
    technologies: [<FaReact color="#00D8FF" />, <SiFirebase color="#FFC107" />],
    github: "https://github.com/khalipha010/bizcoach-ai",
    live: "https://bizcoach-ai.vercel.app/",
    description: "An AI-powered business coaching assistant that provides personalized strategies and insights to help entrepreneurs grow their businesses."
  },
  {
    name: "JobTracker",
    image: jobTracker,
    technologies: [<FaReact color="#00D8FF" />, <SiPostgresql color="#336791" />, <FaNodeJs color="#8CC84B" />],
    github: "https://github.com/khalipha010/jobtracker_frontend",
    live: "https://jobtracker-frontend-eta.vercel.app/",
    description: "A streamlined application for tracking job applications, interview schedules, and application statuses to keep your job search organized."
  },
];

const ProjectCard = ({ project, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-center mb-24 last:mb-0`}
    >
      {/* Image Section */}
      <div className="w-full lg:w-3/5 group">
        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
          />
          {/* Overlay for mobile/hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#013220] via-transparent to-transparent opacity-60 lg:opacity-0 lg:group-hover:opacity-40 transition-opacity duration-300" />
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-2/5 flex flex-col gap-6">
        <div className={`flex flex-col ${isEven ? "lg:items-start lg:text-left" : "lg:items-end lg:text-right"}`}>
          <span className="text-emerald-400 font-mono text-sm tracking-wider mb-2">Featured Project</span>
          <h3 className="text-3xl font-bold text-white mb-4">{project.name}</h3>

          <div className={`bg-[#112240]/90 backdrop-blur-md p-6 rounded-lg shadow-xl border border-white/5 text-gray-300 leading-relaxed mb-6 ${isEven ? "lg:-ml-16 z-20" : "lg:-mr-16 z-20"}`}>
            {project.description}
          </div>

          {/* Technologies */}
          <div className={`flex flex-wrap gap-3 mb-6 ${isEven ? "justify-start" : "justify-end"}`}>
            {project.technologies.map((tech, i) => (
              <motion.div
                key={i}
                className="relative bg-gradient-to-br from-white/10 to-white/5 p-2.5 rounded-xl backdrop-blur-md border border-white/20 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {tech}
              </motion.div>
            ))}
          </div>

          {/* Links */}
          <div className={`flex gap-4 ${isEven ? "justify-start" : "justify-end"}`}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-emerald-400 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-emerald-400 transition-colors"
                aria-label="Live Demo"
              >
                <FiExternalLink size={24} />
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
      "rgba(16, 185, 129, 0.4)", // Emerald
      "rgba(20, 184, 166, 0.4)", // Teal
      "rgba(52, 211, 153, 0.4)", // Light Emerald
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
      className="min-h-screen px-6 py-24 relative overflow-hidden bg-[#0a192f]"
      onClick={handleInteraction}
      onMouseMove={handleInteraction}
    >
      {/* Splash Effect */}
      {splashes.map((splash) => (
        <div
          key={splash.id}
          className="splash absolute w-[150px] h-[150px] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50"
          style={{
            left: splash.x,
            top: splash.y,
            background: splash.gradient,
            zIndex: 0
          }}
        />
      ))}

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-emerald-400 font-mono text-lg block mb-2">02.</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Some Things I've Built</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
