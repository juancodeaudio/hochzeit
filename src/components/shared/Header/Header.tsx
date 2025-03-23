"use client";

import { motion, useScroll } from "motion/react";
import { useState, useEffect } from "react";
import { usePathname } from 'app/i18n/navigation';
import { LocaleSwitcher } from "./LocaleSwitcher";

import styles from "./Header.module.scss";

export const Header = () => {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      setIsScrolled(y > 200);
    });

    return () => unsubscribe();
  }, [scrollY]);

  const variants = {
    initial: { scale: 4, x: "-45vw", y: "30vh" },
    scrolled: { scale: 1, x: "0vw", y: "0vh" },
  };

  return (
    <motion.header className={styles["header"]}>
      <LocaleSwitcher />
      <motion.div
        className={styles["placeholder"]}
        initial="initial"
        animate={pathname === "/" ? (isScrolled ? "scrolled" : "initial") : "scrolled"}
        variants={variants}
        transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
      />
    </motion.header>
  );
};