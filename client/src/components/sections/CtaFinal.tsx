import { memo } from "react";
import { Timer } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSendMorph } from "@/hooks/useSendMorph";
import FloatingBadge from "@/components/sections/FloatingBadge";
import SendMorphIcon from "@/components/sections/SendMorphIcon";

const CtaFinal = memo(function CtaFinal({ heroImage }: { heroImage: string }) {
  const sectionRef = useScrollReveal();
  const ctaRef = useScrollReveal<HTMLAnchorElement>();
  const { phase: sendPhase, trigger: triggerSend } = useSendMorph();
  return (
    <section className="relative bg-dark-deeper text-white overflow-hidden py-28 md:py-36">

      <div className="absolute inset-0 opacity-45">
        <img src={heroImage} alt="" className="h-full w-full object-cover animate-bg-slow-zoom" loading="lazy" decoding="async" width="1075" height="1463" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxe-ink via-luxe-ink/85 to-luxe-ink/70" />
      </div>

      <div ref={sectionRef} className="cta-final-content relative mx-auto max-w-4xl px-6 text-center z-10">
          <div className="reveal-up mb-8">
            <FloatingBadge className="border-luxe-gold-soft/50 bg-black/90 shadow-xl shadow-black/50 ring-1 ring-white/5">
              <Timer className="size-4 text-luxe-gold-soft" />
              <span className="text-[13px] tracking-[0.28em] uppercase text-luxe-gold-soft font-bold">
                Última saída VIP do dia às 21h
              </span>
            </FloatingBadge>
          </div>

          <h2 className="reveal-up mt-8 font-section text-5xl md:text-7xl font-semibold leading-[1.05]">
            Catálogo completo à sua disposição.
          </h2>
          <p className="reveal-up mt-8 text-white/82 text-lg font-sans font-normal max-w-xl mx-auto leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
            Temos acesso ao catálogo completo do Grupo Boticário. Fale com a gente e encontramos para você.
          </p>

          <div className="mt-12">
            <a
              ref={ctaRef}
              href={waLink("Olá! Gostaria de ajuda para encontrar um produto específico.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={triggerSend}
              className="btn-breathe [--btn-breathe-rest:#25d366] [--btn-breathe-peak:#2ecc71] inline-flex flex-wrap items-center justify-center gap-3 bg-whatsapp hover:bg-whatsapp-hover text-white font-bold px-5 py-4 md:px-10 md:py-5 text-base md:text-lg tracking-wider uppercase rounded-sm btn-hover-scale"
            >
              <SendMorphIcon phase={sendPhase} className="size-6" strokeWidth={2.4} />
              Falar no WhatsApp
              <img src="/msg.svg" alt="" className="size-6" />
            </a>
          </div>
      </div>
    </section>
  );
});

export default CtaFinal;
