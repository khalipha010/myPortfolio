import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import Lottie from "lottie-react";
import EmailAnimation from "../assets/Email.json";
import { useInView } from "react-intersection-observer";

const Contact = () => {
  const [splashes, setSplashes] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const [refMobile, inViewMobile] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [refDesktop, inViewDesktop] = useInView({ triggerOnce: true, threshold: 0.5 });

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
    setTimeout(() => {
      setSplashes((prev) => prev.filter((s) => s.id !== newSplash.id));
    }, 1000);
  };

  const handleButtonClick = () => {
    if (window.innerWidth >= 768) {
      window.location.href = "mailto:khalifajibreel@gmail.com";
    } else {
      window.open("https://wa.link/x2r2zo", "_blank");
    }
  };

  const socialLinks = [
    { icon: <FaTwitter />, href: "https://twitter.com/KhaliphaJibreel", label: "Twitter" },
    { icon: <FaFacebook />, href: "https://facebook.com/khalifa.jibreel1", label: "Facebook" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/khalipha-jibreel-a945a01a1/", label: "LinkedIn" },
    { icon: <FaGithub />, href: "https://github.com/khalipha010", label: "GitHub" },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen w-full px-6 py-20 relative overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#0a192f] via-[#0a3a3a] to-[#013220]"
      onClick={handleInteraction}
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
      onTouchMove={handleInteraction}
    >
      {/* Floating Background Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Splash Effects */}
      {splashes.map((splash) => (
        <div
          key={splash.id}
          className="splash absolute w-[100px] h-[100px] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: splash.x, top: splash.y, background: splash.gradient, zIndex: 0 }}
        />
      ))}

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <motion.div
          className="glass p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left Side: Content */}
            <div className="md:w-1/2 text-center md:text-left">
              <motion.div
                className="inline-block mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-emerald-400 font-mono text-lg">03. Contact Me</span>
              </motion.div>

              <motion.h2
                className="text-4xl md:text-6xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Let's Work <br />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Together
                </span>
              </motion.h2>

              <motion.p
                className="text-lg text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                Have a project idea or just want to connect? I'd love to hear from you!
                Whether it's a collaboration, a question, or just a friendly hello.
              </motion.p>

              <div className="flex flex-col items-center md:items-start gap-8">
                <motion.button
                  onClick={handleButtonClick}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white font-semibold text-lg shadow-lg shadow-emerald-500/30 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-3">
                    {isHovered ? (
                      window.innerWidth >= 768 ? <><FaEnvelope /> Send Email</> : <><FaWhatsapp /> Chat on WhatsApp</>
                    ) : (
                      "Say Hello"
                    )}
                  </span>
                </motion.button>

                {/* Social Links */}
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={link.label}
                    >
                      <span className="text-xl">{link.icon}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Animation */}
            <motion.div
              className="md:w-1/2 w-full max-w-md"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl" />
                <div ref={refDesktop} className="relative z-10">
                  {(inViewDesktop || inViewMobile) && (
                    <Lottie
                      animationData={EmailAnimation}
                      loop={true}
                      autoplay={true}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </div>
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
};

export default Contact;