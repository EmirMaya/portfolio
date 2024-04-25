import React from "react";
import NavLink from "./NavLink";

const Overlay = ({ links }) => {
  return (
    <ul className="flex flex-col py-4 items-center  border-t border-yellow-50">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink href={link.path} title={link.title} />
        </li>
      ))}
    </ul>
  );
};

export default Overlay;
