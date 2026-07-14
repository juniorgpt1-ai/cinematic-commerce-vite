import { memo } from "react";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import FloatingBadge from "@/components/sections/FloatingBadge";

const Consultoria = memo(function Consultoria({ image, imageMob }: { image: string; imageMob?: string }) {
  const imageRef = useScrollReveal();
  const copyRef = useScrollReveal();

  return (
    <section className="bg-luxe-gradient border-b border-luxe-line/20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-32 md:py-40 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          <div ref={imageRef} className="reveal-scale lg:col-span-6 relative">
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl border border-luxe-line/30">
              <picture>
                {imageMob && (
                  <source srcSet={imageMob} media="(max-width: 767px)" />
                )}
                <img
                  src={image}
                  alt="Consultora premium sorrindo, atendimento personalizado e humanizado"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </picture>
              <div className="absolute inset-0 border border-luxe-gold/30 pointer-events-none m-4" />
            </div>

            {/* Absolute Floating Badges */}
            <div className="absolute top-6 left-6 z-20">
              <FloatingBadge className="shadow-lg bg-black/85 border-luxe-gold-soft/40">
                <Sparkles className="size-3.5 text-luxe-gold" />
                <span className="text-[14px] tracking-wider uppercase font-bold text-luxe-gold-soft">Atendimento VIP</span>
              </FloatingBadge>
            </div>
          </div>

          <div ref={copyRef} className="reveal-up lg:col-span-6">
            <span className="eyebrow">Atendimento Humanizado</span>
            <h2 className="mt-6 font-section text-5xl md:text-5xl font-semibold leading-[1.08]">
              Escolha Inteligente Sem Complicações
            </h2>
            <span className="gold-rule mt-8" />
            <p className="mt-8 text-lg text-luxe-ink/85 font-sans font-light leading-relaxed max-w-lg">
              Evite frustrações ao comprar no escuro. Nossa consultoria de luxo inteligente ajuda você a selecionar a fragrância e o tratamento capilar sob medida para sua necessidade, com honestidade e empatia.
            </p>
            <ul className="mt-8 space-y-4 text-luxe-ink/85 font-sans font-light">
              <li className="flex items-start gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 bg-luxe-gold rounded-full shrink-0" />
                <span>Perfil de fragrância ou capilar personalizado em poucas mensagens.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 bg-luxe-gold rounded-full shrink-0" />
                <span>Alternativas sofisticadas com o melhor custo-benefício de mercado.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 bg-luxe-gold rounded-full shrink-0" />
                <span>Zero scripts de vendas robóticos — contato de humano para humano.</span>
              </li>
            </ul>
            <a
              href={waLink("Olá, quero falar com a consultora premium para fazer minha seleção personalizada.")}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex flex-wrap items-center justify-center gap-3 bg-luxe-ink hover:bg-whatsapp hover:text-black text-white btn-hover-scale px-6 py-4 md:px-8 md:py-5 text-sm font-semibold tracking-wide shadow-md"
            >
              <MessageCircle className="size-4" />
              Falar com a Consultora
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Consultoria;
