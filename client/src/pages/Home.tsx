// TanStack Router removido - usando Wouter para roteamento
import { motion, useReducedMotion } from "framer-motion";
import {
  Timer,
  ShieldCheck,
  Sparkles,
  Gift,
  MessageCircle,
  ChevronDown,
  Instagram,
  Quote,
  ArrowRight,
  ChevronLeft,
  Award,
} from "lucide-react";
import { useState, useRef, useEffect, useMemo, memo, lazy, Suspense } from "react";
import { waLink } from "@/lib/whatsapp";

const AntigravityParticles = lazy(() => import("@/components/AntigravityParticles").then(m => ({ default: m.AntigravityParticles })));

// Assets - URLs públicas
const heroPerfume = "/malbec-signatureA.webp";
const malbecLifestyleImg = "/malbec-lifestyle.webp";
const malbecCollageImg = "/malbec-collage.webp";
const florattaRedImg = "/floratta-red-lifestyle.webp";
const lilyImg = "/lily.webp";
const hairCareVolumeImg = "/hair-care-volume.webp";
const hairCareLisoImg = "/hair-care-liso.webp";
const consultoraImg = "/consultora.webp";

// Removido: TanStack Router não é necessário no Vite simples

/* -------------------------------------------------------------------------- */

function useFadeUp() {
  const reduce = useReducedMotion();
  return useMemo(() => ({
    initial: reduce ? {} : { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  }), [reduce]);
}

const FloatingBadge = memo(function FloatingBadge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.span
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`inline-flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 border border-luxe-gold/60 bg-luxe-bg/90 backdrop-blur-xs px-3 py-1.5 sm:px-4 sm:py-2 shadow-md max-w-full text-[11px] sm:text-[14px] tracking-wider ${className}`}
    >
      {children}
    </motion.span>
  );
});

