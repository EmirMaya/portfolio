"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Overlay from "./Overlay";
import NavLink from "./NavLink";
import RetroLogo from "../icons/RetroLogo";
import Image from "next/image";

const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Projects",
    path: "#projects",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  return (
    <nav className="fixed mx-auto top-0 left-0 right-0 z-[10000] bg-[#292929] bg-opacity-100 shadow-md ">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2 ">
        <Link href={"/"} className="bg-slate-400">
          <Image src={"/logo2.svg"} alt="logo" width={64} height={64} />
        </Link>
        <div className="mobile-menu block md:hidden">
          {!isNavbarOpen ? (
            <button
              onClick={() => setIsNavbarOpen(true)}
              className="flex items-center px-3 py-2 text-neutral-200 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-10 w-10" />
            </button>
          ) : (
            <button
              onClick={() => setIsNavbarOpen(false)}
              className="flex items-center px-3 py-2 text-neutral-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-10 w-10" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isNavbarOpen ? <Overlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;
