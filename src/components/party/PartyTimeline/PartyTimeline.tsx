import {useTranslations} from 'next-intl';
import styles from './PartyTimeline.module.scss';

export const PartyTimeline = () => {
  const t = useTranslations('Party.PartyTimeline');
 
  return (
    <section className={styles["PartyTimeline"]}>
      <h3>{t('title')}</h3>
    </section>
  );
}