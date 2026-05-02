export interface LegalSection {
  title: string;
  paragraphs: string[];
  listItems?: string[];
}

export interface LegalPageContent {
  title: string;
  description: string;
  heading: string;
  ogImage: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  hero: {
    title: string;
    subtitleLines: string[];
    imageSrc: string;
    imageAlt: string;
  };
  updatedLabel: string;
  sections: LegalSection[];
}
