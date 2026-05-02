import Image from "next/image";
import { cn } from "@/lib/utils";

interface AboutUsMosaicImage {
  src: string;
  alt: string;
}

interface AboutUsMosaicProps {
  images: AboutUsMosaicImage[];
}

export function AboutUsMosaic({ images }: AboutUsMosaicProps) {
  return (
    <section className={cn("bg-(--color-surface)")}>
      <div className="grid w-full grid-cols-2 mx-0 gap-0 py-0 lg:mx-auto">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={cn(
              "relative aspect-719/745 w-full overflow-hidden",
              // 👇 Mobile vs Desktop
              index < 2
                ? "col-span-2 sm:col-span-1"
                : "col-span-1"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