const LazySection = memo(function LazySection({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "800px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref}>{visible ? children : null}</div>;
});

const LandingPage = memo(function LandingPage() {
  return (
    <main className="min-h-screen bg-luxe-bg text-luxe-ink overflow-x-hidden relative font-sans">
      <Nav />
      <Hero />
      <LazySection><TrustBar /></LazySection>
      <LazySection><HairCareSuite /></LazySection>
      <LazySection><PerfumesHeader /></LazySection>
      <LazySection><MalbecShowcase /></LazySection>
      <LazySection><FlorattaRedShowcase /></LazySection>
      <LazySection><BoticarioCarousel /></LazySection>
      <LazySection><KitsGrid /></LazySection>
      <LazySection><Consultoria /></LazySection>
      <LazySection><Depoimentos /></LazySection>
      <LazySection><Faq /></LazySection>
      <LazySection><CtaFinal /></LazySection>
      <LazySection><Footer /></LazySection>
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
          <div className="grid grid-cols-[1fr_auto_1fr] items-center mb-2.5">
            <div />
            <nav className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase font-sans justify-self-center">
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
              <img src="/brands/oboticario.svg" alt="O Boticário" title="O Boticário" className="h-9 w-auto rounded-sm opacity-90" />
              <img src="/brands/eudora.svg" alt="Eudora" title="Eudora" className="h-9 w-auto rounded-sm opacity-90" />
              <img src="/brands/qdb.svg" alt="QDB" title="Quem Disse, Berenice?" className="h-9 w-auto rounded-sm opacity-90" />
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <img src="/brands/multib.svg" alt="Multi B" title="Multi B" className="h-9 w-auto rounded-sm opacity-90" />
              <img src="/brands/vult.svg" alt="Vult" title="Vult" className="h-9 w-auto rounded-sm opacity-90" />
              <img src="/brands/oui.svg" alt="O.U.i" title="O.U.i" className="h-9 w-auto rounded-sm opacity-90" />
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

      <img
        src={heroPerfume}
        alt="Fragrância de luxo iluminada em fundo escuro com reflexos dinâmicos"
        fetchPriority="high"
        loading="eager"
        width={1600}
        height={1200}
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
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
              className="group inline-flex flex-wrap items-center justify-center gap-3 bg-whatsapp hover:bg-whatsapp-hover text-black font-bold px-6 py-3.5 md:px-8 md:py-4 text-base md:text-base tracking-wide transition-all shadow-[0_0_20px_rgba(37,211,102,0.2)] hover:shadow-[0_0_25px_rgba(37,211,102,0.4)]"
            >
              <MessageCircle className="size-6" />
              Peça Agora e Receba em Minutos
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
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

          <div className="md:hidden mt-20">
            <FloatingBadge className="border-white/30 bg-white/95 px-3.5 py-1.5">
              <Timer className="size-4 text-luxe-black" />
              <span className="text-[12px] tracking-[0.2em] uppercase text-luxe-black font-semibold">
                Entrega VIP · Em até 1h para BH e Região
              </span>
            </FloatingBadge>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

/* ------------------------------ TRUSTBAR --------------------------------- */

const TrustBar = memo(function TrustBar() {
  const items = [
    {
      icon: Timer,
      title: "Entrega em 60 Minutos",
      desc: "Disponível para BH e região metropolitana via Uber Flash com máxima agilidade.",
    },
    {
      icon: ShieldCheck,
      title: "Genuínos",
      desc: "Produtos originais direto de distribuidores autorizados com nota fiscal garantida.",
    },
    {
      icon: Sparkles,
      title: "Consultoria Exclusiva",
      desc: "Especialista olfativo e capilar dedicado no WhatsApp para guiar sua escolha.",
    },
    {
      icon: Gift,
      title: "Toque de Luxo Gratuito",
      desc: "Todos os pedidos acompanham nossa embalagem premium.",
    },
  ];
  const fade = useFadeUp();
  return (
    <section className="relative border-y border-luxe-line/60 bg-luxe-bg/50 backdrop-blur-xs">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.08 }}
              className="flex flex-col gap-4 relative group"
            >
              <it.icon className="size-6 text-luxe-gold group-hover:scale-110 transition-transform duration-300" strokeWidth={1.4} />
              <span className="gold-rule" />
              <h3 className="font-section text-[22px] md:text-3xl leading-tight font-semibold tracking-wide break-words">{it.title}</h3>
              <p className="text-base text-luxe-ink/85 leading-relaxed font-sans font-light">
                {it.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

/* --------------------------- HAIR CARE SUITE ----------------------------- */

const HairCareSuite = memo(function HairCareSuite() {
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
              <img
                src={hairCareVolumeImg}
                alt="Modelo lavando cabelos com produtos Siàge Hair-Plastia"
                loading="lazy"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
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
              <img
                src={hairCareLisoImg}
                alt="Modelo com cabelo liso e alinhado sob fluxo de água"
                loading="lazy"
                className="h-full w-full object-cover object-[75%]"
              />
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

/* ------------------------ PERFUMES HEADER -------------------------------- */

const PerfumesHeader = memo(function PerfumesHeader() {
  const fade = useFadeUp();
  return (
    <section id="perfumes" className="bg-luxe-bg pt-24 md:pt-32 pb-6 border-b border-luxe-line/20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 relative z-10 text-center">
        <motion.div {...fade} className="max-w-3xl mx-auto">
          <span className="eyebrow">Fragrâncias de Sucesso</span>
          <h2 className="mt-4 font-section text-5xl md:text-6xl font-semibold leading-tight">
            Encontre Sua Assinatura de Sucesso
          </h2>
          <p className="mt-6 text-lg text-luxe-ink/85 font-sans font-light">
            Com nossas fragrâncias mais vendidas, marcantes e recomendadas por especialistas olfativos.
          </p>
          <span className="gold-rule mt-8 mx-auto" />
        </motion.div>
      </div>
    </section>
  );
});

/* ---------------------------- SHOWCASE BASE ------------------------------ */

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

const MalbecShowcase = memo(function MalbecShowcase() {
  const fade = useFadeUp();
  return (
    <section id="malbec" className="relative bg-luxe-bg border-b border-luxe-line/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 relative z-10">
        {/* Top editorial split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Lifestyle hero image */}
          <motion.div {...fade} className="lg:col-span-7 relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-black shadow-2xl border border-luxe-line/20 group">
              <img
                src={malbecLifestyleImg}
                alt="Homem sofisticado aplicando Malbec O Boticário"
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              <div className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 flex flex-wrap items-center justify-between gap-2 text-white/80 text-[10px] tracking-[0.24em] md:tracking-[0.32em] uppercase font-semibold">
                <span>O BOTICÁRIO · MASCULINO</span>
                <span>MAISON PREMIUM</span>
              </div>
            </div>
            {/* Floating product bottle inset */}
            <div className="absolute -bottom-3 -right-3 md:-bottom-5 md:-right-5 z-20 w-32 md:w-44 animate-bottle-in animate-bottle-float">
              <img
                src="/malbec.webp"
                alt="Frasco Malbec Signature O Boticário"
                loading="lazy"
                className="w-full h-full object-contain drop-shadow-xl"
                style={{ mixBlendMode: "screen" }}
              />
            </div>
            <div className="absolute -bottom-2 -left-2 md:-bottom-3 md:-left-3 z-20">
              <FloatingBadge className="shadow-lg border-luxe-gold-soft/30 bg-black/90">
                <Award className="size-3.5 text-luxe-gold" />
                <span className="text-[14px] tracking-wider uppercase font-bold text-luxe-gold-soft">Mais Procurado</span>
              </FloatingBadge>
            </div>
          </motion.div>

          {/* Copy side */}
          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: 0.12 }}
            className="lg:col-span-5"
          >
            <span className="eyebrow text-luxe-gold">O Boticário · Perfumaria Masculina</span>
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
                className="group inline-flex flex-wrap items-center justify-center gap-3 bg-luxe-ink hover:bg-whatsapp text-white hover:text-black transition-colors px-5 py-3 md:px-8 md:py-4 text-sm font-semibold tracking-wide shadow-md"
              >
                <MessageCircle className="size-4" />
                Garantir meu Malbec
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Collage — full-width editorial image */}
        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.2 }}
          className="mt-20 md:mt-28"
        >
          <div className="bg-[#fdf7f1] p-3 md:p-6 rounded-xs shadow-2xl border border-luxe-line/20">
            {/* Full-width image */}
            <div className="overflow-hidden rounded-xs">
              <img
                src="/malbec-collage.webp"
                alt="Malbec O Boticário — relógio, frasco, aplicação e espelho"
                loading="lazy"
                className="w-full h-auto md:h-[600px] md:object-cover block"
              />
            </div>

            {/* Title */}
            <h2
              className="mt-8 md:mt-10 text-center font-section text-2xl md:text-4xl font-semibold text-luxe-ink leading-snug px-2"
              style={{ fontFamily: "var(--font-fenix)" }}
            >
              A marca de quem faz acontecer e não aceita menos que o melhor.
            </h2>

            {/* Gold metallic CTA button */}
            <div className="mt-6 md:mt-8 flex justify-center">
              <a
                href={waLink("Olá! Quero o Malbec Cologne com entrega VIP em 1h em BH.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 text-sm md:text-base font-bold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 hover:brightness-110 hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #c9a84c 0%, #e2c87a 30%, #c9a84c 50%, #b8942e 70%, #c9a84c 100%)",
                  color: "#1a1a1a",
                  boxShadow: "0 4px 15px rgba(201, 168, 76, 0.4)",
                }}
              >
                Garantir Agora
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

const FlorattaRedShowcase = memo(function FlorattaRedShowcase() {
  return (
    <EditorialShowcase
      id="floratta-red"
      eyebrow="O Boticário · Perfumaria Feminina"
      title={
        <>
          Floratta Red. Romance e <span className="font-light italic text-luxe-gold">sedução inteligente</span>.
        </>
      }
      copy="Inspirada na flor da Maçã de Vermont. Floratta Red é uma fragrância feminina marcante, jovem e envolvente que combina com mulheres de atitude! Um floriental frutal de intensidade profunda perfeito para encontros românticos — indulgência inteligente a um valor acessível."
      notes={["Frutas Vermelhas, Laranja, Maçã", "Tuberosa, Violeta, Flor de Lótus", "Chocolate Amargo, Musk, Cedro"]}
      price="R$ 169,90"
      cta="Garantir meu Floratta Red"
      waMessage="Olá! Quero comprar o Floratta Red (O Boticário) com entrega rápida em 1h."
      image={florattaRedImg}
      imageAlt="Modelo com vestido vermelho segurando frasco Floratta Red em apartamento de luxo com vista da cidade"
      reverse
      sealText="Melhor Custo-Benefício"
    />
  );
});

const LilyShowcase = memo(function LilyShowcase() {
  return (
    <EditorialShowcase
      id="lily"
      eyebrow="Eudora / O Boticário · Perfumaria Feminina"
      title={
        <>
          Lily Eau de Parfum. Sofisticação e <span className="font-light italic text-luxe-bordo">luxo absoluto</span>.
        </>
      }
      copy="Uma das assinaturas olfativas mais famosas e cobiçadas. Lily é criado a partir do lírio e do método exclusivo de enfleurage, resultando em uma fragrância floral opulenta e de fixação impecável. Indulgência inteligente para quem não abre mão do melhor."
      notes={["Bergamota", "Lírio de Grasse", "Sândalo"]}
      price="R$ 349,90"
      cta="Garantir meu Lily"
      waMessage="Olá! Quero comprar o Lily Eau de Parfum com entrega VIP em 1h em BH."
      image={lilyImg}
      imageAlt="Frasco Lily envolto em pétalas de flores brancas e seda"
      tone="bordo"
      sealText="Best Seller Absoluto"
    />
  );
});

/* ---------------- BOTICÁRIO BEST SELLERS CAROUSEL ------------------------ */

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

const BoticarioCarousel = memo(function BoticarioCarousel() {
  const fade = useFadeUp();
  const carouselRef = useRef<HTMLDivElement>(null);

  const products: CarouselProduct[] = [
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

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 340; // width of card + gap
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="mais-amados" className="bg-[#111111] text-white py-24 md:py-32 relative overflow-hidden border-b border-luxe-line/30">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <motion.div {...fade} className="max-w-2xl">
            <span className="eyebrow text-luxe-gold-soft">Seleção dos Favoritos</span>
            <h2 className="mt-4 font-section text-5xl md:text-5xl font-semibold leading-tight">
              Mais Amados do Grupo Boticário
            </h2>
            <p className="mt-4 text-white/60 font-sans font-light">
              Escolhas consagradas, luxo acessível e alta performance olfativa e de tratamento. A melhor seleção para você.
            </p>
          </motion.div>
          
          <motion.div {...fade} className="flex gap-3 mt-6 md:mt-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Rolar para esquerda"
              className="p-3 border border-white/20 hover:border-luxe-gold-soft hover:text-luxe-gold-soft rounded-full transition-all cursor-pointer bg-black/45"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Rolar para direita"
              className="p-3 border border-white/20 hover:border-luxe-gold-soft hover:text-luxe-gold-soft rounded-full transition-all cursor-pointer bg-black/45"
            >
              <ArrowRight className="size-5" />
            </button>
          </motion.div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-10 scrollbar-premium snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "thin" }}
        >
          {products.map((prod, idx) => (
            <motion.div
              key={prod.name}
              {...fade}
              transition={{ ...fade.transition, delay: idx * 0.05 }}
              className="min-w-[260px] md:min-w-[340px] max-w-[340px] bg-black/35 backdrop-blur-xs border border-white/10 p-6 md:p-8 rounded-xs snap-start flex flex-col justify-between group hover:border-luxe-gold/50 transition-all duration-300 hover:translate-y-[-4px]"
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
                  className="inline-flex flex-wrap items-center justify-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-luxe-gold-soft hover:text-white border-b border-luxe-gold-soft/50 hover:border-white pb-1 transition-all"
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

/* -------------------------------- KITS ----------------------------------- */

const KitsGrid = memo(function KitsGrid() {
  const fade = useFadeUp();
  const kits = [
    {
      name: "Kit Ele Elegante",
      desc: "Malbec Cologne + sabonete líquido perfumado + necessaire em couro sintético. Indulgência inteligente.",
      price: "R$ 379,90",
      msg: "Quero o Kit Ele Elegante (Malbec + necessaire).",
      tag: "Best Seller"
    },
    {
      name: "Kit Ela Sublime",
      desc: "Lily Eau de Parfum + creme acetinado hidratante corporal + caixa rígida premium. Luxo inteligente.",
      price: "R$ 429,90",
      msg: "Quero o Kit Ela Sublime (Lily + creme acetinado).",
      tag: "Mais Vendido"
    },
    {
      name: "Combo Casal Real",
      desc: "Malbec Cologne + Lily Eau de Parfum. A união perfeita de duas assinaturas marcantes e inesquecíveis.",
      price: "R$ 619,90",
      msg: "Quero o Combo Casal Real (Malbec + Lily).",
      tag: "Melhor Preço"
    },
  ];
  return (
    <section id="kits" className="bg-luxe-ink text-white relative overflow-hidden">
      
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 relative z-10">
        <motion.div {...fade} className="max-w-2xl mb-16">
          <span className="eyebrow text-luxe-gold-soft">Curadoria de Presentes</span>
          <h2 className="mt-4 font-section text-5xl md:text-5xl font-semibold leading-tight">
            Kits & Combos Inteligentes
          </h2>
          <p className="mt-4 text-white/60 text-lg font-sans font-light leading-relaxed max-w-xl">
            Combinações desenvolvidas por especialistas para presentear com sofisticação ou reabastecer seu estoque de luxo com o melhor custo-benefício.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-luxe-gold/20">
          {kits.map((k, i) => (
            <motion.div
              key={k.name}
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.1 }}
              className="bg-luxe-ink p-10 flex flex-col justify-between group hover:bg-black transition-colors"
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
                
                <h3 className="mt-10 font-sans text-2xl font-bold group-hover:text-luxe-gold-soft transition-colors">{k.name}</h3>
                <span className="gold-rule mt-6" />
                <p className="mt-6 text-white/70 font-sans font-light leading-relaxed">
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
                    <div className="font-sans text-2xl font-bold text-luxe-gold-soft">{k.price}</div>
                    <div className="mt-1 text-[12px] text-white/60">
                      6x sem juros <span className="text-luxe-gold-soft">·</span> Pix 5% OFF
                    </div>
                  </div>
                  <a
                    href={waLink(k.msg)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Pedir ${k.name} no WhatsApp`}
                    className="inline-flex flex-wrap items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-luxe-gold-soft border-b border-luxe-gold-soft/60 pb-1 group-hover:text-white group-hover:border-white transition-colors"
                  >
                    Pedir Combo <ArrowRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

/* ---------------------------- CONSULTORIA -------------------------------- */

const Consultoria = memo(function Consultoria() {
  const fade = useFadeUp();
  return (
    <section className="bg-luxe-bg border-b border-luxe-line/20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-36 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          <motion.div {...fade} className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl border border-luxe-line/30">
              <img
                src={consultoraImg}
                alt="Consultora premium sorrindo, atendimento personalizado e humanizado"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 border border-luxe-gold/40 pointer-events-none m-4" />
            </div>
            
            {/* Absolute Floating Badges */}
            <div className="absolute top-6 left-6 z-20">
              <FloatingBadge className="shadow-lg bg-black/85 border-luxe-gold-soft/40">
                <Sparkles className="size-3.5 text-luxe-gold" />
                <span className="text-[14px] tracking-wider uppercase font-bold text-luxe-gold-soft">Atendimento VIP</span>
              </FloatingBadge>
            </div>
          </motion.div>
          
          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <span className="eyebrow">Atendimento Humanizado</span>
            <h2 className="mt-6 font-section text-5xl md:text-5xl font-semibold leading-tight">
              Escolha Inteligente Sem Complicações
            </h2>
            <span className="gold-rule mt-8" />
            <p className="mt-8 text-lg text-luxe-ink/85 font-sans font-light leading-relaxed max-w-lg">
              Evite frustrações ao comprar no escuro. Nossa consultoria de luxo inteligente ajuda você a selecionar a fragrância e o tratamento capilar sob medida para sua necessidade, com honestidade e empatia.
            </p>
            <ul className="mt-8 space-y-3.5 text-luxe-ink/85 font-sans font-light">
              <li className="flex items-start gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 bg-luxe-gold rounded-full shrink-0" />
                <span>Perfil de fragrância ou capilar personalizado em poucas mensagens.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 bg-luxe-gold rounded-full shrink-0" />
                <span>Alternativas sofisticadas com o melhor custo-benefício de mercado.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 bg-luxe-gold rounded-full shrink-0" />
                <span>Zero scripts de vendas robóticos — contato de humano para humano.</span>
              </li>
            </ul>
            <a
              href={waLink("Olá, quero falar com a consultora premium para fazer minha seleção personalizada.")}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex flex-wrap items-center justify-center gap-3 bg-luxe-ink hover:bg-whatsapp hover:text-black text-white transition-colors px-5 py-3 md:px-8 md:py-4 text-sm font-semibold tracking-wide shadow-md"
            >
              <MessageCircle className="size-4" />
              Falar com a Consultora
              <ArrowRight className="size-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

/* ---------------------------- DEPOIMENTOS -------------------------------- */

const Depoimentos = memo(function Depoimentos() {
  const fade = useFadeUp();
  const items = [
    {
      quote: "Comprei o combo de cauterização e foi a melhor escolha inteligente que fiz. Cabelo de salão sem gastar uma fortuna.",
      name: "Carolina M.",
      meta: "Savassi · BH",
    },
    {
      quote: "Estava em dúvida entre as notas de perfumes. A consultora me atendeu perfeitamente. O Floratta Red é puro luxo acessível.",
      name: "Renata S.",
      meta: "Belvedere · BH",
    },
    {
      quote: "Fiz o pedido do Malbec de carvalho às 20h. Às 20h45 o entregador estava na minha porta. Rapidez e cuidado impressionantes.",
      name: "Felipe A.",
      meta: "Nova Lima",
    },
  ];
  return (
    <section className="bg-luxe-bg border-b border-luxe-line/30 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 relative z-10">
        <motion.div {...fade} className="max-w-2xl text-center mx-auto mb-20">
          <span className="eyebrow">Opinião de Clientes</span>
          <h2 className="mt-4 font-section text-5xl md:text-5xl font-semibold leading-tight">
            A Experiência do Luxo Inteligente
          </h2>
          <span className="gold-rule mt-6 mx-auto" />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.1 }}
              className="flex flex-col justify-between p-8 border border-luxe-line/20 bg-white/40 backdrop-blur-xs rounded-xs"
            >
              <div>
                <div className="flex gap-0.5 mb-4">
                  {[0,1,2,3,4].map((s) => (
                    <svg key={s} className="size-4" viewBox="0 0 20 20" fill="currentColor" style={{color:"var(--color-luxe-gold)"}}>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <Quote className="size-8 text-luxe-gold" strokeWidth={1} />
                <blockquote className="mt-6 font-display text-2xl md:text-3xl leading-relaxed text-luxe-ink break-words">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-8 pt-6 border-t border-luxe-line/30 font-sans">
                <div className="text-sm font-bold text-luxe-ink">{t.name}</div>
                <div className="text-[10px] tracking-[0.24em] uppercase text-luxe-ink-soft/70 mt-1">
                  {t.meta}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
});

/* -------------------------------- FAQ ------------------------------------ */

const Faq = memo(function Faq() {
  const items = [
    {
      q: "O que significa 'Luxo Inteligente'?",
      a: "Significa ter acesso aos melhores produtos cosméticos de alta performance e à perfumaria premium com preços justos e acessíveis, focando no melhor custo-benefício e na entrega rápida de conveniência, sem a necessidade de pagar preços exorbitantes por marcas importadas.",
    },
    {
      q: "Como funciona a entrega em até 1h?",
      a: "Disponibilizamos entregadores parceiros via Uber Flash para toda Belo Horizonte e bairros limítrofes da região metropolitana. O produto sai direto do nosso estoque, já com embalagem premium inclusa.",
    },
    {
      q: "Os produtos são originais e possuem garantia?",
      a: "Sim, absolutamente. Somos revendedores oficiais e autorizados de marcas renomadas do Grupo Boticário e Eudora. Todos os itens acompanham nota fiscal completa de compra.",
    },
    {
      q: "Quais são as condições e formas de pagamento?",
      a: "Aceitamos pagamento por Pix (com 5% de desconto automático), cartões de crédito em até 6x sem juros ou links de pagamento online totalmente seguros enviados diretamente pelo WhatsApp.",
    },
    {
      q: "Posso solicitar troca de algum produto?",
      a: "Sim, garantimos o direito de troca ou devolução do produto não utilizado em até 7 dias após o recebimento, seguindo rigorosamente o Código de Defesa do Consumidor.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  const fade = useFadeUp();
  return (
    <section id="faq" className="bg-luxe-bg border-b border-luxe-line/30">
      <div className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        <motion.div {...fade} className="text-center">
          <span className="eyebrow">Perguntas Frequentes</span>
          <h2 className="mt-4 font-section text-4xl md:text-5xl font-semibold">
            Dúvidas Frequentes
          </h2>
          <span className="gold-rule mt-6 mx-auto" />
        </motion.div>

        <div className="mt-16 divide-y divide-luxe-line/50 border-y border-luxe-line/50">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-6 text-left group cursor-pointer"
                >
                  <span className="font-fenix text-3xl text-luxe-ink group-hover:text-luxe-gold transition-colors font-normal min-w-0 break-words">
                    {it.q}
                  </span>
                  <ChevronDown
                    className={`size-5 text-luxe-gold shrink-0 transition-transform duration-500 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-luxe-ink/85 font-sans font-light leading-relaxed max-w-3xl">
                      {it.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

/* ------------------------------ CTA FINAL -------------------------------- */

const CtaFinal = memo(function CtaFinal() {
  const fade = useFadeUp();
  return (
    <section className="relative bg-luxe-ink text-white overflow-hidden py-32 md:py-40">
      
      <div className="absolute inset-0 opacity-20">
        <img src={heroPerfume} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxe-ink via-luxe-ink/80 to-luxe-ink/65" />
      </div>
      
      <div className="relative mx-auto max-w-4xl px-6 text-center z-10">
        <motion.div {...fade}>
          <div className="mb-8">
            <FloatingBadge className="border-luxe-gold-soft/30 bg-black/85">
              <Timer className="size-3.5 text-luxe-gold-soft" />
              <span className="text-[12px] tracking-[0.32em] uppercase text-luxe-gold-soft font-semibold">
                Última saída VIP do dia às 21h
              </span>
            </FloatingBadge>
          </div>
          
          <h2 className="mt-8 font-section text-5xl md:text-7xl font-semibold leading-[1.05]">
            O Melhor do Grupo Boticário,
            <br />
            <span className="font-light italic text-luxe-gold-soft">Chegando Rápido Até Você.</span>
          </h2>
          <p className="mt-8 text-white/70 text-lg font-sans font-light max-w-xl mx-auto leading-relaxed">
            Nossos combos exclusivos têm estoque limitado. Fale com nosso atendimento agora mesmo e receba seus produtos preferidos com embalagem de luxo inclusa hoje em BH.
          </p>
          
          <div className="mt-12">
            <a
              href={waLink("Olá, quero garantir minha seleção de luxo inteligente com entrega expressa hoje.")}
              target="_blank"
              rel="noreferrer"
              className="wa-pulse-strong inline-flex flex-wrap items-center justify-center gap-3 bg-whatsapp hover:bg-whatsapp-hover text-black font-bold px-6 py-4 md:px-12 md:py-6 text-base md:text-xl tracking-wider uppercase rounded-sm transition-all"
            >
              <MessageCircle className="size-6" strokeWidth={2.4} />
              Garantir Combo no WhatsApp
              <ArrowRight className="size-5" strokeWidth={2.4} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

/* ------------------------------- FOOTER ---------------------------------- */

const Footer = memo(function Footer() {
  return (
    <footer className="bg-luxe-bg border-t border-luxe-line/30">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div>
            <div className="font-sans text-xl font-semibold tracking-[0.18em] uppercase">
              Maison<span className="text-luxe-gold"> · </span>Parfum
            </div>
            <div className="mt-1 text-[10px] tracking-[0.24em] uppercase text-luxe-ink-soft/80 font-sans">
              Revendedora autorizada Grupo Boticário e Eudora
            </div>
            <p className="mt-4 text-sm text-luxe-ink/85 max-w-xs font-sans font-light leading-relaxed">
              Entrega rápida via Uber Flash em Belo Horizonte e região. O luxo inteligente e acessível na porta da sua casa.
            </p>
          </div>
          
          <div className="text-sm text-luxe-ink/85 space-y-3 font-sans font-light">
            <div className="eyebrow text-luxe-ink font-semibold">Contato</div>
            <a
              href={waLink("Olá!")}
              target="_blank"
              rel="noreferrer"
              className="block font-semibold hover:text-luxe-gold transition-colors"
            >
              WhatsApp: +55 31 90000-0000
            </a>
            <div>Atendimento das 09h às 21h, todos os dias da semana.</div>
          </div>
          
          <div className="text-sm text-luxe-ink/85 space-y-3 font-sans font-light md:text-right">
            <div className="eyebrow text-luxe-ink md:text-right font-semibold">Acompanhe</div>
            <a
              href="#"
              aria-label="Instagram"
              className="inline-flex items-center gap-2 hover:text-luxe-gold transition-colors font-medium"
            >
              <Instagram className="size-4" /> @maison.parfum
            </a>
            <div className="text-[11px] tracking-[0.2em] uppercase pt-4 text-luxe-ink-soft/60">
              CNPJ 00.000.000/0001-00
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-luxe-line/20 text-[10px] tracking-[0.22em] uppercase text-luxe-ink-soft/50 text-center font-semibold">
          © {new Date().getFullYear()} Maison Parfum · Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
});

/* ---------------------------- WHATSAPP FLOAT ----------------------------- */

const WhatsappFloating = memo(function WhatsappFloating() {
  return (
    <a
      href={waLink("Olá, vim pela página e quero atendimento de luxo inteligente.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 wa-pulse bg-whatsapp hover:bg-whatsapp-hover text-black rounded-full p-4 shadow-2xl transition-colors cursor-pointer"
    >
      <MessageCircle className="size-6" strokeWidth={2} />
    </a>
  );
});

export default function HomePage() {
  return <LandingPage />;
}
