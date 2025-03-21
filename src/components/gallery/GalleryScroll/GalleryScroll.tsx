"use client";

import styles from "./GalleryScroll.module.scss";

import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export const GalleryScroll = () => {
  const galleryScroll = useRef(null);
  const { scrollYProgress } = useScroll({
    target: galleryScroll,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    { src: "/images/IMG_2098.jpeg", scale: scale4 }, //CENTER
    { src: "/images/IMG_1704.jpeg", scale: scale5 },
    { src: "/images/IMG_1338.jpeg", scale: scale6 }, //VERTICAL
    { src: "/images/IMG_1704.jpeg", scale: scale5 },
    { src: "/images/IMG_1338.jpeg", scale: scale6 },
    { src: "/images/IMG_1704.jpeg", scale: scale8 },
    { src: "/images/IMG_1704.jpeg", scale: scale9 },
  ];

  return (
    <section className={styles["gallery-scroll"]} ref={galleryScroll}>
      <div className={styles["gallery-scroll__viewport"]}>
        {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div key={index} style={{ scale }} className={styles["gallery-scroll__item"]}>
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
