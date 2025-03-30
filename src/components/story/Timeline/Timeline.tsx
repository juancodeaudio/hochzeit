"use client";

import { useRef, useState, useEffect, useMemo } from 'react';
import {useTranslations} from 'next-intl';
import { motion, useTransform, MotionValue, animate, useScroll, useSpring } from 'motion/react';
import styles from './Timeline.module.scss';

interface YearButtonProps {
  year: number;
  index: number;
  scrollProgress: MotionValue<number>;
  onClick: () => void;
  totalYears: number;
}

function YearButton({ year, index, scrollProgress, onClick, totalYears }: YearButtonProps) {
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
  const color = useTransform(progress, [0, 0.5, 1],['#93908F', '#A67C68', '#702609']);

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
  const years = useMemo(() => [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] as const, []);
  const [activeYear, setActiveYear] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { scrollXProgress } = useScroll({
    container: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollXProgress, {
    stiffness: 150,
    damping: 20,
    restDelta: 0.001
  });

  const scrollToYear = (year: number) => {
    if (activeYear === year || isAnimatingOut) return;

    setIsAnimatingOut(true);

    setTimeout(() => {
      setActiveYear(year);

      requestAnimationFrame(() => {
        const container = scrollContainerRef.current;
        if (container) {
          const index = years.findIndex(item => item === year);
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
      setActiveYear(years[index]);
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
        {years.map((year) => (
          <YearButton
            key={year}
            year={year}
            index={years.indexOf(year)}
            scrollProgress={smoothProgress}
            onClick={() => scrollToYear(year)}
            totalYears={years.length}
          />
        ))}
      </div>
      
      <div className={styles["timeline__photos-container"]}></div>
      
      <div 
        ref={scrollContainerRef}
        className={styles["timeline__content-container"]}
      >
        {years.map((year) => (
          <motion.div 
            key={year} 
            className={styles["timeline__section"]}
            variants={contentVariants}
            initial="hidden"
            animate={activeYear === year && !isAnimatingOut ? "visible" : "hidden"}
            exit={isAnimatingOut ? "exit" : undefined}
          >
            <div className={styles["timeline-section__content"]}>
              <motion.h2
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {year}
              </motion.h2>
              <motion.div 
                className={styles["content"]}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {t(year.toString())}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}