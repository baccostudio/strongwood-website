"use client";

import type { RefObject } from "react";
import { useEffect, useMemo, useState } from "react";
import { headerThemeConfig } from "@/content/site/header-theme";
import { resolveViewportHeight } from "@/lib/viewport";
import type {
  HeaderThemeConfig,
  HeaderThemeRenderState,
  HeaderThemeToken,
  HeaderThemeViewportMode,
} from "@/types/site";

const DEFAULT_THEME_SELECTOR = "[data-header-theme-default]";
const THEME_SECTION_SELECTOR = "[data-header-theme]";
const THEME_BOUNDARY_SAMPLE_OFFSET_PX = 0.5;
const MOBILE_BREAKPOINT_PX = 640;
const DESKTOP_BREAKPOINT_PX = 1024;
const HEADER_THEME_TOKENS: HeaderThemeToken[] = [
  "paper",
  "black",
  "brown",
  "secondary",
  "project",
  "black-72",
  "paper-80",
];

interface UseHeaderThemeOptions {
  pathname: string | null;
  isMenuOpen: boolean;
  triggerRef: RefObject<HTMLElement | null>;
}

interface ThemeSection {
  element: HTMLElement;
  mediaQuery: string | null;
  order: number;
  theme: HeaderThemeToken;
  viewport: HeaderThemeViewportMode;
}

interface ThemeDomSnapshot {
  pageDefaultTheme: HeaderThemeToken | null;
  pathname: string | null;
  sections: ThemeSection[];
}

interface HeaderThemeRenderSnapshot {
  pathname: string | null;
  state: HeaderThemeRenderState | null;
}

interface TriggerMetrics {
  bottom: number;
  height: number;
  top: number;
}

interface MeasuredThemeSection extends ThemeSection {
  bottom: number;
  top: number;
}

interface ThemeBoundary {
  bottomTheme: HeaderThemeToken;
  position: number;
  topTheme: HeaderThemeToken;
}

