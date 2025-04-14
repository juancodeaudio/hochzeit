import styles from "./PageTitle.module.scss";

interface PageTitleProps {
  title: string;
  size: "small" | "medium" | "large";
}

export const PageTitle = ({ title, size }: PageTitleProps) => {

  return (
    <section
      className={`
        ${styles["PageTitle"]}
        ${size === "small" ? styles["PageTitle--small"] : ""}
        ${size === "medium" ? styles["PageTitle--medium"] : ""}
        ${size === "large" ? styles["PageTitle--large"] : ""}
      `}
    >
      <h2
        className={`
          ${styles["PageTitle__title"]}
          ${size === "small" ? styles["PageTitle__title--small"] : ""}
          ${size === "medium" ? styles["PageTitle__title--medium"] : ""}
          ${size === "large" ? styles["PageTitle__title--large"] : ""}
        `}
      >{title}</h2>
    </section>
  );
};