import { memo, useEffect, useRef, useState, useCallback } from "react";
import { waLink } from "@/lib/whatsapp";
import SendMorphIcon from "@/components/sections/SendMorphIcon";
import { useSendMorph } from "@/hooks/useSendMorph";

const EXPAND_DELAY = 8000;   // ms até expandir automaticamente
const VISIBLE_DURATION = 3000; // ms que fica aberto
const SCROLL_COOLDOWN = 600;   // ms de espera após scroll parar

const WhatsappFloating = memo(function WhatsappFloating() {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const clickedRef = useRef(false);
  const expandTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isScrollingRef = useRef(false);
  const { phase: sendPhase, trigger: triggerSend } = useSendMorph();

  // ── Listen for reduced motion changes ──
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const scheduleExpand = useCallback(() => {
    if (clickedRef.current || reducedMotion) return;
    clearTimeout(expandTimerRef.current);
    expandTimerRef.current = setTimeout(() => {
      if (isScrollingRef.current) {
        // Scroll ainda rolando — agenda de novo
        scheduleExpand();
        return;
      }
      setExpanded(true);
      collapseTimerRef.current = setTimeout(() => setExpanded(false), VISIBLE_DURATION);
    }, EXPAND_DELAY);
  }, [reducedMotion]);

  // ── Auto-expand on mount ──
  useEffect(() => {
    scheduleExpand();
    return () => {
      clearTimeout(expandTimerRef.current);
      clearTimeout(collapseTimerRef.current);
      clearTimeout(scrollTimerRef.current);
    };
  }, [scheduleExpand]);

  // ── Scroll detection ──
  useEffect(() => {
    if (reducedMotion) return;

    const onScroll = () => {
      isScrollingRef.current = true;
      clearTimeout(scrollTimerRef.current);
      clearTimeout(expandTimerRef.current);

      // Se estava expandido durante scroll rápido, recolhe
      setExpanded(false);

      scrollTimerRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        // Agenda nova expansão após scroll parar
        if (!clickedRef.current) {
          expandTimerRef.current = setTimeout(() => {
            setExpanded(true);
            collapseTimerRef.current = setTimeout(() => setExpanded(false), VISIBLE_DURATION);
          }, EXPAND_DELAY);
        }
      }, SCROLL_COOLDOWN);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimerRef.current);
    };
  }, [reducedMotion]);

  const handleClick = useCallback(() => {
    clickedRef.current = true;
    clearTimeout(expandTimerRef.current);
    clearTimeout(collapseTimerRef.current);
    setExpanded(false);
    triggerSend();
  }, [triggerSend]);

  return (
    <a
      href={waLink("Olá! Gostaria de ajuda para escolher um produto.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fazer meu pedido pelo WhatsApp"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] right-6 z-40 btn-hover-scale inline-flex items-center bg-whatsapp hover:bg-whatsapp-hover text-white rounded-full py-3.5 pl-3.5 pr-3.5 cursor-pointer backdrop-blur-sm overflow-hidden transition-[padding-right] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      <SendMorphIcon phase={sendPhase} className="size-5 shrink-0" />
      <span
        className={`whitespace-nowrap text-[13px] font-semibold tracking-wide transition-[max-width,opacity,margin] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          expanded || hovered ? "max-w-[160px] opacity-100 ml-2.5 mr-1" : "max-w-0 opacity-0 ml-0 duration-300"
        }`}
      >
        Fazer meu pedido <img src="/msg.svg" alt="" className="size-5 shrink-0 inline align-middle" />
      </span>
    </a>
  );
});

export default WhatsappFloating;

