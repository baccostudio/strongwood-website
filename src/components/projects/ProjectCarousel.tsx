"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/types/proyectos";

type ProjectCarouselProps = {
  images: ProjectImage[];
  prevAriaLabel: string;
  nextAriaLabel: string;
  imageLoadingAriaLabel: string;
  icon: ProjectImage;
  className?: string;
};

type DragState = {
  startX: number;
  scrollLeft: number;
};

export function ProjectCarousel({
  images,
  prevAriaLabel,
  nextAriaLabel,
  imageLoadingAriaLabel,
  icon,
  className,
}: ProjectCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<DragState>({ startX: 0, scrollLeft: 0 });
  const hasLandscapeImage = images.some((image) => image.width > image.height);
  const imageFrameClassName =
    "h-[clamp(340px,58vw,620px)] shrink-0 select-none snap-start sm:snap-none";

  const updateScrollState = () => {
    const track = trackRef.current;
    if (!track) return;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    setCanScrollPrev(track.scrollLeft > 0);
    setCanScrollNext(track.scrollLeft < maxScrollLeft - 1);
  };

  useEffect(() => {
    updateScrollState();
  }, [images.length]);

  const scrollByAmount = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.8;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const target =
      direction === "next"
        ? Math.min(track.scrollLeft + amount, maxScrollLeft)
        : Math.max(track.scrollLeft - amount, 0);

    track.scrollTo({ left: target, behavior: "smooth" });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    track.setPointerCapture(event.pointerId);
    setIsDragging(true);
    dragState.current = {
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track || !isDragging) return;
    const delta = event.clientX - dragState.current.startX;
    track.scrollLeft = dragState.current.scrollLeft - delta;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  return (
    <section className={cn("px-6 py-[clamp(56px,10vw,96px)] sm:px-10", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <div
            ref={trackRef}
            className={cn(
              "no-scrollbar flex items-end gap-6 overflow-x-auto overscroll-x-contain",
              hasLandscapeImage ? "snap-x snap-proximity" : "snap-x snap-mandatory",
              "sm:snap-none sm:overscroll-auto sm:scroll-auto",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
            style={{ WebkitOverflowScrolling: "touch" }}
            onScroll={updateScrollState}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {images.map((image, index) => (
              <ProjectCarouselImage
                key={`${image.src}-${index}`}
                image={image}
                shouldPreload={index === 0}
                shouldLoadEager={index < 2}
                imageLoadingAriaLabel={imageLoadingAriaLabel}
                className={imageFrameClassName}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollByAmount("prev")}
            aria-label={prevAriaLabel}
            disabled={!canScrollPrev}
            className={cn(
              "absolute bottom-0 left-0 z-20 flex h-14 w-14 items-center justify-center bg-white text-black transition-opacity",
              canScrollPrev ? "opacity-100" : "opacity-40"
            )}
          >
            <Image
              src={icon.src}
              alt={icon.alt}
              width={icon.width}
              height={icon.height}
              className="h-6 w-6 rotate-180"
            />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount("next")}
            aria-label={nextAriaLabel}
            disabled={!canScrollNext}
            className={cn(
              "absolute bottom-0 left-15 z-20 flex h-14 w-14 items-center justify-center bg-white text-black transition-opacity",
              canScrollNext ? "opacity-100" : "opacity-40"
            )}
          >
            <Image
              src={icon.src}
              alt={icon.alt}
              width={icon.width}
              height={icon.height}
              className="h-6 w-6"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

interface ProjectCarouselImageProps {
  image: ProjectImage;
  shouldPreload: boolean;
  shouldLoadEager: boolean;
  imageLoadingAriaLabel: string;
  className: string;
}

function ProjectCarouselImage({
  image,
  shouldPreload,
  shouldLoadEager,
  imageLoadingAriaLabel,
  className,
}: ProjectCarouselImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const markLoaded = () => {
    setIsLoaded(true);
  };

  const handleImageRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className={cn("relative", className)}>
      {!isLoaded ? (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <LoadingSpinner
            ariaLabel={imageLoadingAriaLabel}
            className="text-(--color-paper)"
            indicatorClassName="h-10 w-10"
          />
        </div>
      ) : null}
      <Image
        ref={handleImageRef}
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="pointer-events-none block h-full w-auto max-w-none select-none"
        sizes="(min-width: 1024px) 70vw, (min-width: 640px) 82vw, 90vw"
        preload={shouldPreload || shouldLoadEager}
        loading={shouldLoadEager ? "eager" : "lazy"}
        fetchPriority={shouldLoadEager ? "high" : undefined}
        draggable={false}
        onLoad={markLoaded}
        onError={markLoaded}
      />
    </div>
  );
}
