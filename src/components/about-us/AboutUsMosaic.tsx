import Image from "next/image";
import { cn } from "@/lib/utils";

const ABOUT_US_MOSAIC_IMAGE_WIDTH = 1350;
const ABOUT_US_MOSAIC_IMAGE_HEIGHT = 1688;

interface AboutUsMosaicImage {
  src: string;
  alt: string;
  loading?: "eager";
}

interface AboutUsMosaicProps {
  images: AboutUsMosaicImage[];
}

export function AboutUsMosaic({ images }: AboutUsMosaicProps) {
  return (
    <section className={cn("bg-surface")}>
      <div className="mx-0 grid w-full grid-cols-2 gap-0 py-0 lg:mx-auto">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={cn(
              "w-full overflow-hidden",
              index < 2 ? "col-span-2 sm:col-span-1" : "col-span-1"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={ABOUT_US_MOSAIC_IMAGE_WIDTH}
              height={ABOUT_US_MOSAIC_IMAGE_HEIGHT}
              loading={image.loading ?? (index < 2 ? "eager" : undefined)}
              sizes="(min-width: 640px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
