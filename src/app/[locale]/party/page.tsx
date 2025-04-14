import { useTranslations } from "next-intl";

import { PageTitle } from "app/components/common/PageTitle";
import { PartyTimeline } from "app/components/party/PartyTimeline";

export default function Party() {
  const t = useTranslations("Party");

  return (
    <main>
      <PageTitle title={t('title')} size="medium" />
      <PartyTimeline />
    </main>
  );
}
