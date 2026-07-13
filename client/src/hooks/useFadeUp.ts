import { useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const fadeUpConfig = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
} as const;

const fadeUpReduced = { ...fadeUpConfig, initial: {} } as const;

export function useFadeUp() {
  const reduce = useReducedMotion();
  return useMemo(() => reduce ? fadeUpReduced : fadeUpConfig, [reduce]);
}
