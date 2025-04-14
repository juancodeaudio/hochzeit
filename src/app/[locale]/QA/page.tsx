import { useTranslations } from "next-intl";

import { PageTitle } from "app/components/common";
import { Accordion } from "app/components/QA";

export default function QA() {
  const t = useTranslations("QA");

  return (
    <main>
      <PageTitle title={t('title')} size="small" />
      <Accordion />
    </main>
  );
}
