import { memo, useEffect, useRef, useState } from "react";
import { waLink } from "@/lib/whatsapp";
import SendMorphIcon from "@/components/sections/SendMorphIcon";
import { useSendMorph } from "@/hooks/useSendMorph";

/* ── Configurável ── */
const EXPAND_DELAY = 8000;      // tempo fechado (bolinha) entre expansões
const VISIBLE_DURATION = 3500;  // tempo que fica expandido mostrando o texto

const WhatsappFloating = memo(function WhatsappFloating() {
  const [expanded, setExpanded] = useState(false);
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const { phase: sendPhase, trigger: triggerSend } = useSendMorph();
  const mountedRef = useRef(true);

  // ── Ciclo: bolinha → expande → bolinha → repete ──
  useEffect(() => {
    if (reducedMotion) return;

    let expandTimer: ReturnType<typeof setTimeout>;
    let collapseTimer: ReturnType<typeof setTimeout>;

    const runCycle = () => {
      expandTimer = setTimeout(() => {
        if (!mountedRef.current) return;
        setExpanded(true);
        collapseTimer = setTimeout(() => {
          if (!mountedRef.current) return;
          setExpanded(false);
          runCycle();
        }, VISIBLE_DURATION);
      }, EXPAND_DELAY);
    };

    runCycle();

    return () => {
      mountedRef.current = false;
      clearTimeout(expandTimer);
      clearTimeout(collapseTimer);
    };
  }, [reducedMotion]);

  return (
    <a
      href={waLink("Olá! Gostaria de ajuda para escolher um produto.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fazer meu pedido pelo WhatsApp"
      onClick={triggerSend}
      className="group fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] right-6 z-40 btn-hover-scale btn-breathe [--btn-breathe-rest:#25d366] [--btn-breathe-peak:#2ecc71] inline-flex items-center bg-whatsapp hover:bg-whatsapp-hover text-white rounded-full py-3.5 pl-3.5 pr-3.5 cursor-pointer backdrop-blur-sm overflow-hidden transition-[padding-right] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      <SendMorphIcon phase={sendPhase} className="size-5 shrink-0" />
      <span
        className={`whitespace-nowrap text-[13px] font-semibold tracking-wide transition-[max-width,opacity,margin] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          expanded ? "max-w-[160px] opacity-100 ml-2.5 mr-1" : "max-w-0 opacity-0 ml-0 mr-0"
        }`}
      >
        Fazer meu pedido <img src="/msg.svg" alt="" className="size-5 shrink-0 inline align-middle" />
      </span>
    </a>
  );
});

export default WhatsappFloating;
