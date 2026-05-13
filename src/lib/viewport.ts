function resolveViewportDimension(
  candidates: Array<number | undefined>,
  fallbackValue: number,
): number {
  const resolvedValue = candidates.find(
    (value): value is number => typeof value === "number" && Number.isFinite(value) && value > 0,
  );

  return Math.floor(resolvedValue ?? fallbackValue);
}

export function resolveViewportWidth(
  target: Window,
  fallbackWidth = target.innerWidth,
): number {
  return resolveViewportDimension(
    [
      target.visualViewport?.width,
      target.document.documentElement.clientWidth,
      target.innerWidth,
    ],
    fallbackWidth,
  );
}

export function resolveViewportHeight(
  target: Window,
  fallbackHeight = target.innerHeight,
): number {
  return resolveViewportDimension(
    [
      target.visualViewport?.height,
      target.document.documentElement.clientHeight,
      target.innerHeight,
    ],
    fallbackHeight,
  );
}
