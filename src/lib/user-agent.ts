export function checkIsMobile(userAgent: string): boolean {
  if (!userAgent) {
    return false;
  }

  return /android.+mobile|ip(hone|[oa]d)/i.test(userAgent);
}
