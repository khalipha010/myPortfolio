import React, { useState } from "react";
import { motion } from "framer-motion";

const Hero = ({ scrollToSection }) => {
  const [splashes, setSplashes] = useState([]);

  const getRandomGradient = () => {
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
  };

  const handleInteraction = (event) => {
    let clientX, clientY;
    if (event.type === "mousemove" || event.type === "click") {
      clientX = event.clientX;
      clientY = event.clientY;
    } else if (event.type === "touchstart" || event.type === "touchmove") {
      const touch = event.touches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
      event.preventDefault();
    } else {
      return;
    }

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
    <>
      <section
        className="flex flex-col justify-start md:justify-center min-h-[70vh] md:min-h-screen w-full px-6 text-white bg-[#013220] pt-40! md:pt-32! relative overflow-hidden"
        style={{ fontFamily: "'Poppins', sans-serif" }}
        onClick={handleInteraction}
        onMouseMove={handleInteraction}
        onTouchStart={handleInteraction}
        onTouchMove={handleInteraction}
      >
        {/* Gradient Splash Effects */}
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

        <div className="max-w-4xl mx-auto w-full mt-8 md:mt-0">
          <motion.h1
            className="!text-xl !md:text-2xl font-semibold text-left hover:bg-gradient-to-r hover:from-green-400 hover:to-teal-400 hover:bg-clip-text hover:text-transparent transition-all duration-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hi, my name is
          </motion.h1>

          <motion.h2
            className="text-5xl md:text-7xl font-bold mt-5 text-green-400 text-left hover:bg-gradient-to-r hover:from-green-400 hover:to-teal-400 hover:bg-clip-text hover:text-transparent transition-all duration-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Khalipha Jibreel
          </motion.h2>

          <motion.p
            className="text-4xl md:text-6xl font-bold mt-5 text-left text-white hover:bg-gradient-to-r hover:from-green-400 hover:to-teal-400 hover:bg-clip-text hover:text-transparent transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            I give life to your ideas
          </motion.p>

          <motion.p
            className="!text-xl !md:text-3xl mt-8 text-left text-gray-300 leading-relaxed mr-4 md:mr-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 1 }}
          >
            I’m a passionate developer skilled in{" "}
            <span className="font-semibold text-green-400 hover:bg-gradient-to-r hover:from-green-400 hover:to-teal-400 hover:bg-clip-text hover:text-transparent transition-all duration-500">
              React
            </span>{" "}
            and{" "}
            <span className="font-semibold text-teal-400 hover:bg-gradient-to-r hover:from-green-400 hover:to-teal-400 hover:bg-clip-text hover:text-transparent transition-all duration-500">
              Flutter
            </span>
            , dedicated to crafting visually captivating mobile apps and websites. With a keen eye for design and a love for
            seamless functionality, I transform concepts into digital experiences that are both user-friendly and
            exceptionally efficient.
          </motion.p>

          <motion.div
            className="mt-8 flex space-x-4 justify-start md:justify-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {/* Resume Button with Link to Google Drive */}
            <motion.button
              onClick={() => window.open("https://drive.google.com/file/d/1j4zxV_RSwuyf3MjcD-R7odZ9BgBWOlTm/view?usp=drive_link", "_blank")}
              className="px-15! py-1 border !border-white rounded-lg text-white bg-[#013220] hover:bg-white hover:text-[#013220] transition relative overflow-hidden"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Constant Shine Effect */}
              <motion.span
                className="absolute top-0 left-0 w-full h-full shine-effect"
                initial={{ x: "-150%" }}
                animate={{ x: "150%" }}
                transition={{
                  duration: 1.5,
                  ease: "linear",
                  repeat: Infinity, // Infinite loop
                  repeatType: "loop",
                }}
              />
              Resume
            </motion.button>

            {/* Contact Button with Scroll Animation */}
            <motion.button
              onClick={() => scrollToSection("contact")} // Smooth scroll to Contact section
              className="px-15! py-2 border border-[#013220] rounded-lg text-[#013220] bg-white hover:bg-[#013220] hover:text-white hover:!border-white transition duration-300"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              whileHover={{ scale: 1.05 }}
            >
              Contact
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Global CSS for Shine Effect */}
      <style>{`
        .shine-effect {
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          width: 60%;
          height: 100%;
          position: absolute;
          top: 0;
          transform: skewX(-20deg);
          pointer-events: none;
          z-index: 0;
        }
        button {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </>
  );
};

export default Hero;