import {useTranslations} from 'next-intl';
import styles from './Footer.module.scss';
import { navLinks, footerLinks } from "app/constants/config";
import Link from "next/link";

export const Footer = () => {
  const tNav = useTranslations('Navbar');
  const t = useTranslations('Footer');

  return (
    <footer 
      className={styles["Footer"]}
      style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
      <div className={styles["Footer__container"]}>
        <div className={styles["Footer__background"]} >
          <div className={styles["Footer__content"]}>
            <div className={styles["Footer__content-column"]}>
              <h3>{t('navigation')}</h3>
              {navLinks.map(({ label, href }) => (
                <Link key={href} href={href}>
                  {tNav.rich(label, {
                    br: () => <br />
                  })}
                </Link>
              ))}
            </div>
            <div className={styles["Footer__content-column"]}>
              <h3>{t('linksTitle')}</h3>
              {footerLinks.map(({ label, href }) => (
                <a key={href} href={href} target='_blank'>
                  {t.rich(label, {
                    br: () => <br />
                  })}
                </a>
              ))}
            </div>
          </div>
          <div className={styles["Footer__bottom"]}>
            <h2>{t('title')}</h2>
            <p>{t('copyright')}</p>
        </div>
        </div>
      </div>
    </footer>
  );
}