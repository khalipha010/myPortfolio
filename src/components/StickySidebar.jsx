import React, { useEffect, useState } from "react"; // Added useEffect and useState for dynamic handling
import { FaTwitter, FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";

// Memoize the StickySidebar component to prevent unnecessary re-renders
const StickySidebar = React.memo(() => {
  const [isDesktop, setIsDesktop] = useState(false);

  // Use useEffect to dynamically check screen width and handle "Desktop site" on mobile
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // 768px is the breakpoint for md in Tailwind
    };

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
  }, []);

  return (
    <>
      {/* Left Sidebar: Social Media Icons with Vertical Line (Desktop Only, Responsive) */}
      <div
        className={`fixed top-1/2 left-4 transform -translate-y-1/2 z-40 ${
          isDesktop ? "block" : "hidden"
        }`}
      >
        <div className="relative flex flex-col items-center space-y-3">
          {/* Vertical Line */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-[1px]" // Simplified to Tailwind class
            style={{
              height: "55vh",
              top: "25vh",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
          ></div>

          {/* Social Icons */}
          <motion.a
            href="https://twitter.com/KhaliphaJibreel"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(255, 255, 255, 0.5)" }}
            className="text-2xl hover:text-[#00ff00] transition-colors"
            whileHover={{ scale: 1.1 }}
            aria-label="Twitter profile"
          >
            <FaTwitter />
          </motion.a>

          <motion.a
            href="https://facebook.com/khalifa.jibreel1"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(255, 255, 255, 0.5)" }}
            className="text-2xl hover:text-[#00ff00] transition-colors"
            whileHover={{ scale: 1.1 }}
            aria-label="Facebook profile"
          >
            <FaFacebook />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/khalipha-jibreel-a945a01a1/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(255, 255, 255, 0.5)" }}
            className="text-2xl hover:text-[#00ff00] transition-colors"
            whileHover={{ scale: 1.1 }}
            aria-label="LinkedIn profile"
          >
            <FaLinkedin />
          </motion.a>

          <motion.a
            href="https://github.com/khalipha010"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(255, 255, 255, 0.5)" }}
            className="text-2xl hover:text-[#00ff00] transition-colors"
            whileHover={{ scale: 1.1 }}
            aria-label="GitHub profile"
          >
            <FaGithub />
          </motion.a>
        </div>
      </div>

      {/* Right Sidebar: Email with Vertical Line (Desktop Only, Responsive) */}
      <div
        className={`fixed top-1/2 right-4 transform -translate-y-1/2 z-40 ${
          isDesktop ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col items-center space-y-3">
          {/* Vertical Line */}
          <div
            className="absolute right-1/2 transform translate-x-1/2 w-[1px]" // Simplified to Tailwind class
            style={{
              height: "60vh",
              top: "20vh",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
          ></div>

          {/* Email */}
          <motion.a
            href="mailto:khaliphajibreel@gmail.com"
            style={{ color: "rgba(255, 255, 255, 0.5)" }}
            className="text-sm font-light hover:text-[#00ff00] transition-colors rotate-90"
            whileHover={{ scale: 1.1 }}
            aria-label="Email address"
          >
            KhaliphaJibreel@gmail.com
          </motion.a>
        </div>
      </div>

      {/* CSS for responsive adjustments when "Desktop site" is selected on mobile */}
      <style>{`
        @media (max-width: 767px) {
          .hidden {
            display: none !important; /* Force hide sidebar on mobile, even in desktop mode */
          }
        }
      `}</style>
    </>
  );
});

export default StickySidebar;