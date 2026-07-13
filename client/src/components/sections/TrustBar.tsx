import { memo } from "react";
import { motion } from "framer-motion";
import { Timer, ShieldCheck, Sparkles, Gift } from "lucide-react";
import { useFadeUp } from "@/hooks/useFadeUp";

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
  const fade = useFadeUp();
  return (
    <section className="relative border-y border-luxe-gold/20 bg-luxe-gradient overflow-hidden">
      {/* Ambient light accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-luxe-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-luxe-gold/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-36 relative z-10">
        {/* Section label */}
        <motion.div {...fade} className="text-center mb-14 md:mb-20">
          <span className="inline-flex items-center gap-3 font-sans text-sm sm:text-base tracking-[0.28em] uppercase text-luxe-gold-deep font-semibold">
            <span className="h-px w-8 bg-luxe-gold/40" />
            Por que escolher a Maison
            <span className="h-px w-8 bg-luxe-gold/40" />
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {TRUST_ITEMS.map((it, i) => (
            <motion.div
              key={it.title}
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center p-7 md:p-8 rounded-2xl bg-white/60 border border-luxe-gold/10 hover:border-luxe-gold/30 hover:bg-white/90 hover:shadow-[0_8px_40px_-12px_rgba(154,123,80,0.15)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group"
            >
              {/* Icon in a golden pill */}
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 + 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-luxe-gold/10 group-hover:bg-luxe-gold/20 transition-colors duration-500"
              >
                <it.icon
                  className="size-7 text-luxe-gold group-hover:text-luxe-gold-deep transition-colors duration-500"
                  strokeWidth={1.5}
                />
                {/* Subtle ring on hover */}
                <div className="absolute inset-0 rounded-2xl border border-luxe-gold/20 group-hover:border-luxe-gold/40 group-hover:scale-110 transition-all duration-500" />
              </motion.div>

              {/* Stat */}
              {it.stat && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-baseline gap-1 mb-2"
                >
                  <span
                    className="text-[4.2rem] sm:text-[5rem] leading-none text-luxe-gold"
                    style={{ fontFamily: '"Lora", serif', fontWeight: 400 }}
                  >
                    {it.stat}
                  </span>
                  <span className="font-sans text-sm tracking-[0.24em] uppercase text-luxe-gold-deep font-semibold">
                    {it.statUnit}
                  </span>
                </motion.div>
              )}

              {/* Gold rule */}
              <span className="block h-px w-10 bg-luxe-gold/40 group-hover:w-16 group-hover:bg-luxe-gold/70 transition-all duration-500 mb-4" />

              {/* Title */}
              <h3 className="font-section text-2xl sm:text-3xl leading-tight font-semibold tracking-wide text-luxe-ink">
                {it.stat ? (
                  <>
                    Entrega em{" "}
                    <span style={{ fontFamily: '"Lora", serif', fontWeight: 400 }}>
                      60
                    </span>{" "}
                    Minutos
                  </>
                ) : (
                  it.title
                )}
              </h3>

              {/* Description */}
              <p className="mt-3 text-base md:text-lg text-luxe-ink/70 leading-relaxed font-sans font-light max-w-[30ch]">
                {it.desc}
              </p>

              {/* Animated accent dot — only visible on hover */}
              <div className="mt-5 h-1 w-1 rounded-full bg-luxe-gold/0 group-hover:bg-luxe-gold/60 transition-all duration-700 group-hover:shadow-[0_0_12px_rgba(154,123,80,0.5)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default TrustBar;
