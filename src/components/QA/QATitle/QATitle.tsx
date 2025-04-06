import { useTranslations } from "next-intl";
import styles from "./QATitle.module.scss";

export const QATitle = () => {
  const t = useTranslations("QA");

  return (
    <section className={styles["QATitle"]}>
      <h2>{t('title')}</h2>
    </section>
  );
};