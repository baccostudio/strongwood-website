import type { OgImage } from "@/types/site/metadata";
import type { ThemeColor } from "@/types/site/theme-color";

export interface HomeMetadata {
  title: string;
  description: string;
  ogImage: OgImage;
  themeColor: ThemeColor;
}
