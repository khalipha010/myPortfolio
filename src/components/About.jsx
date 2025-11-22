import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { FaReact, FaJs, FaPython, FaFigma, FaNodeJs, FaGit, FaHtml5, FaCss3, FaBootstrap, FaDocker, FaAws } from "react-icons/fa";
import { SiFlutter, SiTailwindcss, SiFirebase, SiPostgresql, SiNextdotjs, SiMongodb, SiTypescript, SiGraphql } from "react-icons/si";
import MeKhaImage from "../assets/MeKha.jpg";

const AboutMe = React.memo(() => {
  const [splashes, setSplashes] = useState([]);

  const getRandomGradient = useCallback(() => {
    const colors = [
      "rgba(16, 185, 129, 0.8)", // Emerald
      "rgba(20, 184, 166, 0.8)", // Teal
      "rgba(52, 211, 153, 0.8)", // Light Emerald
      "rgba(45, 212, 191, 0.8)", // Light Teal
    ];
    const color1 = colors[Math.floor(Math.random() * colors.length)];
    const color2 = colors[Math.floor(Math.random() * colors.length)];
    return `radial-gradient(circle, ${color1}, ${color2}, transparent)`;
  }, []);

  const handleInteraction = useCallback((event) => {
    let clientX, clientY;
    if (event.touches && event.touches.length > 0) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    const newSplash = {
      x: clientX,
      y: clientY,
      id: Date.now(),
      gradient: getRandomGradient(),
    };

    setSplashes((prev) => [...prev, newSplash]);

    requestAnimationFrame(() => {
      setTimeout(() => {
        setSplashes((prev) => prev.filter((s) => s.id !== newSplash.id));
      }, 1000);
    });
  }, [getRandomGradient]);

  const skillCategories = useMemo(() => ({
    frontend: [
      { icon: <FaReact />, name: "React", color: "#61DAFB" },
      { icon: <SiNextdotjs />, name: "Next.js", color: "#ffffff" },
      { icon: <SiFlutter />, name: "Flutter", color: "#02569B" },
      { icon: <SiTypescript />, name: "TypeScript", color: "#3178C6" },
      { icon: <SiTailwindcss />, name: "Tailwind", color: "#38B2AC" },
    ],
    backend: [
      { icon: <FaNodeJs />, name: "Node.js", color: "#68A063" },
      { icon: <FaPython />, name: "Python", color: "#3776AB" },
      { icon: <SiPostgresql />, name: "PostgreSQL", color: "#336791" },
      { icon: <SiFirebase />, name: "Firebase", color: "#FFCA28" },
      { icon: <SiMongodb />, name: "MongoDB", color: "#47A248" },
    ],
    tools: [
      { icon: <FaGit />, name: "Git", color: "#F05032" },
      { icon: <FaFigma />, name: "Figma", color: "#F24E1E" },
      { icon: <FaDocker />, name: "Docker", color: "#2496ED" },
      { icon: <FaAws />, name: "AWS", color: "#FF9900" },
    ]
  }), []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section
      id="about"
      className="min-h-screen w-full px-6 py-20 relative overflow-hidden flex items-center justify-center"
      onClick={handleInteraction}
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
      onTouchMove={handleInteraction}
    >
      {/* Splash Effects */}
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

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          className="mb-12 text-center md:text-left"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-emerald-400 font-mono text-lg">01.</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">About Me</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Bio Card - Large Square (2x2) */}
          <motion.div
            className="md:col-span-2 md:row-span-2 glass p-8 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-center relative overflow-hidden group"
            variants={itemVariants}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-emerald-500/20" />

            <h3 className="text-3xl font-bold text-white mb-6">Who I Am</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I am <span className="text-emerald-400 font-semibold">Khalipha Jibreel</span>, a computer wizard passionate about crafting digital experiences.
              I specialize in building accessible, pixel-perfect, and performant web and mobile applications.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              My journey involves a deep dive into <span className="text-emerald-400">React ecosystem</span> and <span className="text-emerald-400">Flutter</span>, constantly pushing the boundaries of what's possible on the web.
            </p>
          </motion.div>

          {/* Image Card - Tall (1x2) */}
          <motion.div
            className="md:col-span-1 md:row-span-2 glass p-2 rounded-3xl border border-white/10 flex items-center justify-center relative group overflow-hidden"
            variants={itemVariants}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-10" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <img
                src={MeKhaImage}
                alt="Khalipha Jibreel"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </motion.div>

          {/* Frontend Skills - Wide (2x1) */}
          <motion.div
            className="md:col-span-1 md:row-span-2 glass p-6 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all duration-300 flex flex-col"
            variants={itemVariants}
          >
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400">⚡</span> Frontend
            </h4>
            <div className="flex flex-wrap gap-3">
              {skillCategories.frontend.map((skill) => (
                <div key={skill.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                  <span style={{ color: skill.color }}>{skill.icon}</span>
                  {skill.name}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Backend Skills - Wide (2x1) */}
          <motion.div
            className="md:col-span-2 md:row-span-1 glass p-6 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
            variants={itemVariants}
          >
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400">🛠️</span> Backend & Database
            </h4>
            <div className="flex flex-wrap gap-3">
              {skillCategories.backend.map((skill) => (
                <div key={skill.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                  <span style={{ color: skill.color }}>{skill.icon}</span>
                  {skill.name}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tools - Wide (2x1) */}
          <motion.div
            className="md:col-span-2 md:row-span-1 glass p-6 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
            variants={itemVariants}
          >
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400">⚙️</span> Tools & DevOps
            </h4>
            <div className="flex flex-wrap gap-3">
              {skillCategories.tools.map((skill) => (
                <div key={skill.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                  <span style={{ color: skill.color }}>{skill.icon}</span>
                  {skill.name}
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>

      <style>{`
        .splash {
          animation: fadeOut 1s ease-out forwards;
        }
        @keyframes fadeOut {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(0); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </section>
  );
});

export default AboutMe;
