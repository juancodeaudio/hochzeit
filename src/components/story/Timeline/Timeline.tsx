"use client";

import { useRef, useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useTransform, MotionValue, animate, useScroll, useSpring } from 'motion/react';
import { RxDoubleArrowRight, RxDoubleArrowLeft } from "react-icons/rx";
import Image from 'next/image';
import styles from './Timeline.module.scss';
import { timelineYears } from 'app/constants/config';
import { TimelineYear } from 'app/constants/types';

interface YearButtonProps {
  year: number;
  index: number;
  scrollProgress: MotionValue<number>;
  onClick: () => void;
  totalYears: number;
}

const YearButton = ({ year, index, scrollProgress, onClick, totalYears }: YearButtonProps) => {
  const progress = useTransform<number, number>(
    scrollProgress,
    Array.from({ length: totalYears }, (_, i) => i / (totalYears - 1)),
    Array.from({ length: totalYears }, (_, i) => {
      if (i === index) return 1;
      if (Math.abs(i - index) === 1) return 0.5;
      return 0;
    })
  );
  const fontSize = useTransform(progress, [0, 0.5, 1], ['1em', '1.5em', '2em']);
  const color = useTransform(progress, [0, 0.5, 1], ['#93908F', '#A67C68', '#702609']);

  return (
    <motion.button
      key={year}
      className={styles["timeline__year-button"]}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{ fontSize, color }}
      transition={{ duration: 0.15 }}
    >
      {year}
    </motion.button>
  );
}

export const Timeline = () => {
  const t = useTranslations('Story.Timeline');
  const years = useMemo<TimelineYear[]>(() => timelineYears, []);
  const [activeYear, setActiveYear] = useState<(typeof years)[number]['year']>(years[0].year);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollXProgress } = useScroll({
    container: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollXProgress, {
    stiffness: 150,
    damping: 20,
    restDelta: 0.001
  });

  const randomRotations = useMemo(() => years.map(() => (Math.random() * 30 - 15)), [years]);

  const scrollToYear = (year: number) => {
    if (activeYear === year || isAnimatingOut) return;

    setIsAnimatingOut(true);

    setTimeout(() => {
      setActiveYear(year as (typeof years)[number]['year']);

      requestAnimationFrame(() => {
        const container = scrollContainerRef.current;
        if (container) {
          const index = years.findIndex(item => item.year === year);
          const targetScroll = index * container.offsetWidth;

          animate(container.scrollLeft, targetScroll, {
            duration: 0.1,
            ease: "easeInOut",
            onUpdate: (value) => {
              container.scrollLeft = value;
              const maxScroll = container.scrollWidth - container.offsetWidth;
              const progress = value / maxScroll;
              smoothProgress.set(progress);
            }
          });
        }

        setTimeout(() => {
          setIsAnimatingOut(false);
        }, 200);
      });
    }, 50);
  };

  useEffect(() => {
    const unsubscribe = scrollXProgress.on("change", (latest) => {
      const index = Math.round(latest * (years.length - 1));
      setActiveYear(years[index].year);
    });

    return () => unsubscribe();
  }, [scrollXProgress, years]);

  const contentVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.3 } },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, delay: 0.1 } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      className={styles["timeline"]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles["timeline__years-list"]}>
        {years.map(({ year }) => (
          <YearButton
            key={year}
            year={year}
            index={years.findIndex(y => y.year === year)}
            scrollProgress={smoothProgress}
            onClick={() => scrollToYear(year)}
            totalYears={years.length}
          />
        ))}
      </div>

      <div className={styles["timeline__images-container"]}>
        {years.map(({ year, image, isVertical }, index) => (
          <motion.div
            key={year}
            className={`${styles["timeline-section__image"]} ${isVertical ? styles["timeline-section__image--vertical"] : ""}`}
            initial={{ x: "100%", opacity: 0 }}
            animate={{
              x: years.findIndex(y => y.year === activeYear) >= index ? 0 : "100%",
              opacity: years.findIndex(y => y.year === activeYear) >= index ? 1 : 0,
              rotate: randomRotations[index]
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image 
              src={image} 
              alt={`Imagen del año ${year}`} 
              fill
            />
          </motion.div>
        ))}
      </div>

      <div 
        ref={scrollContainerRef}
        className={styles["timeline__content-container"]}
      >
        {years.map(({ year }, index) => (
          <motion.div 
            key={year} 
            className={styles["timeline__section"]}
          >
            <motion.div
              className={styles["timeline-section__content"]}
              variants={contentVariants}
              initial="hidden"
              animate={activeYear === year && !isAnimatingOut ? "visible" : "hidden"}
              exit={isAnimatingOut ? "exit" : undefined}
            >
              <motion.h2
                initial={{ y: "-10%" }}
                animate={{ y: "-50%" }}
                transition={{ delay: 0.1 }}
              >
                {isMobile ? String(year).slice(2) : year}
              </motion.h2>
              {index !== 0 && (
                <motion.div
                  animate={{ x: [0, 5, 0], opacity: [0.6, 0.2, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  style={{ opacity: 1 }}
                  className={`${styles["timeline-section__content-icon--wrapper"]} ${styles["timeline-section__content-icon--wrapper--left"]}`}
                >
                  <RxDoubleArrowLeft className={styles["timeline-section__content-icon"]} />
                </motion.div>
              )}
              {index !== years.length - 1 && (
                <motion.div
                  animate={{ x: [0, -5, 0], opacity: [0.6, 0.2, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  style={{ opacity: 1 }}
                  className={`${styles["timeline-section__content-icon--wrapper"]} ${styles["timeline-section__content-icon--wrapper--right"]}`}
                >
                  <RxDoubleArrowRight className={styles["timeline-section__content-icon"]} />
                </motion.div>
              )}
              <motion.div 
                className={styles["content"]}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {t.rich(year.toString(), {
                  br: () => <br />
                })}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}