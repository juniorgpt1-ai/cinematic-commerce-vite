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
      className="fixed bottom-6 right-6 z-40 [animation:luxe-glow_2.5s_ease-in-out_infinite] bg-whatsapp hover:bg-whatsapp-hover text-black rounded-full p-4 cursor-pointer"
    >
      <MessageCircle className="size-6" strokeWidth={2} />
    </a>
  );
});

export default WhatsappFloating;
