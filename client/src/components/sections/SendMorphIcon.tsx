import { memo } from "react";
import { MessageCircle, Send, Check } from "lucide-react";
import type { SendMorphPhase } from "@/hooks/useSendMorph";

const LAYER = "col-start-1 row-start-1 size-full transition-all duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]";

const SendMorphIcon = memo(function SendMorphIcon({
  phase,
  className = "size-4",
  strokeWidth = 2,
}: {
  phase: SendMorphPhase;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <span aria-hidden="true" className={`relative inline-grid place-items-center shrink-0 ${className}`}>
      <MessageCircle
        strokeWidth={strokeWidth}
        className={`${LAYER} ${phase === "idle" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-12"}`}
      />
      <Send
        strokeWidth={strokeWidth}
        className={`${LAYER} ${phase === "sending" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 rotate-12"}`}
      />
      <Check
        strokeWidth={strokeWidth + 0.5}
        className={`${LAYER} ${phase === "sent" ? "opacity-100 scale-100 rotate-0 drop-shadow-[0_0_6px_currentColor]" : "opacity-0 scale-75 rotate-12"}`}
      />
    </span>
  );
});

export default SendMorphIcon;
