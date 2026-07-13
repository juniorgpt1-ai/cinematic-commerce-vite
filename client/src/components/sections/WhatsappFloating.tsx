import { memo } from "react";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/whatsapp";

const WhatsappFloating = memo(function WhatsappFloating() {
  return (
    <a
      href={waLink("Olá, vim pela página e quero atendimento de luxo inteligente.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 wa-pulse bg-whatsapp hover:bg-whatsapp-hover text-black rounded-full p-3.5 cursor-pointer backdrop-blur-sm"
    >
      <MessageCircle className="size-5" strokeWidth={2} />
    </a>
  );
});

export default WhatsappFloating;
