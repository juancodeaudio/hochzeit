import { Hero } from "app/components/home/Hero";
import { ParallaxBlock } from "app/components/home/ParallaxBlock";
import { Details } from "app/components/home/Details";
import { Quote } from "app/components/common/Quote";
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
