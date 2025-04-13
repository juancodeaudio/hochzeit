import styles from './Quote.module.scss';

export const Quote = ({ quote, author }: { quote: string; author: string }) => {
  return (
    <section className={styles["Quote"]}>
      <h2>{quote}</h2>
      <p>- {author}</p>
    </section>
  );
}