 "use client";
import { useLocale } from "next-intl";
import { SingleValue } from "react-select";
import { routing } from "app/i18n/routing";

import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });

import { usePathname, useRouter } from 'app/i18n/navigation';
import { useTransition } from "react";

import styles from "./LocaleSwitcher.module.scss";

interface LocaleOption {
  value: string;
  label: string;
}

export const LocaleSwitcher = () => {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const locales = routing.locales.map((locale) => ({
    value: locale,
    label: locale.toUpperCase(),
  }));

  const handleChangeLanguage = (newValue: unknown) => {
    const lang = newValue as SingleValue<LocaleOption>;
    if (lang) {
      startTransition(() => {
        router.replace(pathname, { locale: lang.value });
      });
    }
  };

  return (
    <div className={styles["LocaleSwitcherContainer"]}>
      <Select
        className="LocaleSwitcher"
        options={locales}
        onChange={handleChangeLanguage}
        isDisabled={isPending}
        defaultValue={locales.find((locale) => locale.value === currentLocale)}
        isLoading={isPending}
        isSearchable={false}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
            cursor: "pointer",
            "&:hover": {
              border: "none",
              boxShadow: "none",
            },
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "#EFDFD6",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused ? "#FEEEE4" : "#EFDFD6",
            color: "#702609",
            cursor: "pointer",
            fontFamily: "var(--font-atteron)",
            fontSize: "1.1rem",
            "&:active": {
              backgroundColor: "#FEEEE4",
            },
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "#702609",
            fontFamily: "var(--font-atteron)",
            fontSize: "1.1rem",
          }),
          dropdownIndicator: (baseStyles) => ({
            ...baseStyles,
            color: "#702609",
          }),
          indicatorSeparator: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "#702609",
          }),
          menuPortal: (baseStyles) => ({
            ...baseStyles,
            zIndex: 9999,
          }),
          loadingIndicator: (baseStyles) => ({
            ...baseStyles,
            color: "#702609",
          }),
        }}
      />
    </div>
  );
};
