import { memo, useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface CarouselProduct {
  name: string;
  brand: string;
  tag: string;
  desc: string;
  price: string;
  oldPrice?: string;
  ctaText: string;
  waMsg: string;
}

const PRODUCTS: CarouselProduct[] = [
    {
      name: "Nativa SPA Quinoa Lotion",
      brand: "O Boticário",
      tag: "Firmeza Nutritiva",
      desc: "Hidratante corporal firmador com óleo puro de quinoa. Estimula o colágeno e nutre a pele.",
      price: "R$ 84,90",
      ctaText: "Garantir Nativa SPA",
      waMsg: "Olá! Quero garantir a Nativa SPA Quinoa Body Lotion com entrega rápida.",
    },
    {
      name: "Egeo Red Eau de Toilette",
      brand: "O Boticário",
      tag: "20% OFF Especial",
      desc: "Fragrância jovem com notas marcantes e viciantes de licor de rum. Diversão e atitude.",
      price: "R$ 119,90",
      oldPrice: "R$ 149,90",
      ctaText: "Garantir Egeo Red",
      waMsg: "Olá! Quero aproveitar a promoção de 20% OFF no Egeo Red com entrega VIP.",
    },
    {
      name: "Floratta Blue Cologne",
      brand: "O Boticário",
      tag: "Frescor Aconchegante",
      desc: "Floral musk leve e aconchegante que transmite paz e sofisticação para o seu dia a dia.",
      price: "R$ 139,90",
      ctaText: "Garantir Floratta Blue",
      waMsg: "Olá! Quero adquirir o Floratta Blue Cologne com entrega em 1h.",
    },
    {
      name: "Zaad Eau de Parfum",
      brand: "O Boticário",
      tag: "Sofisticação Diária",
      desc: "Fragrância herbal fresca de alta fixação com ingredientes nobres do mundo inteiro.",
      price: "R$ 329,90",
      ctaText: "Garantir Zaad",
      waMsg: "Olá! Quero comprar o Zaad Eau de Parfum com entrega rápida em BH.",
    },
    {
      name: "Coffee Woman Seduction",
      brand: "O Boticário",
      tag: "Indulgência Noturna",
      desc: "Equilíbrio fascinante entre grãos de café arábica e notas doces de chocolate branco.",
      price: "R$ 199,90",
      ctaText: "Garantir Coffee",
      waMsg: "Olá! Quero comprar o Coffee Woman Seduction com entrega expressa.",
    },
    {
      name: "Batom Mate QDB?",
      brand: "Quem Disse, Berenice?",
      tag: "Alta Pigmentação",
      desc: "Batom líquido de efeito mate extremamente confortável. Durabilidade imbatível de 12 horas.",
      price: "R$ 49,90",
      ctaText: "Garantir Batom",
      waMsg: "Olá! Quero garantir o Batom Mate da Quem Disse Berenice com entrega VIP.",
    },
];

const BoticarioCarousel = memo(function BoticarioCarousel() {
  const headerRef = useScrollReveal();
  const controlsRef = useScrollReveal();
  const carouselContainerRef = useScrollReveal();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollFraction, setScrollFraction] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const firstCard = carouselRef.current.querySelector("[data-carousel-card]");
      const cardWidth = firstCard ? firstCard.clientWidth : 340;
      const gap = 24;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -(cardWidth + gap) : (cardWidth + gap),
        behavior: "smooth",
      });
    }
  };

  const updateScrollFraction = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollFraction(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    updateScrollFraction();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateScrollFraction();
        ticking = false;
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScrollFraction);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScrollFraction);
    };
  }, [updateScrollFraction]);

  return (
    <section id="mais-amados" className="bg-luxe-dark-gradient text-white py-28 md:py-36 relative overflow-hidden border-b border-luxe-line/30">
      {/* Ambient gold glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-luxe-gold/4 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-luxe-gold/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div ref={headerRef} className="reveal-up max-w-2xl">
            <span className="eyebrow text-luxe-gold-soft">Seleção dos Favoritos</span>
            <h2 className="mt-5 font-section text-4xl sm:text-5xl md:text-5xl font-semibold leading-[1.08]">
              Mais Amados do Grupo Boticário
            </h2>
            <p className="mt-6 text-white/60 font-sans font-light text-base sm:text-lg">
              Escolhas consagradas, luxo acessível e alta performance olfativa e de tratamento. A melhor seleção para você.
            </p>
          </div>

          <div ref={controlsRef} className="reveal-up flex gap-3 mt-6 md:mt-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Rolar para esquerda"
              className="p-3 rounded-full cursor-pointer glass-btn btn-hover-scale hover:border-luxe-gold/40 transition-all duration-300"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Rolar para direita"
              className="p-3 rounded-full cursor-pointer glass-btn btn-hover-scale hover:border-luxe-gold/40 transition-all duration-300"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div ref={carouselContainerRef}>
          <div
            ref={carouselRef}
            className="stagger-container flex gap-6 overflow-x-auto pb-10 scrollbar-premium snap-x snap-mandatory scroll-smooth"
            aria-roledescription="carousel"
            aria-label="Produtos do Grupo Boticário"
            style={{ scrollbarWidth: "thin" }}
          >
          {PRODUCTS.map((prod) => (
            <div
              key={prod.name}
              data-carousel-card
              className="reveal-up min-w-[280px] sm:min-w-[320px] md:min-w-[340px] max-w-[340px] bg-black/50 border border-white/10 p-6 md:p-8 rounded-2xl snap-start flex flex-col justify-between group hover:border-luxe-gold/60 hover:bg-black/70 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] sm:text-[11px] tracking-widest uppercase font-semibold text-white/50">{prod.brand}</span>
                  <span
                    className={`inline-block text-[10px] sm:text-[11px] tracking-wider font-bold uppercase px-2.5 py-1 rounded-full transition-all duration-500 ${
                      prod.oldPrice
                        ? "text-white bg-luxe-bordo border border-luxe-bordo"
                        : "text-luxe-gold-soft border border-luxe-gold-soft/30 bg-luxe-gold/10 group-hover:border-luxe-gold-soft/60 group-hover:bg-luxe-gold/15"
                    }`}
                  >
                    {prod.tag}
                  </span>
                </div>

                <h3 className="mt-6 font-sans text-xl sm:text-2xl font-bold leading-tight group-hover:text-luxe-gold-soft transition-colors duration-300">
                  {prod.name}
                </h3>
                <p className="mt-4 text-white/65 text-sm sm:text-base font-sans font-light leading-relaxed min-h-[72px]">
                  {prod.desc}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 group-hover:border-luxe-gold/20 transition-colors duration-500 flex flex-wrap items-center justify-between gap-2">
                <div>
                  {prod.oldPrice && (
                    <span className="text-xs sm:text-sm text-white/40 line-through block mb-0.5">{prod.oldPrice}</span>
                  )}
                  <span className="font-sans text-lg sm:text-xl font-bold text-luxe-gold-soft">{prod.price}</span>
                </div>

                <a
                  href={waLink(prod.waMsg)}
                  target="_blank"
                  rel="noreferrer"
                  className="relative btn-hover-scale inline-flex flex-wrap items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-luxe-gold-soft/80 group-hover:text-luxe-gold-soft border-b border-luxe-gold-soft/40 group-hover:border-luxe-gold-soft pb-1 transition-all duration-300 before:absolute before:inset-[-6px] before:content-['']"
                >
                  {prod.ctaText} <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
          </div>

          {/* Scroll-position feedback — the styled scrollbar above is desktop-only (iOS/Android hide it) */}
          <div aria-hidden="true" className="mt-1 h-[2px] w-24 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-luxe-gold transition-[width] duration-150 ease-out"
              style={{ width: `${12 + scrollFraction * 88}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
});

export default BoticarioCarousel;
