import styles from './Button.module.scss';

interface ButtonBaseProps {
  label: string;
  className?: string;
}

type ButtonProps =
  | (ButtonBaseProps & { href: string; onClick?: never })
  | (ButtonBaseProps & { onClick: () => void; href?: never });

export const Button = ({ label, href, onClick }: ButtonProps) => {
  return href ? (
    <a href={href} target='_blank' className={styles["Button"]}>
      {label}
      <span></span>
    </a>
  ) : (
    <button onClick={onClick} className={styles["Button"]}>
      {label}
      <span></span>
    </button>
  );
};