import { useTranslations } from "next-intl";

import { PageTitle } from "app/components/common/PageTitle";
import { Accordion } from "app/components/QA/Accordion";

export default function QA() {
  const t = useTranslations("QA");

  return (
    <main>
      <PageTitle title={t('title')} size="small" />
      <Accordion />
    </main>
  );
}
