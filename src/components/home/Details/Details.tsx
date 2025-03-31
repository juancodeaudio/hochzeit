"use client"

import { useEffect, useState, useMemo } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import styles from './Details.module.scss';

export const Details = () => {
  const t = useTranslations('Home.Details');
  const format = useFormatter();
  const dateTime = useMemo(() => new Date("2025-08-09T17:20:00-05:00"), []);
 
  // Renders "Nov 20, 2020"
  const formattedDate = format.dateTime(dateTime, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const [clientDateTime, setClientDateTime] = useState<Date | null>(null);

  useEffect(() => {
    setClientDateTime(dateTime);
  }, [dateTime]);
 
  // Renders "11:36 AM"
  format.dateTime(dateTime, {hour: 'numeric', minute: 'numeric'});
  return (
    <section className={styles["Details"]}>
      <div className={styles["Details__map-container"]}>
        <div></div>
      </div>
      <div className={styles["Details__date-container"]}>
        <h3>{t('when')}</h3>
        <p>{formattedDate}</p>
      </div>
      <div className={styles["Details__countdown-container"]}>
        {clientDateTime && (
          <FlipClockCountdown
            to={clientDateTime}
            className={styles["Details__countdown"]}
            labels={[t('days').toUpperCase(), t('hours').toUpperCase(), t('minutes').toUpperCase(), t('seconds').toUpperCase()]}
          />
        )}
      </div>
    </section>
  );
}