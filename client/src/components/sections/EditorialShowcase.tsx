import { memo, useState, useEffect, useCallback, useRef } from "react";
import { Timer, ArrowRight, Sparkles } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSendMorph } from "@/hooks/useSendMorph";
import FloatingBadge from "@/components/sections/FloatingBadge";
import SendMorphIcon from "@/components/sections/SendMorphIcon";

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
  secondImage?: string;
  secondLabel?: string;
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
  secondImage,
  secondLabel,
}: ShowcaseProps) {
  const imageRef = useScrollReveal();
  const copyRef = useScrollReveal();
  const { phase: sendPhase, trigger: triggerSend } = useSendMorph();
  const accentText = tone === "bordo" ? "text-luxe-bordo" : "";
  const [slide, setSlide] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const hasCarousel = !!secondImage;
  const nextSlide = useCallback(() => setSlide(s => (s + 1) % 2), []);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!hasCarousel || autoplayPaused) return;
    const intervalId = setInterval(nextSlide, 4000);
    return () => clearInterval(intervalId);
  }, [hasCarousel, nextSlide, autoplayPaused]);

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
    <section id={id} className="relative bg-luxe-gradient border-b border-luxe-line/30 overflow-hidden">

      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36 relative z-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center ${
            reverse ? "lg:[&>div:first-child]:order-2" : ""
          }`}
        >
          <div
            ref={imageRef}
            className={`reveal-right ${reverse ? "lg:col-span-5" : "lg:col-span-7"} relative`}
            onMouseEnter={() => setAutoplayPaused(true)}
            onMouseLeave={() => setAutoplayPaused(false)}
            onFocus={() => setAutoplayPaused(true)}
            onBlur={() => setAutoplayPaused(false)}
          >
            {hasCarousel ? (
              <>
                <div className="relative aspect-[4/5] overflow-hidden bg-black shadow-2xl">
                  <div
                    className="flex h-full transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${slide * 100}%)` }}
                  >
                    <div className="min-w-full relative">
                      <img
                        src={image}
                        alt={imageAlt}
                        loading="lazy"
                        width="1200"
                        height="1600"
                        className="h-full w-full object-cover object-top"
                      />
                      <div className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 flex flex-wrap items-center justify-between gap-2 text-white/80 text-[10px] tracking-[0.24em] md:tracking-[0.32em] uppercase font-semibold">
                        <span>{eyebrow.split("·")[0].trim()}</span>
                        <span>PREMIUM</span>
                      </div>
                    </div>
                    <div className="min-w-full relative bg-gradient-to-b from-luxe-black via-luxe-black/90 to-black">
                      <img
                        src={secondImage}
                        alt={secondLabel || imageAlt}
                        loading="lazy"
                        width="800"
                        height="800"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      {secondLabel && (
                        <div className="absolute top-4 md:top-6 left-4 right-4 text-center">
                          {secondLabel.split("\n").map((line, i) => (
                            <span key={i} className={`block ${i === 0 ? "text-white/80 text-[13px] tracking-[0.24em] md:tracking-[0.28em] uppercase font-semibold" : "text-white/60 text-[14px] leading-relaxed font-light italic mt-1"}`}>
                              {line}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                  <button onClick={() => selectSlide(0)} className={`dot-progress w-3 h-3 rounded-full transition-all duration-300 ${slide === 0 ? "active bg-luxe-gold scale-125" : "bg-white/40 hover:bg-white/60"}`} aria-label="Slide 1" style={{ minWidth: "44px", minHeight: "44px", padding: "6px" }} />
                  <button onClick={() => selectSlide(1)} className={`dot-progress w-3 h-3 rounded-full transition-all duration-300 ${slide === 1 ? "active bg-luxe-gold scale-125" : "bg-white/40 hover:bg-white/60"}`} aria-label="Slide 2" style={{ minWidth: "44px", minHeight: "44px", padding: "6px" }} />
                </div>
              </>
            ) : (
              <div className="relative aspect-[4/5] overflow-hidden bg-black shadow-2xl">
                <img
                  src={image}
                  alt={imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover img-hover-lift transition-transform duration-750 hover:scale-103"
                />
                <div className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 flex flex-wrap items-center justify-between gap-2 text-white/80 text-[10px] tracking-[0.24em] md:tracking-[0.32em] uppercase font-semibold">
                  <span>{eyebrow.split("·")[0].trim()}</span>
                  <span>PREMIUM</span>
                </div>
              </div>
            )}

            {/* Absolute Floating Seal */}
            <div className={`absolute -bottom-3 ${reverse ? "-left-2 md:-left-4" : "-right-2 md:-right-4"} z-20`}>
              <FloatingBadge className="shadow-lg border-luxe-gold-soft/30">
                <Sparkles className="size-3.5 text-luxe-gold" />
                <span className="text-[14px] tracking-wider uppercase font-bold text-luxe-gold-soft">{sealText}</span>
              </FloatingBadge>
            </div>
          </div>

          <div ref={copyRef} className={`reveal-up ${reverse ? "lg:col-span-7" : "lg:col-span-5"}`}>
            <span className={`eyebrow ${accentText}`}>{eyebrow}</span>
            <h2 className="mt-6 font-section text-4xl md:text-5xl font-semibold leading-[1.08] tracking-tight">
              {title}
            </h2>
            <span className="gold-rule mt-8" />
            <p className="mt-8 text-lg text-luxe-ink/85 font-sans font-light leading-relaxed">
              {copy}
            </p>

            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-luxe-line/30 pt-10 font-sans">
              {notes.map((n, i) => (
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

            <div className="mt-8 inline-flex flex-wrap items-center gap-2 border border-luxe-gold/30 bg-luxe-gold/5 px-3 py-1.5 rounded-xs max-w-full">
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
                <div className="font-sans text-2xl md:text-3xl font-semibold mt-1 text-luxe-ink">{price}</div>
                <div className="mt-2 text-[13px] text-luxe-ink-soft font-medium">
                  ou <span className="text-luxe-ink font-semibold">3x sem juros</span>
                  <span className="mx-2 text-luxe-gold">·</span>
                  <span className="text-luxe-ink font-semibold">Pix com 5% OFF</span>
                </div>
              </div>
              <a
                href={waLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={triggerSend}
                className="group inline-flex flex-wrap items-center justify-center gap-3 bg-luxe-ink hover:bg-whatsapp text-white hover:text-black btn-hover-scale px-6 py-4 md:px-8 md:py-5 text-sm font-semibold tracking-wide shadow-md"
              >
                <SendMorphIcon phase={sendPhase} className="size-4" />
                {cta}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default EditorialShowcase;
