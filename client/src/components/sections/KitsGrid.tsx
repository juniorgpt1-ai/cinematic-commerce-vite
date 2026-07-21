import { memo } from "react";
import { Timer } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSendMorph } from "@/hooks/useSendMorph";
import SendMorphIcon from "@/components/sections/SendMorphIcon";

const KitsGrid = memo(function KitsGrid() {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal();
  const { phase: sendPhase, trigger: triggerSend } = useSendMorph();

  const kits = [
    {
      name: "Kit Ele Elegante",
      desc: "Malbec Cologne + sabonete líquido perfumado + necessaire em couro sintético. Pura indulgência.",
      price: "R$ 379,90",
      msg: "Olá! Tenho interesse no Kit Ele Elegante (Malbec + necessaire). Pode me ajudar?",
      tag: "Best Seller"
    },
    {
      name: "Kit Ela Sublime",
      desc: "Lily Eau de Parfum + creme acetinado hidratante corporal + caixa rígida premium.",
      price: "R$ 429,90",
      msg: "Olá! Tenho interesse no Kit Ela Sublime (Lily + creme acetinado). Pode me ajudar?",
      tag: "Mais Vendido"
    },
    {
      name: "Combo Casal Real",
      desc: "Malbec Cologne + Lily Eau de Parfum. A união perfeita de duas assinaturas marcantes e inesquecíveis.",
      price: "R$ 619,90",
      msg: "Olá! Tenho interesse no Combo Casal Real (Malbec + Lily). Pode me ajudar?",
      tag: "Melhor Preço"
    },
  ];
  return (
    <section id="kits" className="bg-luxe-dark-gradient text-white relative overflow-hidden">

      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 relative z-10">
        <div ref={headerRef} className="reveal-up max-w-2xl mb-16">
          <span className="eyebrow text-luxe-gold-soft">Curadoria de Presentes</span>
          <h2 className="mt-5 font-section text-4xl md:text-5xl font-semibold leading-[1.08]">
            Kits & Combos para Presentear
          </h2>
          <p className="mt-6 text-white/82 text-lg font-sans font-normal leading-relaxed max-w-xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
            Combinações desenvolvidas por especialistas para presentear com sofisticação ou reabastecer seu estoque de luxo com o melhor custo-benefício.
          </p>
          <a
            href={waLink("Olá! Gostaria de ajuda para escolher um presente especial. Pode me ajudar?")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={triggerSend}
            className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 border border-luxe-gold-soft/30 bg-luxe-gold/10 hover:bg-whatsapp hover:border-whatsapp text-luxe-gold-soft hover:text-black btn-hover-scale btn-breathe [--btn-breathe-rest:rgba(154,123,80,0.1)] [--btn-breathe-peak:rgba(154,123,80,0.2)] px-6 py-4 md:px-8 md:py-5 text-sm font-semibold tracking-wide shadow-md"
          >
            <SendMorphIcon phase={sendPhase} className="size-4" />
            Escolher um presente
            <img src="/msg.svg" alt="" className="size-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div ref={gridRef} className="stagger-container grid grid-cols-1 md:grid-cols-3 gap-px bg-luxe-gold/20">
          {kits.map((k, i) => (
            <div
              key={k.name}
              className="reveal-up bg-luxe-ink p-6 md:p-10 flex flex-col justify-between group card-hover-lift transition-colors duration-300 hover:bg-black/90"
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
                <p className="mt-8 text-white/85 font-sans font-normal leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
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
                    <div className="mt-1 text-[12px] text-white/85 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                      3x sem juros <span className="text-luxe-gold-soft">·</span> Pix 5% OFF
                    </div>
                  </div>
                  <a
                    href={waLink(k.msg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Pedir ${k.name} no WhatsApp`}
                    className="btn-hover-scale btn-breathe [--btn-breathe-rest:#0a0a0a] [--btn-breathe-peak:#25d366] inline-flex items-center justify-center gap-2 bg-luxe-ink hover:bg-whatsapp text-luxe-gold-soft hover:text-black border border-luxe-gold-soft/30 hover:border-whatsapp px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300"
                  >
                    Pedir Combo <img src="/msg.svg" alt="" className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default KitsGrid;
