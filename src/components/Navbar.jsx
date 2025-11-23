// Cache bust: v1.0.1
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = React.memo(({ scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleEmployClick = useCallback(() => {
    navigate("/employ");
    setIsMenuOpen(false);
  }, [navigate]);

  const handleNavClick = (section) => {
    setActiveSection(section);
    scrollToSection(section);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const linkVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    })
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
        ? "bg-[#013220]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-4"
        : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="text-2xl font-bold cursor-pointer relative group"
          whileHover={{ scale: 1.05 }}
          onClick={() => handleNavClick("home")}
        >
          <span className="text-emerald-400">&lt;</span>
          <span className="text-white group-hover:text-emerald-400 transition-colors duration-300">Khalipha</span>
          <span className="text-emerald-400">/&gt;</span>
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-all duration-300 relative group ${activeSection === link.id ? "text-emerald-400" : "text-gray-300 hover:text-white"
                  }`}
              >
                <span className="text-emerald-400 mr-1">0{navLinks.indexOf(link) + 1}.</span>
                {link.name}
                <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full ${activeSection === link.id ? "w-full" : ""}`} />
              </button>
            </li>
          ))}
          <li>
            <motion.button
              onClick={handleEmployClick}
              className="px-6 py-2 rounded-lg border border-emerald-400 text-emerald-400 font-medium hover:bg-emerald-400/10 transition-all duration-300 relative overflow-hidden animate-glow-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Employ Me</span>
            </motion.button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={toggleMenu}
          className="md:hidden text-white text-2xl z-50 relative"
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-[#013220]/95 backdrop-blur-2xl z-40 flex flex-col justify-center items-center md:hidden"
          >
            <ul className="flex flex-col space-y-8 text-center">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  custom={i}
                  variants={linkVariants}
                >
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="text-2xl font-bold text-white hover:text-emerald-400 transition-colors"
                  >
                    <span className="text-emerald-400 text-lg block mb-1">0{i + 1}.</span>
                    {link.name}
                  </button>
                </motion.li>
              ))}
              <motion.li
                custom={3}
                variants={linkVariants}
                className="mt-8"
              >
                <motion.button
                  onClick={handleEmployClick}
                  className="px-8 py-3 rounded-xl border-2 border-emerald-400 text-emerald-400 font-bold text-lg hover:bg-emerald-400/10 transition-colors animate-glow-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Employ Me
                </motion.button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow Animation Styles */}
      <style>{`
        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 5px rgba(16, 185, 129, 0.5),
                        0 0 10px rgba(16, 185, 129, 0.3),
                        0 0 15px rgba(16, 185, 129, 0.2);
          }
          50% {
            box-shadow: 0 0 10px rgba(16, 185, 129, 0.8),
                        0 0 20px rgba(16, 185, 129, 0.5),
                        0 0 30px rgba(16, 185, 129, 0.3),
                        0 0 40px rgba(16, 185, 129, 0.2);
          }
        }
        
        .animate-glow-button {
          animation: glow-pulse 2s ease-in-out infinite;
        }
        
        .animate-glow-button:hover {
          box-shadow: 0 0 15px rgba(16, 185, 129, 1),
                      0 0 30px rgba(16, 185, 129, 0.7),
                      0 0 45px rgba(16, 185, 129, 0.5),
                      0 0 60px rgba(16, 185, 129, 0.3);
        }
      `}</style>
    </motion.nav>
  );
});

export default Navbar;