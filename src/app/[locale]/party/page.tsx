import { useTranslations } from "next-intl";

import { PageTitle } from "app/components/common";
import { PartyTimeline, Palette } from "app/components/party";

export default function Party() {
  const t = useTranslations("Party");

  return (
    <main>
      <PageTitle title={t('title')} size="medium" />
      <PartyTimeline />
      <Palette />
    </main>
  );
}
