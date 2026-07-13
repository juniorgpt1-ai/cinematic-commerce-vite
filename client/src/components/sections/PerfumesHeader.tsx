import { memo } from "react";
import { motion } from "framer-motion";
import { useFadeUp } from "@/hooks/useFadeUp";

const PerfumesHeader = memo(function PerfumesHeader() {
  const fade = useFadeUp();
  return (
    <section id="perfumes" className="bg-luxe-gradient pt-32 md:pt-40 pb-8 border-b border-luxe-line/20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 relative z-10 text-center">
        <motion.div {...fade} className="max-w-3xl mx-auto">
          <span className="eyebrow">Fragrâncias de Sucesso</span>
          <h2 className="mt-6 font-section text-5xl md:text-6xl font-semibold leading-[1.08]">
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

export default PerfumesHeader;
