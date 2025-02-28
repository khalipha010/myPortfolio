import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import Firebase auth from your firebase.js
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { motion } from "framer-motion"; // Import motion from framer-motion

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      // Attempt to sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      // If successful, navigate to AdminDashboard
      navigate("/admindashboard");
    } catch (error) {
      // Handle authentication errors
      switch (error.code) {
        case "auth/invalid-email":
          setError("Invalid email format.");
          break;
        case "auth/user-not-found":
          setError("No admin account found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        default:
          setError("An error occurred. Please try again.");
      }
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, credentials.email);
      setError("Password reset email sent. Check your inbox.");
    } catch (error) {
      setError("Error sending reset email. Please try again.");
    }
  };

  const handleBackToHome = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <div className="min-h-screen bg-[#013220] text-white flex flex-col items-start justify-center p-4 md:p-6">
      {/* Back to Home Button (Outside the form, aligned to the left) */}
      <motion.button
        onClick={handleBackToHome}
        className="mb-4 px-4 py-2 border border-white! rounded-lg text-white bg-[#013220] hover:bg-white hover:text-[#013220] transition"
        whileHover={{ scale: 1.03 }} // Lighter hover effect
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }} // Faster transition
      >
        ← Back to Home
      </motion.button>

      {/* Form Container (Centered on the page) */}
      <div className="w-full flex justify-center">
        <motion.div
          className="max-w-md p-4 md:p-6 bg-[#001F14] rounded-2xl border border-white/10 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-center mb-4 text-green-400">
            Admin Login
          </h1>
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-base mb-1 text-green-400">Email</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                className="w-full p-2 md:p-3 bg-transparent border border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder=""
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-base mb-1 text-green-400">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                className="w-full p-2 md:p-3 bg-transparent border border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder=""
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            {/* Submit Button with Enhanced Shining Effect and White Border */}
            <div className="flex justify-center">
              <motion.button
                type="submit"
                className="px-3 py-1.5 border-2 border-white! rounded-lg text-white bg-transparent hover:bg-white hover:text-[#013220] transition text-sm md:text-base relative overflow-hidden"
                whileHover={{ scale: 1.05 }} // Slightly enhanced hover effect
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }} // Faster transition
              >
                <motion.span
                  className="absolute top-0 left-0 w-full h-full shine-effect"
                  initial={{ x: "-150%" }}
                  animate={{ x: "150%" }}
                  transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }} // Slightly faster shine for emphasis
                />
                Login
              </motion.button>
            </div>

            {/* Forgot Password Link */}
            <p className="text-sm text-center mt-2 md:mt-3">
              <button
                onClick={handleForgotPassword}
                className="text-green-400 hover:underline"
              >
                Forgot Password?
              </button>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;