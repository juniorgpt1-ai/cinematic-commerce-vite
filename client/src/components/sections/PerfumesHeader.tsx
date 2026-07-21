import { memo } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const PerfumesHeader = memo(function PerfumesHeader() {
  const headerRef = useScrollReveal();
  return (
    <section id="perfumes" className="bg-luxe-gradient pt-20 md:pt-28 pb-6 border-b border-luxe-line/20 relative overflow-hidden">
      <div ref={headerRef} className="reveal-up mx-auto max-w-7xl px-6 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="eyebrow">Fragrâncias de Sucesso</span>
          <h2 className="mt-6 font-section text-4xl md:text-5xl font-semibold leading-[1.08]">
            Nossas Fragrâncias
          </h2>
          <p className="mt-6 text-lg text-luxe-ink/97 font-sans font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            As mais vendidas, com entrega expressa em BH e região.
          </p>
          <span className="gold-rule mt-8 mx-auto" />
        </div>
      </div>
    </section>
  );
});

export default PerfumesHeader;
