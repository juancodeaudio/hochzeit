"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavbarContext } from "./NavbarContext";
import { NavbarButton } from "../../common/NavbarButton/NavbarButton";
import { NavbarContent } from "./NavbarContent";
import { navLinks } from "app/constants/config";

import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const { isOpen, toggleNavbar, hoveredOption, setHoveredOption } = useNavbarContext();
  const [randomRotation, setRandomRotation] = useState(0);
  const [mobileImageIndex, setMobileImageIndex] = useState(0);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile && isOpen) {
      const interval = setInterval(() => {
        setMobileImageIndex((prevIndex) => (prevIndex + 1) % navLinks.length);
        const randomNumber = Math.floor(Math.random() * 17) - 8;
        setRandomRotation(randomNumber);
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const displayOption = isMobile
    ? navLinks[mobileImageIndex]
    : hoveredOption;

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
        {isOpen && displayOption && (
          <motion.div
            key={displayOption.label}
            className={`${styles["navbar__image-container"]} ${displayOption.isVertical ? styles["navbar__image-container--vertical"] : ""}`}
            initial={{ opacity: 0, y: -20, scale: 0.8, rotate: 0 }} 
            animate={{ opacity: 1, y: 0, scale: 1, rotate: randomRotation }} 
            exit={{ opacity: 0, y: 10, scale: 0.8 }} 
            transition={{ duration: 0.5 }} 
          >
            <Image
              src={displayOption.image}
              alt={`Image for ${displayOption.label}`}
              className={styles["navbar__image"]}
              fill
            />
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};