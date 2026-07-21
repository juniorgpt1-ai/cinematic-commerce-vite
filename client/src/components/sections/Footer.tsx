import { memo } from "react";
import { Instagram } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Footer = memo(function Footer() {
  const ref = useScrollReveal();
  return (
    <footer ref={ref} className="reveal-up bg-luxe-bg border-t border-luxe-line/30">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="flex flex-col items-center mb-16">
          <img src="/sc-monogram-transparente.webp" alt="S&C Beauty" className="w-[260px] h-auto" />
          <div className="mt-4 font-sans text-xl font-semibold tracking-[0.18em] uppercase text-center">
            S&C<span className="text-luxe-gold"> · </span>Beauty
          </div>
          <div className="mt-1 text-[10px] tracking-[0.24em] uppercase text-luxe-ink-soft/90 font-sans text-center">
            Revendedora autorizada Grupo Boticário e Eudora
          </div>
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
              {[
                { name: "O Boticário", logo: "/brands/oboticario.svg" },
                { name: "Eudora",      logo: "/brands/eudora.svg"     },
                { name: "QDB",         logo: "/brands/qdb.svg"        },
                { name: "Multi B",     logo: "/brands/multib.svg"     },
              ].map((brand) => (
                <img
                  key={brand.name}
                  src={brand.logo}
                  alt={brand.name}
                  title={brand.name}
                  width="80"
                  height="32"
                  className="h-6 md:h-8 w-auto opacity-60 hover:opacity-100 transition-opacity duration-200"
                />
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
              {[
                { name: "Vult",        logo: "/brands/vult.svg"       },
                { name: "O.U.i",       logo: "/brands/oui.svg"        },
              ].map((brand) => (
                <img
                  key={brand.name}
                  src={brand.logo}
                  alt={brand.name}
                  title={brand.name}
                  width="80"
                  height="32"
                  className="h-6 md:h-8 w-auto opacity-60 hover:opacity-100 transition-opacity duration-200"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div>
            <p className="text-base text-luxe-ink/97 max-w-xs font-sans font-normal leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              Entrega expressa via Uber Flash em Belo Horizonte e região. Perfumaria e cosméticos premium na porta da sua casa.
            </p>
          </div>

          <div className="text-sm text-luxe-ink/97 space-y-3 font-sans font-normal">
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
              <span className="block text-luxe-ink/50 text-xs cursor-default">Política de Privacidade (em breve)</span>
              <span className="block text-luxe-ink/50 text-xs cursor-default">Trocas e Devoluções (em breve)</span>
            </div>
          </div>

          <div className="text-sm text-luxe-ink/97 space-y-3 font-sans font-normal md:text-right">
            <div className="eyebrow text-luxe-ink md:text-right font-semibold">Acompanhe</div>
            <span
              aria-label="Instagram (em breve)"
              className="relative inline-flex items-center gap-2 text-luxe-ink/50 font-medium cursor-default"
            >
              <Instagram className="size-4" /> @scbeauty
            </span>
            {/* TODO: CNPJ real */}
            <div className="text-[11px] tracking-[0.2em] uppercase pt-4 text-luxe-ink-soft/80">
              CNPJ 00.000.000/0001-00
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-luxe-line/20 text-[10px] tracking-[0.22em] uppercase text-luxe-ink-soft/70 text-center font-semibold">
          © {new Date().getFullYear()} S&C Beauty · Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
});

export default Footer;
