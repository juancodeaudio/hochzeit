import {useTranslations} from 'next-intl';
import { GalleryParallax } from "app/components/gallery/GalleryParallax";
import { GalleryScroll } from "app/components/gallery/GalleryScroll";
import { Quote } from "app/components/common/Quote";

export default function Gallery() {
  const t = useTranslations('Gallery');

  return (
    <main>
      <GalleryParallax />
      <GalleryScroll />
      <GalleryParallax />
      <Quote quote={t('quote')} author={t('quoteAuthor')} />
    </main>
  );
}
