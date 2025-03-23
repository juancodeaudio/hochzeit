import {useTranslations} from 'next-intl';
import styles from './Hero.module.scss';

export const Hero = () => {
  const t = useTranslations('Home.Hero');
  return (
    <section className={styles["Hero"]}>
      <h1>{t('title')}</h1>
    </section>
  );
}