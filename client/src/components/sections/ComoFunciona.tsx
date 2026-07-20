import { memo } from "react";
import { ShoppingBag, MessageCircle, Truck } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ComoFunciona = memo(function ComoFunciona() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal();

  const steps = [
    {
      icon: ShoppingBag,
      title: "Escolha o produto",
      desc: "Navegue pelas nossas categorias e encontre o que combina com você.",
    },
    {
      icon: MessageCircle,
      title: "Fale conosco pelo WhatsApp",
      desc: "Envie uma mensagem e receba atendimento personalizado em minutos.",
    },
    {
      icon: Truck,
      title: "Receba seu pedido",
      desc: "Entrega expressa via Uber Flash em BH e região, com segurança.",
    },
  ];

  return (
    <section id="como-funciona" className="bg-luxe-gradient border-b border-luxe-line/30 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 relative z-10">
        <div ref={headerRef} className="reveal-up text-center mb-16 md:mb-20">
          <span className="eyebrow">Simples e rápido</span>
          <h2 className="mt-5 font-section text-4xl md:text-5xl font-semibold leading-[1.08]">
            Como funciona
          </h2>
          <span className="gold-rule mt-6 mx-auto" />
        </div>

        <div ref={gridRef} className="stagger-container grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="reveal-up flex flex-col items-center text-center">
                <div className="icon-pop-in w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-luxe-gold/10 border border-luxe-gold/30 flex items-center justify-center mb-6 md:mb-8">
                  <Icon className="size-7 sm:size-8 text-luxe-gold" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] tracking-[0.32em] uppercase text-luxe-gold-deep font-bold mb-3">
                  Passo {i + 1}
                </span>
                <h3 className="font-sans text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-luxe-ink/70 font-sans font-light text-base leading-relaxed max-w-[280px]">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default ComoFunciona;
