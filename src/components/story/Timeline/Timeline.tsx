"use client";

import { useRef, useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useTransform, MotionValue, animate, useScroll, useSpring } from 'motion/react';
import Image from 'next/image';
import styles from './Timeline.module.scss';
import { timelineYears } from 'app/constants/config';

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
  const years = useMemo(() => timelineYears, []);
  const [activeYear, setActiveYear] = useState<(typeof years)[number]['year']>(years[0].year);
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
            className={styles["timeline-section__image"]}
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
              width={!isVertical ? 400 : 300} 
              height={!isVertical ? 300 : 400}
            />
          </motion.div>
        ))}
      </div>

      <div 
        ref={scrollContainerRef}
        className={styles["timeline__content-container"]}
      >
        {years.map(({ year }) => (
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
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}