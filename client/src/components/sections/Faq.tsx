import { memo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Faq = memo(function Faq() {
  const items = [
    {
      q: "O que significa 'Luxo Inteligente'?",
      a: "Significa ter acesso aos melhores produtos cosméticos de alta performance e à perfumaria premium com preços justos e acessíveis, focando no melhor custo-benefício e na entrega rápida de conveniência, sem a necessidade de pagar preços exorbitantes por marcas importadas.",
    },
    {
      q: "Como funciona a entrega em até 1h?",
      a: "Disponibilizamos entregadores parceiros via Uber Flash para toda Belo Horizonte e bairros limítrofes da região metropolitana. O produto sai direto do nosso estoque, já com embalagem premium inclusa.",
    },
    {
      q: "Os produtos são originais e possuem garantia?",
      a: "Sim, absolutamente. Somos revendedores oficiais e autorizados de marcas renomadas do Grupo Boticário e Eudora. Todos os itens acompanham nota fiscal completa de compra.",
    },
    {
      q: "Quais são as condições e formas de pagamento?",
      a: "Aceitamos pagamento por Pix (com 5% de desconto automático), cartões de crédito em até 6x sem juros ou links de pagamento online totalmente seguros enviados diretamente pelo WhatsApp.",
    },
    {
      q: "Posso solicitar troca de algum produto?",
      a: "Sim, garantimos o direito de troca ou devolução do produto não utilizado em até 7 dias após o recebimento, seguindo rigorosamente o Código de Defesa do Consumidor.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  const headerRef = useScrollReveal();

  return (
    <section id="faq" className="bg-luxe-gradient border-b border-luxe-line/30">
      <div className="mx-auto max-w-4xl px-6 py-32 md:py-40">
        <div ref={headerRef} className="reveal-up text-center">
          <span className="eyebrow">Perguntas Frequentes</span>
          <h2 className="mt-5 font-section text-4xl md:text-5xl font-semibold leading-[1.08]">
            Dúvidas Frequentes
          </h2>
          <span className="gold-rule mt-6 mx-auto" />
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
                  className="w-full flex items-center justify-between gap-4 py-6 text-left group cursor-pointer"
                >
                  <span className="font-fenix text-2xl md:text-3xl text-luxe-ink group-hover:text-luxe-gold transition-colors font-normal min-w-0 break-words">
                    {it.q}
                  </span>
                  <ChevronDown
                    className={`size-5 text-luxe-gold shrink-0 transition-transform duration-500 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-luxe-ink/80 font-sans font-light leading-relaxed max-w-3xl">
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
