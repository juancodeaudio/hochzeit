"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { RxChevronDown } from "react-icons/rx";
import styles from "./Accordion.module.scss";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    },
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    transition: {
      duration: 0.58,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
};

export const Accordion = () => {
  const t = useTranslations("QA.Accordion");
  const questionIds = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      className={styles["Accordion"]}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {questionIds.map((id, index) => (
        <motion.div key={id} className={styles["Accordion__item"]} variants={itemVariants}>
          <button
            className={styles["Accordion__container"]}
            onClick={() => toggleAccordion(index)}
          >
            <div
              className={styles["Accordion__item-summary"]}
            >
              <span className={styles["Accordion__item-id"]}>
                {`(${id}) `}
              </span>
              <h3 className={styles["Accordion__item-question"]}>
                {t(`${id}.question`)}
              </h3>
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
                style={{ display: "inline-block", fontSize: "1.75rem" }}
              >
                <RxChevronDown />
              </motion.span>
            </div>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  className={styles["Accordion__item-content"]}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "20vh", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
                >
                  <p>
                    {t(`${id}.answer`)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      ))}
    </motion.section>
  );
};