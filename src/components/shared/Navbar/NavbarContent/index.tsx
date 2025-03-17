import Link from "next/link";
import { motion } from "motion/react";
import styles from "./NavbarContent.module.scss";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/story", label: "Historia" },
  { href: "/gallery", label: "Galeria" },
  { href: "/party", label: "Sobre la fiesta" },
  { href: "/faq", label: "FAQ" },
];

type NavbarContentProps = {
  toggleNavbar: () => void;
};

export const NavbarContent = ({ toggleNavbar }: NavbarContentProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  }
  
  const item = {
    hidden: { x: "-100%" },
    show: { x: "0%" }
  }

  return (
    <motion.ul
      className={styles["navbar__menu"]}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {navLinks.map((link) => (
        <motion.li
          className={styles["navbar__item"]}
          key={link.href} 
          variants={item} 
          transition={{ duration: 1, ease: [0.645, 0.045, 0.355, 1] }}
        >
          <Link
            className={styles["navbar__link"]}
            href={link.href}
            onClick={toggleNavbar}
          >
            {link.label}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  )
}