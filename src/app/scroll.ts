function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Offset compensation for the fixed navbar (~73px tall). */
const HEADER_OFFSET = 76;

/**
 * Smooth-scroll to a section by element id.
 *
 * This waits for transient scroll-locks (mobile menu, page-loader overlay)
 * to release before scrolling, which is what made section links unreliable
 * on phones: the scroll used to fire while `body { overflow: hidden }` was
 * still applied or while the mobile menu was still collapsing.
 */
export function scrollToHashTarget(id: string, attempt = 0): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const target = document.getElementById(id);
  if (!target) {
    // Target may not be mounted yet (e.g. just navigated back home).
    if (attempt < 25) window.setTimeout(() => scrollToHashTarget(id, attempt + 1), 100);
    return;
  }

  if (document.body.style.overflow === "hidden" && attempt < 30) {
    // Mobile menu or page loader still holds the scroll lock — retry shortly.
    window.setTimeout(() => scrollToHashTarget(id, attempt + 1), 80);
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });

  // One correction pass: on phones, fonts/images popping in can shift layout
  // mid-scroll and leave the section misaligned under the fixed header.
  if (attempt === 0) {
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el || document.body.style.overflow === "hidden") return;
      const rectTop = el.getBoundingClientRect().top;
      if (Math.abs(rectTop - HEADER_OFFSET) > 96) {
        const corrected = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({
          top: Math.max(0, corrected),
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
      }
    }, 650);
  }
}

export function scrollToTopSmooth(): void {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

/**
 * Restore an exact scroll position, retrying while a transient scroll-lock
 * (page-loader overlay) is held. Used when returning home from a case study.
 */
export function scrollToPositionWithRetry(top: number, attempt = 0): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (document.body.style.overflow === "hidden" && attempt < 30) {
    window.setTimeout(() => scrollToPositionWithRetry(top, attempt + 1), 80);
    return;
  }
  window.scrollTo(0, top);
  if (attempt === 0) {
    window.setTimeout(() => {
      if (document.body.style.overflow === "hidden") {
        scrollToPositionWithRetry(top, 1);
        return;
      }
      if (Math.abs(window.scrollY - top) > 48) window.scrollTo(0, top);
    }, 650);
  }
}
