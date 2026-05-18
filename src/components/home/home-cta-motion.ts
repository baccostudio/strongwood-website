export const CTA_SEQUENCE_STAGGER_STEP = 0.065;
export const CTA_SEQUENCE_TRANSIT_DURATION = 0.38;
export const CTA_GALLERY_SCALE_PROGRESS = [0.58, 0.8, 1];
export const CTA_ENTRY_STAGGER_DELAY_SECONDS = 0.06;
export const CTA_ENTRY_TRANSIT_DURATION_SECONDS = 0.78;
export const CTA_GALLERY_ENTRY_DURATION_SECONDS = 1.18;
export const CTA_GALLERY_ENTRY_DELAY_SECONDS = 0.14;
export const CTA_ENTRY_EASE = [0.16, 1, 0.3, 1] as const;
export const CTA_MOBILE_GALLERY_SCALE = 1.08;

export const CTA_SCROLL_SPRING = {
  stiffness: 110,
  damping: 28,
  mass: 0.35,
};

export const CTA_MOBILE_SCROLL_SPRING = {
  stiffness: 150,
  damping: 28,
  mass: 0.24,
};

export const CTA_COMPLETION_THRESHOLD = 0.995;
