import { motion } from "framer-motion";
import { Timer, MessageCircle, ArrowRight } from "lucide-react";
import { useState, useEffect, memo, lazy, Suspense } from "react";
import { waLink } from "@/lib/whatsapp";
import { useFadeUp } from "@/hooks/useFadeUp";
import FloatingBadge from "@/components/sections/FloatingBadge";
import LazySection from "@/components/sections/LazySection";
import WhatsappFloating from "@/components/sections/WhatsappFloating";

const AntigravityParticles = lazy(() => import("@/components/AntigravityParticles").then(m => ({ default: m.AntigravityParticles })));

// Assets - URLs publicas
const heroPerfume = "/malbec-signatureA.webp";
const malbecLifestyleImg = "/malbec-lifestyle.webp";
const malbecCollageImg = "/malbec-collage.webp";
const florattaRedImg = "/floratta-red-lifestyle.webp";
const hairCareVolumeImg = "/hair-care-volume.webp";
const hairCareLisoImg = "/hair-care-liso.webp";
const consultoraImg = "/consultora.webp";

// Lazy-loaded section imports
const TrustBar = lazy(() => import("@/components/sections/TrustBar"));
const HairCareSuite = lazy(() => import("@/components/sections/HairCareSuite"));
const PerfumesHeader = lazy(() => import("@/components/sections/PerfumesHeader"));
const MalbecShowcase = lazy(() => import("@/components/sections/MalbecShowcase"));
const FlorattaRedShowcase = lazy(() => import("@/components/sections/FlorattaRedShowcase"));
const BoticarioCarousel = lazy(() => import("@/components/sections/BoticarioCarousel"));
const KitsGrid = lazy(() => import("@/components/sections/KitsGrid"));
const Consultoria = lazy(() => import("@/components/sections/Consultoria"));
const Depoimentos = lazy(() => import("@/components/sections/Depoimentos"));
const Faq = lazy(() => import("@/components/sections/Faq"));
const CtaFinal = lazy(() => import("@/components/sections/CtaFinal"));
const Footer = lazy(() => import("@/components/sections/Footer"));

const LandingPage = memo(function LandingPage() {
  return (
    <main className="min-h-screen bg-luxe-bg text-luxe-ink overflow-x-hidden relative font-sans">
      <Nav />
      <Hero />
      <LazySection><Suspense fallback={null}><TrustBar /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><HairCareSuite volumeImg={hairCareVolumeImg} lisoImg={hairCareLisoImg} /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><PerfumesHeader /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><MalbecShowcase lifestyleImg={malbecLifestyleImg} collageImg={malbecCollageImg} /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><FlorattaRedShowcase image={florattaRedImg} /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><BoticarioCarousel /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><KitsGrid /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><Consultoria image={consultoraImg} /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><Depoimentos /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><Faq /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><CtaFinal heroImage={heroPerfume} /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><Footer /></Suspense></LazySection>
      <WhatsappFloating />
    </main>
  );
});

/* -------------------------------- NAV ------------------------------------ */

