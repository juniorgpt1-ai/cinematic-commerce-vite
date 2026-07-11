import { memo } from "react";
import { motion } from "framer-motion";
import { Timer, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { useFadeUp } from "@/hooks/useFadeUp";
import FloatingBadge from "@/components/sections/FloatingBadge";

type ShowcaseProps = {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  copy: string;
  notes: string[];
  price: string;
  cta: string;
  waMessage: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  tone?: "gold" | "bordo";
  sealText?: string;
};

const EditorialShowcase = memo(function EditorialShowcase({
  id,
  eyebrow,
  title,
  copy,
  notes,
  price,
  cta,
  waMessage,
  image,
  imageAlt,
  reverse,
  tone = "gold",
  sealText = "Melhor Custo-Benefício",
}: ShowcaseProps) {
  const fade = useFadeUp();
  const accentText = tone === "bordo" ? "text-luxe-bordo" : "text-luxe-gold";
  return (
    <section id={id} className="relative bg-luxe-bg border-b border-luxe-line/30 overflow-hidden">

      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 relative z-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
            reverse ? "lg:[&>div:first-child]:order-2" : ""
          }`}
        >
          <motion.div {...fade} className={reverse ? "lg:col-span-5 relative" : "lg:col-span-7 relative"}>
            <div className="relative aspect-[4/5] overflow-hidden bg-black shadow-xl">
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-750 hover:scale-103"
              />
              <div className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 flex flex-wrap items-center justify-between gap-2 text-white/80 text-[10px] tracking-[0.24em] md:tracking-[0.32em] uppercase font-semibold">
                <span>{eyebrow.split("·")[0].trim()}</span>
                <span>MAISON PREMIUM</span>
              </div>
            </div>

            {/* Absolute Floating Seal */}
            <div className={`absolute -bottom-3 ${reverse ? "-left-2 md:-left-4" : "-right-2 md:-right-4"} z-20`}>
              <FloatingBadge className="shadow-lg border-luxe-gold-soft/30">
                <Sparkles className="size-3.5 text-luxe-gold" />
                <span className="text-[14px] tracking-wider uppercase font-bold text-luxe-gold-soft">{sealText}</span>
              </FloatingBadge>
            </div>
          </motion.div>

          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: 0.12 }}
            className={reverse ? "lg:col-span-7" : "lg:col-span-5"}
          >
            <span className={`eyebrow ${accentText}`}>{eyebrow}</span>
            <h2 className="mt-6 font-section text-4xl md:text-5xl font-semibold leading-[1.08] tracking-tight">
              {title}
            </h2>
            <span className="gold-rule mt-8" />
            <p className="mt-8 text-lg text-luxe-ink/85 font-sans font-light leading-relaxed">
              {copy}
            </p>

            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-luxe-line/30 pt-8 font-sans">
              {notes.map((n, i) => (
                <div key={n}>
                  <dt className="text-xs tracking-[0.24em] uppercase text-luxe-ink-soft/80 font-semibold">
                    Nota {i === 0 ? "Topo" : i === 1 ? "Coração" : "Fundo"}
                  </dt>
                  <dd className="mt-2 font-display text-xl font-bold text-black">{n}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 inline-flex flex-wrap items-center gap-2 border border-luxe-gold/40 bg-luxe-gold/5 px-3 py-1.5 rounded-xs max-w-full">
              <Timer className="size-3.5 text-luxe-gold" />
              <span className="text-[10px] tracking-[0.28em] uppercase text-luxe-gold font-semibold">
                Entrega VIP em até 1h · BH e região
              </span>
            </div>

            <div className="mt-10 flex items-end justify-between gap-6 flex-wrap">
              <div>
                <span className="text-[10px] tracking-[0.28em] uppercase text-luxe-ink-soft/70 font-semibold">
                  Valor Acessível
                </span>
                <div className="font-sans text-4xl font-bold mt-1 text-luxe-ink">{price}</div>
                <div className="mt-2 text-[13px] text-luxe-ink-soft font-medium">
                  ou <span className="text-luxe-ink font-semibold">6x sem juros</span>
                  <span className="mx-2 text-luxe-gold">·</span>
                  <span className="text-luxe-ink font-semibold">Pix com 5% OFF</span>
                </div>
              </div>
              <a
                href={waLink(waMessage)}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex flex-wrap items-center justify-center gap-3 bg-luxe-ink hover:bg-whatsapp text-white hover:text-black transition-colors px-5 py-3 md:px-8 md:py-4 text-sm font-semibold tracking-wide shadow-md"
              >
                <MessageCircle className="size-4" />
                {cta}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default EditorialShowcase;
