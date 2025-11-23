import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleKhaliphaClick = () => {
    navigate("/admin"); // Navigate to the AdminLogin page
  };

  return (
    <footer className="w-full py-6 text-center text-white bg-[#013220]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-lg">
          Built by{" "}
          <span
            onClick={handleKhaliphaClick}
            className="text-white! hover:underline cursor-pointer"
            aria-label="Navigate to Admin Login"
          >
            Khalipha
          </span>{" "}
          Jibreel ❤️
        </p>
        <p className="text-sm mt-2">
          Designed and inspired by{" "}
          <a
            href="https://v4.brittanychiang.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400! hover:underline ml-1"
          >
            Brittany Chiang
          </a>
          {" & "}
          <a
            href="https://ebukathedev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400! hover:underline ml-1"
          >
            Ebuka Ejiofor
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;