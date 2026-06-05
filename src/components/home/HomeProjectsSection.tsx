import { contactReviewsContent } from "@/content/contact";
import { buildFallbackHomeProjectStats } from "@/lib/home-project-stats-format";
import type { HomeProjectsContent } from "@/types/home";
import { HomeProjects } from "./HomeProjects";

interface HomeProjectsSectionProps {
  content: HomeProjectsContent;
}

export function HomeProjectsSection({
  content,
}: HomeProjectsSectionProps) {
  const projectStats = buildFallbackHomeProjectStats();

  return (
    <HomeProjects
      content={content}
      projectStats={projectStats}
      reviewsContent={contactReviewsContent}
    />
  );
}
