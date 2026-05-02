import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageStripItem {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface PageImageStripProps {
  images: ImageStripItem[];
  className?: string;
}

export function PageImageStrip({ images, className }: PageImageStripProps) {
  return (
    <section className={cn("bg-(--color-foreground) py-[clamp(56px,10vw,96px)]", className)}>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6.5 px-6 py-0 sm:grid-cols-3">
        {images.map((image) => (
          <div key={image.src} className="w-full">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 640px) 33vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

