import {useFormatter} from 'next-intl';
import {useTranslations} from 'next-intl';
import styles from './Details.module.scss';

export const Details = () => {
  const t = useTranslations('Home.Details');
  const format = useFormatter();
  const dateTime = new Date('2025-08-09T17:20:00-05:00');
 
  // Renders "Nov 20, 2020"
  const formattedDate = format.dateTime(dateTime, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
 
  // Renders "11:36 AM"
  format.dateTime(dateTime, {hour: 'numeric', minute: 'numeric'});
  return (
    <section className={styles["Details"]}>
      <h3>{t('date')}</h3>
      <p>{formattedDate}</p>
    </section>
  );
}