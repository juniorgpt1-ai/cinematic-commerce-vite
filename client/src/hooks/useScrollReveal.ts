import { useEffect, useRef } from "react";

/**
 * Scroll-driven CSS reveal — Intersection Observer adds `.visible`
 * to trigger CSS `@keyframes` defined in index.css.
 *
 * Pair with classes: `reveal-up`, `reveal-right`, `reveal-scale`
 * Optional stagger via CSS child selectors on a shared container.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(margin = "-60px") {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: `0px 0px ${margin} 0px` },
    );

    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
