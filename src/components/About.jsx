import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { FaReact, FaJs, FaPython, FaFigma, FaNodeJs, FaGit, FaHtml5, FaCss3, FaBootstrap } from "react-icons/fa";
import { SiFlutter, SiTailwindcss, SiFirebase } from "react-icons/si";
import MeKhaImage from "../assets/MeKha.jpg"; // Your imported image

// Memoize the AboutMe component to prevent unnecessary re-renders
const AboutMe = React.memo(() => {
  const [splashes, setSplashes] = useState([]);

  // Use useCallback for getRandomGradient to prevent re-creation on every render
  const getRandomGradient = useCallback(() => {
    const colors = [
      "rgba(255, 105, 180, 0.8)", // Pink
      "rgba(0, 191, 255, 0.8)", // Light Blue
      "rgba(255, 215, 0, 0.8)", // Gold
      "rgba(50, 205, 50, 0.8)", // Lime Green
      "rgba(147, 112, 219, 0.8)", // Medium Purple
      "rgba(255, 69, 0, 0.8)", // Red-Orange
    ];
    const color1 = colors[Math.floor(Math.random() * colors.length)];
    const color2 = colors[Math.floor(Math.random() * colors.length)];
    return `radial-gradient(circle, ${color1}, ${color2}, transparent)`;
  }, []); // Empty dependency array since it doesn’t depend on state/props

  // Use useCallback for handleInteraction to prevent re-creation on every render
  const handleInteraction = useCallback((event) => {
    let clientX, clientY;

    // Handle touch events
    if (event.touches && event.touches.length > 0) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
      event.preventDefault(); // Prevent default touch behavior
    }
    // Handle mouse events
    else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    const newSplash = {
      x: clientX,
      y: clientY,
      id: Date.now(),
      gradient: getRandomGradient(),
    };

    setSplashes((prevSplashes) => [...prevSplashes, newSplash]);

    // Use requestAnimationFrame for smoother splash removal
    requestAnimationFrame(() => {
      setTimeout(() => {
        setSplashes((prevSplashes) => prevSplashes.filter((s) => s.id !== newSplash.id));
      }, 1000);
    });
  }, [getRandomGradient]); // Depend on getRandomGradient for consistency

  // Memoize animation variants for better performance
  const animationVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }), []); // Empty dependency array since it’s static

  // Memoize skills icons for performance
  const skillsIcons = useMemo(() => [
    <FaReact key="react" className="text-[#61DAFB] hover:text-[#4fa3c7] transition-colors" title="React" />,
    <SiFlutter key="flutter" className="text-[#02569B] hover:text-[#013a6b] transition-colors" title="Flutter" />,
    <FaJs key="js" className="text-[#F7DF1E] hover:text-[#d6b90d] transition-colors" title="JavaScript" />,
    <FaPython key="python" className="text-[#3776AB] hover:text-[#2a5a82] transition-colors" title="Python" />,
    <FaFigma key="figma" className="text-[#F24E1E] hover:text-[#c93d17] transition-colors" title="Figma" />,
    <FaNodeJs key="nodejs" className="text-[#68A063] hover:text-[#4f7a4b] transition-colors" title="Node.js" />,
    <FaGit key="git" className="text-[#F05032] hover:text-[#c23d24] transition-colors" title="Git" />,
    <FaHtml5 key="html" className="text-[#E34F26] hover:text-[#c23d17] transition-colors" title="HTML" />,
    <FaCss3 key="css" className="text-[#1572B6] hover:text-[#115293] transition-colors" title="CSS" />,
    <FaBootstrap key="bootstrap" className="text-[#7952B3] hover:text-[#5e3d8c] transition-colors" title="Bootstrap" />,
    <SiTailwindcss key="tailwind" className="text-[#38B2AC] hover:text-[#2c8580] transition-colors" title="TailwindCSS" />,
    <SiFirebase key="firebase" className="text-[#FFCA28] hover:text-[#e6b425] transition-colors" title="Firebase" />,
  ], []); // Empty dependency array since icons are static

  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center min-h-screen px-6 text-white bg-[#013220] pt-58 md:pt-0 relative overflow-hidden"
      onClick={handleInteraction}
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
      onTouchMove={handleInteraction}
    >
      {/* Gradient Splash Effects (optimized with key for React reconciliation) */}
      {splashes.map((splash) => (
        <div
          key={splash.id}
          className="splash absolute w-[100px] h-[100px] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: splash.x,
            top: splash.y,
            background: splash.gradient,
          }}
        />
      ))}

      {/* Outer container with optimized classes */}
      <div className="w-full max-w-6xl">
        {/* Inner container for everything */}
        <div className="max-w-4xl mx-auto">
          {/* Section heading with optimized animation */}
          <motion.div
            className="border border-white text-2xl font-bold px-4 py-2 rounded-lg text-white bg-[#001F14] mb-6 w-fit mx-auto md:mx-0 hover:bg-white/10 transition-colors"
            variants={animationVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }} // Reduced duration for speed
            viewport={{ once: true, amount: 0.5 }}
          >
            <span className="text-green-400">01.</span> About Me
          </motion.div>

          {/* Flex container for intro text and image with optimized gap */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-start gap-4 md:gap-6"> {/* Reduced gaps for performance */}
            {/* Introductory text */}
            <motion.div
              className="text-center md:text-left max-w-2xl"
              variants={animationVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.6, delay: 0.1 }} // Reduced duration and delay
              viewport={{ once: true, amount: 0.5 }}
            >
              {/* Animated intro text with underline hover effect */}
              <motion.p
                className="text-lg md:text-xl mb-3 relative" // Reduced margin for performance
                variants={animationVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.6, delay: 0.2 }} // Reduced duration and delay
                viewport={{ once: true, amount: 0.5 }}
                whileHover={{ scale: 1.01 }} // Lighter hover effect
              >
                I am Khalipha Jibreel, a computer wizard passionate about modern web development and mobile app development.
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-200" // Reduced duration for performance
                  whileHover={{ width: "100%" }}
                />
              </motion.p>
              <motion.p
                className="text-md md:text-lg mb-3 relative" // Reduced margin for performance
                variants={animationVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.6, delay: 0.3 }} // Reduced duration and delay
                viewport={{ once: true, amount: 0.5 }}
                whileHover={{ scale: 1.01 }} // Lighter hover effect
              >
                I graduated in Computer Science and I am all about React and Flutter. Watching movies is my hobby, and if it involves programming and technology, count me in!
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-200" // Reduced duration for performance
                  whileHover={{ width: "100%" }}
                />
              </motion.p>
              <motion.p
                className="text-md md:text-lg mb-6 relative" // Reduced margin for performance
                variants={animationVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.6, delay: 0.4 }} // Reduced duration and delay
                viewport={{ once: true, amount: 0.5 }}
                whileHover={{ scale: 1.01 }} // Lighter hover effect
              >
                Below are my skills:
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-200" // Reduced duration for performance
                  whileHover={{ width: "100%" }}
                />
              </motion.p>

              {/* Skills icons with optimized layout */}
              <motion.div
                className="flex flex-wrap justify-center md:justify-start gap-3 text-4xl md:text-3xl" // Increased size on mobile (text-4xl), same size on desktop (md:text-3xl)
                variants={animationVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.6, delay: 0.5 }} // Reduced duration and delay
                viewport={{ once: true, amount: 0.5 }}
              >
                {skillsIcons}
              </motion.div>
            </motion.div>

            {/* Layered Card Effect (optimized with larger sizes for desktop and mobile) */}
            <motion.div
              className="relative w-[250px] h-[250px] md:w-[300px] md:h-[300px] mt-6 md:mt-0" // Increased sizes for desktop and mobile
              variants={{
                hidden: { opacity: 0, x: 20 }, // Reverted to original slide from right (20px)
                visible: { opacity: 1, x: 0 }, // Slide to original position
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }} // Maintain smooth easing
              viewport={{ once: true, amount: 0.5 }}
              whileHover={{ scale: 1.03 }} // Lighter hover effect
            >
              {/* Layer 1: Bottom layer */}
              <div
                className="absolute bg-white rounded-lg shadow-lg"
                style={{
                  width: "100%",
                  height: "100%",
                  transform: "rotate(-2deg)",
                  zIndex: 1,
                  top: "0",
                  left: "0",
                }}
              />

              {/* Layer 2: Middle layer */}
              <div
                className="absolute bg-white rounded-lg shadow-md"
                style={{
                  width: "95%",
                  height: "95%",
                  transform: "rotate(2deg)",
                  zIndex: 2,
                  top: "2.5%",
                  left: "2.5%",
                }}
              />

              {/* Layer 3: Top layer with image */}
              <div
                className="absolute bg-gray-200 rounded-lg shadow-xl overflow-hidden"
                style={{
                  width: "90%",
                  height: "90%",
                  zIndex: 3,
                  top: "5%",
                  left: "5%",
                }}
              >
                <motion.img
                  src={MeKhaImage}
                  alt="Khalipha Jibreel"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }} // Lighter hover effect
                  transition={{ duration: 0.2 }} // Faster transition
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add CSS for the splash effect */}
      <style>{`
        .splash {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
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