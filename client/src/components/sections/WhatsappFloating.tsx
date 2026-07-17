import { memo, useEffect, useRef, useState } from "react";
import { waLink } from "@/lib/whatsapp";
import SendMorphIcon from "@/components/sections/SendMorphIcon";
import { useSendMorph } from "@/hooks/useSendMorph";

const WhatsappFloating = memo(function WhatsappFloating() {
  const [showLabel, setShowLabel] = useState(false);
  const triggeredRef = useRef(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { phase: sendPhase, trigger: triggerSend } = useSendMorph();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScroll = () => {
      if (triggeredRef.current) return;
      if (window.scrollY <= window.innerHeight * 0.9) return;
      triggeredRef.current = true;
      window.removeEventListener("scroll", onScroll);
      setShowLabel(true);
      hideTimeoutRef.current = setTimeout(() => setShowLabel(false), 3200);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  return (
    <a
      href={waLink("Olá, vim pela página e quero atendimento de luxo inteligente.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      onClick={triggerSend}
      className="fixed bottom-6 right-6 z-40 wa-pulse btn-hover-scale inline-flex items-center bg-whatsapp hover:bg-whatsapp-hover text-black rounded-full py-3.5 pl-3.5 pr-3.5 cursor-pointer backdrop-blur-sm overflow-hidden"
    >
      <SendMorphIcon phase={sendPhase} className="size-5" />
      <span
        className={`whitespace-nowrap text-[13px] font-semibold tracking-wide transition-[max-width,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          showLabel ? "max-w-[150px] opacity-100 ml-2 mr-0.5" : "max-w-0 opacity-0 ml-0"
        }`}
      >
        Fale com a gente
      </span>
    </a>
  );
});

export default WhatsappFloating;
