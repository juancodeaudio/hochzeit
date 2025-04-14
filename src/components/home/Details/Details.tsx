"use client"

import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import { Map, Marker } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import mapStyle from 'app/constants/map-styles.json';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import { motion } from 'motion/react';
import { Button } from 'app/components/common';
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
        <Map
          initialViewState={{
            longitude: -74.069251,
            latitude: 4.616568,
            zoom: 17
          }}
          mapStyle={mapStyle as unknown as string}
        >
          <Marker longitude={-74.069251} latitude={4.616568} anchor="bottom">
            <motion.div 
              animate={{ 
                y: [0, 0, -40, 0, 0], 
                scaleY: [1, 0.9, 1.15, 0.8, 1], 
                scaleX: [1, 1.05, 0.9, 1.1, 1] 
              }} 
              transition={{ 
                repeat: Infinity, 
                duration: 1.6, 
                ease: "easeInOut", 
                times: [0, 0.35, 0.6, 0.85, 1] 
              }}
              style={{ originY: 1 }}
              className={styles["marker"]}
            >
              <Image src="/vectors/logo.svg" alt="Ubicación de la boda" width={50} height={50} />
            </motion.div>
          </Marker>
        </Map>
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
      <div className={styles["Details__callaction-container"]}>
        <h3>{t('callToAction')}</h3>
        <Button label={t('rsvp')} href='https://www.google.com'></Button>
      </div>
    </section>
  );
}