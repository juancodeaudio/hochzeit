import Image from "next/image";

import {useTranslations} from 'next-intl';

import styles from "./DressCode.module.scss";

export const DressCode = () => {
  const t = useTranslations("Party.DressCode");

  return (
    <section className={styles["DressCode"]}>
      <h2>{t('title')}</h2>
      <div className={`${styles["DressCode__description"]} ${styles["DressCode__description--men"]}`}>
        <h3>{t('men')}</h3>
        <p>{t('menDescription')}</p>
      </div>
      <div className={styles["DressCode__images"]}>
        <Image
          src="/icons/suit.png"
          alt="Dress Code"
          width={160}
          height={400}
        />
        <Image
          src="/icons/dress.png"
          alt="Dress Code"
          width={260}
          height={400}
        />
      </div>
      <div className={`${styles["DressCode__description"]} ${styles["DressCode__description--women"]}`}>
        <h3>{t('women')}</h3>
        <p>{t('womenDescription')}</p>
      </div>
      <div className={styles["DressCode__notes"]}>
        <h3>{t('colorPalette')}</h3>
        <p>{t('shoesReminder')}</p>
      </div>
    </section>
  );
}