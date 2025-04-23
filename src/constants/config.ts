import { Color, NavLink, FooterLink, TimelineYear, GalleryImage, PartyTimelineItem } from "app/constants/types";

export const navLinks: NavLink[] = [
  { href: "/", label: "Home", image: "/images/IMG_1890.webp" },
  { href: "/story", label: "Story", image: "/images/IMG_3537.webp" },
  { href: "/gallery", label: "Gallery", image: "/images/IMG_5106.webp", isVertical: true },
  { href: "/party", label: "Party", image: "/images/IMG_7580.webp", isVertical: true },
  { href: "/QA", label: "QA", image: "/images/IMG_1294.webp" },
];

export const footerLinks: FooterLink[] = [
  { href: "https://www.icloud.com/invites/078qPOTqbDjynzo0WCFx18OAQ", label: "Confirm" }
];

export const siteMetadata = {
  title: "Nuestra Boda",
  description: "La celebración de nuestra boda - ¡Acompáñanos en este día especial!",
  url: "https://nuestraboda.com", // Ajusta con el dominio real
};

export const timelineYears: TimelineYear[] = [
  { year: 2016, image: "/images/IMG_0000.webp", isVertical: true },
  { year: 2017, image: "/images/IMG_0927.webp", isVertical: true },
  { year: 2018, image: "/images/IMG_3238.webp", isVertical: false },
  { year: 2019, image: "/images/IMG_3830.webp", isVertical: true },
  { year: 2020, image: "/images/IMG_5208.webp", isVertical: false },
  { year: 2021, image: "/images/IMG_6079.webp", isVertical: false },
  { year: 2022, image: "/images/IMG_1905.webp", isVertical: true },
  { year: 2023, image: "/images/IMG_3220.webp", isVertical: false },
  { year: 2024, image: "/images/IMG_8113.webp", isVertical: true },
  { year: 2025, image: "/images/IMG_0008.webp", isVertical: true },
];

export const galleryImages1: GalleryImage[] = [
  { src: "/images/IMG_3264.webp", width: 400, start: 0, end: 0, rotation: 5 },
  { src: "/images/IMG_3192.webp", width: 350, start: 100, end: 0, rotation: 4 },
  { src: "/images/IMG_0001.webp", width: 250, start: -150, end: 100, rotation: 1 },
  { src: "/images/IMG_6826.webp", width: 400, start: 0, end: 0, rotation: -3 },
  { src: "/images/IMG_4899.webp", width: 300, start: 0, end: 50, rotation: -1 },
  { src: "/images/IMG_9601.webp", width: 400, start: -70, end: 100, rotation: -2 },
  { src: "/images/IMG_0246.webp", width: 325, start: 50, end: -50, rotation: -6 },
  { src: "/images/IMG_8011.webp", width: 325, start: -50, end: 0, rotation: 2 },
];

export const galleryImages3: GalleryImage[] = [
  { src: "/images/IMG_8204.jpeg", width: 400, start: 0, end: 0, rotation: -2 },
  { src: "/images/IMG_1461.webp", width: 350, start: 100, end: 0, rotation: 1 },
  { src: "/images/IMG_8462.webp", width: 250, start: -150, end: 100, rotation: 4 },
  { src: "/images/IMG_2231.webp", width: 400, start: 0, end: 0, rotation: -3 },
  { src: "/images/IMG_0007.webp", width: 300, start: 0, end: 50, rotation: -1 },
  { src: "/images/IMG_1185.webp", width: 400, start: -70, end: 100, rotation: 5 },
  { src: "/images/IMG_0005.webp", width: 325, start: 50, end: -50, rotation: 3 },
  { src: "/images/IMG_8068.webp", width: 325, start: -50, end: 0, rotation: 5 },
];

export const partyTimelineItems: PartyTimelineItem[] = [
  { moment: "ceremony", image: '/icons/rings.png' },
  { moment: "pictures", image: '/icons/pictures.png' },
  { moment: "dinner", image: '/icons/dish.png' },
  { moment: "dance", image: '/icons/dancing.png' },
  { moment: "party", image: '/icons/party.png' },
  { moment: "end", image: '/icons/wedding-car.png' }
];

export const paletteColors: Color[] = [
  { name: 'Black Bean', hex: '#401107', fontColor: '#EADCD6' },
  { name: 'Seal Brown', hex: '#702609', fontColor: '#EADCD6' },
  { name: 'Beaver', hex: '#B88672', fontColor: '#401107' },
  { name: 'Dark Moss Green', hex: '#3D441E', fontColor: '#D9D4C1' },
  { name: 'Sapphire Shadow', hex: '#2b3b6b', fontColor: '#EADCD6' },
  { name: 'Charcoal Grey', hex: '#545454', fontColor: '#EADCD6' },
];