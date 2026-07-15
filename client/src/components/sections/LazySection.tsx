import { useState, useRef, useEffect, memo } from "react";

const LazySection = memo(function LazySection({
  children,
  minHeight = 400,
}: {
  children: React.ReactNode;
  /** Reserved space (px) before the section mounts, to avoid a layout shift when it pops in. */
  minHeight?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "800px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
});

export default LazySection;
