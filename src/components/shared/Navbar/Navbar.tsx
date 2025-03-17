"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { NavbarButton } from "./NavbarButton";
import { NavbarContent } from "./NavbarContent";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      className={styles["navbar"]}
      animate={{
        width: isOpen ? "101vw" : "5vw",
        backgroundColor: isOpen ? "#111" : "#fefefe"
      }}
      transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1] }}
    >
      <NavbarButton isOpen={isOpen} toggleNavbar={toggleNavbar} />
      {isOpen && (
        <NavbarContent toggleNavbar={toggleNavbar} />
      )}
    </motion.nav>
  );
}