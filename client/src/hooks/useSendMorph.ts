import { useCallback, useEffect, useRef, useState } from "react";

export type SendMorphPhase = "idle" | "sending" | "sent";

/**
 * Drives the message → send → check icon morph on WhatsApp CTAs.
 * Never blocks or delays navigation — the enclosing <a target="_blank">
 * still fires natively; this only layers a concurrent visual acknowledgment
 * of the click on the page left behind.
 */
export function useSendMorph() {
  const [phase, setPhase] = useState<SendMorphPhase>("idle");
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const trigger = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    setPhase("sending");
    timeoutsRef.current = [
      setTimeout(() => setPhase("sent"), 220),
      setTimeout(() => setPhase("idle"), 700),
    ];
  }, []);

  return { phase, trigger };
}
