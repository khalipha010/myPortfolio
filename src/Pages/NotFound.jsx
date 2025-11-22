import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1f1a] via-[#001f14] to-[#0a1f1a] px-6 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-2xl w-full text-center relative z-10">
                {/* 404 Number */}
                <motion.h1
                    className="text-9xl md:text-[200px] font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent animate-gradient mb-4"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    404
                </motion.h1>

                {/* Error Message */}
                <motion.h2
                    className="text-3xl md:text-5xl font-bold text-white mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Page Not Found
                </motion.h2>

                <motion.p
                    className="text-xl md:text-2xl text-gray-300 mb-12 max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Oops! The page you're looking for seems to have wandered off into the digital void.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <motion.button
                        onClick={() => navigate("/")}
                        className="px-8 py-4 rounded-xl font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg shadow-emerald-500/30 flex items-center gap-2"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label="Go to Home Page"
                    >
                        <Home size={20} />
                        Go Home
                    </motion.button>

                    <motion.button
                        onClick={() => navigate(-1)}
                        className="px-8 py-4 glass-strong rounded-xl text-white font-medium hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label="Go Back"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </motion.button>
                </motion.div>

                {/* Decorative Element */}
                <motion.div
                    className="mt-16 text-gray-500 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <p>Lost? Let me help you find your way back.</p>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