const Nav = memo(function Nav() {
  return (
    <header className="absolute top-0 inset-x-0 z-30">

      {/* ═══════════════════ MOBILE: premium centered header ═══════════════════ */}
      <div className="md:hidden header-premium text-white">
        <div className="mx-auto max-w-7xl px-4 py-3">

          {/* Top bar: nav links + WhatsApp */}
          <div className="grid grid-cols-[auto_1fr_auto] gap-x-5 items-center mb-2.5">
            <div />
            <nav className="flex items-center gap-3 text-[11px] tracking-[0.18em] uppercase font-sans justify-self-start ml-1">
              <a href="#haircare" className="hover:text-luxe-gold-soft transition-colors font-medium">Hair</a>
              <a href="#perfumes" className="hover:text-luxe-gold-soft transition-colors font-medium">Perfumes</a>
              <a href="#kits" className="hover:text-luxe-gold-soft transition-colors font-medium">Kits</a>
              <a href="#faq" className="hover:text-luxe-gold-soft transition-colors font-medium">FAQ</a>
            </nav>
            <a
              href={waLink("Olá, vim pela página e quero atendimento de luxo inteligente.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.12em] uppercase font-bold transition-colors justify-self-end"
              style={{ color: "#25d366" }}
            >
              WhatsApp <ArrowRight className="size-3.5" />
            </a>
          </div>

          {/* Center: brand title */}
          <div className="text-center mb-2.5">
            <h2
              className="font-display text-xl font-bold tracking-[0.14em] uppercase"
              style={{
                color: "#D4AF37",
                textShadow: "0 0 14px rgba(212,175,55,0.35), 0 0 30px rgba(212,175,55,0.12)",
              }}
            >
              Maison Parfum
            </h2>
          </div>

          {/* Brand logos 2 rows */}
          <div className="flex flex-col gap-1.5 items-center">
            <div className="flex items-center justify-center gap-2.5">
              <img src="/brands/oboticario.svg" alt="O Boticário" title="O Boticário" width="90" height="36" className="h-9 w-auto rounded-sm opacity-90" />
              <img src="/brands/eudora.svg" alt="Eudora" title="Eudora" width="90" height="36" className="h-9 w-auto rounded-sm opacity-90" />
              <img src="/brands/qdb.svg" alt="QDB" title="Quem Disse, Berenice?" width="90" height="36" className="h-9 w-auto rounded-sm opacity-90" />
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <img src="/brands/multib.svg" alt="Multi B" title="Multi B" width="90" height="36" className="h-9 w-auto rounded-sm opacity-90" />
              <img src="/brands/vult.svg" alt="Vult" title="Vult" width="90" height="36" className="h-9 w-auto rounded-sm opacity-90" />
              <img src="/brands/oui.svg" alt="O.U.i" title="O.U.i" width="90" height="36" className="h-9 w-auto rounded-sm opacity-90" />
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════ DESKTOP: original layout ═══════════════════ */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 py-3 md:py-5 flex items-center justify-between text-white">
          <div className="leading-tight">
            <div className="font-sans text-2xl md:text-2xl lg:text-3xl font-semibold tracking-[0.18em] md:tracking-[0.22em] uppercase">
              <span className="text-luxe-gold-soft">Maison</span>
              <span className="text-luxe-gold/50 mx-1"> · </span>
              <span className="text-white/90">Parfum</span>
            </div>
            <div className="mt-1 text-[11px] md:text-[10px] tracking-[0.22em] md:tracking-[0.32em] uppercase font-sans font-semibold" style={{color:"var(--color-luxe-gold-soft)",opacity:0.8}}>
              Revendedor Oficial Grupo Boticário
            </div>
            <div className="mt-2.5 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                {[
                  { name: "O Boticário", logo: "/brands/oboticario.svg" },
                  { name: "Eudora",      logo: "/brands/eudora.svg"     },
                  { name: "QDB",         logo: "/brands/qdb.svg"        },
                ].map((brand) => (
                  <img
                    key={brand.name}
                    src={brand.logo}
                    alt={brand.name}
                    title={brand.name}
                    width="90"
                    height="36"
                    className="h-7 sm:h-8 md:h-8 lg:h-9 w-auto rounded-sm opacity-90 hover:opacity-100 transition-opacity duration-200"
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                {[
                  { name: "Multi B",     logo: "/brands/multib.svg"     },
                  { name: "Vult",        logo: "/brands/vult.svg"       },
                  { name: "O.U.i",       logo: "/brands/oui.svg"        },
                ].map((brand) => (
                  <img
                    key={brand.name}
                    src={brand.logo}
                    alt={brand.name}
                    title={brand.name}
                    width="90"
                    height="36"
                    className="h-7 sm:h-8 md:h-8 lg:h-9 w-auto rounded-sm opacity-90 hover:opacity-100 transition-opacity duration-200"
                  />
                ))}
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-10 text-[14px] tracking-[0.24em] uppercase font-sans">
            <a href="#haircare" className="hover:text-luxe-gold-soft transition-colors font-semibold">Hair Care</a>
            <a href="#perfumes" className="hover:text-luxe-gold-soft transition-colors font-semibold">Perfumes</a>
            <a href="#mais-amados" className="hover:text-luxe-gold-soft transition-colors font-semibold">Mais Amados</a>
            <a href="#kits" className="hover:text-luxe-gold-soft transition-colors font-semibold">Kits</a>
            <a href="#faq" className="hover:text-luxe-gold-soft transition-colors font-semibold">FAQ</a>
          </nav>
          <a
            href={waLink("Olá, vim pela página e quero atendimento de luxo inteligente.")}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-[14px] tracking-[0.2em] uppercase font-bold transition-colors"
            style={{ color: "#25d366" }}
          >
            WhatsApp <ArrowRight className="size-4" />
          </a>
        </div>
      </div>

    </header>
  );
});

/* -------------------------------- HERO ----------------------------------- */

const Hero = memo(function Hero() {
  const fade = useFadeUp();
  const [showParticles, setShowParticles] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShowParticles(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <section className="relative min-h-screen w-full bg-[#070707] text-white overflow-hidden flex flex-col justify-end">
      {/* Background Interactive Particles (Antigravity effect) — deferred for LCP */}
      {showParticles && <Suspense fallback={null}><AntigravityParticles /></Suspense>}

      <picture>
        <source srcSet="/malbecSMOB.webp" media="(max-width: 767px)" />
        <img
          src={heroPerfume}
          alt="Fragrância de luxo iluminada em fundo escuro com reflexos dinâmicos"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={1600}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-black/50" />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 md:px-6 pt-40 pb-32 md:pt-48 md:pb-32 flex flex-col justify-end">
        <motion.div {...fade} className="max-w-3xl">
          <div className="mb-2 sm:mb-8 hidden md:flex md:justify-start">
            <FloatingBadge className="border-white/30 bg-white/95">
              <Timer className="size-3 sm:size-3.5 text-luxe-black" />
              <span className="text-[9px] sm:text-[12px] tracking-[0.24em] sm:tracking-[0.32em] uppercase text-luxe-black font-semibold">
                Entrega VIP · Em até 1h para BH e Região
              </span>
            </FloatingBadge>
          </div>

          <h1 className="font-display text-[19vw] md:text-[7rem] leading-[0.85] md:leading-[1.0] tracking-tight font-bold">
            <span className="text-gold-foil">
              Luxo Acessível
            </span>
            <br />
            <span className="text-white/95 drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]">
              Para Todos.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg md:text-lg text-luxe-gold-light/95 font-sans font-normal leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
            Perfumaria e hair care premium do Grupo Boticário com entrega expressa para <strong className="text-white font-semibold">BH e regiões</strong>.
            Peça agora pelo WhatsApp e receba seu pedido em minutos, com segurança e preço justo.
          </p>

          <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-4">
            <a
              href={waLink(
                "Olá! Quero fazer meu pedido para entrega expressa em BH/região. Pode me ajudar?",
              )}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 whitespace-nowrap bg-whatsapp hover:bg-whatsapp-hover text-black font-bold px-4 py-3 md:px-8 md:py-4 text-sm md:text-base tracking-wide [animation:luxe-glow_2.5s_ease-in-out_infinite] hover:shadow-[0_0_25px_rgba(37,211,102,0.4)]"
            >
              <MessageCircle className="size-5" />
              Peça Agora e Receba em Minutos
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#haircare"
              className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.2em] uppercase text-white/85 hover:text-luxe-gold-soft border-b border-white/30 hover:border-luxe-gold-soft pb-1 transition-colors"
            >
              Explorar Ofertas
            </a>
          </div>

          <div className="mt-14 md:mt-16 flex flex-wrap items-center gap-4 md:gap-6 text-[10px] tracking-[0.24em] md:tracking-[0.32em] uppercase text-white/50 font-semibold">
            <span>Grupo Boticário</span>
            <span className="h-px w-8 bg-luxe-gold/50" />
            <span>Eudora</span>
          </div>

          <div className="md:hidden mt-6">
            <FloatingBadge className="border-white/30 bg-white/95 px-2.5 py-1">
              <Timer className="size-3 text-luxe-black" />
              <span className="text-[11px] tracking-[0.14em] uppercase text-luxe-black font-semibold">
                Entrega VIP · Em até 1h para BH e Região
              </span>
            </FloatingBadge>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default function HomePage() {
  return <LandingPage />;
}
