import { memo } from "react";
import { motion } from "framer-motion";
import { Timer, ArrowRight } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { useFadeUp } from "@/hooks/useFadeUp";

const KitsGrid = memo(function KitsGrid() {
  const fade = useFadeUp();
  const kits = [
    {
      name: "Kit Ele Elegante",
      desc: "Malbec Cologne + sabonete líquido perfumado + necessaire em couro sintético. Indulgência inteligente.",
      price: "R$ 379,90",
      msg: "Quero o Kit Ele Elegante (Malbec + necessaire).",
      tag: "Best Seller"
    },
    {
      name: "Kit Ela Sublime",
      desc: "Lily Eau de Parfum + creme acetinado hidratante corporal + caixa rígida premium. Luxo inteligente.",
      price: "R$ 429,90",
      msg: "Quero o Kit Ela Sublime (Lily + creme acetinado).",
      tag: "Mais Vendido"
    },
    {
      name: "Combo Casal Real",
      desc: "Malbec Cologne + Lily Eau de Parfum. A união perfeita de duas assinaturas marcantes e inesquecíveis.",
      price: "R$ 619,90",
      msg: "Quero o Combo Casal Real (Malbec + Lily).",
      tag: "Melhor Preço"
    },
  ];
  return (
    <section id="kits" className="bg-luxe-dark-gradient text-white relative overflow-hidden">

      <div className="mx-auto max-w-7xl px-6 py-32 md:py-40 relative z-10">
        <motion.div {...fade} className="max-w-2xl mb-16">
          <span className="eyebrow text-luxe-gold-soft">Curadoria de Presentes</span>
          <h2 className="mt-5 font-section text-5xl md:text-5xl font-semibold leading-[1.08]">
            Kits & Combos Inteligentes
          </h2>
          <p className="mt-6 text-white/60 text-lg font-sans font-light leading-relaxed max-w-xl">
            Combinações desenvolvidas por especialistas para presentear com sofisticação ou reabastecer seu estoque de luxo com o melhor custo-benefício.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-luxe-gold/20">
          {kits.map((k, i) => (
            <motion.div
              key={k.name}
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.1 }}
              className="bg-luxe-ink p-10 flex flex-col justify-between group hover:bg-[#0d0d0d] transition-colors duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] tracking-[0.32em] uppercase text-luxe-gold-soft font-semibold">
                    COMBO 0{i + 1}
                  </span>
                  <span className="text-[9px] font-bold text-luxe-gold-soft uppercase tracking-wider border border-luxe-gold-soft/30 bg-luxe-gold/10 px-2 py-0.5 rounded-sm">
                    {k.tag}
                  </span>
                </div>

                <h3 className="mt-12 font-sans text-2xl font-bold group-hover:text-luxe-gold-soft transition-colors">{k.name}</h3>
                <span className="gold-rule mt-6" />
                <p className="mt-8 text-white/70 font-sans font-light leading-relaxed">
                  {k.desc}
                </p>
              </div>

              <div>
                <div className="mt-8 inline-flex flex-wrap items-center gap-2 border border-luxe-gold-soft/40 bg-luxe-gold/5 px-3 py-1.5 self-start rounded-xs max-w-full">
                  <Timer className="size-3.5 text-luxe-gold-soft" />
                  <span className="text-[10px] tracking-[0.28em] uppercase text-luxe-gold-soft font-semibold">
                    Entrega VIP em até 1h · BH
                  </span>
                </div>

                <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <div className="font-sans text-3xl font-bold text-luxe-gold-soft">{k.price}</div>
                    <div className="mt-1 text-[12px] text-white/60">
                      6x sem juros <span className="text-luxe-gold-soft">·</span> Pix 5% OFF
                    </div>
                  </div>
                  <a
                    href={waLink(k.msg)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Pedir ${k.name} no WhatsApp`}
                    className="inline-flex flex-wrap items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-luxe-gold-soft border-b border-luxe-gold-soft/60 pb-1 group-hover:text-luxe-gold-soft group-hover:border-luxe-gold-soft transition-colors"
                  >
                    Pedir Combo <ArrowRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default KitsGrid;
