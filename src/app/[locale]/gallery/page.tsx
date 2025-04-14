import {useTranslations} from 'next-intl';
import { GalleryParallax } from "app/components/gallery/GalleryParallax";
import { GalleryScroll } from "app/components/gallery/GalleryScroll";
import { Quote } from "app/components/common/Quote";
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
