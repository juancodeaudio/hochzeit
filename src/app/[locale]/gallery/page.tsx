import { useTranslations } from 'next-intl';
import { GalleryParallax, GalleryScroll } from "app/components/gallery";
import { Quote } from "app/components/common";
import { galleryImages1, galleryImages3 } from 'app/constants/config';

export default function Gallery() {
  const t = useTranslations('Gallery');

  return (
    <main>
      <GalleryParallax images={galleryImages1} titleKey='memories' />
      <GalleryScroll />
      <GalleryParallax images={galleryImages3} titleKey='time' />
      <Quote quote={t('quote')} author={t('quoteAuthor')} />
    </main>
  );
}
