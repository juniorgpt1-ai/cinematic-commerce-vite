import { memo, useState, useEffect, useCallback, useRef } from "react";
import { Timer, ArrowRight, Award } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSendMorph } from "@/hooks/useSendMorph";
import FloatingBadge from "@/components/sections/FloatingBadge";
import SendMorphIcon from "@/components/sections/SendMorphIcon";

const MalbecShowcase = memo(function MalbecShowcase({ lifestyleImg, collageImg, lifestyleImgMob, collageImgMob }: { lifestyleImg: string; collageImg: string; lifestyleImgMob?: string; collageImgMob?: string }) {
  const [slide, setSlide] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const carouselRef = useScrollReveal();
  const copyRef = useScrollReveal();
  const collageRef = useScrollReveal();
  const { phase: sendPhase, trigger: triggerSend } = useSendMorph();
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const nextSlide = useCallback(() => setSlide(s => (s + 1) % 2), []);

  useEffect(() => {
    if (autoplayPaused) return;
    const id = setInterval(nextSlide, 4000);
    return () => clearInterval(id);
  }, [nextSlide, autoplayPaused]);

  useEffect(() => {
    return () => clearTimeout(resumeTimeoutRef.current);
  }, []);

  const selectSlide = useCallback((i: number) => {
    setSlide(i);
    setAutoplayPaused(true);
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setAutoplayPaused(false), 6000);
  }, []);

  return (
    <section id="malbec" className="relative bg-luxe-gradient border-b border-luxe-line/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-36 md:py-44 relative z-10">
        {/* Top editorial split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Carousel */}
          <div
            ref={carouselRef}
            className="reveal-right lg:col-span-7 relative"
            onMouseEnter={() => setAutoplayPaused(true)}
            onMouseLeave={() => setAutoplayPaused(false)}
            onFocus={() => setAutoplayPaused(true)}
            onBlur={() => setAutoplayPaused(false)}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-black shadow-2xl border border-luxe-line/20">
              <div
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${slide * 100}%)` }}
              >
                {/* Slide 1: Lifestyle */}
                <div className="min-w-full relative">
                  <picture>
                    {lifestyleImgMob && (
                      <source srcSet={lifestyleImgMob} media="(max-width: 767px)" />
                    )}
                    <img
                      src={lifestyleImg}
                      alt="Homem sofisticado aplicando Malbec O Boticário"
                      loading="lazy"
                      className="h-full w-full object-cover object-top"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  <div className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 flex flex-wrap items-center justify-between gap-2 text-white/80 text-[10px] tracking-[0.24em] md:tracking-[0.32em] uppercase font-semibold">
                    <span>O BOTICÁRIO · MASCULINO</span>
                    <span>MAISON PREMIUM</span>
                  </div>
                </div>

                {/* Slide 2: Bottle */}
                <div className="min-w-full relative flex items-center justify-center bg-gradient-to-b from-luxe-black via-luxe-black/90 to-black">
                  <picture className="absolute inset-0">
                    <source srcSet="/malbec1-mob.webp" media="(max-width: 767px)" />
                    <img
                      src="/malbec1-opt.webp"
                      alt="Frasco Malbec Cologne O Boticário"
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-4 md:top-6 left-4 right-4 text-center">
                    <span className="text-white/80 text-[10px] tracking-[0.28em] md:tracking-[0.32em] uppercase font-semibold">
                      Malbec Cologne
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-3">
              <button
                onClick={() => selectSlide(0)}
                className={`dot-progress w-3 h-3 rounded-full transition-all duration-300 ${
                  slide === 0 ? "active bg-luxe-gold scale-125" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label="Slide 1"
                style={{ minWidth: "44px", minHeight: "44px", padding: "6px" }}
              />
              <button
                onClick={() => selectSlide(1)}
                className={`dot-progress w-3 h-3 rounded-full transition-all duration-300 ${
                  slide === 1 ? "active bg-luxe-gold scale-125" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label="Slide 2"
                style={{ minWidth: "44px", minHeight: "44px", padding: "6px" }}
              />
            </div>

            <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 z-20 scale-100 md:scale-110 origin-bottom-left">
              <FloatingBadge className="shadow-lg border-luxe-gold-soft/30 bg-black/90">
                <Award className="size-3 text-luxe-gold" />
                <span className="text-[12px] tracking-wider uppercase font-bold text-luxe-gold-soft">Mais Procurado</span>
              </FloatingBadge>
            </div>
          </div>

          {/* Copy side */}
          <div ref={copyRef} className="reveal-up lg:col-span-5">
            <span className="eyebrow">O Boticário · Perfumaria Masculina</span>
            <h2 className="mt-6 font-section text-4xl md:text-5xl font-semibold leading-[1.08] tracking-tight">
              Malbec Cologne. A elegância da{" "}
              <span className="font-light italic text-luxe-gold">presença marcante</span>.
            </h2>
            <span className="gold-rule mt-8" />
            <p className="mt-8 text-lg text-luxe-ink/85 font-sans font-light leading-relaxed">
              Um clássico atemporal que une sofisticação e intensidade. Com álcool vinícola e madeiras nobres, é a assinatura olfativa do homem que sabe o que quer — luxo acessível com altíssima performance.
            </p>

            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-luxe-line/30 pt-8 font-sans">
              {(["Lima da Pérsia", "Uvas Malbec", "Carvalho Francês"] as const).map((n, i) => (
                <div key={n} className="group/note cursor-default">
                  <dt className="text-xs tracking-[0.24em] uppercase text-luxe-ink-soft/80 font-semibold transition-colors duration-300 group-hover/note:text-luxe-gold-deep">
                    Nota {i === 0 ? "Topo" : i === 1 ? "Coração" : "Fundo"}
                  </dt>
                  <dd className="mt-2 font-display text-xl font-bold text-black origin-left transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/note:scale-110 group-hover/note:text-luxe-gold-deep">
                    {n}
                  </dd>
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
                <span className="text-[10px] tracking-[0.28em] uppercase text-luxe-ink-soft/70 font-semibold">Valor Acessível</span>
                <div className="font-sans text-4xl font-bold mt-1 text-luxe-ink">R$ 289,90</div>
                <div className="mt-2 text-[13px] text-luxe-ink-soft font-medium">
                  ou <span className="text-luxe-ink font-semibold">6x sem juros</span>
                  <span className="mx-2 text-luxe-gold">·</span>
                  <span className="text-luxe-ink font-semibold">Pix com 5% OFF</span>
                </div>
              </div>
              <a
                href={waLink("Olá! Quero comprar o Malbec Cologne (O Boticário) com entrega VIP em 1h em BH.")}
                target="_blank"
                rel="noreferrer"
                onClick={triggerSend}
                className="group btn-hover-scale inline-flex flex-wrap items-center justify-center gap-3 bg-luxe-ink hover:bg-whatsapp text-white hover:text-black transition-colors px-5 py-3 md:px-8 md:py-4 text-sm font-semibold tracking-wide shadow-md"
              >
                <SendMorphIcon phase={sendPhase} className="size-4" />
                Garantir meu Malbec
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Collage — full-width editorial image */}
        <div ref={collageRef} className="reveal-scale mt-24 md:mt-32">
          <div className="bg-luxe-bg p-3 md:p-6 rounded-xs shadow-2xl border border-luxe-line/20">
            {/* Full-width image */}
            <div className="overflow-hidden rounded-xs">
              <picture>
                {collageImgMob && (
                  <source srcSet={collageImgMob} media="(max-width: 767px)" />
                )}
                <img
                  src={collageImg}
                  alt="Malbec O Boticário — relógio, frasco, aplicação e espelho"
                  loading="lazy"
                  width="2400"
                  height="1792"
                  className="w-full h-auto md:h-[600px] md:object-cover block"
                />
              </picture>
            </div>

            {/* Title */}
            <h2
              className="mt-12 md:mt-16 text-center font-section text-2xl md:text-4xl font-semibold text-luxe-ink leading-snug px-2"
            >
              A marca de quem faz acontecer e não aceita menos que o melhor.
            </h2>

            {/* Gold metallic CTA button */}
            <div className="mt-6 md:mt-8 flex justify-center">
              <a
                href={waLink("Olá! Quero o Malbec Cologne com entrega VIP em 1h em BH.")}
                target="_blank"
                rel="noreferrer"
                className="btn-gold-metallic btn-hover-scale inline-flex items-center gap-3 px-8 py-4 text-sm md:text-base font-bold tracking-[0.2em] uppercase rounded-sm hover:brightness-105 hover:shadow-xl [animation:luxe-glow-gold_2.5s_ease-in-out_infinite]"
              >
                Garantir Agora
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default MalbecShowcase;
