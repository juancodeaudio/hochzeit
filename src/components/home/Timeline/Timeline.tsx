import {useTranslations} from 'next-intl';
import styles from './Timeline.module.scss';

export const Timeline = () => {
  const t = useTranslations('Home.Timeline');
 
  return (
    <section className={styles["Timeline"]}>
      <h3>{t('title')}</h3>
    </section>
  );
}