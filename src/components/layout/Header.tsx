"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import BurgerMenu from "@/components/icons/burger-menu";
import { cn } from "@/lib/utils";
import { resolveViewportHeight } from "@/lib/viewport";
import type { HeaderConfig } from "@/types/site";

interface HeaderProps extends HeaderConfig {
  className?: string;
}

interface ScrollLockState {
  scrollY: number;
}

const MENU_CLOSE_DURATION_MS = 300;
const LEGAL_MENU_BLACK_PATHS = new Set([
  "/terminos-condiciones",
  "/politica-privacidad",
]);
const MENU_SCROLL_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
]);

function getMenuViewportStyle(menuViewportHeight: number | null) {
  if (menuViewportHeight === null) {
    return undefined;
  }

  const height = `${menuViewportHeight}px`;

  return {
    height,
    minHeight: height,
    maxHeight: height,
  };
}

export function Header({
  brandLogoAlt,
  brandLogoHref,
  logoButtonLabel,
  menuText,
  closeLabel,
  menuLinks,
  className,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [menuViewportHeight, setMenuViewportHeight] = useState<number | null>(null);
  const pathname = usePathname();
  const closeTimeoutRef = useRef<number | null>(null);
  const closeFrameRef = useRef<number | null>(null);
  const scrollLockRef = useRef<ScrollLockState | null>(null);
  const menuScrollAreaRef = useRef<HTMLDivElement | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const pendingMenuNavigationRef = useRef(false);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const clearCloseFrame = useCallback(() => {
    if (closeFrameRef.current !== null) {
      window.cancelAnimationFrame(closeFrameRef.current);
      closeFrameRef.current = null;
    }
  }, []);

  const syncMenuViewportHeight = useCallback(() => {
    const nextViewportHeight = resolveViewportHeight(window);

    setMenuViewportHeight((currentViewportHeight) => (
      currentViewportHeight === nextViewportHeight ? currentViewportHeight : nextViewportHeight
    ));
  }, []);

  const canScrollMenu = useCallback((target: EventTarget | null, deltaY: number) => {
    const menuScrollArea = menuScrollAreaRef.current;

    if (!menuScrollArea || !(target instanceof Node) || !menuScrollArea.contains(target)) {
      return false;
    }

    const { clientHeight, scrollHeight, scrollTop } = menuScrollArea;

    if (scrollHeight <= clientHeight) {
      return false;
    }

    if (deltaY < 0) {
      return scrollTop > 0;
    }

    if (deltaY > 0) {
      return scrollTop + clientHeight < scrollHeight - 1;
    }

    return true;
  }, []);

  const handleWheelScrollLock = useCallback((event: WheelEvent) => {
    if (canScrollMenu(event.target, event.deltaY)) {
      return;
    }

    event.preventDefault();
  }, [canScrollMenu]);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  }, []);

  const handleTouchMoveScrollLock = useCallback((event: TouchEvent) => {
    const currentTouch = event.touches[0];

    if (!currentTouch) {
      event.preventDefault();
      return;
    }

    const previousTouchY = touchStartYRef.current ?? currentTouch.clientY;
    const deltaY = previousTouchY - currentTouch.clientY;

    touchStartYRef.current = currentTouch.clientY;

    if (canScrollMenu(event.target, deltaY)) {
      return;
    }

    event.preventDefault();
  }, [canScrollMenu]);

  const resetTouchScrollLock = useCallback(() => {
    touchStartYRef.current = null;
  }, []);

  const lockScroll = useCallback(() => {
    if (scrollLockRef.current) {
      return;
    }

    scrollLockRef.current = {
      scrollY: window.scrollY,
    };
  }, []);

  const unlockScroll = useCallback(() => {
    const scrollLockState = scrollLockRef.current;

    if (!scrollLockState) {
      return;
    }

    const nextScrollY = pendingMenuNavigationRef.current ? 0 : scrollLockState.scrollY;

    pendingMenuNavigationRef.current = false;
    scrollLockRef.current = null;

    if (window.scrollY !== nextScrollY) {
      window.scrollTo(0, nextScrollY);
    }
  }, []);

  const finalizeMenuClose = useCallback(() => {
    unlockScroll();
    closeTimeoutRef.current = null;
    closeFrameRef.current = window.requestAnimationFrame(() => {
      setIsMenuMounted(false);
      setMenuViewportHeight(null);
      closeFrameRef.current = null;
    });
  }, [unlockScroll]);

  const scheduleMenuClose = useCallback(() => {
    clearCloseTimeout();
    clearCloseFrame();
    setIsOpen(false);
    closeTimeoutRef.current = window.setTimeout(finalizeMenuClose, MENU_CLOSE_DURATION_MS);
  }, [clearCloseFrame, clearCloseTimeout, finalizeMenuClose]);

  const openMenu = useCallback(() => {
    pendingMenuNavigationRef.current = false;
    clearCloseTimeout();
    clearCloseFrame();
    syncMenuViewportHeight();
    lockScroll();
    setIsMenuMounted(true);
    setIsOpen(true);
  }, [clearCloseFrame, clearCloseTimeout, lockScroll, syncMenuViewportHeight]);

  const closeMenu = useCallback((options?: { scrollToTop?: boolean }) => {
    if (!isMenuMounted) {
      return;
    }

    pendingMenuNavigationRef.current = options?.scrollToTop ?? false;
    scheduleMenuClose();
  }, [isMenuMounted, scheduleMenuClose]);

  const handleMenuLinkClick = useCallback((href: string) => {
    if (href === pathname) {
      closeMenu({ scrollToTop: true });
      return;
    }

    if (!isMenuMounted) {
      return;
    }

    pendingMenuNavigationRef.current = true;
    scheduleMenuClose();
  }, [pathname, closeMenu, isMenuMounted, scheduleMenuClose]);

  useEffect(() => {
    if (!isMenuMounted) {
      return;
    }

    window.addEventListener("resize", syncMenuViewportHeight);
    window.visualViewport?.addEventListener("resize", syncMenuViewportHeight);

    return () => {
      window.removeEventListener("resize", syncMenuViewportHeight);
      window.visualViewport?.removeEventListener("resize", syncMenuViewportHeight);
    };
  }, [isMenuMounted, syncMenuViewportHeight]);

  useEffect(() => {
    if (!isMenuMounted || !pendingMenuNavigationRef.current) {
      return;
    }

    clearCloseTimeout();
    clearCloseFrame();
    finalizeMenuClose();
  }, [pathname, isMenuMounted, clearCloseFrame, clearCloseTimeout, finalizeMenuClose]);

  useEffect(() => {
    if (!isMenuMounted) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (MENU_SCROLL_KEYS.has(event.key)) {
        event.preventDefault();
      }
    };

    const handlePopState = () => {
      closeMenu();
    };

    const handleScroll = () => {
      const lockedScrollState = scrollLockRef.current;

      if (!lockedScrollState) {
        return;
      }

      if (window.scrollY !== lockedScrollState.scrollY) {
        window.scrollTo(0, lockedScrollState.scrollY);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("wheel", handleWheelScrollLock, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMoveScrollLock, { passive: false });
    window.addEventListener("touchend", resetTouchScrollLock, { passive: true });
    window.addEventListener("touchcancel", resetTouchScrollLock, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("wheel", handleWheelScrollLock);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMoveScrollLock);
      window.removeEventListener("touchend", resetTouchScrollLock);
      window.removeEventListener("touchcancel", resetTouchScrollLock);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    isMenuMounted,
    closeMenu,
    handleTouchMoveScrollLock,
    handleTouchStart,
    handleWheelScrollLock,
    resetTouchScrollLock,
  ]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }

      if (closeFrameRef.current !== null) {
        window.cancelAnimationFrame(closeFrameRef.current);
        closeFrameRef.current = null;
      }

      const scrollLockState = scrollLockRef.current;

      if (!scrollLockState) {
        return;
      }

      const nextScrollY = pendingMenuNavigationRef.current ? 0 : scrollLockState.scrollY;

      pendingMenuNavigationRef.current = false;

      if (window.scrollY !== nextScrollY) {
        window.scrollTo(0, nextScrollY);
      }

      scrollLockRef.current = null;
    };
  }, []);

  const menuViewportStyle = getMenuViewportStyle(menuViewportHeight);
  const isLegalPage = LEGAL_MENU_BLACK_PATHS.has(pathname);

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full pointer-events-none",
        className,
      )}
    >
      <div className="pointer-events-none flex w-full items-start justify-end px-6 pt-6 lg:px-8">
        {/* <Link
          href={brandLogoHref}
          aria-label={brandLogoAlt}
          className="pointer-events-auto shrink-0 transition-opacity duration-200 hover:opacity-70"
        >
          <StrongwoodLogo
            width={812}
            height={155}
            color="white"
            aria-hidden="true"
            className="w-41 lg:lg:w-51"
          />
        </Link> */}

        <button
          type="button"
          onClick={openMenu}
          aria-label={logoButtonLabel}
          aria-expanded={isOpen}
          aria-controls="site-menu-dialog"
          className={cn(
            "group pointer-events-auto cursor-pointer transition-opacity duration-300",
            isMenuMounted && "pointer-events-none",
            isOpen ? "opacity-0" : "opacity-100",
          )}
        >
          <BurgerMenu
            width={94}
            height={63}
            color={isLegalPage ? "var(--color-black)" : "var(--color-paper)"}
            aria-hidden="true"
            className={cn(
              "w-16 shrink-0 transition-all duration-200 ease-in-out hover:opacity-70 hover:duration-150 sm:w-20 lg:w-24",
              isOpen && "rotate-90 -mr-[10.5px] hover:opacity-100 lg:-mr-4",
            )}
          />
          <span className="sr-only">{menuText}</span>
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-stretch overflow-hidden",
          isMenuMounted ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        style={menuViewportStyle}
        aria-hidden={!isMenuMounted}
      >
        <div className="absolute inset-0 bg-(--color-overlay) backdrop-blur-lg" aria-hidden="true" />

        <button
          type="button"
          onClick={() => closeMenu()}
          aria-label={closeLabel}
          className="absolute inset-0 z-10 cursor-pointer"
        />

        <div
          id="site-menu-dialog"
          className={cn(
            "relative z-20 flex h-full w-full flex-col items-end gap-6 overflow-hidden px-6 text-paper transition-transform duration-300 lg:px-8",
            "sm:gap-4",
            isOpen ? "translate-y-0" : "translate-y-full",
          )}
          style={{
            ...menuViewportStyle,
            paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)",
          }}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => closeMenu()}
            aria-label={closeLabel}
            className="group flex h-16 w-16 shrink-0 cursor-pointer items-center justify-end transition-opacity duration-500 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
          >
            <BurgerMenu
              width={94}
              height={63}
              color="var(--color-paper)"
              aria-hidden="true"
              className="w-16 shrink-0 rotate-90 -mr-[10.5px] transition-all duration-200 ease-out sm:w-20 lg:w-24 lg:-mr-4"
            />
          </button>

          <div
            ref={menuScrollAreaRef}
            className="flex min-h-0 w-full flex-1 justify-end overflow-y-auto overflow-x-hidden overscroll-contain"
          >
            <nav className="flex h-fit max-w-6xl flex-col items-end gap-8 pb-6 text-right sm:gap-10 sm:pt-4 lg:gap-20 lg:pt-10 [@media(min-width:1024px)_and_(max-height:900px)]:gap-12 [@media(min-width:1024px)_and_(max-height:900px)]:pt-6">
              {menuLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => handleMenuLinkClick(link.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group flex items-center justify-end gap-4 uppercase tracking-[-0.03em] text-paper transition sm:gap-6 lg:gap-10",
                      "text-[36px] font-semibold leading-[0.6] sm:text-[60px] lg:text-[94px] [@media(min-width:1024px)_and_(max-height:900px)]:text-[72px]",
                      !isActive && "opacity-55 hover:opacity-90",
                    )}
                  >
                    <span
                      className={cn(
                        "transition duration-300 ease-out sm:inline-flex",
                        isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
                      )}
                      aria-hidden="true"
                    >
                      <Image
                        src="/images/icons/menu-arrow-icon-white.svg"
                        alt="Flecha del menú"
                        width={60}
                        height={60}
                        className="h-6 w-6 sm:h-12 sm:w-12 lg:h-16 lg:w-16 [@media(min-width:1024px)_and_(max-height:900px)]:h-12 [@media(min-width:1024px)_and_(max-height:900px)]:w-12"
                      />
                    </span>
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
