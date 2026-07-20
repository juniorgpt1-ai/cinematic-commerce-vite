import { memo } from "react";
import EditorialShowcase from "@/components/sections/EditorialShowcase";

const FlorattaRedShowcase = memo(function FlorattaRedShowcase({ image }: { image: string }) {
  return (
    <EditorialShowcase
      id="floratta-red"
      eyebrow="O Boticário · Perfumaria Feminina"
      title={
        <>
          Floratta Red. Romance e <span className="font-light italic text-luxe-gold">sedução</span>.
        </>
      }
      copy="Inspirada na flor da Maçã de Vermont. Floratta Red é uma fragrância feminina marcante, jovem e envolvente que combina com mulheres de atitude! Um floriental frutal de intensidade profunda perfeito para encontros românticos — indulgência a um valor acessível."
      notes={["Frutas Vermelhas, Laranja, Maçã", "Tuberosa, Violeta, Flor de Lótus", "Chocolate Amargo, Musk, Cedro"]}
      price="R$ 169,90"
      cta="Garantir meu Floratta Red"
      waMessage="Olá! Tenho interesse no Floratta Red (O Boticário). Pode me ajudar?"
      image={image}
      imageAlt="Modelo com vestido vermelho segurando frasco Floratta Red em apartamento de luxo com vista da cidade"
      reverse
      sealText="Melhor Custo-Benefício"
      secondImage="/floratta.webp"
      secondLabel={`Floratta Red
Sinta a elegância. Viva o romance.`}
    />
  );
});

export default FlorattaRedShowcase;
