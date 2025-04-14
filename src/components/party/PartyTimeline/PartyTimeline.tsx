"use client";

import Image from 'next/image';

import {useTranslations} from 'next-intl';
import { motion } from 'motion/react';

import styles from './PartyTimeline.module.scss';
import { partyTimelineItems } from 'app/constants/config';

export const PartyTimeline = () => {
  const t = useTranslations('Party.PartyTimeline');
 
  return (
    <section className={styles["PartyTimeline"]}>
      <div className={styles["PartyTimeline__container"]}>
        <motion.div
          className={styles["PartyTimeline__progress"]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, ease: [0.645, 0.045, 0.355, 1] } }}
        >
          <div className={styles["PartyTimeline__progress-bar"]}></div>
        </motion.div>
        {partyTimelineItems.map((item, index) => (
          <div className={styles["PartyTimeline__item"]} key={index}>
            <motion.div
              className={styles["PartyTimeline__item-hour"]}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1, transition: { duration: 0.5, ease: [0.645, 0.045, 0.355, 1] } }}
            >
              <h2>{t(`${item.moment}.hour`)}</h2>
            </motion.div>
            <motion.div
              className={styles["PartyTimeline__item-marker"]}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1, transition: { duration: 0.5, ease: [0.645, 0.045, 0.355, 1] } }}
            >
              <div className={styles["marker-dot"]}></div>
            </motion.div>
            <div className={styles["PartyTimeline__item-details"]}>
              <div className={styles["margin-bottom-medium"]}>
                <motion.h3
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 1, opacity: 1, transition: { duration: 0.5, ease: [0.645, 0.045, 0.355, 1], delay: 0.1 } }}
                >{t(`${item.moment}.title`)}</motion.h3>
              </div>
              <motion.div
                className={styles["margin-bottom-xlarge"]}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1, transition: { duration: 0.5, ease: [0.645, 0.045, 0.355, 1], delay: 0.1 } }}
              >
                <Image src={item.image} loading="lazy" fill alt={t(`${item.moment}.title`)} />
              </motion.div>
            </div>
          </div>
        ))}
        <div className={styles["PartyTimeline__fade-top"]}></div>
        <div className={styles["PartyTimeline__fade-bottom"]}></div>
      </div>
    </section>
  );
}