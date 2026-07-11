import { memo } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Award, Sparkles } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { useFadeUp } from "@/hooks/useFadeUp";
import FloatingBadge from "@/components/sections/FloatingBadge";

const HairCareSuite = memo(function HairCareSuite({ volumeImg, lisoImg }: { volumeImg: string; lisoImg: string }) {
  const fade = useFadeUp();
  return (
    <section id="haircare" className="relative bg-luxe-bg overflow-hidden border-b border-luxe-line/40">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36 relative z-10">
        <motion.div {...fade} className="max-w-3xl mb-20 text-center mx-auto">
          <span className="eyebrow">Alta Performance Capilar</span>
          <h2 className="mt-4 font-section text-5xl md:text-6xl font-semibold leading-tight">
            A Arte do Cuidado Absoluto
          </h2>
          <span className="gold-rule mt-6 mx-auto" />
          <p className="mt-6 text-lg text-luxe-ink/85 font-sans font-light leading-relaxed">
            Tecnologia de salão adaptada para a sua rotina diária. A sofisticação da alta performance agora acessível na sua casa.
          </p>
        </motion.div>

        {/* 1. Encorpamento Suite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24 md:mb-32">
          <motion.div {...fade} className="lg:col-span-6 relative">
            <div className="relative aspect-[6/5] overflow-hidden bg-[#121212] shadow-2xl border border-luxe-line/30 group">
              <picture>
                <source srcSet="/VOLMOB.webp" media="(max-width: 767px)" />
                <img
                  src={volumeImg}
                  alt="Modelo lavando cabelos com produtos Siàge Hair-Plastia"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
              <div className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 flex flex-wrap items-center justify-between gap-2 text-white/80 text-[10px] tracking-[0.24em] md:tracking-[0.32em] uppercase font-semibold">
                <span>VOLUME PREMIUM</span>
                <span>Nº 01</span>
              </div>
            </div>

            {/* Absolute Floating Badges */}
            <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-4 z-20">
              <FloatingBadge className="rounded-xs shadow-xl">
                <Award className="size-4 text-luxe-gold" />
                <span className="text-[14px] tracking-wider uppercase font-bold text-luxe-gold-soft">Best Seller</span>
              </FloatingBadge>
            </div>
          </motion.div>

          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: 0.12 }}
            className="lg:col-span-6"
          >
            <span className="eyebrow text-luxe-gold">Hair Care · Volume & Densidade</span>
            <h3 className="mt-4 font-section text-5xl md:text-5xl font-semibold leading-tight">
              Cabelos encorpados com conforto e resultado visível.
            </h3>
            <span className="gold-rule mt-6" />

            <p className="mt-6 text-lg text-luxe-ink/85 font-sans font-light leading-relaxed">
              Tecnologia de ponta preenche sua fibra. Volumiza, hidrata e elimina a porosidade de forma rápida e confortável — fios encorpados com brilho tridimensional e balanço natural.
            </p>

            <ul className="mt-8 space-y-3.5 text-luxe-ink/85 font-sans font-light">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 bg-luxe-gold rounded-full shrink-0" />
                <span>Preenchimento de porosidade com ácido hialurônico inteligente.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 bg-luxe-gold rounded-full shrink-0" />
                <span>Aumento imediato de espessura e densidade do fio.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 bg-luxe-gold rounded-full shrink-0" />
                <span>Espuma rica luxuosa ("foam desire") que limpa sem ressecar.</span>
              </li>
            </ul>

            <div className="mt-10 flex items-center justify-between gap-6 flex-wrap border-t border-luxe-line/30 pt-8">
              <div>
                <span className="text-[10px] tracking-[0.28em] uppercase text-luxe-ink-soft/70 font-semibold">
                  Tratamento Completo
                </span>
                <div className="font-sans text-3xl font-bold mt-1 text-luxe-ink">R$ 159,90</div>
                <div className="mt-1 text-[13px] text-luxe-ink-soft font-medium">
                  ou <span className="font-semibold text-luxe-ink">3x sem juros</span>
                  <span className="mx-2 text-luxe-gold">·</span>
                  <span className="font-semibold text-luxe-ink">Pix com 5% OFF</span>
                </div>
              </div>
              <a
                href={waLink("Olá! Quero o Combo de Encorpamento Inteligente de Alta Performance com entrega rápida.")}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex flex-wrap items-center justify-center gap-3 bg-luxe-ink hover:bg-whatsapp text-white hover:text-black transition-all px-5 py-3 md:px-7 md:py-4 text-base font-semibold tracking-wide shadow-md"
              >
                <MessageCircle className="size-4" />
                Eu Quero Fios Encorpados
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* 2. Cauterização Suite */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div {...fade} className="lg:col-span-7 lg:order-2 relative">
            <div className="relative aspect-[6/5] overflow-hidden bg-[#121212] shadow-2xl border border-luxe-line/30 group">
              <picture>
                <source srcSet="/LISMOB.webp" media="(max-width: 767px)" />
                <img
                  src={lisoImg}
                  alt="Modelo com cabelo liso e alinhado sob fluxo de água"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[75%]"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
              <div className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 flex flex-wrap items-center justify-between gap-2 text-white/80 text-[10px] tracking-[0.24em] md:tracking-[0.32em] uppercase font-semibold">
                <span>ALINHAMENTO PREMIUM</span>
                <span>Nº 02</span>
              </div>
            </div>

            {/* Absolute Floating Badges */}
            <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-4 z-20">
              <FloatingBadge className="rounded-xs shadow-xl">
                <Sparkles className="size-4 text-luxe-gold" />
                <span className="text-[14px] tracking-wider uppercase font-bold text-luxe-gold-soft">Alta Performance</span>
              </FloatingBadge>
            </div>
          </motion.div>

          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: 0.12 }}
            className="lg:col-span-5 lg:order-1"
          >
            <span className="eyebrow text-luxe-gold">Hair Care · Blindagem & Cauterização</span>
            <h3 className="mt-4 font-section text-5xl md:text-5xl font-semibold leading-tight">
              Liso de Salão em Casa.
            </h3>
            <span className="gold-rule mt-6" />

            <p className="mt-6 text-lg text-luxe-ink/85 font-sans font-light leading-relaxed">
              Repõe Massa e Blinda os Fios. Sua inteligência escolhe o liso absoluto, 3x mais eficaz. Alta performance para todos através da tecnologia de cauterização lipídica que sela as cutículas instantaneamente.
            </p>

            <ul className="mt-8 space-y-3.5 text-luxe-ink/85 font-sans font-light">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 bg-luxe-gold rounded-full shrink-0" />
                <span>Reconstrução profunda com queratina biomimética termo-ativada.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 bg-luxe-gold rounded-full shrink-0" />
                <span>Alinhamento absoluto dos fios sem química agressiva.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 bg-luxe-gold rounded-full shrink-0" />
                <span>Ação anti-umidade com escudo protetor duradouro.</span>
              </li>
            </ul>

            <div className="mt-10 flex items-center justify-between gap-6 flex-wrap border-t border-luxe-line/30 pt-8">
              <div>
                <span className="text-[10px] tracking-[0.28em] uppercase text-luxe-ink-soft/70 font-semibold">
                  Tratamento Completo
                </span>
                <div className="font-sans text-3xl font-bold mt-1 text-luxe-ink">R$ 179,90</div>
                <div className="mt-1 text-[13px] text-luxe-ink-soft font-medium">
                  ou <span className="font-semibold text-luxe-ink">3x sem juros</span>
                  <span className="mx-2 text-luxe-gold">·</span>
                  <span className="font-semibold text-luxe-ink">Pix com 5% OFF</span>
                </div>
              </div>
              <a
                href={waLink("Olá! Quero o Combo de Cauterização e Liso Absoluto de Alta Performance com entrega rápida.")}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex flex-wrap items-center justify-center gap-3 bg-luxe-ink hover:bg-whatsapp text-white hover:text-black transition-all px-5 py-3 md:px-7 md:py-4 text-base font-semibold tracking-wide shadow-md"
              >
                <MessageCircle className="size-4" />
                Sinta o Poder do Liso Absoluto
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default HairCareSuite;
