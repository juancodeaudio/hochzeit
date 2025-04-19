import { motion } from "motion/react";

import styles from "./NavbarButton.module.scss";

type NavbarButtonProps = {
  isOpen: boolean;
  toggleNavbar: () => void;
};

export const NavbarButton = ({ isOpen, toggleNavbar }: NavbarButtonProps) => {
  const button = {
    closed: { rotate: 0 },
    open: { rotate: 90 }
  }
  
  const line = {
    closed: (custom: number) => ({
      x: custom === 1 ? "5px" : "-5px",
      y: "-50%",
      scaleY: 0.7,
      rotate: 0,
      backgroundColor: "#313030",
    }),
    open: (custom: number) => ({
      x: "-50%",
      y: "-50%",
      scaleY: 1,
      rotate: custom === 1 ? 315 : 45,
      backgroundColor: "#FDF8F7",
    })
  }

  return (
    <motion.button
      className={styles["navbar-button"]}
      onClick={toggleNavbar}
      animate={isOpen ? "open" : "closed"} 
      variants={button}
      transition={{
        delay: 0.2,
        duration: 0.8,
        ease: [0.645, 0.045, 0.355, 1]
      }}
    >
      <motion.span
        className={styles["navbar-button__line"]}
        animate={isOpen ? "open" : "closed"} 
        variants={line}
        transition={{ duration: 1, ease: [0.645, 0.045, 0.355, 1] }}
        custom={0}
      />
      <motion.span
        className={styles["navbar-button__line"]}
        animate={isOpen ? "open" : "closed"} 
        variants={line}
        transition={{ duration: 1, ease: [0.645, 0.045, 0.355, 1] }}
        custom={1}
      />
    </motion.button>
  );
}