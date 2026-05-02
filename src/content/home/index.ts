import type { HomeContent } from "@/types/home";

import { homeCta } from "./cta";
import { homeHero } from "./hero";
import { homeMetadata } from "./metadata";
import { homeProjects } from "./projects";

export const homeContent: HomeContent = {
  metadata: homeMetadata,
  hero: homeHero,
  projects: homeProjects,
  cta: homeCta,
};