"use client";
import { useLocale } from "next-intl";
import { routing } from "app/i18n/routing";

import { usePathname, useRouter } from 'app/i18n/navigation';
import { useTransition } from "react";

const languageFlags: Record<string, string> = {
  en: "🇬🇧",
  es: "🇪🇸",
  de: "🇩🇪",
};

export const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleChangeLanguage = (lang: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: lang });
    });
  };

  return (
    <select
      onChange={(e) => handleChangeLanguage(e.target.value)}
      defaultValue={locale}
      disabled={isPending}
    >
      {routing.locales.map((locale) => (
        <option key={locale} value={locale}>
          {languageFlags[locale] || "🌍"} {locale.toUpperCase()}
        </option>
      ))}
    </select>
  );
};
