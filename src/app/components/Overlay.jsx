import React from "react";
import NavLink from "./NavLink";

const Overlay = ({ id, links, onNavigate }) => {
  return (
    <ul
      id={id}
      className="flex flex-col py-4 items-center  border-t border-yellow-50"
    >
      {links.map((link) => (
        <li key={link.path} onClick={onNavigate}>
          <NavLink href={link.path} title={link.title} />
        </li>
      ))}
    </ul>
  );
};

export default Overlay;
