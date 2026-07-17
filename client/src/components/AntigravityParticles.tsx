import { memo, useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  size: number; // pixels
  type: "bead" | "drop" | "spark";
  parallaxFactor: number;
  floatDuration: number;
  delay: number;
}

function bgStyleFor(type: Particle["type"]) {
  if (type === "bead") {
    return "bg-gradient-to-tr from-luxe-gold/30 to-luxe-gold-soft/60 backdrop-blur-[1px] shadow-[0_0_12px_rgba(197,168,92,0.4)] border border-luxe-gold-soft/30 rounded-full";
  }
  if (type === "drop") {
    return "bg-gradient-to-tr from-white/10 to-white/40 backdrop-blur-[2px] shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.4),2px_2px_10px_rgba(0,0,0,0.06)] border border-white/50 rounded-full";
  }
  return "bg-luxe-gold-soft/50 rotate-45 rounded-xs shadow-[0_0_10px_rgba(223,200,138,0.6)]";
}

const ParticleElement = memo(function ParticleElement({ p }: { p: Particle }) {
  return (
    <div
      data-parallax={p.parallaxFactor}
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.size,
        height: p.size,
        ["--particle-duration" as string]: `${p.floatDuration}s`,
        ["--particle-delay" as string]: `${p.delay}s`,
      }}
      className={`absolute animate-particle-float will-change-transform ${bgStyleFor(p.type)}`}
    />
  );
});

export function AntigravityParticles() {
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const [particles] = useState<Particle[]>(() => {
    const types: ("bead" | "drop" | "spark")[] = ["bead", "drop", "spark"];
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 16 + 8,
      type: types[Math.floor(Math.random() * types.length)],
      parallaxFactor: Math.random() * 50 - 25,
      floatDuration: Math.random() * 12 + 10,
      delay: Math.random() * -10,
    }));
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;

    const applyParallax = () => {
      rafId = 0;
      container.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const factor = Number(el.dataset.parallax);
        el.style.setProperty("--particle-px", `${targetX * factor * 4}px`);
        el.style.setProperty("--particle-py", `${targetY * factor * 4}px`);
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = e.clientX / innerWidth - 0.5;
      targetY = e.clientY / innerHeight - 0.5;
      if (!rafId) rafId = requestAnimationFrame(applyParallax);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <ParticleElement key={p.id} p={p} />
      ))}
    </div>
  );
}