function normalizePathname(pathname: string | null | undefined) {
  if (!pathname || pathname.length === 0) {
    return "/";
  }

  if (pathname === "/") {
    return pathname;
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function resolveRouteDefaultTheme(
  pathname: string | null,
  config: HeaderThemeConfig,
): HeaderThemeToken {
  const normalizedPathname = normalizePathname(pathname);

  for (const routeDefault of config.routeDefaults) {
    const routeMatchMode = routeDefault.match ?? "exact";

    if (routeMatchMode === "exact" && normalizedPathname === routeDefault.pathname) {
      return routeDefault.theme;
    }

    if (routeMatchMode === "prefix" && normalizedPathname.startsWith(routeDefault.pathname)) {
      return routeDefault.theme;
    }
  }

  return config.fallbackTheme;
}

function isHeaderThemeToken(value: string | null): value is HeaderThemeToken {
  return value !== null && HEADER_THEME_TOKENS.includes(value as HeaderThemeToken);
}

function resolveHeaderThemeCssVariable(theme: HeaderThemeToken) {
  switch (theme) {
    case "paper":
      return "var(--color-header-paper)";
    case "black":
      return "var(--color-header-black)";
    case "brown":
      return "var(--color-header-brown)";
    case "secondary":
      return "var(--color-header-secondary)";
    case "project":
      return "var(--color-header-project)";
    case "black-72":
      return "var(--color-header-black-72)";
    case "paper-80":
      return "var(--color-header-paper-80)";
    default:
      return "var(--color-header-paper)";
  }
}

function resolveHeaderThemeViewportMode(value: string | null): HeaderThemeViewportMode {
  switch (value) {
    case "mobile":
      return "mobile";
    case "desktop":
      return "desktop";
    default:
      return "all";
  }
}

function isThemeSectionEnabledForViewport(viewport: HeaderThemeViewportMode) {
  if (typeof window === "undefined") {
    return viewport === "all";
  }

  if (viewport === "mobile") {
    return window.innerWidth < MOBILE_BREAKPOINT_PX;
  }

  if (viewport === "desktop") {
    return window.innerWidth >= DESKTOP_BREAKPOINT_PX;
  }

  return true;
}

function isThemeSectionEnabledForMediaQuery(mediaQuery: string | null) {
  if (!mediaQuery) {
    return true;
  }

  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(mediaQuery).matches;
}

function isThemeSectionEnabled(section: ThemeSection) {
  return (
    isThemeSectionEnabledForViewport(section.viewport)
    && isThemeSectionEnabledForMediaQuery(section.mediaQuery)
  );
}

function clampCutRatio(value: number) {
  return Math.min(1, Math.max(0, value));
}

function buildSolidThemeState(theme: HeaderThemeToken): HeaderThemeRenderState {
  return {
    kind: "solid",
    theme,
    color: resolveHeaderThemeCssVariable(theme),
  };
}

function buildSplitThemeState(
  topTheme: HeaderThemeToken,
  bottomTheme: HeaderThemeToken,
  cutRatio: number,
): HeaderThemeRenderState {
  return {
    kind: "split-horizontal",
    topTheme,
    bottomTheme,
    topColor: resolveHeaderThemeCssVariable(topTheme),
    bottomColor: resolveHeaderThemeCssVariable(bottomTheme),
    cutRatio,
  };
}

function areThemeSectionsEqual(leftSections: ThemeSection[], rightSections: ThemeSection[]) {
  if (leftSections.length !== rightSections.length) {
    return false;
  }

  return leftSections.every((leftSection, index) => {
    const rightSection = rightSections[index];

    return (
      leftSection.element === rightSection?.element
      && leftSection.mediaQuery === rightSection.mediaQuery
      && leftSection.theme === rightSection.theme
      && leftSection.order === rightSection.order
      && leftSection.viewport === rightSection.viewport
    );
  });
}

function areRenderStatesEqual(
  leftState: HeaderThemeRenderState | null,
  rightState: HeaderThemeRenderState | null,
) {
  if (leftState === rightState) {
    return true;
  }

  if (!leftState || !rightState || leftState.kind !== rightState.kind) {
    return false;
  }

  if (leftState.kind === "solid" && rightState.kind === "solid") {
    return leftState.theme === rightState.theme && leftState.color === rightState.color;
  }

  if (leftState.kind === "split-horizontal" && rightState.kind === "split-horizontal") {
    return (
      leftState.topTheme === rightState.topTheme
      && leftState.bottomTheme === rightState.bottomTheme
      && leftState.topColor === rightState.topColor
      && leftState.bottomColor === rightState.bottomColor
      && leftState.cutRatio === rightState.cutRatio
    );
  }

  return false;
}

function resolveTriggerMetrics(triggerElement: HTMLElement): TriggerMetrics {
  const { bottom, height, top } = triggerElement.getBoundingClientRect();

  return {
    top,
    bottom,
    height: Math.max(height, 1),
  };
}

function buildObserverRootMargin(triggerElement: HTMLElement) {
  const viewportHeight = resolveViewportHeight(window);
  const triggerMetrics = resolveTriggerMetrics(triggerElement);
  const bandTop = Math.max(Math.min(triggerMetrics.top, viewportHeight), 0);
  const bandBottom = Math.max(
    Math.min(triggerMetrics.bottom, viewportHeight),
    Math.min(bandTop + 1, viewportHeight),
  );
  const bottomInset = Math.max(viewportHeight - bandBottom, 0);

  return `-${bandTop}px 0px -${bottomInset}px 0px`;
}

function isSectionIntersectingTriggerBand(
  sectionElement: HTMLElement,
  triggerMetrics: TriggerMetrics,
) {
  const sectionRect = sectionElement.getBoundingClientRect();

  return sectionRect.bottom > triggerMetrics.top && sectionRect.top < triggerMetrics.bottom;
}

function resolveThemeSections(): ThemeSection[] {
  return Array.from(document.querySelectorAll<HTMLElement>(THEME_SECTION_SELECTOR))
    .map((element, index) => {
      const theme = element.dataset.headerTheme ?? null;

      if (!isHeaderThemeToken(theme)) {
        return null;
      }

      return {
        element,
        mediaQuery: element.dataset.headerThemeMediaQuery ?? null,
        order: index,
        theme,
        viewport: resolveHeaderThemeViewportMode(
          element.dataset.headerThemeViewport ?? null,
        ),
      };
    })
    .filter((section): section is ThemeSection => section !== null);
}

function resolvePageDefaultTheme() {
  const pageDefaultElement = document.querySelector<HTMLElement>(DEFAULT_THEME_SELECTOR);
  const theme = pageDefaultElement?.dataset.headerThemeDefault ?? null;

  return isHeaderThemeToken(theme) ? theme : null;
}

function measureIntersectingSections(
  intersectingSections: Iterable<ThemeSection>,
): MeasuredThemeSection[] {
  return Array.from(intersectingSections)
    .map((section) => ({
      ...section,
      bottom: section.element.getBoundingClientRect().bottom,
      top: section.element.getBoundingClientRect().top,
    }))
    .sort((leftSection, rightSection) => {
      if (leftSection.top === rightSection.top) {
        return leftSection.order - rightSection.order;
      }

      return leftSection.top - rightSection.top;
    });
}

function resolveThemeAtPosition(
  position: number,
  measuredSections: MeasuredThemeSection[],
  baseTheme: HeaderThemeToken,
) {
  const activeSections = measuredSections
    .filter((section) => section.top <= position && section.bottom > position)
    .sort((leftSection, rightSection) => {
      if (leftSection.top === rightSection.top) {
        return leftSection.order - rightSection.order;
      }

      return leftSection.top - rightSection.top;
    });

  return activeSections.at(-1)?.theme ?? baseTheme;
}

function buildThemeBoundary(
  position: number,
  measuredSections: MeasuredThemeSection[],
  baseTheme: HeaderThemeToken,
): ThemeBoundary | null {
  const topTheme = resolveThemeAtPosition(
    position - THEME_BOUNDARY_SAMPLE_OFFSET_PX,
    measuredSections,
    baseTheme,
  );
  const bottomTheme = resolveThemeAtPosition(
    position + THEME_BOUNDARY_SAMPLE_OFFSET_PX,
    measuredSections,
    baseTheme,
  );

  if (topTheme === bottomTheme) {
    return null;
  }

  return {
    position,
    topTheme,
    bottomTheme,
  };
}

function resolveRenderStateFromSections(
  baseTheme: HeaderThemeToken,
  triggerElement: HTMLElement,
  intersectingSections: Iterable<ThemeSection>,
): HeaderThemeRenderState {
  const measuredSections = measureIntersectingSections(intersectingSections);

  if (measuredSections.length === 0) {
    return buildSolidThemeState(baseTheme);
  }

  const triggerMetrics = resolveTriggerMetrics(triggerElement);
  const topSamplePosition = triggerMetrics.top + Math.min(
    THEME_BOUNDARY_SAMPLE_OFFSET_PX,
    triggerMetrics.height / 4,
  );
  const bottomSamplePosition = triggerMetrics.bottom - Math.min(
    THEME_BOUNDARY_SAMPLE_OFFSET_PX,
    triggerMetrics.height / 4,
  );
  const topTheme = resolveThemeAtPosition(
    topSamplePosition,
    measuredSections,
    baseTheme,
  );
  const bottomTheme = resolveThemeAtPosition(
    bottomSamplePosition,
    measuredSections,
    baseTheme,
  );

  if (topTheme === bottomTheme) {
    return buildSolidThemeState(topTheme);
  }

  const boundaries = measuredSections
    .flatMap((section) => {
      const sectionBoundaries = [section.top, section.bottom]
        .filter((position) => position > triggerMetrics.top && position < triggerMetrics.bottom)
        .map((position) => buildThemeBoundary(position, measuredSections, baseTheme))
        .filter((boundary): boundary is ThemeBoundary => boundary !== null);

      return sectionBoundaries;
    })
    .sort((leftBoundary, rightBoundary) => leftBoundary.position - rightBoundary.position);

  const boundary = boundaries.find((candidateBoundary) => (
    candidateBoundary.topTheme === topTheme
    && candidateBoundary.bottomTheme === bottomTheme
  )) ?? boundaries[0];

  if (!boundary) {
    return buildSolidThemeState(topTheme);
  }

  const cutRatio = clampCutRatio(
    (boundary.position - triggerMetrics.top) / triggerMetrics.height,
  );

  if (cutRatio <= 0) {
    return buildSolidThemeState(boundary.bottomTheme);
  }

  if (cutRatio >= 1) {
    return buildSolidThemeState(boundary.topTheme);
  }

  return buildSplitThemeState(boundary.topTheme, boundary.bottomTheme, cutRatio);
}

export function useHeaderTheme({
  pathname,
  isMenuOpen,
  triggerRef,
}: UseHeaderThemeOptions): HeaderThemeRenderState {
  const routeDefaultTheme = useMemo(
    () => resolveRouteDefaultTheme(pathname, headerThemeConfig),
    [pathname],
  );
  const [themeDomSnapshot, setThemeDomSnapshot] = useState<ThemeDomSnapshot>({
    pathname,
    pageDefaultTheme: null,
    sections: [],
  });
  const [renderSnapshot, setRenderSnapshot] = useState<HeaderThemeRenderSnapshot>({
    pathname,
    state: null,
  });
  const pageDefaultTheme = useMemo(
    () => (
      themeDomSnapshot.pathname === pathname
        ? themeDomSnapshot.pageDefaultTheme
        : null
    ),
    [pathname, themeDomSnapshot],
  );
  const themeSections = useMemo(
    () => (
      themeDomSnapshot.pathname === pathname
        ? themeDomSnapshot.sections
        : []
    ),
    [pathname, themeDomSnapshot],
  );

  useEffect(() => {
    let frameId: number | null = null;

    const syncThemeDomSnapshot = () => {
      const nextPageDefaultTheme = resolvePageDefaultTheme();
      const nextThemeSections = resolveThemeSections();

      setThemeDomSnapshot((currentSnapshot) => {
        if (
          currentSnapshot.pathname === pathname
          && currentSnapshot.pageDefaultTheme === nextPageDefaultTheme
          && areThemeSectionsEqual(currentSnapshot.sections, nextThemeSections)
        ) {
          return currentSnapshot;
        }

        return {
          pathname,
          pageDefaultTheme: nextPageDefaultTheme,
          sections: nextThemeSections,
        };
      });
    };

    frameId = window.requestAnimationFrame(syncThemeDomSnapshot);

    const observer = new MutationObserver(() => {
      syncThemeDomSnapshot();
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: [
        "data-header-theme",
        "data-header-theme-default",
        "data-header-theme-media-query",
        "data-header-theme-viewport",
      ],
    });

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const triggerElement = triggerRef.current;
    const baseTheme = pageDefaultTheme ?? routeDefaultTheme;

    if (!triggerElement || themeSections.length === 0) {
      const emptyStateFrameId = window.requestAnimationFrame(() => {
        setRenderSnapshot((currentSnapshot) => {
          if (currentSnapshot.pathname === pathname && currentSnapshot.state === null) {
            return currentSnapshot;
          }

          return {
            pathname,
            state: null,
          };
        });
      });

      return () => {
        window.cancelAnimationFrame(emptyStateFrameId);
      };
    }

    let observer: IntersectionObserver | null = null;
    let frameId: number | null = null;
    const sectionMap = new Map(
      themeSections.map((section) => [section.element, section] as const),
    );
    const intersectingSections = new Map<HTMLElement, ThemeSection>();

    const syncRenderState = () => {
      const nextState = resolveRenderStateFromSections(
        baseTheme,
        triggerElement,
        intersectingSections.values(),
      );

      setRenderSnapshot((currentSnapshot) => {
        if (
          currentSnapshot.pathname === pathname
          && areRenderStatesEqual(currentSnapshot.state, nextState)
        ) {
          return currentSnapshot;
        }

        return {
          pathname,
          state: nextState,
        };
      });
    };

    const scheduleRenderStateSync = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        syncRenderState();
      });
    };

    const seedIntersectingSections = () => {
      intersectingSections.clear();

      const triggerMetrics = resolveTriggerMetrics(triggerElement);

      themeSections.forEach((section) => {
        if (!document.body.contains(section.element)) {
          return;
        }

        if (!isThemeSectionEnabled(section)) {
          return;
        }

        if (isSectionIntersectingTriggerBand(section.element, triggerMetrics)) {
          intersectingSections.set(section.element, section);
        }
      });
    };

    const observeThemeSections = () => {
      observer?.disconnect();

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const section = sectionMap.get(entry.target as HTMLElement);

            if (!section) {
              return;
            }

            if (entry.isIntersecting && isThemeSectionEnabled(section)) {
              intersectingSections.set(section.element, section);
            } else {
              intersectingSections.delete(section.element);
            }
          });

          scheduleRenderStateSync();
        },
        {
          rootMargin: buildObserverRootMargin(triggerElement),
          threshold: [0, 1],
        },
      );

      themeSections.forEach((section) => {
        if (!isThemeSectionEnabled(section)) {
          return;
        }

        observer?.observe(section.element);
      });

      seedIntersectingSections();
      scheduleRenderStateSync();
    };

    const handleScroll = () => {
      if (intersectingSections.size === 0) {
        return;
      }

      scheduleRenderStateSync();
    };

    const handleResize = () => {
      observeThemeSections();
    };

    observeThemeSections();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("resize", handleResize);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      observer?.disconnect();
      intersectingSections.clear();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, [pathname, pageDefaultTheme, routeDefaultTheme, themeSections, triggerRef]);

  return useMemo(() => {
    if (isMenuOpen) {
      return buildSolidThemeState(headerThemeConfig.menuOpenTheme);
    }

    const baseTheme = pageDefaultTheme ?? routeDefaultTheme;
    const resolvedState = renderSnapshot.pathname === pathname
      ? renderSnapshot.state
      : null;

    return resolvedState ?? buildSolidThemeState(baseTheme);
  }, [isMenuOpen, pageDefaultTheme, pathname, renderSnapshot, routeDefaultTheme]);
}
