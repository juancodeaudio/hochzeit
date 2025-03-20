"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { NavbarButton } from "./NavbarButton";
import { NavbarContent } from "./NavbarContent";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState("");
  const [randomRotation, setRandomRotation] = useState(0);

  const toggleNavbar = () => {
    setHoveredOption("");
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
      <div className={styles["navbar__container"]}>
        {isOpen && (
          <NavbarContent
            toggleNavbar={toggleNavbar} 
            setHoveredOption={setHoveredOption}
            setRandomRotation={setRandomRotation}
          />
        )}
        {hoveredOption && (
          <motion.div
            className={styles["navbar__image-container"]}
            initial={{ opacity: 0, y: -20, scale: 0.8, rotate: 0 }} 
            animate={{ opacity: 1, y: 0, scale: 1, rotate: randomRotation }} 
            transition={{ duration: 0.5 }} 
          >
            <Image
              src={hoveredOption}
              alt={`Image for ${hoveredOption}`}
              className={styles["navbar__image"]}
              fill
            />
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};