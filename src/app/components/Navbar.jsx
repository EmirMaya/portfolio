"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Overlay from "./Overlay";
import NavLink from "./NavLink";
import Image from "next/image";
import { navLinks } from "../data/navigation";

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  return (
    <nav className="fixed mx-auto top-0 left-0 right-0 z-[10000]">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2 ">
        <Link href={"/"}>
          <Image src={"/logo2.svg"} alt="logo" width={64} height={64} />
        </Link>
        <div className="mobile-menu block md:hidden">
          {!isNavbarOpen ? (
            <button
              onClick={() => setIsNavbarOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isNavbarOpen}
              aria-controls="mobile-navigation"
              className="flex items-center px-3 py-2 text-neutral-200 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-10 w-10" />
            </button>
          ) : (
            <button
              onClick={() => setIsNavbarOpen(false)}
              aria-label="Close navigation menu"
              aria-expanded={isNavbarOpen}
              aria-controls="mobile-navigation"
              className="flex items-center px-3 py-2 text-neutral-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-10 w-10" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isNavbarOpen ? (
        <Overlay
          id="mobile-navigation"
          links={navLinks}
          onNavigate={() => setIsNavbarOpen(false)}
        />
      ) : null}
    </nav>
  );
};

export default Navbar;
