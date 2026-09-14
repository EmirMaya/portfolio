"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Overlay from "./Overlay";
import NavLink from "./NavLink";
import Image from "next/image";
import { navLinks } from "../data/navigation";
import styles from "./navbar.module.css";

export default function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const updateScroll = () => setHasScrolled(window.scrollY > 24);
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsNavbarOpen(false);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      window.removeEventListener("scroll", updateScroll);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  useEffect(() => {
    if (!isNavbarOpen) return;

    const closeOnOutsideClick = (event) => {
      if (!navRef.current?.contains(event.target)) setIsNavbarOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsNavbarOpen(false);
        toggleRef.current?.focus({ preventScroll: true });
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isNavbarOpen]);

  const closeAfterNavigation = () => {
    setIsNavbarOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  };

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className={styles.navbar}
      data-scrolled={hasScrolled}
      data-open={isNavbarOpen}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsNavbarOpen(false);
      }}
    >
      <div className={`container mx-auto ${styles.bar}`}>
        <Link href="#top" aria-label="Emir Maya — back to top" className={styles.brand} onClick={() => setIsNavbarOpen(false)}>
          <Image className={styles.logo} src="/images/logo.png" alt="" width={74} height={74} />
        </Link>
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setIsNavbarOpen((open) => !open)}
          aria-label={isNavbarOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isNavbarOpen}
          aria-controls="mobile-navigation"
          className={styles.toggle}
        >
          <span>{isNavbarOpen ? "Close" : "Menu"}</span>
          {isNavbarOpen ? <XMarkIcon aria-hidden="true" /> : <Bars3Icon aria-hidden="true" />}
        </button>
        <ul className={styles.desktopLinks}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink href={link.path} title={link.title} />
            </li>
          ))}
        </ul>
      </div>
      <Overlay
        id="mobile-navigation"
        links={navLinks}
        isOpen={isNavbarOpen}
        onNavigate={closeAfterNavigation}
      />
    </nav>
  );
}
