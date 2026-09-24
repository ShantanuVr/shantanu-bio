import type Lenis from "lenis";

// Lenis lives in SmoothScroll; other components scroll through here so reduced-motion
// visitors (no Lenis) still get a native jump.
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

export function scrollToY(y: number) {
  if (instance) instance.scrollTo(y, { duration: 1.1 });
  else window.scrollTo({ top: y });
}
