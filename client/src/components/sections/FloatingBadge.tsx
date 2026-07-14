import { memo } from "react";

const FloatingBadge = memo(function FloatingBadge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`animate-float-badge inline-flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 border border-luxe-gold/50 bg-white px-3 py-1.5 sm:px-4 sm:py-2 shadow-md max-w-full text-[11px] sm:text-[14px] tracking-wider ${className}`}
    >
      {children}
    </span>
  );
});

export default FloatingBadge;
