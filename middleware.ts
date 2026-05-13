import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  PRELOADER_COOKIE_MAX_AGE_SECONDS,
  PRELOADER_DECISION_HEADER,
  PRELOADER_DEVICE_HEADER,
  getPreloaderCookieDomain,
  getPreloaderCookieName,
  getPreloaderDevice,
  getPreloaderSignature,
  isValidPreloaderCookie,
} from "@/lib/preloader";
import { checkIsMobile } from "@/lib/user-agent";

export function middleware(request: NextRequest) {
  const isMobile = checkIsMobile(request.headers.get("user-agent") ?? "");
  const device = getPreloaderDevice(isMobile);
  const cookieName = getPreloaderCookieName(device);
  const cookieDomain = getPreloaderCookieDomain(request.nextUrl.hostname);
  const expectedSignature = getPreloaderSignature(device);
  const cookieValue = request.cookies.get(cookieName)?.value;
  const shouldShowPreloader = !isValidPreloaderCookie(cookieValue, device);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(
    PRELOADER_DECISION_HEADER,
    shouldShowPreloader ? "show" : "skip",
  );
  requestHeaders.set(PRELOADER_DEVICE_HEADER, device);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (shouldShowPreloader) {
    response.cookies.set({
      name: cookieName,
      value: expectedSignature,
      domain: cookieDomain ?? undefined,
      maxAge: PRELOADER_COOKIE_MAX_AGE_SECONDS,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

export const config = {
  matcher: ["/"],
};
