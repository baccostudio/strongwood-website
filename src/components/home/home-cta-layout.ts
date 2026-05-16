export const HOME_CTA_ANIMATION_SPAN_VH = 250;
export const HOME_CTA_DESKTOP_EXTRA_SCROLL_VH = 65;
export const HOME_CTA_MOBILE_EXTRA_SCROLL_VH = 16;

export function getHomeCtaSectionHeightVh(isMobile: boolean) {
  return HOME_CTA_ANIMATION_SPAN_VH
    + (isMobile ? HOME_CTA_MOBILE_EXTRA_SCROLL_VH : HOME_CTA_DESKTOP_EXTRA_SCROLL_VH);
}
