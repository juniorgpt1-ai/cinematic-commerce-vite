import { memo } from "react";
import { Timer, ArrowRight } from "lucide-react";
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
        <img src={heroImage} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" width="1075" height="1463" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxe-ink via-luxe-ink/85 to-luxe-ink/70" />
      </div>

      <div ref={sectionRef} className="reveal-up relative mx-auto max-w-4xl px-6 text-center z-10">
          <div className="mb-8">
            <FloatingBadge className="border-luxe-gold/50 bg-black/90 shadow-xl shadow-black/50 ring-1 ring-white/5">
              <Timer className="size-3.5 text-luxe-gold" />
              <span className="text-[12px] tracking-[0.32em] uppercase text-luxe-gold font-semibold">
                Última saída VIP do dia às 21h
              </span>
            </FloatingBadge>
          </div>

          <h2 className="mt-8 font-section text-5xl md:text-7xl font-semibold leading-[1.05]">
            Catálogo completo à sua disposição.
          </h2>
          <p className="mt-8 text-white/70 text-lg font-sans font-light max-w-xl mx-auto leading-relaxed">
            Temos acesso ao catálogo completo do Grupo Boticário. Fale com a gente e encontramos para você.
          </p>

          <div className="mt-12">
            <a
              ref={ctaRef}
              href={waLink("Olá! Gostaria de ajuda para encontrar um produto específico.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={triggerSend}
              className="cta-emphasize wa-pulse inline-flex flex-wrap items-center justify-center gap-3 bg-whatsapp hover:bg-whatsapp-hover text-white font-bold px-5 py-4 md:px-10 md:py-5 text-base md:text-lg tracking-wider uppercase rounded-sm btn-hover-scale wa-glow"
            >
              <SendMorphIcon phase={sendPhase} className="size-6" strokeWidth={2.4} />
              Falar no WhatsApp
              <ArrowRight className="size-5" strokeWidth={2.4} />
            </a>
          </div>
      </div>
    </section>
  );
});

export default CtaFinal;
