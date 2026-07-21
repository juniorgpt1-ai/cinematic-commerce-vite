import { memo } from "react";
import { Instagram } from "lucide-react";
import { waLink } from "@/lib/whatsapp";

const Footer = memo(function Footer() {
  return (
    <footer className="bg-luxe-bg border-t border-luxe-line/30">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="flex justify-center mb-16">
          <img src="/preview.webp" alt="S&C Beauty" className="w-[180px] h-auto mix-blend-multiply" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start">
          <div>
            <div className="font-sans text-xl font-semibold tracking-[0.18em] uppercase">
              S&C<span className="text-luxe-gold"> · </span>Beauty
            </div>
            <div className="mt-1 text-[10px] tracking-[0.24em] uppercase text-luxe-ink-soft/80 font-sans">
              Revendedora autorizada Grupo Boticário e Eudora
            </div>
            <p className="mt-4 text-sm text-luxe-ink/85 max-w-xs font-sans font-light leading-relaxed">
              Entrega expressa via Uber Flash em Belo Horizonte e região. Perfumaria e cosméticos premium na porta da sua casa.
            </p>
          </div>

          <div className="text-sm text-luxe-ink/85 space-y-3 font-sans font-light">
            <div className="eyebrow text-luxe-ink font-semibold">Contato</div>
            <a
              href={waLink("Olá! Gostaria de ajuda para escolher um produto.")}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block font-semibold hover:text-luxe-gold transition-colors before:absolute before:inset-[-8px] before:content-['']"
            >
              {/* TODO: substituir pelo número real de WhatsApp */}
              WhatsApp: +55 31 90000-0000
            </a>
            <div>Atendimento das 09h às 21h, todos os dias da semana.</div>
            <div className="pt-3 space-y-1">
              <a href="#" className="block text-luxe-ink/70 hover:text-luxe-gold transition-colors text-xs">Política de Privacidade</a>
              <a href="#" className="block text-luxe-ink/70 hover:text-luxe-gold transition-colors text-xs">Trocas e Devoluções</a>
            </div>
          </div>

          <div className="text-sm text-luxe-ink/85 space-y-3 font-sans font-light md:text-right">
            <div className="eyebrow text-luxe-ink md:text-right font-semibold">Acompanhe</div>
            <a
              href="#"
              aria-label="Instagram"
              className="relative inline-flex items-center gap-2 hover:text-luxe-gold transition-colors font-medium before:absolute before:inset-[-8px] before:content-['']"
            >
              <Instagram className="size-4" /> @scbeauty
            </a>
            {/* TODO: CNPJ real */}
            <div className="text-[11px] tracking-[0.2em] uppercase pt-4 text-luxe-ink-soft/60">
              CNPJ 00.000.000/0001-00
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-luxe-line/20 text-[10px] tracking-[0.22em] uppercase text-luxe-ink-soft/50 text-center font-semibold">
          © {new Date().getFullYear()} S&C Beauty · Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
});

export default Footer;
