"use client";

import styles from "./GalleryParallax.module.scss";

import Image from 'next/image';
import { useRef, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import { useTranslations } from 'next-intl';
import { GalleryImage } from "app/constants/types";

interface ParallaxImgProps {
  className?: string;
  alt: string;
  src: string;
  width: number;
  start: number;
  end: number;
  rotation?: number;
}

interface GalleryParallaxProps {
  images: GalleryImage[];
  titleKey: string;
}

export const GalleryParallax = ({ images, titleKey }: GalleryParallaxProps) => {
  const t = useTranslations('Gallery');

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
    requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const centerX = (clientX - innerWidth / 2) / innerWidth;
      const centerY = (clientY - innerHeight / 2) / innerHeight;
      x.set(centerX * 100);
      y.set(centerY * 100);
    });
  }, [x, y]);

  const layers = useMemo(() => {
    const grouped = [[], [], []] as GalleryImage[][];
    images.forEach((img, i) => {
      grouped[i % 3].push(img);
    });
    return grouped;
  }, [images]);

  const layerConfigs = useMemo(() => [
    { transformX: planeTransforms.plane1X, transformY: planeTransforms.plane1Y, images: layers[0] },
    { transformX: planeTransforms.plane2X, transformY: planeTransforms.plane2Y, images: layers[1] },
    { transformX: planeTransforms.plane3X, transformY: planeTransforms.plane3Y, images: layers[2] }
  ], [planeTransforms, layers]);

  return (
    <section onMouseMove={handleMouseMove} className={styles["gallery-parallax"]}>
      {layerConfigs.map((layer, i) => (
        <motion.div key={i} style={{ x: layer.transformX, y: layer.transformY }} className={styles["gallery-parallax__plane"]}>
          {layer.images.map((img, j) => (
            <ParallaxImg
              key={j}
              className={styles["gallery-parallax__image-container"]}
              src={img.src}
              alt="image"
              width={img.width}
              start={img.start}
              end={img.end}
              rotation={img.rotation}
            />
          ))}
        </motion.div>
      ))}
      <div className={styles["gallery-parallax__title"]}>
        <h2>
          {t.rich(titleKey, {
            br: () => <br />,
          })}
        </h2>
      </div>
    </section>
  );
};

const ParallaxImg = ({ className, alt, src, width, start, end, rotation }: ParallaxImgProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: [`${start}px end`, `end ${end}px`] });
  const rotationValue = rotation ?? 0;
  const isMainImage = start <= 0 && end >= 0;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity: useTransform(scrollYProgress, [0.75, 1], [1, 0]),
        y: useTransform(scrollYProgress, [0, 1], [start, end]),
        rotate: rotationValue
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={100}
        style={{ width, height: 'auto' }}
        priority={isMainImage}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </motion.div>
  );
};
