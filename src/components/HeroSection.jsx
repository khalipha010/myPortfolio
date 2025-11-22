import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Hero = ({ scrollToSection }) => {
  const [splashes, setSplashes] = useState([]);
  const heroRef = useRef(null);

  // Magnetic button effect
  const resumeButtonRef = useRef(null);
  const contactButtonRef = useRef(null);
  const resumeX = useMotionValue(0);
  const resumeY = useMotionValue(0);
  const contactX = useMotionValue(0);
  const contactY = useMotionValue(0);

  const resumeSpringX = useSpring(resumeX, { stiffness: 150, damping: 15 });
  const resumeSpringY = useSpring(resumeY, { stiffness: 150, damping: 15 });
  const contactSpringX = useSpring(contactX, { stiffness: 150, damping: 15 });
  const contactSpringY = useSpring(contactY, { stiffness: 150, damping: 15 });

  const getRandomGradient = () => {
    const colors = [
      "rgba(16, 185, 129, 0.8)", // Emerald
      "rgba(20, 184, 166, 0.8)", // Teal
      "rgba(34, 197, 94, 0.8)", // Green
      "rgba(59, 130, 246, 0.8)", // Blue
      "rgba(168, 85, 247, 0.8)", // Purple
      "rgba(236, 72, 153, 0.8)", // Pink
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

  // Magnetic button effect handler
  const handleMouseMove = (e, buttonRef, xMotion, yMotion) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Magnetic effect within 100px radius
    if (distance < 100) {
      xMotion.set(distanceX * 0.3);
      yMotion.set(distanceY * 0.3);
    } else {
      xMotion.set(0);
      yMotion.set(0);
    }
  };

  const handleMouseLeave = (xMotion, yMotion) => {
    xMotion.set(0);
    yMotion.set(0);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      handleMouseMove(e, resumeButtonRef, resumeX, resumeY);
      handleMouseMove(e, contactButtonRef, contactX, contactY);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="flex flex-col justify-start md:justify-center min-h-[70vh] md:min-h-screen w-full px-6 pb-16 md:pb-20 text-white pt-40 md:pt-32 relative overflow-hidden"
        style={{ fontFamily: "'Poppins', sans-serif" }}
        onClick={handleInteraction}
        onMouseMove={handleInteraction}
        onTouchStart={handleInteraction}
        onTouchMove={handleInteraction}
      >
        {/* Animated Gradient Mesh Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f1a] via-[#001f14] to-[#0a1f1a]" />

          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-500/15 via-blue-500/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s', animationDuration: '8s' }} />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/15 via-pink-500/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '4s', animationDuration: '10s' }} />

          {/* Mesh grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

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

        <div className="max-w-4xl mx-auto w-full mt-8 md:mt-0 relative z-10">
          <motion.h1
            className="text-xl md:text-2xl font-semibold text-left bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent animate-gradient"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Hi, my name is
          </motion.h1>

          <motion.h2
            className="text-5xl md:text-7xl font-bold mt-5 text-left bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent animate-gradient"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            Khalipha Jibreel
          </motion.h2>

          <motion.p
            className="text-4xl md:text-6xl font-bold mt-5 text-left text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            I give life to your ideas
          </motion.p>

          <motion.p
            className="text-xl md:text-2xl mt-8 text-left text-gray-300 leading-relaxed max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            I'm a passionate developer skilled in{" "}
            <span className="font-semibold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              React
            </span>{" "}
            and{" "}
            <span className="font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Flutter
            </span>
            , dedicated to crafting visually captivating mobile apps and websites. With a keen eye for design and a love for
            seamless functionality, I transform concepts into digital experiences that are both user-friendly and
            exceptionally efficient.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4 justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            {/* Resume Button with Magnetic Effect */}
            <motion.button
              ref={resumeButtonRef}
              onClick={() => window.open("https://drive.google.com/file/d/1O-0YG7XKDxKOaR8T3BeOSM9dcdgaNYOm/view?usp=sharing", "_blank")}
              className="px-8 py-3 glass-strong rounded-xl text-white font-medium hover:bg-white/10 transition-all duration-300 relative overflow-hidden group"
              style={{
                fontFamily: "'Poppins', sans-serif",
                x: resumeSpringX,
                y: resumeSpringY
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onMouseLeave={() => handleMouseLeave(resumeX, resumeY)}
              aria-label="View Resume"
            >
              {/* Animated Border Gradient */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>

              {/* Shine Effect */}
              <motion.span
                className="absolute top-0 left-0 w-full h-full shine-effect"
                initial={{ x: "-150%" }}
                animate={{ x: "150%" }}
                transition={{
                  duration: 2,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
              <span className="relative z-10">View Resume</span>
            </motion.button>

            {/* Contact Button with Magnetic Effect */}
            <motion.button
              ref={contactButtonRef}
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg shadow-emerald-500/30 relative overflow-hidden group"
              style={{
                fontFamily: "'Poppins', sans-serif",
                x: contactSpringX,
                y: contactSpringY
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onMouseLeave={() => handleMouseLeave(contactX, contactY)}
              aria-label="Contact Me"
            >
              <span className="relative z-10">Get In Touch</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Global CSS for Effects */}
      <style>{`
        .shine-effect {
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
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
      `}</style>
    </>
  );
};

export default Hero;
