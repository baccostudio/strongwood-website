"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { HeaderLogo } from "@/components/brand/HeaderLogo";
import { cn } from "@/lib/utils";

interface HeaderLink {
  label: string;
  href: string;
}

interface HeaderProps {
  logoAlt: string;
  logoVariants: {
    darkSrc: string;
    beigeSrc: string;
    whiteSrc: string;
  };
  logoButtonLabel: string;
  menuText: string;
  closeLabel: string;
  menuLinks: HeaderLink[];
  defaultVariant: "dark" | "beige" | "white";
  className?: string;
}

interface ScrollLockState {
  scrollY: number;
}

const MENU_CLOSE_DURATION_MS = 300;

export function Header({
  logoAlt,
  logoVariants,
  logoButtonLabel,
  menuText,
  closeLabel,
  menuLinks,
  defaultVariant,
  className,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const pathname = usePathname();
  const closeTimeoutRef = useRef<number | null>(null);
  const closeFrameRef = useRef<number | null>(null);
  const scrollLockRef = useRef<ScrollLockState | null>(null);
  const menuScrollAreaRef = useRef<HTMLDivElement | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const pendingMenuNavigationRef = useRef(false);
  const lastViewportWidthRef = useRef(0);
  const lastViewportHeightRef = useRef(0);

  const isContact = pathname === "/contacto";
  const isAbout = pathname === "/nosotros";
  const isProjects = pathname === "/proyectos";
  const isOverlay = isContact || isAbout;
  const isHome = pathname === "/";
  const headerVariant = isOverlay ? "white" : isProjects ? "beige" : defaultVariant;
  const menuViewportHeight = "calc(var(--vh, 1vh) * 100)";

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

  const syncViewportHeight = useCallback(() => {
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;

    document.documentElement.style.setProperty("--vh", `${viewportHeight * 0.01}px`);
    lastViewportWidthRef.current = window.innerWidth;
    lastViewportHeightRef.current = viewportHeight;
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
      closeFrameRef.current = null;
    });
  }, [unlockScroll]);

  const openMenu = useCallback(() => {
    clearCloseTimeout();
    clearCloseFrame();
    pendingMenuNavigationRef.current = false;
    syncViewportHeight();
    lockScroll();
    setIsMenuMounted(true);
    setIsOpen(true);
  }, [clearCloseFrame, clearCloseTimeout, lockScroll, syncViewportHeight]);

  const closeMenu = useCallback((options?: { scrollToTop?: boolean }) => {
    if (!isMenuMounted) {
      return;
    }

    clearCloseTimeout();
    clearCloseFrame();
    pendingMenuNavigationRef.current = options?.scrollToTop ?? false;
    setIsOpen(false);
    closeTimeoutRef.current = window.setTimeout(finalizeMenuClose, MENU_CLOSE_DURATION_MS);
  }, [clearCloseFrame, clearCloseTimeout, finalizeMenuClose, isMenuMounted]);

  const handleMenuLinkClick = useCallback((href: string) => {
    if (href === pathname) {
      closeMenu({ scrollToTop: true });
      return;
    }

    if (!isMenuMounted) {
      return;
    }

    clearCloseTimeout();
    clearCloseFrame();
    pendingMenuNavigationRef.current = true;
    setIsOpen(false);
    closeTimeoutRef.current = window.setTimeout(finalizeMenuClose, MENU_CLOSE_DURATION_MS);
  }, [pathname, clearCloseFrame, clearCloseTimeout, closeMenu, finalizeMenuClose, isMenuMounted]);

  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const viewportWidth = window.innerWidth;
      const widthChanged = viewportWidth !== lastViewportWidthRef.current;
      const heightChanged = Math.abs(viewportHeight - lastViewportHeightRef.current) > 1;

      if (widthChanged || (isMenuMounted && heightChanged)) {
        syncViewportHeight();
      }
    };

    syncViewportHeight();

    window.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, [isMenuMounted, syncViewportHeight]);

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

    const preventScrollKeys = new Set([
      "ArrowUp",
      "ArrowDown",
      "PageUp",
      "PageDown",
      "Home",
      "End",
      " ",
    ]);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (preventScrollKeys.has(event.key)) {
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

  return (
    <header
      className={cn(
        isHome ? "absolute top-0" : "absolute top-0",
        "right-0 z-40 pointer-events-none w-32 sm:w-40 lg:w-48",
        className,
      )}
      style={isHome ? { height: "calc(var(--vh, 1vh) * 400)" } : undefined}
    >
      <div
        className={cn(
          "flex px-6 pt-6 lg:px-8",
          "items-start pointer-events-auto",
          isHome && "sticky top-0",
          isOverlay && "pointer-events-auto",
        )}
        style={isHome ? { height: menuViewportHeight } : undefined}
      >
        <button
          type="button"
          onClick={openMenu}
          aria-label={logoButtonLabel}
          className={cn(
            "group ml-auto flex h-16 w-16 shrink-0 items-center justify-center pointer-events-auto transition-opacity duration-500 sm:h-20 sm:w-20 lg:h-24 lg:w-24",
            isMenuMounted ? "pointer-events-none opacity-0" : "opacity-100",
          )}
        >
          <HeaderLogo
            variant={headerVariant}
            alt={logoAlt}
            darkSrc={logoVariants.darkSrc}
            beigeSrc={logoVariants.beigeSrc}
            whiteSrc={logoVariants.whiteSrc}
            priority
            className={cn(
              "w-16 shrink-0 transition-all duration-200 ease-in-out hover:opacity-70 hover:duration-150 sm:w-20 lg:w-24",
              isMenuMounted && "rotate-90 -mr-[10.5px] hover:opacity-100 lg:-mr-4",
            )}
          />
          <span className="sr-only">{menuText}</span>
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 flex items-stretch overflow-hidden",
          isMenuMounted ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
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
          className={cn(
            "relative z-20 flex h-full w-full flex-col items-end gap-6 overflow-hidden px-6 text-(--color-paper) transition-transform duration-300 lg:px-8",
            "sm:gap-4",
            isOpen ? "translate-y-0" : "translate-y-full",
          )}
          style={{
            height: menuViewportHeight,
            minHeight: menuViewportHeight,
            maxHeight: menuViewportHeight,
            paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)",
          }}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => closeMenu()}
            aria-label={closeLabel}
            className="group flex h-16 w-16 shrink-0 items-center justify-center transition-opacity duration-500 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
          >
            <HeaderLogo
              variant="white"
              alt={closeLabel}
              darkSrc={logoVariants.darkSrc}
              beigeSrc={logoVariants.beigeSrc}
              whiteSrc={logoVariants.whiteSrc}
              priority
              className="w-16 shrink-0 rotate-90 -mr-[10.5px] transition-all duration-200 ease-out sm:w-20 lg:w-24 lg:-mr-4"
            />
          </button>

          <div
            ref={menuScrollAreaRef}
            className="flex min-h-0 w-full flex-1 justify-end overflow-y-auto overflow-x-hidden overscroll-contain pr-1"
          >
            <nav className="flex max-w-6xl flex-col items-end gap-8 pt-2 text-right sm:gap-10 sm:pt-4 lg:gap-20 lg:pt-10 [@media(min-width:1024px)_and_(max-height:900px)]:gap-12 [@media(min-width:1024px)_and_(max-height:900px)]:pt-6">
              {menuLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => handleMenuLinkClick(link.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group flex items-center justify-end gap-4 uppercase tracking-[-0.03em] transition sm:gap-6 lg:gap-10",
                      "text-[36px] font-semibold leading-[0.6] sm:text-[60px] lg:text-[94px] [@media(min-width:1024px)_and_(max-height:900px)]:text-[72px]",
                      isActive
                        ? "text-(--color-paper)"
                        : "text-(--color-paper) opacity-55 hover:opacity-90",
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
