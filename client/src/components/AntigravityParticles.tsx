import { memo, useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";

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

const particleAnim = { y: [0, -20, 0], x: [0, 10, 0] };

const ParticleElement = memo(function ParticleElement({ p, smoothMouseX, smoothMouseY }: { p: Particle, smoothMouseX: MotionValue<number>, smoothMouseY: MotionValue<number> }) {
  const xOffset = useTransform(smoothMouseX, (val: number) => val * p.parallaxFactor * 4);
  const yOffset = useTransform(smoothMouseY, (val: number) => val * p.parallaxFactor * 4);

  let bgStyle = "";
  if (p.type === "bead") {
    bgStyle = "bg-gradient-to-tr from-luxe-gold/30 to-luxe-gold-soft/60 backdrop-blur-[1px] shadow-[0_0_12px_rgba(197,168,92,0.4)] border border-luxe-gold-soft/30 rounded-full";
  } else if (p.type === "drop") {
    bgStyle = "bg-gradient-to-tr from-white/10 to-white/40 backdrop-blur-[2px] shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.4),2px_2px_10px_rgba(0,0,0,0.06)] border border-white/50 rounded-full";
  } else {
    bgStyle = "bg-luxe-gold-soft/50 rotate-45 rounded-xs shadow-[0_0_10px_rgba(223,200,138,0.6)]";
  }

  const transition = useMemo(() => ({
    duration: p.floatDuration,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay: p.delay,
  }), [p.floatDuration, p.delay]);

  return (
    <motion.div
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.size,
        height: p.size,
        x: xOffset,
        y: yOffset,
      }}
      animate={particleAnim}
      transition={transition}
      className={`absolute ${bgStyle}`}
    />
  );
});

export function AntigravityParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const types: ("bead" | "drop" | "spark")[] = ["bead", "drop", "spark"];
    const generated: Particle[] = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 16 + 8,
      type: types[Math.floor(Math.random() * types.length)],
      parallaxFactor: Math.random() * 50 - 25,
      floatDuration: Math.random() * 12 + 10,
      delay: Math.random() * -10,
    }));
    setParticles(generated);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) - 0.5);
      mouseY.set((e.clientY / innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <ParticleElement key={p.id} p={p} smoothMouseX={smoothMouseX} smoothMouseY={smoothMouseY} />
      ))}
    </div>
  );
}
