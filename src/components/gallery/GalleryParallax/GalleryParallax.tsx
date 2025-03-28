"use client";

import styles from "./GalleryParallax.module.scss";

import Image from 'next/image';
import { useRef, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';

interface ParallaxImgProps {
  className?: string;
  alt: string;
  src: string;
  width: number;
  start: number;
  end: number;
}

export const GalleryParallax = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 40, damping: 40 });
  const smoothY = useSpring(y, { stiffness: 40, damping: 40 });

  const plane1X = useTransform(smoothX, (value) => value * 1);
  const plane1Y = useTransform(smoothY, (value) => value * 1);
  const plane2X = useTransform(smoothX, (value) => value * 0.5);
  const plane2Y = useTransform(smoothY, (value) => value * 0.5);
  const plane3X = useTransform(smoothX, (value) => value * 0.25);
  const plane3Y = useTransform(smoothY, (value) => value * 0.25);

  const planeTransforms = useMemo(() => (
    { plane1X, plane1Y, plane2X, plane2Y, plane3X, plane3Y }
  ), [plane1X, plane1Y, plane2X, plane2Y, plane3X, plane3Y]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const centerX = (clientX - innerWidth / 2) / innerWidth;
    const centerY = (clientY - innerHeight / 2) / innerHeight;
    x.set(centerX * 100);
    y.set(centerY * 100);
  }, [x, y]);

  const imageLayers = [
    {
      transformX: planeTransforms.plane1X,
      transformY: planeTransforms.plane1Y,
      images: [
        { src: '/images/IMG_1338.jpeg', width: 400, start: 0, end: 0 },
        { src: '/images/IMG_2098.jpeg', width: 400, start: 0, end: 0 },
        { src: '/images/IMG_2098.jpeg', width: 325, start: 50, end: -50 }
      ]
    },
    {
      transformX: planeTransforms.plane2X,
      transformY: planeTransforms.plane2Y,
      images: [
        { src: '/images/IMG_1704.jpeg', width: 350, start: 100, end: 0 },
        { src: '/images/IMG_1704.jpeg', width: 300, start: 0, end: 50 },
        { src: '/images/IMG_1338.jpeg', width: 325, start: -50, end: 0 }
      ]
    },
    {
      transformX: planeTransforms.plane3X,
      transformY: planeTransforms.plane3Y,
      images: [
        { src: '/images/IMG_2098.jpeg', width: 250, start: -150, end: 100 },
        { src: '/images/IMG_1704.jpeg', width: 400, start: -70, end: 100 }
      ]
    }
  ];

  return (
    <section onMouseMove={handleMouseMove} className={styles["gallery-parallax"]}>
      {imageLayers.map((layer, i) => (
        <motion.div key={i} style={{ x: layer.transformX, y: layer.transformY }} className={styles["gallery-parallax__plane"]}>
          {layer.images.map((img, j) => (
            <ParallaxImg
              key={j} className={styles["gallery-parallax__image-container"]} src={img.src} alt="image"
              width={img.width} start={img.start} end={img.end}
            />
          ))}
        </motion.div>
      ))}
      <div className={styles["gallery-parallax__title"]}>
        <h1>Nuestras memorias</h1>
      </div>
    </section>
  );
};

const ParallaxImg = ({ className, alt, src, width, start, end }: ParallaxImgProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: [`${start}px end`, `end ${end}px`] });
  const generateRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity: useTransform(scrollYProgress, [0.75, 1], [1, 0]),
        scale: useTransform(scrollYProgress, [0.75, 1], [1, 0.85]),
        y: useTransform(scrollYProgress, [0, 1], [start, end]),
        rotate: generateRandomNumber(-6, 6)
      }}
    >
      <Image src={src} alt={alt} width={width} height={100} style={{ width, height: 'auto' }} />
    </motion.div>
  );
};
