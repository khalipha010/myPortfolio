import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import Lottie from "lottie-react"; // Use lottie-react
import EmailAnimation from "../assets/Email.json"; // Ensure this path is correct
import { useInView } from "react-intersection-observer"; // For lazy loading

const Contact = () => {
  const [splashes, setSplashes] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  // Lazy load Lottie animations
  const [refMobile, inViewMobile] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [refDesktop, inViewDesktop] = useInView({ triggerOnce: true, threshold: 0.5 });

  // Memoize the gradient function to avoid recalculating
  const getRandomGradient = useMemo(() => {
    const colors = [
      "rgba(255, 105, 180, 0.8)",
      "rgba(0, 191, 255, 0.8)",
      "rgba(255, 215, 0, 0.8)",
      "rgba(50, 205, 50, 0.8)",
      "rgba(147, 112, 219, 0.8)",
      "rgba(255, 69, 0, 0.8)",
    ];
    return () => {
      const color1 = colors[Math.floor(Math.random() * colors.length)];
      const color2 = colors[Math.floor(Math.random() * colors.length)];
      return `radial-gradient(circle, ${color1}, ${color2}, transparent)`;
    };
  }, []);

  const handleInteraction = (event) => {
    let clientX, clientY;
    if (event.touches && event.touches.length > 0) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
      event.preventDefault();
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
    setSplashes((prevSplashes) => [...prevSplashes, newSplash]);
    setTimeout(() => {
      setSplashes((prevSplashes) => prevSplashes.filter((s) => s.id !== newSplash.id));
    }, 1000);
  };

  const handleButtonClick = () => {
    if (window.innerWidth >= 768) {
      window.location.href = "mailto:khalifajibreel@gmail.com";
    } else {
      window.open("https://wa.link/x2r2zo", "_blank");
    }
  };

  return (
    <>
      <section
        id="contact"
        className="min-h-screen px-6 text-white bg-[#013220] pt-40 md:pt-25 relative overflow-hidden"
        onClick={handleInteraction}
        onMouseMove={handleInteraction}
        onTouchStart={handleInteraction}
        onTouchMove={handleInteraction}
      >
        {splashes.map((splash) => (
          <div
            key={splash.id}
            className="splash"
            style={{ left: splash.x, top: splash.y, background: splash.gradient }}
          />
        ))}

        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Side: Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <motion.div
              className="border border-white text-2xl font-bold px-4 py-2 rounded-lg text-white bg-[#001F14] mb-8 w-fit mx-auto md:mx-0 hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <span className="text-green-400 text-2xl font-bold">03.</span> Contact Me
            </motion.div>

            <motion.h2
              className="text-5xl md:text-5xl font-bold mb-6 text-green-400 hover:bg-gradient-to-r hover:from-green-400 hover:to-teal-400 hover:bg-clip-text hover:text-transparent transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              Get In Touch
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl max-w-2xl mb-8 mx-auto md:mx-0 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, amount: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              Have a project idea or just want to connect? I’d love to hear from you! Whether it’s a collaboration, a question, or
              just a friendly hello, feel free to reach out. Let’s create something amazing together!
              <motion.span
                className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300"
                whileHover={{ width: "100%" }}
              />
            </motion.p>

            <div className="flex flex-col items-center md:items-start">
              <motion.button
                onClick={handleButtonClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="px-15! py-2 border border-white! rounded-lg text-white bg-transparent hover:bg-white hover:text-[#013220] transition w-fit relative overflow-hidden flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true, amount: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute top-0 left-0 w-full h-full shine-effect"
                  initial={{ x: "-150%" }}
                  animate={{ x: "150%" }}
                  transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                />
                {isHovered ? (
                  window.innerWidth >= 768 ? (
                    <>
                      <FaEnvelope />
                      Mail
                    </>
                  ) : (
                    <>
                      <FaWhatsapp />
                      WhatsApp
                    </>
                  )
                ) : (
                  "Say Hello"
                )}
              </motion.button>

              {/* Lottie Animation - Mobile */}
              <motion.div
                ref={refMobile}
                className="mt-6 md:hidden"
              >
                {inViewMobile && (
                  <Lottie
                    animationData={EmailAnimation}
                    loop={true}
                    autoplay={true}
                    style={{ height: 300, width: 300 }}
                    rendererSettings={{
                      preserveAspectRatio: "xMidYMid slice",
                      progressiveLoad: true,
                    }}
                  />
                )}
              </motion.div>
            </div>

            {/* Social Media Icons */}
            <motion.div
              className="flex gap-6 mt-10 text-4xl md:hidden justify-center pb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <motion.a href="https://twitter.com/KhaliphaJibreel" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255, 255, 255, 0.5)" }} className="hover:text-[#00ff00] transition-colors" aria-label="Twitter profile" whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                <FaTwitter />
              </motion.a>
              <motion.a href="https://facebook.com/khalifa.jibreel1" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255, 255, 255, 0.5)" }} className="hover:text-[#00ff00] transition-colors" aria-label="Facebook profile" whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                <FaFacebook />
              </motion.a>
              <motion.a href="https://www.linkedin.com/in/khalipha-jibreel-a945a01a1/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255, 255, 255, 0.5)" }} className="hover:text-[#00ff00] transition-colors" aria-label="LinkedIn profile" whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                <FaLinkedin />
              </motion.a>
              <motion.a href="https://github.com/khalipha010" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255, 255, 255, 0.5)" }} className="hover:text-[#00ff00] transition-colors" aria-label="GitHub profile" whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                <FaGithub />
              </motion.a>
            </motion.div>
          </div>

          {/* Right Side: Lottie Animation (Desktop Only) */}
          <motion.div
            ref={refDesktop}
            className="hidden md:block md:w-1/2"
          >
            {inViewDesktop && (
              <Lottie
                animationData={EmailAnimation}
                loop={true}
                autoplay={true}
                style={{ height: 400, width: 400 }}
                rendererSettings={{
                  preserveAspectRatio: "xMidYMid slice",
                  progressiveLoad: true,
                }}
              />
            )}
          </motion.div>
        </div>
      </section>

      <style>{`
        .shine-effect {
          background: linear-gradient(120deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%);
          width: 60%;
          height: 100%;
          position: absolute;
          top: 0;
          transform: skewX(-20deg);
          pointer-events: none;
          z-index: 0;
        }
        button { position: relative; z-index: 1; }
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
    </>
  );
};

export default Contact;