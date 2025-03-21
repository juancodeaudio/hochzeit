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

  const pictures = [
    { src: "/images/IMG_2098.jpeg", scale: scale4, parallax: parallaxUp90 }, //CENTER
    { src: "/images/IMG_1704.jpeg", scale: scale5, parallax: parallaxUp200 }, //TOP
    { src: "/images/IMG_1338.jpeg", scale: scale6, parallax: parallaxUp50 }, //VERTICAL
    { src: "/images/IMG_1704.jpeg", scale: scale5, parallax: parallaxUp140 }, //RIGHT
    { src: "/images/IMG_1338.jpeg", scale: scale6, parallax: parallaxD100 }, //DOWN
    { src: "/images/IMG_1704.jpeg", scale: scale8, parallax: parallax0 }, //DOWN LEFT
    { src: "/images/IMG_1704.jpeg", scale: scale9, parallax: parallax0 } //DOWN RIGHT
  ];

  return (
    <section className={styles["gallery-scroll"]} ref={galleryScroll}>
      <div className={styles["gallery-scroll__viewport"]}>
        {pictures.map(({ src, scale, parallax }, index) => {
          return (
            <motion.div key={index} style={{ scale, translateY: parallax }} className={styles["gallery-scroll__item"]}>
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
