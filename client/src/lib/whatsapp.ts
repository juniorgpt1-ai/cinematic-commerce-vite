// Troque WHATSAPP_NUMBER pelo número real (apenas dígitos, com DDI).
export const WHATSAPP_NUMBER = "5531900000000";

export function waLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
