import { Hero, ParallaxBlock, Details } from "app/components/home";
import { Quote } from "app/components/common";
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home.Hero');
  return (
    <main>
      <Hero />
      <Quote quote={t('quote')} author={t('quoteAuthor')} />
      <ParallaxBlock />
      <Details />
    </main>
  );
}
