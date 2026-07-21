import { useState, useEffect, useCallback, useRef } from "react";

export interface CarouselAutoplayHandlers {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

/**
 * Shared carousel autoplay logic used by MalbecShowcase and EditorialShowcase.
 *
 * @param slideCount  Number of slides (default 2)
 * @param intervalMs  Autoplay interval in ms (default 4000)
 * @param resumeDelay Pause-on-interaction resume delay in ms (default 6000)
 * @returns { slide, setSlide, selectSlide, autoplayPaused, carouselHandlers }
 */
export function useCarouselAutoplay(
  slideCount = 2,
  intervalMs = 4000,
  resumeDelay = 6000,
  enabled = true,
) {
  const [slide, setSlide] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const nextSlide = useCallback(
    () => setSlide((s) => (s + 1) % slideCount),
    [slideCount],
  );

  // Autoplay interval
  useEffect(() => {
    if (!enabled || autoplayPaused) return;
    const id = setInterval(nextSlide, intervalMs);
    return () => clearInterval(id);
  }, [enabled, nextSlide, autoplayPaused, intervalMs]);

  // Cleanup resume timeout on unmount
  useEffect(() => {
    return () => clearTimeout(resumeTimeoutRef.current);
  }, []);

  const selectSlide = useCallback(
    (i: number) => {
      setSlide(i);
      setAutoplayPaused(true);
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(
        () => setAutoplayPaused(false),
        resumeDelay,
      );
    },
    [resumeDelay],
  );

  const carouselHandlers: CarouselAutoplayHandlers = {
    onMouseEnter: () => setAutoplayPaused(true),
    onMouseLeave: () => setAutoplayPaused(false),
    onFocus: () => setAutoplayPaused(true),
    onBlur: () => setAutoplayPaused(false),
  };

  return { slide, setSlide, selectSlide, autoplayPaused, carouselHandlers };
}
