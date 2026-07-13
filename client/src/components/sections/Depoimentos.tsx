import { memo } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useFadeUp } from "@/hooks/useFadeUp";

const Depoimentos = memo(function Depoimentos() {
  const fade = useFadeUp();
  const items = [
    {
      quote: "Comprei o combo de cauterização e foi a melhor escolha inteligente que fiz. Cabelo de salão sem gastar uma fortuna.",
      name: "Carolina M.",
      meta: "Savassi · BH",
    },
    {
      quote: "Estava em dúvida entre as notas de perfumes. A consultora me atendeu perfeitamente. O Floratta Red é puro luxo acessível.",
      name: "Renata S.",
      meta: "Belvedere · BH",
    },
    {
      quote: "Fiz o pedido do Malbec de carvalho às 20h. Às 20h45 o entregador estava na minha porta. Rapidez e cuidado impressionantes.",
      name: "Felipe A.",
      meta: "Nova Lima",
    },
  ];
  return (
    <section className="bg-luxe-gradient border-b border-luxe-line/30 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-32 md:py-40 relative z-10">
        <motion.div {...fade} className="max-w-2xl text-center mx-auto mb-20">
          <span className="eyebrow">Opinião de Clientes</span>
          <h2 className="mt-5 font-section text-5xl md:text-5xl font-semibold leading-[1.08]">
            A Experiência do Luxo Inteligente
          </h2>
          <span className="gold-rule mt-6 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.1 }}
              className="flex flex-col justify-between p-8 rounded-xs card-premium bg-white/50 backdrop-blur-sm"
            >
              <div>
                <div className="flex gap-0.5 mb-4">
                  {[0,1,2,3,4].map((s) => (
                    <svg key={s} className="size-4" viewBox="0 0 20 20" fill="currentColor" style={{color:"var(--color-luxe-gold)"}}>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <Quote className="size-8 text-luxe-gold" strokeWidth={1} />
                <blockquote className="mt-6 font-display text-2xl md:text-3xl leading-relaxed text-luxe-ink/90 break-words">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-8 pt-6 border-t border-luxe-line/30 font-sans">
                <div className="text-sm font-bold text-luxe-ink">{t.name}</div>
                <div className="text-[10px] tracking-[0.24em] uppercase text-luxe-ink-soft/70 mt-1">
                  {t.meta}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Depoimentos;
