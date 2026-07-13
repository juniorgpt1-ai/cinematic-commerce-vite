import { memo, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { useFadeUp } from "@/hooks/useFadeUp";

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
      tag: "Frescor Inteligente",
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
  const fade = useFadeUp();
  const carouselRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="mais-amados" className="bg-luxe-dark-gradient text-white py-32 md:py-40 relative overflow-hidden border-b border-luxe-line/30">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <motion.div {...fade} className="max-w-2xl">
            <span className="eyebrow text-luxe-gold-soft">Seleção dos Favoritos</span>
            <h2 className="mt-5 font-section text-5xl md:text-5xl font-semibold leading-[1.08]">
              Mais Amados do Grupo Boticário
            </h2>
            <p className="mt-6 text-white/60 font-sans font-light">
              Escolhas consagradas, luxo acessível e alta performance olfativa e de tratamento. A melhor seleção para você.
            </p>
          </motion.div>

          <motion.div {...fade} className="flex gap-3 mt-6 md:mt-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Rolar para esquerda"
              className="p-3 rounded-full cursor-pointer glass-btn"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Rolar para direita"
              className="p-3 rounded-full cursor-pointer glass-btn"
            >
              <ArrowRight className="size-5" />
            </button>
          </motion.div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={carouselRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Produtos do Grupo Boticário"
          className="flex gap-6 overflow-x-auto pb-10 scrollbar-premium snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "thin" }}
        >
          {PRODUCTS.map((prod, idx) => (
            <motion.div
              key={prod.name}
              {...fade}
              transition={{ ...fade.transition, delay: idx * 0.05 }}
              data-carousel-card
              className="min-w-[260px] md:min-w-[340px] max-w-[340px] bg-black/40 border border-white/8 p-6 md:p-8 rounded-xs snap-start flex flex-col justify-between group hover:border-luxe-gold/50 duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-y-[-2px]"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[9px] tracking-widest uppercase font-semibold text-white/50">{prod.brand}</span>
                  <span className="inline-block text-[9px] tracking-wider font-bold text-luxe-gold-soft uppercase border border-luxe-gold-soft/30 bg-luxe-gold/10 px-2 py-0.5 rounded-sm">
                    {prod.tag}
                  </span>
                </div>

                <h3 className="mt-6 font-sans text-2xl font-bold leading-tight group-hover:text-luxe-gold-soft transition-colors">
                  {prod.name}
                </h3>
                <p className="mt-4 text-white/70 text-base font-sans font-light leading-relaxed min-h-[72px]">
                  {prod.desc}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  {prod.oldPrice && (
                    <span className="text-xs text-white/40 line-through block mb-0.5">{prod.oldPrice}</span>
                  )}
                  <span className="font-sans text-xl font-bold text-luxe-gold-soft">{prod.price}</span>
                </div>

                <a
                  href={waLink(prod.waMsg)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-wrap items-center justify-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-luxe-gold-soft/80 hover:text-luxe-gold-soft border-b border-luxe-gold-soft/50 hover:border-luxe-gold-soft pb-1 transition-all"
                >
                  {prod.ctaText} <ArrowRight className="size-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default BoticarioCarousel;
