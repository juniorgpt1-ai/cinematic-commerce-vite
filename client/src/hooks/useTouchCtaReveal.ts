import { useEffect, useRef, useCallback } from "react";

/**
 * Touch-only one-shot CTA reveal animation.
 *
 * On desktop, hover already provides interactive feedback.
 * On touch devices (no hover), this hook triggers a single
 * subtle animation when ~65% of the button scrolls into view,
 * replicating the hover-to-green transition as a one-shot.
 *
 * Respects prefers-reduced-motion — skips entirely if active.
 * Waits for scroll to stabilize before firing.
 * Never repeats during the same session.
 *
 * @param glowClass - Optional override for the "active" state class.
 *   Default: "!bg-whatsapp !text-black" (for dark bg buttons).
 *   Pass "" to skip background change (for gold/gradient buttons).
 */

const SCROLL_DEBOUNCE = 200; // ms to wait after scroll stops

export function useTouchCtaReveal(glowClass = "!bg-whatsapp !text-black") {
  const ref = useRef<HTMLAnchorElement>(null);
  const firedRef = useRef(false);
  const scrollTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const isTouchDevice = useRef(
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );

  const prefersReduced = useRef(
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const fire = useCallback((el: HTMLAnchorElement) => {
    if (firedRef.current) return;
    firedRef.current = true;

    // Phase 1: transition to active state (350ms)
    if (glowClass) el.classList.add(...glowClass.split(" "));
    el.style.transform = "scale(1.025)";
    el.style.boxShadow = "0 8px 28px rgba(37,211,102,0.25)";

    // Phase 2: return to normal (420ms)
    setTimeout(() => {
      if (glowClass) el.classList.remove(...glowClass.split(" "));
      el.style.transform = "";
      el.style.boxShadow = "";
    }, 380);
  }, [glowClass]);

  useEffect(() => {
    if (!isTouchDevice.current || prefersReduced.current) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        // Wait for scroll to settle
        clearTimeout(scrollTimer.current);
        scrollTimer.current = setTimeout(() => {
          fire(el);
          observer.disconnect();
        }, SCROLL_DEBOUNCE);
      },
      { threshold: 0.65 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(scrollTimer.current);
    };
  }, [fire]);

  return ref;
}
