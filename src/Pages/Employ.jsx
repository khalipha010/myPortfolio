import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import Footer from "../components/Footer";
import Lottie from "lottie-react";
import ProgrammingAnimation from "../assets/temp.json";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import SuccessAnimation from "../assets/success.json";
import ErrorAnimation from "../assets/error.json";
import { FaCode, FaMobile, FaRocket, FaCheckCircle } from "react-icons/fa";

const Employ = React.memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "web",
    message: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(initialTimer);
  }, []);

  const handleBackToHome = useCallback(() => {
    setIsLoading(true);
    const loadingTimeout = setTimeout(() => {
      navigate("/");
      setIsLoading(false);
    }, 6000);

    return () => clearTimeout(loadingTimeout);
  }, [navigate]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError("");

    try {
      console.log("Submitting form data:", formData);
      const docRef = await addDoc(collection(db, "employmentForms"), {
        ...formData,
        timestamp: serverTimestamp(),
        status: "pending",
      });

      console.log("Document written with ID: ", docRef.id);
      setFormData({
        name: "",
        email: "",
        service: "web",
        message: "",
      });
      setSubmitLoading(false);
      setPopupType("success");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error.message, error.stack);
      setError("Failed to submit form. Please check your connection or try again later.");
      setSubmitLoading(false);
      setPopupType("error");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  }, [formData, db]);

  if (isLoading && !document.getElementById("home-content")) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#013220] via-[#0a3a3a] to-[#0a192f] text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <PulseLoader color="#10b981" size={15} />
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#013220] via-[#0a3a3a] to-[#0a192f] text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="px-6 pt-20 md:pt-28 flex-grow relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.button
            onClick={handleBackToHome}
            className="mb-8 px-6 py-3 border-2 border-emerald-400/30 rounded-xl text-white bg-white/5 backdrop-blur-md hover:bg-emerald-400/20 hover:border-emerald-400 transition-all duration-300 flex items-center gap-2 group"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Home
          </motion.button>

          {/* Loading Animation for Back Navigation */}
          {isLoading && document.getElementById("home-content") && (
            <motion.div
              className="fixed inset-0 bg-gradient-to-br from-[#013220] via-[#0a3a3a] to-[#0a192f] flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PulseLoader color="#10b981" size={15} />
            </motion.div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Why Hire Me */}
            <div className="space-y-8">
              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Let's Build Something Amazing
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Transform your vision into reality with cutting-edge web and mobile solutions.
                </p>
              </motion.div>

              {/* Why Hire Me Card */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <h2 className="text-3xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
                  <FaRocket className="text-2xl" />
                  Why Hire Me?
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  I am a passionate and skilled developer with expertise in modern web and mobile app development. I deliver high-quality, scalable, and user-friendly solutions tailored to your needs.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: FaCode, text: "Clean Code" },
                    { icon: FaMobile, text: "Responsive Design" },
                    { icon: FaRocket, text: "Fast Delivery" },
                    { icon: FaCheckCircle, text: "Quality Assured" },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.05, x: 5 }}
                    >
                      <feature.icon className="text-emerald-400 text-xl" />
                      <span className="text-gray-200">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Lottie Animation - Desktop Only */}
              <motion.div
                className="hidden lg:flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl" />
                  <Lottie
                    animationData={ProgrammingAnimation}
                    loop={true}
                    autoplay={true}
                    style={{ height: 350, width: 350 }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Side - Contact Form */}
            <motion.div
              className="lg:sticky lg:top-24"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl relative overflow-hidden">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-50" />

                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-white mb-2">Get In Touch</h2>
                  <p className="text-gray-400 mb-8">Fill out the form below and let's start working together!</p>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-emerald-400">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-emerald-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    {/* Service Dropdown */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-emerald-400">
                        Service Needed
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm cursor-pointer"
                        required
                      >
                        <option value="web" className="bg-[#0a192f]">Web Development</option>
                        <option value="app" className="bg-[#0a192f]">App Development</option>
                      </select>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-emerald-400">
                        Project Requirements
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none"
                        placeholder="Tell me about your project..."
                        rows="5"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white font-semibold shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 relative overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={submitLoading}
                    >
                      {submitLoading ? (
                        <PulseLoader color="#ffffff" size={10} />
                      ) : (
                        <>
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            Send Message
                            <FaRocket className="group-hover:translate-x-1 transition-transform" />
                          </span>
                        </>
                      )}
                    </motion.button>

                    {error && (
                      <motion.p
                        className="text-red-400 text-sm text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {error}
                      </motion.p>
                    )}
                  </form>
                </div>
              </div>

              {/* Mobile Lottie Animation */}
              <motion.div
                className="lg:hidden mt-8 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Lottie
                  animationData={ProgrammingAnimation}
                  loop={true}
                  autoplay={true}
                  style={{ height: 250, width: 250 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Success/Error Popup */}
      {showPopup && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-2xl max-w-sm w-full"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="flex flex-col items-center text-center">
              <Lottie
                animationData={popupType === "success" ? SuccessAnimation : ErrorAnimation}
                loop={false}
                autoplay={true}
                style={{ height: 120, width: 120 }}
              />
              <h3 className={`text-2xl font-bold mt-4 ${popupType === "success" ? "text-emerald-400" : "text-red-400"}`}>
                {popupType === "success" ? "Success!" : "Oops!"}
              </h3>
              <p className="text-gray-300 mt-2">
                {popupType === "success"
                  ? "Your message has been sent successfully! I'll get back to you soon."
                  : "Failed to submit form. Please try again."}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
});

export default Employ;