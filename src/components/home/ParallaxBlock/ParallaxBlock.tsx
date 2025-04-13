"use client";

import Image from 'next/image';
import { useScroll, useTransform, motion } from 'motion/react';
import { useRef } from 'react';
import {useTranslations} from 'next-intl';
import styles from './ParallaxBlock.module.scss';

export const ParallaxBlock = () => {
  const t = useTranslations('Home.ParallaxBlock');
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
      target: container,
      offset: ["start end", 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  return (
    <section className={styles["ParallaxBlock"]}>
      <div className={styles["ParallaxBlock__parallax-container"]} ref={container}>
        <div className={styles["ParallaxBlock__parallax-content"]}>
          <p>{t('phrase')}</p>
          <p>{t('subtitle')}</p>
        </div>
        <div className={styles["ParallaxBlock__parallax-background"]}>
          <motion.div style={{y}} className={styles["ParallaxBlock__parallax-image"]}>
            <Image src="/images/IMG_1300.jpeg" fill alt="image"/>
          </motion.div>
        </div>
      </div>
    </section>
  );
}