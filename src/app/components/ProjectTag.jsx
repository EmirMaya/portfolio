import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected
    ? "text-white border-teal-500"
    : "text-teal-300 border-neutral-400 hover:border-white";
  return (
    <button
      className={`${buttonStyles} border-2 px-5 py-2 text-xl cursor-pointer`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
