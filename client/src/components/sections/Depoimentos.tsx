import { memo } from "react";
import { Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TESTIMONIALS = [
  {
    quote: "[DEPOIMENTO] — Envie seu depoimento real pelo WhatsApp para aparecer aqui.",
    name: "[NOME DO CLIENTE]",
    meta: "[BAIRRO] · BH",
  },
  {
    quote: "[DEPOIMENTO] — Envie seu depoimento real pelo WhatsApp para aparecer aqui.",
    name: "[NOME DO CLIENTE]",
    meta: "[BAIRRO] · BH",
  },
  {
    quote: "[DEPOIMENTO] — Envie seu depoimento real pelo WhatsApp para aparecer aqui.",
    name: "[NOME DO CLIENTE]",
    meta: "[BAIRRO] · BH",
  },
];

const Depoimentos = memo(function Depoimentos() {
  const headerRef = useScrollReveal();

  return (
    <section className="bg-luxe-gradient border-b border-luxe-line/30 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 relative z-10">
        <div ref={headerRef} className="reveal-up max-w-xl mb-16 md:mb-20">
          <h2 className="font-section text-4xl md:text-5xl font-semibold leading-[1.08]">
            A experiência do <span className="italic font-light text-luxe-gold">luxo inteligente</span>.
          </h2>
          <p className="mt-5 text-luxe-ink/70 font-sans font-light text-base md:text-lg">
            Quem já pediu, conta como foi.
          </p>
        </div>

        <div ref={useScrollReveal()} className="stagger-container grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="group reveal-up flex flex-col justify-between p-8 rounded-xs card-premium bg-white hover:-translate-y-1 hover:border-luxe-gold/40"
            >
              <div>
                <div className="flex gap-0.5 mb-4">
                  {[0,1,2,3,4].map((s) => (
                    <svg key={s} className="size-4" viewBox="0 0 20 20" fill="currentColor" style={{color:"var(--color-luxe-gold)"}}>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <Quote className="size-8 text-luxe-gold transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:-rotate-6" strokeWidth={1} />
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
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Depoimentos;
