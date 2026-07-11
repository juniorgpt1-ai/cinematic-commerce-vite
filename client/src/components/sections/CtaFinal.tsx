import { memo } from "react";
import { motion } from "framer-motion";
import { Timer, MessageCircle, ArrowRight } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { useFadeUp } from "@/hooks/useFadeUp";
import FloatingBadge from "@/components/sections/FloatingBadge";

const CtaFinal = memo(function CtaFinal({ heroImage }: { heroImage: string }) {
  const fade = useFadeUp();
  return (
    <section className="relative bg-luxe-ink text-white overflow-hidden py-32 md:py-40">

      <div className="absolute inset-0 opacity-20">
        <picture>
          <source srcSet="/malbecSMOB.webp" media="(max-width: 767px)" />
          <img src={heroImage} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-luxe-ink via-luxe-ink/80 to-luxe-ink/65" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center z-10">
        <motion.div {...fade}>
          <div className="mb-8">
            <FloatingBadge className="border-luxe-gold-soft/30 bg-black/85">
              <Timer className="size-3.5 text-luxe-gold-soft" />
              <span className="text-[12px] tracking-[0.32em] uppercase text-luxe-gold-soft font-semibold">
                Última saída VIP do dia às 21h
              </span>
            </FloatingBadge>
          </div>

          <h2 className="mt-8 font-section text-5xl md:text-7xl font-semibold leading-[1.05]">
            O Melhor do Grupo Boticário,
            <br />
            <span className="font-light italic text-luxe-gold-soft">Chegando Rápido Até Você.</span>
          </h2>
          <p className="mt-8 text-white/70 text-lg font-sans font-light max-w-xl mx-auto leading-relaxed">
            Nossos combos exclusivos têm estoque limitado. Fale com nosso atendimento agora mesmo e receba seus produtos preferidos com embalagem de luxo inclusa hoje em BH.
          </p>

          <div className="mt-12">
            <a
              href={waLink("Olá, quero garantir minha seleção de luxo inteligente com entrega expressa hoje.")}
              target="_blank"
              rel="noreferrer"
              className="wa-pulse-strong inline-flex flex-wrap items-center justify-center gap-3 bg-whatsapp hover:bg-whatsapp-hover text-black font-bold px-6 py-4 md:px-12 md:py-6 text-base md:text-xl tracking-wider uppercase rounded-sm transition-all"
            >
              <MessageCircle className="size-6" strokeWidth={2.4} />
              Garantir Combo no WhatsApp
              <ArrowRight className="size-5" strokeWidth={2.4} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default CtaFinal;
