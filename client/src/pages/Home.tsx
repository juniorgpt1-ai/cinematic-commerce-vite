import { Timer } from "lucide-react";
import { useState, useEffect, memo, lazy, Suspense } from "react";
import { waLink } from "@/lib/whatsapp";
import FloatingBadge from "@/components/sections/FloatingBadge";
import LazySection from "@/components/sections/LazySection";
import WhatsappFloating from "@/components/sections/WhatsappFloating";
import SendMorphIcon from "@/components/sections/SendMorphIcon";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSendMorph } from "@/hooks/useSendMorph";

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
const ComoFunciona = lazy(() => import("@/components/sections/ComoFunciona"));
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
      <LazySection minHeight={260}><Suspense fallback={null}><PerfumesHeader /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><MalbecShowcase lifestyleImg={malbecLifestyleImg} collageImg={malbecCollageImg} /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><FlorattaRedShowcase image={florattaRedImg} /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><BoticarioCarousel /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><KitsGrid /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><Consultoria image={consultoraImg} /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><ComoFunciona /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><Depoimentos /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><Faq /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><CtaFinal heroImage="/malbecSMOB.webp" /></Suspense></LazySection>
      <LazySection><Suspense fallback={null}><Footer /></Suspense></LazySection>
      <WhatsappFloating />
    </main>
  );
});

/* -------------------------------- NAV ------------------------------------ */

