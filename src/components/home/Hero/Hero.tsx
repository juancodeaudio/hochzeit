"use client";

import Image from 'next/image';
import { useScroll, useTransform, motion } from 'motion/react';
import { useRef } from 'react';
import {useTranslations} from 'next-intl';
import styles from './Hero.module.scss';

export const Hero = () => {
  const t = useTranslations('Home.Hero');
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"])
  
  return (
    <section className={styles["Hero"]}>
      <div className={styles["Hero__main"]}>
        <motion.div className={styles["Hero__img-container"]} style={{y}}>
          <Image src="/images/IMG_1704.jpeg" fill alt="image"/>
        </motion.div>
        <h1>{t('title')}</h1>
        <h3>{t('welcome')}</h3>
      </div>
      <div className={styles["Hero__quote-container"]}>
        <p>{t('quote')}</p>
        <p>- {t('quoteAuthor')}</p>
      </div>
    </section>
  );
}