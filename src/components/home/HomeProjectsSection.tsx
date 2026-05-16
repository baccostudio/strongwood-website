import { resolveHomeProjectStats } from "@/lib/home-project-stats";
import type { HomeProjectsContent } from "@/types/home";
import { HomeProjects } from "./HomeProjects";

interface HomeProjectsSectionProps {
  content: HomeProjectsContent;
}

export async function HomeProjectsSection({
  content,
}: HomeProjectsSectionProps) {
  const projectStats = await resolveHomeProjectStats();

  return <HomeProjects content={content} projectStats={projectStats} />;
}
