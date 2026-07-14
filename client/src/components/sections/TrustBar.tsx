import { memo } from "react";
import { Timer, ShieldCheck, Sparkles, Gift } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TRUST_ITEMS = [
  {
    icon: Timer,
    title: "Entrega em 60 Minutos",
    desc: "Disponível para BH e região metropolitana via Uber Flash com máxima agilidade.",
    stat: "60",
    statUnit: "min",
    accent: "gold",
  },
  {
    icon: ShieldCheck,
    title: "Genuínos",
    desc: "Produtos originais direto de distribuidores autorizados com nota fiscal garantida.",
    accent: "gold",
  },
  {
    icon: Sparkles,
    title: "Consultoria Exclusiva",
    desc: "Especialista olfativo e capilar dedicado no WhatsApp para guiar sua escolha.",
    accent: "gold",
  },
  {
    icon: Gift,
    title: "Toque de Luxo Gratuito",
    desc: "Todos os pedidos acompanham nossa embalagem premium.",
    accent: "gold",
  },
];

const TrustBar = memo(function TrustBar() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section className="relative border-y border-luxe-gold/20 bg-luxe-gradient overflow-hidden">
      {/* Ambient light accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-luxe-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-luxe-gold/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-36 relative z-10">
        {/* Section label */}
        <div ref={headerRef} className="reveal-up text-center mb-14 md:mb-20">
          <span className="inline-flex items-center gap-3 font-sans text-sm sm:text-base tracking-[0.28em] uppercase text-luxe-gold-deep font-semibold">
            <span className="h-px w-8 bg-luxe-gold/40" />
            Por que escolher a Maison
            <span className="h-px w-8 bg-luxe-gold/40" />
          </span>
          <h2 className="mt-12 md:mt-16 font-section text-5xl md:text-6xl font-semibold leading-[1.05]">
            Confiança e Luxo em{" "}
            <span className="italic font-light">Cada</span> Detalhe
          </h2>
          <span className="gold-rule mt-12 md:mt-14 mx-auto" />
        </div>

        <div ref={gridRef} className="stagger-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {TRUST_ITEMS.map((it, i) => {
            const Icon = it.icon;
            return (
              <div
                key={it.title}
                className="reveal-up flex flex-col items-center text-center"
                style={it.stat ? undefined : undefined}
              >
                {/* Icon pill — pop-in animation */}
                <div className="icon-pop-in w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-luxe-gold/10 border border-luxe-gold/30 flex items-center justify-center mb-6 md:mb-8">
                  <Icon className="size-7 sm:size-8 text-luxe-gold" strokeWidth={1.5} />
                </div>

                {it.stat ? (
                  // With stat number
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="stat-rise font-display text-5xl md:text-6xl text-luxe-gold font-bold leading-none">
                        {it.stat}
                      </span>
                      <span className="stat-rise font-sans text-xl text-luxe-gold font-light">
                        {it.statUnit}
                      </span>
                    </div>
                    <h3 className="mt-4 font-sans text-lg md:text-xl font-semibold">{it.title}</h3>
                  </>
                ) : (
                  // Without stat
                  <h3 className="font-sans text-lg md:text-xl font-semibold">{it.title}</h3>
                )}
                <p className="mt-3 text-luxe-ink/85 font-sans font-light text-sm md:text-base leading-relaxed max-w-[240px]">
                  {it.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default TrustBar;
