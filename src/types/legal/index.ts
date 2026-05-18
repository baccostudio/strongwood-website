import type { OgImage } from "@/types/site/metadata";
import type { ThemeColor } from "@/types/site/theme-color";

export interface LegalSection {
  title: string;
  paragraphs: string[];
  listItems?: string[];
}

export interface LegalPageContent {
  title: string;
  description: string;
  heading: string;
  ogImage: OgImage;
  themeColor: ThemeColor;
  hero: {
    title: string;
    subtitleLines: string[];
    imageSrc: string;
    imageAlt: string;
  };
  updatedLabel: string;
  sections: LegalSection[];
}
