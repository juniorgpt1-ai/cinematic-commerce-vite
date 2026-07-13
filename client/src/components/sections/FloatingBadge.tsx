import { memo } from "react";
import { motion } from "framer-motion";

const FloatingBadge = memo(function FloatingBadge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.span
      animate={{ y: [0, -4, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`inline-flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 border border-luxe-gold/50 bg-white/95 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 shadow-md max-w-full text-[11px] sm:text-[14px] tracking-wider ${className}`}
    >
      {children}
    </motion.span>
  );
});

export default FloatingBadge;
