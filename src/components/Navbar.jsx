import React, { useState, useEffect, useCallback } from "react"; // Add React import here
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa"; // Modern hamburger and close icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// Memoize the Navbar component to prevent unnecessary re-renders
const Navbar = React.memo(({ scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Use useCallback for resize handler to prevent re-creation on every render
  const handleResize = useCallback(() => {
    setIsDesktop(window.innerWidth >= 768); // 768px is the breakpoint for md in Tailwind
  }, []); // Empty dependency array since it doesn't depend on any state/props

  // Optimize resize effect with useEffect and debouncing
  useEffect(() => {
    // Set initial value
    handleResize();

    // Add event listener for window resize with debouncing
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100); // Debounce with 100ms delay to reduce performance impact
    };

    window.addEventListener("resize", debouncedResize);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [handleResize]); // Depend on handleResize to ensure it uses the memoized version

  // Use useCallback for toggleMenu to prevent re-creation on every render
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []); // Empty dependency array since it only toggles state

  // Use useCallback for handleEmployClick to prevent re-creation
  const handleEmployClick = useCallback(() => {
    navigate("/employ"); // Navigate to the Employ page using React Router
    setIsMenuOpen(false); // Close mobile menu after navigation
  }, [navigate]); // Depend on navigate for consistency

  // Animation variants for navigation items (defined outside for better performance)
  const navItemVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }} // Reduced duration for faster initial animation
      className="fixed top-0 left-0 w-full backdrop-blur-lg bg-[#013220]/90 border-b border-[#013220] z-50"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo with Shaking Animation (only on desktop) */}
        <motion.h1
          className="text-3xl text-white"
          initial={{ rotate: 0 }}
          animate={{
            rotate: isDesktop ? [0, -5, 5, -5, 5, 0] : 0, // Shaking animation only on desktop
          }}
          transition={{
            duration: 1.2, // Slightly reduced duration for performance
            repeat: Infinity,
            ease: "linear",
            repeatType: "mirror",
          }}
          whileHover={{ scale: 1.05 }} // Reduced scale for lighter performance
        >
          <span className="text-white">{`</>`}</span> {/* Logo as </> */}
        </motion.h1>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-white text-lg items-center">
          <motion.li
            onClick={() => {
              scrollToSection("about");
              setTimeout(() => {}, 0); // No-op to ensure event completion
            }}
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.1 }} // Reduced duration and delay for speed
            className="hover:text-gray-300 cursor-pointer"
            whileHover={{ scale: 1.03 }} // Lighter hover effect
          >
            About
          </motion.li>
          <motion.li
            onClick={() => {
              scrollToSection("projects");
              setTimeout(() => {}, 0); // No-op to ensure event completion
            }}
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.2 }} // Reduced duration and delay
            className="hover:text-gray-300 cursor-pointer"
            whileHover={{ scale: 1.03 }} // Lighter hover effect
          >
            Projects
          </motion.li>
          <motion.li
            onClick={() => {
              scrollToSection("contact");
              setTimeout(() => {}, 0); // No-op to ensure event completion
            }}
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.3 }} // Reduced duration and delay
            className="hover:text-gray-300 cursor-pointer"
            whileHover={{ scale: 1.03 }} // Lighter hover effect
          >
            Contact
          </motion.li>
          <motion.li
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay: 0.4 }} // Reduced duration and delay
            className="ml-6"
          >
            <motion.button
              onClick={handleEmployClick} // Use the memoized handleEmployClick with useNavigate
              className="px-3 py-1 border !border-white rounded-lg text-white bg-[#013220] hover:bg-white hover:text-[#013220] transition animate-glow"
              whileHover={{ scale: 1.05 }} // Reduced scale for lighter performance
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }} // Faster transition
            >
              Employ
            </motion.button>
          </motion.li>
        </ul>

        {/* Mobile Menu Button (with optimized glowing animation) */}
        <div className="md:hidden">
          <motion.button
            onClick={toggleMenu}
            className="text-white text-2xl focus:outline-none"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(255, 255, 255, 0.5)", // Reduced opacity for performance
                "0 0 8px 4px rgba(255, 255, 255, 0.5)", // Reduced size and opacity
                "0 0 0 0 rgba(255, 255, 255, 0.5)",
              ],
            }}
            transition={{
              duration: 1.2, // Slightly reduced duration for performance
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />} {/* Modern hamburger and close icons */}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu (Full-Screen Overlay) with optimized animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }} // Reduced duration for faster animation
            className="md:hidden fixed top-16 left-0 w-full h-screen bg-[#013220]/90 backdrop-blur-md z-40 flex flex-col justify-center items-center" /* Reduced backdrop blur for performance */
          >
            <ul className="flex flex-col space-y-4 text-white text-lg text-center"> {/* Reduced space for performance */}
              <motion.li
                onClick={() => {
                  scrollToSection("about");
                  setIsMenuOpen(false);
                }}
                className="hover:text-gray-300 cursor-pointer"
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.2, delay: 0.1 }} // Reduced duration and delay
                whileHover={{ scale: 1.03 }} // Lighter hover effect
              >
                About
              </motion.li>
              <motion.li
                onClick={() => {
                  scrollToSection("projects");
                  setIsMenuOpen(false);
                }}
                className="hover:text-gray-300 cursor-pointer"
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.2, delay: 0.2 }} // Reduced duration and delay
                whileHover={{ scale: 1.03 }} // Lighter hover effect
              >
                Projects
              </motion.li>
              <motion.li
                onClick={() => {
                  scrollToSection("contact");
                  setIsMenuOpen(false);
                }}
                className="hover:text-gray-300 cursor-pointer"
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.2, delay: 0.3 }} // Reduced duration and delay
                whileHover={{ scale: 1.03 }} // Lighter hover effect
              >
                Contact
              </motion.li>
              <motion.li
                className="mt-4" // Reduced margin for performance
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.2, delay: 0.4 }} // Reduced duration and delay
              >
                <motion.button
                  onClick={handleEmployClick} // Use the memoized handleEmployClick with useNavigate
                  className="px-3 py-1 border !border-white rounded-lg text-white bg-[#013220] hover:bg-white hover:text-[#013220] transition animate-glow"
                  whileHover={{ scale: 1.05 }} // Reduced scale for lighter performance
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }} // Faster transition
                >
                  Employ
                </motion.button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
})
  // Export as default and memoize for performance
export default Navbar;