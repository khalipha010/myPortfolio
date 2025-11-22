import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorGlow = () => {
    const [isMobile, setIsMobile] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 700 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(pointer: coarse)").matches);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        const handleMouseMove = (e) => {
            mouseX.set(e.clientX - 200); // Center the 400px glow
            mouseY.set(e.clientY - 200);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    if (isMobile) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0 mix-blend-screen"
            style={{
                x,
                y,
                background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(20, 184, 166, 0.05) 40%, transparent 70%)",
            }}
        />
    );
};

export default CursorGlow;
