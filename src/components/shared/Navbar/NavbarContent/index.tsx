import Link from "next/link";
import { motion } from "motion/react";
import styles from "./NavbarContent.module.scss";

const navLinks = [
  { href: "/", label: "Home", image: "images/IMG_1704.jpeg" },
  { href: "/story", label: "Historia", image: "images/IMG_1338.jpeg" },
  { href: "/gallery", label: "Galeria", image: "images/IMG_2098.jpeg" },
  { href: "/party", label: "Sobre la fiesta", image: "images/IMG_1704.jpeg" },
  { href: "/faq", label: "FAQ", image: "images/IMG_2098.jpeg" },
];

type NavbarContentProps = {
  toggleNavbar: () => void;
  setHoveredOption: (option: string) => void;
  setRandomRotation: (rotation: number) => void;
};

export const NavbarContent = ({ toggleNavbar, setHoveredOption, setRandomRotation }: NavbarContentProps) => {  
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

  const handleLinkHover = (image: string) => {
    const randomNumber = Math.floor(Math.random() * 17) -8;
    setRandomRotation(randomNumber);
    setHoveredOption(image);
  };

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
          onMouseEnter={() => handleLinkHover(link.image)}
          onMouseLeave={() => setHoveredOption("")}
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