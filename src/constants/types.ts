export interface Color {
  name: string;
  hex: string;
  fontColor: string;
}

export interface NavLink {
  href: string;
  label: string;
  image: string;
  isVertical?: boolean;
}

export interface FooterLink {
  href: string;
  label: string;
}

export interface TimelineYear {
  year: number;
  image: string;
  isVertical: boolean;
}

export interface GalleryImage {
  src: string;
  width: number;
  start: number;
  end: number;
  rotation?: number;
}

export interface PartyTimelineItem {
  moment: string;
  image: string;
}