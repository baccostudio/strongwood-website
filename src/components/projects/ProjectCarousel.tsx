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
  const [isButtonTransitioning, setIsButtonTransitioning] = useState(false);
  const dragState = useRef<DragState>({ startX: 0, scrollLeft: 0 });
  const scrollAnimationFrameRef = useRef<number | null>(null);
  const buttonTransitionTimeoutRef = useRef<number | null>(null);
  const buttonScrollTargetRef = useRef<number | null>(null);
  const imageFrameClassName =
    "h-[clamp(574px,58vw,835px)] shrink-0 select-none snap-start sm:snap-none";
  const viewportPaddingClassName =
    "pl-0 pr-0 sm:pl-[max(2.5rem,calc((100vw-72rem)/2))] sm:pr-[max(2.5rem,calc((100vw-72rem)/2))]";
  const controlsOffsetClassName =
    "left-6 sm:left-[max(2.5rem,calc((100vw-72rem)/2))]";

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    setCanScrollPrev(track.scrollLeft > 0);
    setCanScrollNext(track.scrollLeft < maxScrollLeft - 1);
  }, []);

  const clearButtonTransitionLock = useCallback(() => {
    if (scrollAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationFrameRef.current);
      scrollAnimationFrameRef.current = null;
    }

    if (buttonTransitionTimeoutRef.current !== null) {
      window.clearTimeout(buttonTransitionTimeoutRef.current);
      buttonTransitionTimeoutRef.current = null;
    }

    buttonScrollTargetRef.current = null;
    setIsButtonTransitioning(false);
  }, []);

  useEffect(() => {
    updateScrollState();
  }, [images.length, updateScrollState]);

  useEffect(() => {
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  useEffect(() => {
    return () => {
      clearButtonTransitionLock();
    };
  }, [clearButtonTransitionLock]);

  const scrollByAmount = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track || isButtonTransitioning) return;
    const amount = track.clientWidth * 0.8;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const target =
      direction === "next"
        ? Math.min(track.scrollLeft + amount, maxScrollLeft)
        : Math.max(track.scrollLeft - amount, 0);

    if (Math.abs(target - track.scrollLeft) < 1) return;

    clearButtonTransitionLock();
    setIsButtonTransitioning(true);
    buttonScrollTargetRef.current = target;
    buttonTransitionTimeoutRef.current = window.setTimeout(() => {
      clearButtonTransitionLock();
    }, 900);

    const watchScrollEnd = () => {
      const currentTrack = trackRef.current;
      const currentTarget = buttonScrollTargetRef.current;

      if (!currentTrack || currentTarget === null) {
        clearButtonTransitionLock();
        return;
      }

      if (Math.abs(currentTrack.scrollLeft - currentTarget) <= 1) {
        clearButtonTransitionLock();
        return;
      }

      scrollAnimationFrameRef.current = window.requestAnimationFrame(watchScrollEnd);
    };

    scrollAnimationFrameRef.current = window.requestAnimationFrame(watchScrollEnd);
    track.scrollTo({ left: target, behavior: "smooth" });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    clearButtonTransitionLock();
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
    <section className={cn("overflow-hidden py-[clamp(56px,10vw,96px)]", className)}>
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <div className="relative">
          <div
            ref={trackRef}
            className={cn(
              "no-scrollbar flex items-end gap-6 overflow-x-auto overscroll-x-contain",
              "snap-none sm:overscroll-auto sm:scroll-auto",
              viewportPaddingClassName,
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
                className={cn(
                  imageFrameClassName,
                  index === 0 && "ml-6 sm:ml-0",
                  index === images.length - 1 && "mr-6 sm:mr-0"
                )}
              />
            ))}
          </div>
          <div className={cn("pointer-events-none absolute bottom-0 pl-3 pb-3 z-20 flex gap-2", controlsOffsetClassName)}>
            <button
              type="button"
              onClick={() => scrollByAmount("prev")}
              aria-label={prevAriaLabel}
              disabled={!canScrollPrev || isButtonTransitioning}
              className={cn(
                "pointer-events-auto flex h-14 w-14 items-center justify-center bg-white text-black transition-opacity",
                canScrollPrev && !isButtonTransitioning ? "opacity-100" : "opacity-40"
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
              disabled={!canScrollNext || isButtonTransitioning}
              className={cn(
                "pointer-events-auto flex h-14 w-14 items-center justify-center bg-white text-black transition-opacity",
                canScrollNext && !isButtonTransitioning ? "opacity-100" : "opacity-40"
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
            className="text-paper"
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
