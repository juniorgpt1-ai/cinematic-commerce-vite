import { memo, useEffect, useRef, useState } from "react";
import { Timer, ShieldCheck, Sparkles, Gift } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

const CountUpStat = memo(function CountUpStat({ target }: { target: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.unobserve(el);
        const duration = 900;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setValue(Math.round(easeOutQuart(progress) * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{value}</span>;
});

const TRUST_ITEMS = [
  {
    icon: Timer,
    title: "Entrega em 60 Minutos",
    desc: "Disponível para BH e região metropolitana via Uber Flash com máxima agilidade.",
    stat: 60,
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
          <span className="inline-flex items-center gap-3 font-sans text-base tracking-[0.30em] uppercase text-luxe-gold-deep font-semibold [text-shadow:0_1px_3px_rgba(0,0,0,0.25)]">
            <span className="h-px w-8 bg-luxe-gold/40" />
            Por que escolher a S&C Beauty
            <span className="h-px w-8 bg-luxe-gold/40" />
          </span>
          <h2 className="mt-6 md:mt-8 font-section text-5xl md:text-5xl font-semibold leading-[1.05] [text-shadow:0_2px_8px_rgba(0,0,0,0.3)]">
            Confiança e Luxo em{" "}
            <span className="italic font-light">Cada</span> Detalhe
          </h2>
          <span className="gold-rule mt-8 md:mt-10 mx-auto" />
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
                      <span className="stat-rise font-display text-5xl md:text-6xl text-luxe-gold font-bold leading-none tabular-nums [text-shadow:0_2px_12px_rgba(201,168,76,0.25)]">
                        <CountUpStat target={it.stat} />
                      </span>
                      <span className="stat-rise font-sans text-xl text-luxe-gold font-light [text-shadow:0_1px_6px_rgba(201,168,76,0.2)]">
                        {it.statUnit}
                      </span>
                    </div>
                    <h3 className="mt-4 font-sans text-xl md:text-xl font-semibold [text-shadow:0_1px_4px_rgba(0,0,0,0.2)]">{it.title}</h3>
                  </>
                ) : (
                  // Without stat
                  <h3 className="font-sans text-xl font-semibold [text-shadow:0_1px_4px_rgba(0,0,0,0.2)]">{it.title}</h3>
                )}
                <p className="mt-3 text-luxe-ink/95 font-sans font-normal text-base leading-relaxed max-w-[280px]">
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
