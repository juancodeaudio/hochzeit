"use client";

import Image from 'next/image';
 
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './Hero.module.scss';

export const Hero = () => {
  const t = useTranslations('Home.Hero');
  const container = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        setOffsetY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className={styles["Hero"]} ref={container}>
      <div className={styles["Hero__img-container"]} style={{ transform: `translateY(${offsetY * 0.3}px)` }}>
        <Image src="/images/IMG_1704.jpeg" fill alt="image" />
      </div>
      <h1 className={styles["Hero__title"]}>{t('title')}</h1>
      <h3>{t('welcome')}</h3>
    </section>
  );
}