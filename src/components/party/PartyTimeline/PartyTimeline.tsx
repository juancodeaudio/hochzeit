import {useTranslations} from 'next-intl';
import Image from 'next/image';
import styles from './PartyTimeline.module.scss';
import { partyTimelineItems } from 'app/constants/config';

export const PartyTimeline = () => {
  const t = useTranslations('Party.PartyTimeline');
 
  return (
    <section className={styles["PartyTimeline"]}>
      <div className={styles["PartyTimeline__container"]}>
        <div className={styles["PartyTimeline__progress"]}>
          <div className={styles["PartyTimeline__progress-bar"]}></div>
        </div>
        {partyTimelineItems.map((item, index) => (
          <div className={styles["PartyTimeline__item"]} key={index}>
            <div className={styles["PartyTimeline__item-hour"]}>
              <h2>{t(`${item.moment}.hour`)}</h2>
            </div>
            <div className={styles["PartyTimeline__item-marker"]}>
              <div className={styles["marker-dot"]}></div>
            </div>
            <div className={styles["PartyTimeline__item-details"]}>
              <div className={styles["margin-bottom-medium"]}>
                <h3>{t(`${item.moment}.title`)}</h3>
              </div>
              <div className={styles["margin-bottom-xlarge"]}>
                <Image src={item.image} loading="lazy" width="200" height={100} alt={t(`${item.moment}.title`)} />
              </div>
            </div>
          </div>
        ))}
        <div className={styles["PartyTimeline__fade-top"]}></div>
        <div className={styles["PartyTimeline__fade-bottom"]}></div>
      </div>
    </section>
  );
}