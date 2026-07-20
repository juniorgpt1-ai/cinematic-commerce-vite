import { memo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Faq = memo(function Faq() {
  const items = [
    {
      q: "Os produtos são originais?",
      a: "Sim, somos revendedores oficiais do Grupo Boticário. Todos os produtos são originais e acompanham nota fiscal.",
    },
    {
      q: "Como funciona a entrega?",
      a: "Entrega expressa via Uber Flash em BH e região, quando disponível. O prazo pode variar conforme a demanda do aplicativo.",
    },
    {
      q: "Posso encomendar produtos que não estão no site?",
      a: "Sim, temos acesso ao catálogo completo do Grupo Boticário. Fale com a gente pelo WhatsApp e encontramos o que você procura.",
    },
    {
      q: "Quais as formas de pagamento?",
      a: "Pix, cartão de crédito e condições facilitadas — combinamos tudo pelo WhatsApp para sua comodidade.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  const headerRef = useScrollReveal();

  return (
    <section id="faq" className="bg-luxe-gradient border-b border-luxe-line/30">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <div ref={headerRef} className="reveal-up text-center">
          <h2 className="font-section text-4xl md:text-5xl font-semibold leading-[1.08]">
            Perguntas Frequentes
          </h2>
          <p className="mt-4 text-luxe-ink/70 font-sans font-light text-base md:text-lg">
            Tudo o que você precisa saber antes de pedir.
          </p>
        </div>

        <div className="mt-16 divide-y divide-luxe-line/40 border-y border-luxe-line/40">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-6 text-left group cursor-pointer transition-opacity duration-150 active:opacity-60"
                >
                  <span
                    className={`font-section text-2xl md:text-3xl transition-colors duration-300 font-normal min-w-0 break-words ${
                      isOpen ? "text-luxe-gold" : "text-luxe-ink group-hover:text-luxe-gold"
                    }`}
                  >
                    {it.q}
                  </span>
                  <ChevronDown
                    className={`size-5 text-luxe-gold shrink-0 transition-transform duration-500 ${
                      isOpen ? "rotate-180 drop-shadow-[0_0_6px_rgba(154,123,80,0.55)]" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-luxe-ink/80 font-sans font-light leading-relaxed max-w-xl">
                      {it.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default Faq;
