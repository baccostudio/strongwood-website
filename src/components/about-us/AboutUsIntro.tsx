import { PageIntro } from "@/components/shared/PageIntro";

interface AboutUsIntroParagraph {
  text: string;
  highlightText?: string;
}

interface AboutUsIntroProps {
  label: string;
  location: string;
  paragraphs: AboutUsIntroParagraph[];
}

export function AboutUsIntro({ label, location, paragraphs }: AboutUsIntroProps) {
  return (
    <PageIntro
      label={label}
      location={location}
      paragraphs={paragraphs}
      className="bg-(--color-brown) text-(--color-paper)"
      textClassName="text-[var(--color-paper)]"
      highlightClassName="font-medium"
    />
  );
}
