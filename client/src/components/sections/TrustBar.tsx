import { memo } from "react";
import { motion } from "framer-motion";
import { Timer, ShieldCheck, Sparkles, Gift } from "lucide-react";
import { useFadeUp } from "@/hooks/useFadeUp";

const TrustBar = memo(function TrustBar() {
  const items = [
    {
      icon: Timer,
      title: "Entrega em 60 Minutos",
      desc: "Disponível para BH e região metropolitana via Uber Flash com máxima agilidade.",
    },
    {
      icon: ShieldCheck,
      title: "Genuínos",
      desc: "Produtos originais direto de distribuidores autorizados com nota fiscal garantida.",
    },
    {
      icon: Sparkles,
      title: "Consultoria Exclusiva",
      desc: "Especialista olfativo e capilar dedicado no WhatsApp para guiar sua escolha.",
    },
    {
      icon: Gift,
      title: "Toque de Luxo Gratuito",
      desc: "Todos os pedidos acompanham nossa embalagem premium.",
    },
  ];
  const fade = useFadeUp();
  return (
    <section className="relative border-y border-luxe-line/60 bg-luxe-gradient">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.08 }}
              className="flex flex-col gap-4 relative group"
            >
              <it.icon className="size-7 text-luxe-gold group-hover:scale-110 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" strokeWidth={1.4} />
              <span className="gold-rule" />
              <h3 className="font-section text-[26px] md:text-3xl leading-tight font-semibold tracking-wide break-words">{it.title}</h3>
              <p className="text-[17px] md:text-base text-luxe-ink/85 leading-relaxed font-sans font-light">
                {it.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default TrustBar;
