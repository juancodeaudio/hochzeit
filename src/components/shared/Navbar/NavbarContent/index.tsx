import {useTranslations} from 'next-intl';

import { motion } from "motion/react";
import { Link } from 'app/i18n/navigation';
import { navLinks } from "app/constants/config";
import styles from "./NavbarContent.module.scss";
import { NavLink } from "app/constants/types";

type NavbarContentProps = {
  toggleNavbar: () => void;
  setHoveredOption: (option: NavLink | null) => void;
  setRandomRotation: (rotation: number) => void;
};

export const NavbarContent = ({ toggleNavbar, setHoveredOption, setRandomRotation }: NavbarContentProps) => {  
  const t = useTranslations('Navbar');
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

  const handleLinkHover = (link: typeof navLinks[0]) => {
    const randomNumber = Math.floor(Math.random() * 17) - 8;
    setRandomRotation(randomNumber);
    setHoveredOption(link);
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
          onMouseEnter={() => handleLinkHover(link)}
          onMouseLeave={() => setHoveredOption(null)}
        >
          <Link
            className={styles["navbar__link"]}
            href={link.href}
            onClick={toggleNavbar}
          >
            {t.rich(link.label, {
              br: () => <br />
            })}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  )
}