const Nav = memo(function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-30 nav-scroll ${scrolled ? "scrolled" : ""}`}>

        {/* ═══════════════════ MOBILE: nav row only ═══════════════════ */}
        <div className="md:hidden bg-black/40 backdrop-blur-sm text-white">
          <div className="nav-inner px-3 py-2">
            <div className="flex items-center justify-between gap-1.5">
              <a href="/" aria-label="S&C Beauty — Início" className="shrink-0 logo-wrap">
                <img src="/sc-monogram-white.svg" alt="S&C Beauty" className="logo-base h-10 w-auto" />
                <div className="logo-shine"></div>
              </a>
              <nav className="flex items-center gap-2.5 text-[11px] tracking-[0.12em] uppercase font-sans">
                <a href="#haircare" className="relative hover:text-luxe-gold-soft transition-colors font-medium before:absolute before:inset-[-5px] before:content-['']">Hair</a>
                <a href="#perfumes" className="relative hover:text-luxe-gold-soft transition-colors font-medium before:absolute before:inset-[-5px] before:content-['']">Perfumes</a>
                <a href="#faq" className="relative hover:text-luxe-gold-soft transition-colors font-medium before:absolute before:inset-[-5px] before:content-['']">FAQ</a>
                <a href="#kits" className="relative hover:text-luxe-gold-soft transition-colors font-medium before:absolute before:inset-[-5px] before:content-['']">Kits</a>
              </nav>
              <a
                href={waLink("Olá, vim pela página e quero atendimento de luxo inteligente.")}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-1 text-[13px] tracking-[0.10em] uppercase font-bold transition-colors shrink-0 text-luxe-gold-soft before:absolute before:inset-[-5px] before:content-['']"
              >
                WhatsApp <img src="/msg.svg" alt="" className="size-4 invert" />
              </a>
            </div>
          </div>
        </div>

        {/* ═══════════════════ DESKTOP: clean layout ═══════════════════ */}
        <div className="hidden md:block">
          <div className="nav-inner mx-auto max-w-7xl px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-6 text-white">
            <a href="/" aria-label="S&C Beauty — Início" className="shrink-0 logo-wrap">
              <img src="/sc-monogram-white.svg" alt="S&C Beauty" className="logo-base h-10 lg:h-12 w-auto" />
              <div className="logo-shine"></div>
            </a>
            <nav className="flex items-center gap-4 xl:gap-10 text-[14px] xl:text-[16px] tracking-[0.12em] xl:tracking-[0.24em] uppercase font-sans whitespace-nowrap">
              <a href="#haircare" className="relative hover:text-luxe-gold-soft transition-colors font-semibold before:absolute before:inset-[-10px] before:content-['']">Hair Care</a>
              <a href="#perfumes" className="relative hover:text-luxe-gold-soft transition-colors font-semibold before:absolute before:inset-[-10px] before:content-['']">Perfumes</a>
              <a href="#mais-amados" className="relative hover:text-luxe-gold-soft transition-colors font-semibold before:absolute before:inset-[-10px] before:content-['']">Mais Amados</a>
              <a href="#kits" className="relative hover:text-luxe-gold-soft transition-colors font-semibold before:absolute before:inset-[-10px] before:content-['']">Kits</a>
              <a href="#faq" className="relative hover:text-luxe-gold-soft transition-colors font-semibold before:absolute before:inset-[-10px] before:content-['']">FAQ</a>
            </nav>
            <a
              href={waLink("Olá, vim pela página e quero atendimento de luxo inteligente.")}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 text-[14px] xl:text-[16px] tracking-[0.1em] xl:tracking-[0.2em] uppercase font-bold transition-colors text-luxe-gold-soft before:absolute before:inset-[-10px] before:content-[''] whitespace-nowrap shrink-0"
            >
              WhatsApp <img src="/msg.svg" alt="" className="size-5" />
            </a>
          </div>
        </div>

      </header>
    </>
  );
});

/* -------------------------------- HERO ----------------------------------- */

const Hero = memo(function Hero() {
  const [showParticles, setShowParticles] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShowParticles(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const ctaRef = useScrollReveal<HTMLAnchorElement>();
  const { phase: sendPhase, trigger: triggerSend } = useSendMorph();
  return (
    <section className="relative min-h-[100dvh] md:min-h-screen w-full bg-[#070707] text-white overflow-hidden flex flex-col justify-end">
      {/* Background Interactive Particles (Antigravity effect) — deferred for LCP */}
      {showParticles && <Suspense fallback={null}><AntigravityParticles /></Suspense>}

      <picture>
        <source srcSet="/malbecSMOB.webp" media="(max-width: 767px)" />
        <source srcSet="/malbecDDESK.webp" media="(min-width: 768px)" />
        <img
          src={heroPerfume}
          alt="Fragrância de luxo iluminada em fundo escuro com reflexos dinâmicos"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          width={1600}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover object-[55%_center] md:object-center opacity-100 animate-hero-bg-zoom"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-black/50" />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 md:px-6 pt-24 md:pt-32 pb-20 md:pb-40 flex flex-col justify-end flex-1 md:grow-0">
        <div className="max-w-3xl flex flex-col flex-1 md:grow-0 justify-between md:justify-normal gap-y-10">
          <div>
            <div className="mb-2 sm:mb-8 hidden md:flex md:justify-start animate-fade-up" style={{ animationDelay: "0ms" }}>
              <FloatingBadge className="border-white/30 bg-white/95">
                <Timer className="size-3 sm:size-3.5 text-luxe-black" />
                <span className="text-[9px] sm:text-[12px] tracking-[0.24em] sm:tracking-[0.32em] uppercase text-luxe-black font-semibold">
                  Entrega VIP · Em até 1h para BH e Região
                </span>
              </FloatingBadge>
            </div>

            <h1 className="font-display text-[clamp(2.75rem,11vw,6rem)] leading-[1.0] md:leading-[1.05] tracking-tight font-bold">
              <span className="block text-[clamp(0.85rem,3vw,1.15rem)] tracking-[0.24em] uppercase font-sans font-semibold text-luxe-gold-soft mb-4 md:mb-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] animate-fade-up" style={{ animationDelay: "100ms" }}>
                Perfumaria Premium
              </span>
              <span className="text-white/95 drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)] animate-fade-up" style={{ animationDelay: "200ms" }}>
                Entrega Expressa
              </span>
              <br />
              <span className="text-white/80 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] animate-fade-up" style={{ animationDelay: "300ms" }}>
                em BH e Região
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base md:text-lg text-white/82 font-sans font-normal leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)] animate-fade-up" style={{ animationDelay: "400ms" }}>
              Grupo Boticário e Eudora. Peça pelo WhatsApp, receba em minutos.
            </p>

          </div>

          <div className="animate-fade-up" style={{ animationDelay: "500ms" }}>
            <div className="mt-14 md:mt-16 flex flex-col items-start gap-2">
              <a
                ref={ctaRef}
                href={waLink(
                  "Olá! Quero fazer meu pedido para entrega expressa em BH/região. Pode me ajudar?",
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={triggerSend}
                className="PrimaryWhatsAppCTA btn-hover-scale btn-breathe [--btn-breathe-rest:#25d366] [--btn-breathe-peak:#2ecc71] group inline-flex items-center justify-center gap-2.5 whitespace-nowrap bg-whatsapp hover:bg-whatsapp-hover text-white font-bold px-6 py-4 md:px-10 md:py-5 text-lg md:text-xl tracking-wide shadow-lg shadow-green-500/25 w-[calc(100%-32px)] mx-4 md:w-auto md:mx-0"
              >
                <SendMorphIcon phase={sendPhase} className="size-6 md:size-7" />
                <span className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">Peça no WhatsApp</span>
                <img src="/msg.svg" alt="" className="size-6 md:size-7 group-hover:translate-x-1 transition-transform" />
              </a>
              <span className="text-xs text-white/70 font-sans font-normal tracking-wide text-center w-full md:text-left px-4 md:px-0">
                Resposta em minutos
              </span>

              {/* ── Desktop-only brand trust marks ── */}
              <div className="hidden md:flex items-center gap-4 lg:gap-5 mt-4 animate-fade-up" style={{ animationDelay: "700ms" }}>
                <span className="text-[10px] lg:text-[11px] tracking-[0.22em] uppercase text-white/50 font-sans font-medium shrink-0">Revenda autorizada</span>
                <div className="flex items-center gap-3 lg:gap-4">
                  {[
                    { name: "O Boticário", logo: "/brands/oboticario.svg" },
                    { name: "Eudora",      logo: "/brands/eudora.svg"     },
                    { name: "QDB",         logo: "/brands/qdb.svg"        },
                    { name: "Multi B",     logo: "/brands/multib.svg"     },
                    { name: "Vult",        logo: "/brands/vult.svg"       },
                    { name: "O.U.i",       logo: "/brands/oui.svg"        },
                  ].map((brand) => (
                    <img
                      key={brand.name}
                      src={brand.logo}
                      alt={brand.name}
                      title={brand.name}
                      className="h-4 lg:h-5 xl:h-6 w-auto opacity-40 hover:opacity-70 transition-opacity duration-300"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="md:hidden mt-4">
              <FloatingBadge className="border-white/30 bg-white/95 px-2.5 py-1">
                <Timer className="size-3 text-luxe-black" />
                <span className="text-[11px] tracking-[0.14em] uppercase text-luxe-black font-semibold">
                  Entrega VIP · Em até 1h para BH e Região
                </span>
              </FloatingBadge>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
});

export default function HomePage() {
  return <LandingPage />;
}
