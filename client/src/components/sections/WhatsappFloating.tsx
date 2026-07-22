import { memo } from "react";
import { waLink } from "@/lib/whatsapp";

const WhatsappFloating = memo(function WhatsappFloating() {
  return (
    <a
      href={waLink("Olá! Gostaria de ajuda para escolher um produto.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fazer meu pedido pelo WhatsApp"
      className="group fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] right-6 z-40 btn-hover-scale inline-flex items-center bg-whatsapp hover:bg-whatsapp-hover text-white rounded-full py-3.5 pl-3.5 pr-3.5 cursor-pointer backdrop-blur-sm overflow-hidden whatsapp-float-btn"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 shrink-0"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
      <span>
        Fazer meu pedido <img src="/msg.svg" alt="" className="size-5 shrink-0 inline align-middle" />
      </span>
    </a>
  );
});

export default WhatsappFloating;
