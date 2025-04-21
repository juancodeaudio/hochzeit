"use client";

import { motion } from 'motion/react';
import styles from './Palette.module.scss';
import Logo from 'public/vectors/logo.svg';
import { Color } from "app/constants/types";

interface PaletteProps {
  colors: Color[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    },
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
};

const Palette = ({ colors }: PaletteProps) => {
  return (
    <motion.section
      className={styles['Palette']}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
    >
      {colors.map((color, index) => (
        <motion.div
          key={index}
          className={styles['Palette__swatch']}
          style={{ backgroundColor: color.hex, flex: 1 }}
          variants={itemVariants}
          whileHover={{
            flex: 2,
            transition: {
              duration: 0.5,
              ease: [0.645, 0.045, 0.355, 1],
            }
          }}
        >
          <Logo
            className={styles['Palette__swatch-logo']}
            style={{ fill: color.fontColor }}
          />
          <span
            className={styles['Palette__swatch-name']}
            style={{ color: color.fontColor }}
          >
            {color.name}
          </span>
        </motion.div>
      ))}
    </motion.section>
  )
}

export default Palette;