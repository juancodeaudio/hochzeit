"use client";

import styles from "./GalleryScroll.module.scss";

import Image from "next/image";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";

export const GalleryScroll = () => {
  const galleryScroll = useRef(null);
  const { scrollYProgress: progress1 } = useScroll({
    target: galleryScroll,
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: progress2 } = useScroll({
    target: galleryScroll,
    offset: ["start end", "start start"],
  });

  const scale4 = useTransform(progress1, [0, 1], [1, 4]);
  const scale5 = useTransform(progress1, [0, 1], [1, 5]);
  const scale6 = useTransform(progress1, [0, 1], [1, 6]);
  const scale8 = useTransform(progress1, [0, 1], [1, 8]);
  const scale9 = useTransform(progress1, [0, 1], [1, 9]);

  // Definir desplazamientos para el efecto de parallax basado en progress2
  const parallaxUp50 = useTransform(progress2, [0, 1], ["-50px", "0px"]);
  const parallaxUp90 = useTransform(progress2, [0, 1], ["-90px", "0px"]);
  const parallaxD100 = useTransform(progress2, [0, 1], ["100px", "0px"]); //DOWN
  const parallax0 = useTransform(progress2, [0, 1], ["0px", "0px"]); //DOWN
  const parallaxUp200 = useTransform(progress2, [0, 1], ["-200px", "0px"]); //UP FAST
  const parallaxUp140 = useTransform(progress2, [0, 1], ["-140px", "0px"]); //UP FAST

  const rotate1 = useTransform(progress2, [0, 1], ["2deg", "0deg"]);
  const rotate2 = useTransform(progress2, [0, 1], ["-4deg", "0deg"]);
  const rotate3 = useTransform(progress2, [0, 1], ["4deg", "0deg"]);
  const rotate4 = useTransform(progress2, [0, 1], ["-5deg", "0deg"]);
  const rotate5 = useTransform(progress2, [0, 1], ["4deg", "0deg"]);
  const rotate6 = useTransform(progress2, [0, 1], ["-3deg", "0deg"]);
  const rotate7 = useTransform(progress2, [0, 1], ["-2deg", "0deg"]);

  const pictures = [
    { src: "/images/IMG_3049.jpeg", scale: scale4, parallax: parallaxUp90, rotate: rotate1 }, //CENTER
    { src: "/images/IMG_0003.jpeg", scale: scale5, parallax: parallaxUp200, rotate: rotate2 }, //TOP
    { src: "/images/IMG_5153.jpeg", scale: scale6, parallax: parallaxUp50, rotate: rotate3 }, //VERTICAL
    { src: "/images/IMG_0004.jpeg", scale: scale5, parallax: parallaxUp140, rotate: rotate4 }, //RIGHT
    { src: "/images/IMG_0002.jpeg", scale: scale6, parallax: parallaxD100, rotate: rotate5 }, //DOWN
    { src: "/images/IMG_8971.jpeg", scale: scale8, parallax: parallax0, rotate: rotate6 }, //DOWN LEFT
    { src: "/images/IMG_4149.jpeg", scale: scale9, parallax: parallax0, rotate: rotate7 } //DOWN RIGHT
  ];

  return (
    <section className={styles["gallery-scroll"]} ref={galleryScroll}>
      <div className={styles["gallery-scroll__viewport"]}>
        {pictures.map(({ src, scale, parallax, rotate }, index) => {
          return (
            <motion.div key={index} style={{ scale, translateY: parallax, rotate }} className={styles["gallery-scroll__item"]}>
              <div className={styles["gallery-scroll__image-wrapper"]}>
                <Image src={src} fill alt="image" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
