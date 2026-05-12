"use client";

import type { Dispatch, SetStateAction, UIEvent } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/types/proyectos";

type FeaturedProjectItem = {
  href: string;
  image: ProjectImage;
  carouselImages: ProjectImage[];
  ariaLabel: string;
};

type FeaturedProjectGridProps = {
  title: string;
  items: FeaturedProjectItem[];
  scrollHint?: string;
  ctaLabel?: string;
  layout?: "section" | "embedded";
  className?: string;
};

export function FeaturedProjectGrid({
  title,
  items,
  scrollHint,
  ctaLabel,
  layout = "section",
  className,
}: FeaturedProjectGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const gridSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || !hoveredId || !gridSectionRef.current) {
      return;
    }

    const rect = gridSectionRef.current.getBoundingClientRect();
    const targetPosition = window.pageYOffset + rect.top;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }, [hoveredId, isMobile]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const getItemVariants = (index: number): Variants => {
    if (isMobile) {
      return {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        },
      };
    }

    return {
      hidden: {
        opacity: 0,
        x:
          index === 0
            ? "calc(100% + 1.5rem)"
            : index === 2
              ? "calc(-100% - 1.5rem)"
              : 0,
        scale: 1,
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration: 1.2,
          delay: index === 1 ? 0 : 0.6,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    };
  };

  const content = (
    <>
      <h2 className="sr-only">{title}</h2>
      <div className="grid pt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 items-stretch gap-6 overflow-hidden sm:grid-cols-2 lg:grid-cols-3"
          style={!isMobile ? { height: "min(800px, calc(var(--vh, 1vh) * 85))" } : undefined}
        >
          {items.map((item, index) => (
            <ProjectCard
              key={item.href}
              item={item}
              index={index}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
              itemVariants={getItemVariants(index)}
              scrollHint={scrollHint}
              ctaLabel={ctaLabel}
            />
          ))}
        </motion.div>
      </div>
    </>
  );

  if (isMobile) {
    return null;
  }

  if (layout === "embedded") {
    return (
      <section ref={gridSectionRef} className={cn("mt-10", className)}>
        {content}
      </section>
    );
  }

  return (
    <section
      ref={gridSectionRef}
      className={cn("px-6 pb-[clamp(56px,10vw,96px)] sm:px-10", className)}
    >
      <div className="mx-auto max-w-6xl">{content}</div>
    </section>
  );
}

interface ProjectCardProps {
  item: FeaturedProjectItem;
  index: number;
  hoveredId: string | null;
  setHoveredId: Dispatch<SetStateAction<string | null>>;
  itemVariants: Variants;
  scrollHint?: string;
  ctaLabel?: string;
}

function ProjectCard({
  item,
  index,
  hoveredId,
  setHoveredId,
  itemVariants,
  scrollHint,
  ctaLabel,
}: ProjectCardProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleHoverEnd = () => {
    if (hoveredId !== item.href) {
      return;
    }

    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }

    setHasScrolled(false);
    setHoveredId(null);
  };

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    setHasScrolled(event.currentTarget.scrollTop > 50);
  };

  return (
    <motion.div
      variants={itemVariants}
      onHoverStart={() => setHoveredId(item.href)}
      onHoverEnd={handleHoverEnd}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden",
        index === 1 ? "z-20" : "z-10"
      )}
    >
      <div className="relative flex h-full flex-col overflow-hidden">
        {scrollHint ? (
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-8 z-40 flex justify-center transition-all duration-700",
              hoveredId === item.href && !hasScrolled
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            )}
          >
            <div className="flex items-center gap-3 rounded-full border border-paper/10 bg-foreground px-4 py-2 text-paper shadow-2xl">
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-5 w-3 justify-center rounded-full border-2 border-current p-0.5"
              >
                <div className="h-1 w-1 rounded-full bg-current" />
              </motion.div>
              <span className="text-[10px] font-bold uppercase tracking-widest">{scrollHint}</span>
            </div>
          </div>
        ) : null}

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="no-scrollbar flex-1 overflow-y-auto overscroll-contain scroll-smooth"
        >
          <Link href={item.href} draggable={false} className="flex w-full flex-col gap-6 p-0">
            <div className="relative z-20 block aspect-2/3 overflow-hidden">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                draggable={false}
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, 100vw"
                priority={index === 1}
              />
            </div>

            <div
              className={cn(
                "flex flex-col gap-6 transition-opacity duration-1000",
                hoveredId === item.href ? "opacity-100" : "invisible opacity-0 lg:visible"
              )}
            >
              {item.carouselImages.slice(0, 3).map((img, imageIndex) => (
                <div
                  key={imageIndex}
                  className="relative block aspect-2/3 shrink-0 overflow-hidden"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    draggable={false}
                    className="object-cover"
                    sizes="33vw"
                  />
                </div>
              ))}

              {ctaLabel ? (
                <div className="mb-6 flex items-center justify-center border border-(--color-paper) bg-transparent p-4 text-(--color-paper) transition-all duration-500 hover:bg-(--color-paper) hover:text-black">
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {ctaLabel}
                  </span>
                </div>
              ) : null}
            </div>
          </Link>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute top-0 left-0 right-0 z-40 h-24 bg-linear-to-b from-foreground via-foreground/80 to-transparent transition-transform duration-700",
            hoveredId === item.href ? "translate-y-0" : "-translate-y-full"
          )}
        />
      </div>
    </motion.div>
  );
}
