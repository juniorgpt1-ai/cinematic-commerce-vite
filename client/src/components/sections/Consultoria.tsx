import { memo } from "react";
import { Sparkles } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSendMorph } from "@/hooks/useSendMorph";
import FloatingBadge from "@/components/sections/FloatingBadge";
import SendMorphIcon from "@/components/sections/SendMorphIcon";

const Consultoria = memo(function Consultoria({ image }: { image: string }) {
  const imageRef = useScrollReveal();
  const copyRef = useScrollReveal();
  const { phase: sendPhase, trigger: triggerSend } = useSendMorph();

  return (
    <section className="bg-luxe-gradient border-b border-luxe-line/20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
          <div ref={imageRef} className="reveal-scale lg:col-span-6 relative">
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl border border-luxe-line/30">
              <img
                src={image}
                alt="Consultora premium sorrindo, atendimento personalizado e humanizado"
                loading="lazy"
                width="600"
                height="704"
                className="h-full w-full object-cover animate-bg-slow-zoom"
              />
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
            <h2 className="font-section text-4xl md:text-5xl font-semibold leading-[1.1]">
              Não decida sozinho.
              <br />
              <span className="font-light italic text-luxe-gold">Escolha com quem entende.</span>
            </h2>
            <p className="mt-8 text-lg text-luxe-ink/97 font-sans font-normal leading-relaxed max-w-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              Evite frustrações ao comprar no escuro. Nossa consultoria ajuda você a selecionar a fragrância e o tratamento capilar sob medida para sua necessidade, com honestidade e empatia.
            </p>
            <ul className="mt-8 space-y-4 text-luxe-ink/97 font-sans font-normal">
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
              rel="noopener noreferrer"
              onClick={triggerSend}
              className="mt-10 inline-flex flex-wrap items-center justify-center gap-3 bg-luxe-ink hover:bg-whatsapp hover:text-black text-white btn-hover-scale btn-breathe [--btn-breathe-rest:#0a0a0a] [--btn-breathe-peak:#25d366] px-6 py-4 md:px-8 md:py-5 text-sm font-semibold tracking-wide shadow-md"
            >
              <SendMorphIcon phase={sendPhase} className="size-4" />
              Falar com a Consultora
              <img src="/msg.svg" alt="" className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Consultoria;
