import { useTranslations } from "next-intl";
import { PageTitle } from "app/components/common";
import { PartyTimeline, Palette, DressCode } from "app/components/party";
import { paletteColors } from "app/constants/config";

export default function Party() {
  const t = useTranslations("Party");

  return (
    <main>
      <PageTitle title={t('title')} size="medium" />
      <PartyTimeline />
      <Palette colors={paletteColors} />
      <DressCode />
    </main>
  );
}
