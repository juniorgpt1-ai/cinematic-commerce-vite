import { memo } from "react";
import { Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TESTIMONIALS = [
  {
    quote: "Atendimento maravilhoso, me ajudaram a escolher o perfume perfeito. Chegou super rápido!",
    name: "Ana Clara",
    city: "Belo Horizonte",
    rating: 5,
  },
  {
    quote: "Comprei um kit de presente pra minha esposa e foi um sucesso. Produto original e entrega no mesmo dia.",
    name: "Ricardo Oliveira",
    city: "Contagem",
    rating: 5,
  },
  {
    quote: "Adorei a consultoria pelo WhatsApp, super atenciosos. Só demorei um pouco pra decidir de tantas opções boas.",
    name: "Mariana Costa",
    city: "Belo Horizonte",
    rating: 5,
  },
  {
    quote: "Já é a terceira vez que compro. Confiança total, produtos sempre originais e o atendimento é muito humano.",
    name: "Patrícia Lopes",
    city: "Nova Lima",
    rating: 5,
  },
  {
    quote: "Precisava de um presente de última hora e resolveram tudo pelo WhatsApp em minutos. Recomendo demais!",
    name: "Fernanda Alves",
    city: "Betim",
    rating: 5,
  },
];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className="size-3.5"
      viewBox="0 0 20 20"
      fill={filled ? "#B89A6A" : "none"}
      stroke="#B89A6A"
      strokeWidth={filled ? 0 : 1.5}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function AvatarInitial({ name }: { name: string }) {
  const initial = name.charAt(0);
  return (
    <div className="w-10 h-10 rounded-full bg-[#D4B896]/25 border border-[#B89A6A]/30 flex items-center justify-center shrink-0">
      <span className="font-sans text-xs font-semibold text-[#B89A6A]">{initial}</span>
    </div>
  );
}

const Depoimentos = memo(function Depoimentos() {
  const headerRef = useScrollReveal();

  return (
    <section
      id="depoimentos"
      className="bg-luxe-gradient border-b border-luxe-line/30 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 relative z-10">
        <div ref={headerRef} className="reveal-up max-w-xl mb-16 md:mb-20">
          <h2 className="font-section text-4xl md:text-5xl font-semibold leading-[1.08]">
            A experiência do <span className="italic font-light text-luxe-gold">luxo inteligente</span>.
          </h2>
          <p className="mt-5 text-luxe-ink/93 font-sans font-normal text-base md:text-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            Quem já pediu, conta como foi.
          </p>
        </div>

        <div
          ref={useScrollReveal()}
          className="stagger-container max-w-3xl mx-auto flex flex-col gap-4"
        >
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="group reveal-up flex flex-col p-6 rounded-xs border border-luxe-gold/30 bg-luxe-gold/5"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[0, 1, 2, 3, 4].map((s) => (
                  <StarIcon key={s} filled={s < t.rating} />
                ))}
              </div>

              {/* Quote */}
              <Quote
                className="size-6 text-luxe-gold/30 shrink-0 mb-3"
                strokeWidth={1.5}
              />
              <blockquote className="font-sans text-base leading-relaxed text-luxe-ink/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <figcaption className="mt-6 flex items-center gap-3">
                <AvatarInitial name={t.name} />
                <div>
                  <div className="font-section text-sm font-semibold text-luxe-ink leading-tight">
                    {t.name}
                  </div>
                  <div className="text-xs text-luxe-ink-soft/80 mt-0.5">
                    {t.city}
                  </div>
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
