import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaReact, FaGithub, FaNodeJs } from "react-icons/fa";
import { SiFirebase, SiDart, SiFlutter, SiPostgresql } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";


// Import images (update paths as needed)
import chatImage from "../assets/chat.png";
import weatherAppImage from "../assets/WeatherApp.jpg";
import examMasterImage from "../assets/ExamMaster.png";
import portfolioImage from "../assets/portfolio.png";
import miniBlogImage from "../assets/MiniBlog.png";
import myPortfolioImage from "../assets/MyPortfolio.png";
import bizCoachImage from "../assets/BizCoach.png";

const projects = [
  
    {
    name: "ExamMaster",
    image: examMasterImage,
    technologies: [<FaReact color="#61DAFB" />, <SiFirebase color="#FFA611" />], // Fixed: FaReact is now imported
    github: "https://github.com/khalipha010/ExamMaster",
    live: "https://exam-master-edu.vercel.app/",
  },
  
  {
    name: "MiniBlog",
    image: miniBlogImage,
    technologies: [<FaReact color="#61DAFB" />, <SiPostgresql color="#336791" />, <FaNodeJs color="#3C873A" />,], // Fixed: FaReact is now imported
    github: "https://github.com/khalipha010/mini-blog-frontend",
    live: "https://mini-blog-frontend-nine.vercel.app/",
  },
   {
    name: "BizCoach",
    image: bizCoachImage,
    technologies: [<FaReact color="#61DAFB" />, <SiFirebase color="#FFA611" />], // Fixed: FaReact is now imported
    github: "https://github.com/khalipha010/bizcoach-ai",
    live: "https://bizcoach-ai.vercel.app/",
  },
  
    {
    name: "MyPortfolio",
    image: myPortfolioImage,
    technologies: [<FaReact color="#61DAFB" />, <SiFirebase color="#FFA611" />], // Fixed: FaReact is now imported
    github: "https://github.com/khalipha010/myPortfolio",
    live: "https://khaliphajibreel.vercel.app/",
  },
  
  {
    name: "Chat App",
    image: chatImage,
    technologies: [<SiFlutter color="#02569B" />, <SiDart color="#00C4B3" />, <SiFirebase color="#FFA611" />],
    github: "https://github.com/khalipha010/ChatApp",
    live: "https://khalipha010.github.io/KhalifaJibreel.github.io/#/",
  },
  {
    name: "Weather App",
    image: weatherAppImage,
    technologies: [<SiFlutter color="#02569B" />, <SiDart color="#00C4B3" />, <SiFirebase color="#FFA611" />],
    github: "https://github.com/khalipha010/World-Time-App",
    live: "",
  },

  {
    name: "Responsive Flutter Site",
    image: portfolioImage,
    technologies: [<SiFlutter color="#02569B" />, <SiDart color="#00C4B3" />, <SiFirebase color="#FFA611" />],
    github: "",
    live: "https://khalipha-jibreel.web.app/#/",
  },
];

const Projects = () => {
  const [splashes, setSplashes] = useState([]);

  // Memoize the gradient function to avoid recalculating
  const getRandomGradient = useMemo(() => {
    const colors = [
      "rgba(255, 105, 180, 0.8)", // Pink
      "rgba(0, 191, 255, 0.8)", // Light Blue
      "rgba(255, 215, 0, 0.8)", // Gold
      "rgba(50, 205, 50, 0.8)", // Lime Green
      "rgba(147, 112, 219, 0.8)", // Medium Purple
      "rgba(255, 69, 0, 0.8)", // Red-Orange
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

    setSplashes((prevSplashes) => [...prevSplashes, newSplash]);

    setTimeout(() => {
      setSplashes((prevSplashes) => prevSplashes.filter((s) => s.id !== newSplash.id));
    }, 1000);
  };

  return (
    <section
      id="projects"
      className="min-h-screen px-6 text-white bg-[#013220] pt-40 md:pt-0 relative overflow-hidden"
      onClick={handleInteraction}
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
      onTouchMove={handleInteraction}
    >
      {/* Splash Effect */}
      {splashes.map((splash) => (
        <div
          key={splash.id}
          className="splash"
          style={{
            left: splash.x,
            top: splash.y,
            background: splash.gradient,
          }}
        />
      ))}

      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          className="border border-white text-2xl font-bold px-4 py-2 rounded-lg text-white bg-[#001F14] mb-8 w-fit mx-auto md:mx-0 hover:bg-white/10 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="text-green-400">02.</span> My Projects
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-green-900 bg-opacity-20 p-6 rounded-2xl backdrop-blur-lg border border-white/10 shadow-lg flex flex-col items-center hover:bg-opacity-30 transition-all w-full max-w-[400px] mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-full h-40 rounded-lg mb-4 overflow-hidden relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  loading="lazy" // Lazy load images
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>

              <div className="flex gap-4 my-2">
                {project.technologies.map((tech, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    {React.cloneElement(tech, { size: 30 })}
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-4 mt-4">
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-white rounded-full text-white opacity-50 hover:opacity-100 hover:text-[#00ff00] transition-colors"
                    whileHover={{ scale: 1.2, boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaGithub size={20} />
                  </motion.a>
                )}
                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-white rounded-full text-white opacity-50 hover:opacity-100 hover:text-[#00ff00] transition-colors"
                    whileHover={{ scale: 1.2, boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiExternalLink size={20} />
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
