import React from "react";
import { motion } from "framer-motion";

const variants = {
  default: { width: 0 },
  active: { width: "calc(100% - 0.75rem" },
};
const getRandomColor = () => {
  const colors = ["#ef4444", "#eab308", "#14b8a6", "#0ea5e9"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const TabButton = ({ active, selectTab, children }) => {
  const buttonClasses = active ? "text-[#f2f2ea]" : "text-[#e3e3dc]";
  return (
    <button onClick={selectTab}>
      <p className={`mr-3 font-semibold hover:text-white ${buttonClasses}`}>
        {children}
      </p>
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        className="h-1 mt-2 mr-3"
        style={{ backgroundColor: getRandomColor() }}
      ></motion.div>
    </button>
  );
};

export default TabButton;
