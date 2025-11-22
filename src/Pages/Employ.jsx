import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners"; // Import PulseLoader from react-spinners
import Footer from "../components/Footer"; // Import Footer component
import Lottie from "lottie-react"; // Import Lottie from lottie-react
import ProgrammingAnimation from "../assets/temp.json"; // Use the new Lottie file
import { db } from "../firebase"; // Import Firestore
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore functions
import SuccessAnimation from "../assets/success.json"; // Add success Lottie file
import ErrorAnimation from "../assets/error.json"; // Add error Lottie file

// Memoize the Employ component to prevent unnecessary re-renders
const Employ = React.memo(() => {
  const [isLoading, setIsLoading] = useState(true); // State for both initial and navigation loading
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "web", // Default to web development
    message: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false); // State for form submission loading
  const [error, setError] = useState(""); // State for error messages
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [popupType, setPopupType] = useState("success"); // State for popup type (success/error)
  const navigate = useNavigate();

  // Use useCallback for useEffect cleanup to prevent re-creation
  useEffect(() => {
    // Handle initial loading (3 seconds)
    const initialTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(initialTimer);
  }, []);

  // Use useCallback for handleBackToHome to prevent re-creation
  const handleBackToHome = useCallback(() => {
    // Show loading state immediately
    setIsLoading(true);

    // Use a 6000ms delay for navigation (as specified in your code)
    const loadingTimeout = setTimeout(() => {
      navigate("/");
      setIsLoading(false); // Hide loading after navigation
    }, 6000); // Note: 6000ms (6 seconds) is unusually long—consider reducing for better UX (e.g., 500ms)

    return () => clearTimeout(loadingTimeout);
  }, [navigate]); // Depend on navigate for consistency

  // Use useCallback for handleInputChange to prevent re-creation
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []); // Empty dependency array since it only updates state

  // Use useCallback for handleSubmit to prevent re-creation
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSubmitLoading(true); // Show loading during submission
    setError(""); // Clear any previous errors

    try {
      console.log("Submitting form data:", formData); // Debug: Log form data
      // Save form data to Firestore
      const docRef = await addDoc(collection(db, "employmentForms"), {
        ...formData,
        timestamp: serverTimestamp(), // Add timestamp for sorting and tracking
        status: "pending", // Optional: Track submission status
      });

      console.log("Document written with ID: ", docRef.id); // Debug: Log document ID
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        service: "web",
        message: "",
      });
      setSubmitLoading(false); // Hide loading after success
      setPopupType("success"); // Set popup type to success
      setShowPopup(true); // Show success popup
      setTimeout(() => setShowPopup(false), 3000); // Auto-hide popup after 3 seconds
    } catch (error) {
      console.error("Error submitting form:", error.message, error.stack); // Enhanced error logging
      setError("Failed to submit form. Please check your connection or try again later.");
      setSubmitLoading(false); // Hide loading on error
      setPopupType("error"); // Set popup type to error
      setShowPopup(true); // Show error popup
      setTimeout(() => setShowPopup(false), 3000); // Auto-hide popup after 3 seconds
    }
  }, [formData, db]); // Depend on formData and db for consistency

  if (isLoading && !document.getElementById("home-content")) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-[#013220] text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }} // Faster transition for performance
        import React, { useState, useEffect, useCallback} from "react";
    import { motion } from "framer-motion";
    import { useNavigate } from "react-router-dom";
    import { PulseLoader } from "react-spinners"; // Import PulseLoader from react-spinners
    import Footer from "../components/Footer"; // Import Footer component
    import Lottie from "lottie-react"; // Import Lottie from lottie-react
    import ProgrammingAnimation from "../assets/temp.json"; // Use the new Lottie file
    import { db } from "../firebase"; // Import Firestore
    import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore functions
    import SuccessAnimation from "../assets/success.json"; // Add success Lottie file
    import ErrorAnimation from "../assets/error.json"; // Add error Lottie file

    // Memoize the Employ component to prevent unnecessary re-renders
    const Employ = React.memo(() => {
      const [isLoading, setIsLoading] = useState(true); // State for both initial and navigation loading
      const [formData, setFormData] = useState({
        name: "",
        email: "",
        service: "web", // Default to web development
        message: "",
      });
      const [submitLoading, setSubmitLoading] = useState(false); // State for form submission loading
      const [error, setError] = useState(""); // State for error messages
      const [showPopup, setShowPopup] = useState(false); // State for popup visibility
      const [popupType, setPopupType] = useState("success"); // State for popup type (success/error)
      const navigate = useNavigate();

      // Use useCallback for useEffect cleanup to prevent re-creation
      useEffect(() => {
        // Handle initial loading (3 seconds)
        const initialTimer = setTimeout(() => {
          setIsLoading(false);
        }, 3000);

        return () => clearTimeout(initialTimer);
      }, []);

      // Use useCallback for handleBackToHome to prevent re-creation
      const handleBackToHome = useCallback(() => {
        // Show loading state immediately
        setIsLoading(true);

        // Use a 6000ms delay for navigation (as specified in your code)
        const loadingTimeout = setTimeout(() => {
          navigate("/");
          setIsLoading(false); // Hide loading after navigation
        }, 6000); // Note: 6000ms (6 seconds) is unusually long—consider reducing for better UX (e.g., 500ms)

        return () => clearTimeout(loadingTimeout);
      }, [navigate]); // Depend on navigate for consistency

      // Use useCallback for handleInputChange to prevent re-creation
      const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }, []); // Empty dependency array since it only updates state

      // Use useCallback for handleSubmit to prevent re-creation
      const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setSubmitLoading(true); // Show loading during submission
        setError(""); // Clear any previous errors

        try {
          console.log("Submitting form data:", formData); // Debug: Log form data
          // Save form data to Firestore
          const docRef = await addDoc(collection(db, "employmentForms"), {
            ...formData,
            timestamp: serverTimestamp(), // Add timestamp for sorting and tracking
            status: "pending", // Optional: Track submission status
          });

          console.log("Document written with ID: ", docRef.id); // Debug: Log document ID
          // Reset form after successful submission
          setFormData({
            name: "",
            email: "",
            service: "web",
            message: "",
          });
          setSubmitLoading(false); // Hide loading after success
          setPopupType("success"); // Set popup type to success
          setShowPopup(true); // Show success popup
          setTimeout(() => setShowPopup(false), 3000); // Auto-hide popup after 3 seconds
        } catch (error) {
          console.error("Error submitting form:", error.message, error.stack); // Enhanced error logging
          setError("Failed to submit form. Please check your connection or try again later.");
          setSubmitLoading(false); // Hide loading on error
          setPopupType("error"); // Set popup type to error
          setShowPopup(true); // Show error popup
          setTimeout(() => setShowPopup(false), 3000); // Auto-hide popup after 3 seconds
        }
      }, [formData, db]); // Depend on formData and db for consistency

      if (isLoading && !document.getElementById("home-content")) {
        return (
          <motion.div
            className="min-h-screen flex items-center justify-center bg-[#013220] text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} // Faster transition for performance
          >
            <PulseLoader color="#00ff00" size={15} /> {/* Reduced size for performance */}
          </motion.div>
        );
      }

      return (
        <div className="flex flex-col min-h-screen bg-[#013220] text-white relative overflow-hidden pb-16 md:pb-24"> {/* Padding for taskbar */}
          {/* Animated Gradient Mesh Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
          </div>

          <motion.div
            className="px-6 pt-20 md:pt-25 flex-grow" // Added flex-grow to push footer to bottom
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} // Faster transition for performance
          >
            <div className="max-w-6xl mx-auto">
              {/* Back Button/Link with Loading State */}
              <motion.button
                onClick={handleBackToHome}
                className="mb-4 px-4 py-2 border border-emerald-400 rounded-lg text-emerald-400 bg-transparent hover:bg-emerald-400/10 transition-all duration-300"
                whileHover={{ scale: 1.03 }} // Lighter hover effect
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }} // Faster transition
              >
                ← Back to Home
              </motion.button>

              {/* Loading Animation for Back Navigation (overlay) */}
              {isLoading && document.getElementById("home-content") && (
                <motion.div
                  className="fixed inset-0 bg-[#013220] flex items-center justify-center z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }} // Faster transition for performance
                >
                  <PulseLoader color="#00ff00" size={15} /> {/* Reduced size for performance */}
                </motion.div>
              )}

              {/* Container for All Content (excluding Back Button) */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Left Side on Desktop (Why Hire Me and Lottie, pushed down) */}
                <div className="md:w-1/2 flex flex-col items-center md:items-start"> {/* Centered on mobile, start on desktop */}
                  {/* Why Hire Me Section (Pushed down on desktop) */}
                  <motion.div
                    className="md:mt-12" // Added margin-top on desktop to push content down
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.4 }} // Reduced duration for speed
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <h1 className="text-2xl font-bold text-emerald-400 mb-2"> {/* Reduced margin for performance */}
                      Why Hire Me?
                    </h1>
                    <p className="text-base md:text-lg text-gray-300">
                      I am a passionate and skilled developer with expertise in modern web and mobile app development. I deliver high-quality, scalable, and user-friendly solutions tailored to your needs. Let’s work together to bring your ideas to life!
                    </p>
                  </motion.div>

                  {/* Lottie Animation (Desktop: Beneath Why Hire Me; Mobile: Hidden) */}
                  <motion.div
                    className="mt-6 w-full md:w-auto flex justify-center md:justify-start hidden md:block" // Show on desktop, hidden on mobile, centered on mobile, start-aligned on desktop
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.4, delay: 0.2 }} // Reduced duration and delay
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <Lottie
                      animationData={ProgrammingAnimation}
                      loop={true}
                      autoplay={true}
                      style={{
                        height: window.innerWidth >= 768 ? 350 : 250, // Larger on desktop (md and up), smaller on mobile
                        width: window.innerWidth >= 768 ? 350 : 250, // Adjust dynamically based on screen width
                      }}
                    />
                  </motion.div>
                </div>

                {/* Form and Lottie Container (Desktop: Form on Right, lowered more; Mobile: Stacked and Centered) */}
                <div className="md:w-1/2 flex flex-col items-center md:items-start"> {/* Centered on mobile, start on desktop */}
                  {/* Form Section (Right Side on Desktop, centered and lowered on mobile) */}
                  <motion.div
                    className="glass p-3 md:p-4 rounded-2xl border border-emerald-500/30 shadow-lg w-full max-w-md md:mt-12 hover:border-emerald-500/50 transition-all duration-300" // Increased margin-top on desktop to lower the form more
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.4, delay: 0.1 }} // Reduced duration and delay
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <form className="space-y-3" onSubmit={handleSubmit}> {/* Reduced space for performance */}
                      {/* Name Field */}
                      <div>
                        <label className="block text-base mb-1 text-green-400">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full p-2 bg-transparent border border-emerald-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                          placeholder=""
                          required
                        />
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="block text-base mb-1 text-green-400">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-2 bg-transparent border border-emerald-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                          placeholder=""
                          required
                        />
                      </div>

                      {/* Service Dropdown */}
                      <div>
                        <label className="block text-base mb-1 text-green-400">
                          Services
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full p-2 bg-transparent border border-emerald-400/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300"
                          required
                        >
                          <option value="web">Web Development</option>
                          <option value="app">App Development</option>
                        </select>
                      </div>

                      {/* Message Field */}
                      <div>
                        <label className="block text-base mb-1 text-green-400">
                          Your Requirements
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full p-2 bg-transparent border border-emerald-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 h-20"
                          placeholder=""
                          required
                        />
                      </div>

                      {/* Submit Button with Shining Effect and Loading State */}
                      <div className="flex justify-center">
                        <motion.button
                          type="submit"
                          className="px-8 py-3 border-2 border-emerald-400 rounded-lg text-emerald-400 bg-transparent hover:bg-emerald-400/10 transition-all duration-300 relative overflow-hidden animate-glow-button"
                          whileHover={{ scale: 1.05 }} // Slightly enhanced hover effect
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }} // Faster transition
                          disabled={submitLoading} // Disable button while loading
                        >
                          {submitLoading ? (
                            <PulseLoader color="#10b981" size={8} />
                          ) : (
                            <>
                              <span className="relative z-10">Submit</span>
                            </>
                          )}
                        </motion.button>
                      </div>

                      {error && (
                        <p className="text-red-400 text-sm text-center mt-2">{error}</p>
                      )}
                    </form>
                  </motion.div>

                  {/* Lottie Animation (Desktop: Hidden; Mobile: Below Form, Centered) */}
                  <motion.div
                    className="mt-6 md:hidden w-full flex justify-center" // Added margin-top and centered on mobile, hidden on desktop
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.4, delay: 0.2 }} // Reduced duration and delay
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <Lottie
                      animationData={ProgrammingAnimation}
                      loop={true}
                      autoplay={true}
                      style={{ height: 250, width: 250 }} // Reduced size for performance on mobile
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Popup Card for Success/Error */}
          {showPopup && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-[#001F14] p-4 md:p-6 rounded-2xl border border-white/10 shadow-lg max-w-sm w-full mx-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col items-center">
                  <Lottie
                    animationData={popupType === "success" ? SuccessAnimation : ErrorAnimation}
                    loop={false}
                    autoplay={true}
                    style={{ height: 100, width: 100 }} // Fixed size for consistency
                  />
                  <p className="text-! text-sm md:text-base mt-2">
                    {popupType === "success"
                      ? "Form submitted successfully!"
                      : "Failed to submit form. Please try again."}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}

          <Footer /> {/* Restored Footer at the bottom, pushed down by content or padding */}

          {/* Global CSS for Glow Animation */}
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
        
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-10px) translateX(10px) rotate(5deg); }
          50% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          75% { transform: translateY(10px) translateX(-10px) rotate(-5deg); }
          100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
        }

        .animate-float {
          animation: float 10s ease-in-out infinite;
        }

        .glass {
          background: rgba(0, 31, 20, 0.6); /* Darker emerald with transparency */
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
      `}</style>
        </div>
      );
    });

    export default Employ;