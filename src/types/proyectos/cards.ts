import type { ProjectImage } from "./media";

export type ProjectCard = {
  title: string;
  text: string;
  image: ProjectImage;
};

export type ProjectTheme = {
  themeClass: string;
};