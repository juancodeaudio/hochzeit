"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { useNavbarContext } from "./NavbarContext";
import { NavbarButton } from "../../common/NavbarButton/NavbarButton";
import { NavbarContent } from "./NavbarContent";

import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const { isOpen, toggleNavbar, hoveredOption, setHoveredOption } = useNavbarContext();
  const [randomRotation, setRandomRotation] = useState(0);

  return (
    <motion.nav
      className={styles["navbar"]}
      animate={{
        width: isOpen ? "var(--navbar-width-open)" : "var(--navbar-width-closed)",
        backgroundColor: isOpen ? "var(--color-navbar-open)" : "var(--color-navbar-closed)"
      }}
      transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1] }}
    >
      <NavbarButton />
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
            className={`${styles["navbar__image-container"]} ${hoveredOption.isVertical ? styles["navbar__image-container--vertical"] : ""}`}
            initial={{ opacity: 0, y: -20, scale: 0.8, rotate: 0 }} 
            animate={{ opacity: 1, y: 0, scale: 1, rotate: randomRotation }} 
            transition={{ duration: 0.5 }} 
          >
            <Image
              src={hoveredOption.image}
              alt={`Image for ${hoveredOption.label}`}
              className={styles["navbar__image"]}
              fill
            />
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};