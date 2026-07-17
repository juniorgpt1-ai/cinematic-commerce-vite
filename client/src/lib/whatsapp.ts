// Fallback used until VITE_WHATSAPP_NUMBER is set — apenas dígitos, com DDI.
const PLACEHOLDER_WHATSAPP_NUMBER = "5531900000000";

export const WHATSAPP_NUMBER: string =
  import.meta.env.VITE_WHATSAPP_NUMBER || PLACEHOLDER_WHATSAPP_NUMBER;

if (import.meta.env.PROD && WHATSAPP_NUMBER === PLACEHOLDER_WHATSAPP_NUMBER) {
  // Every WhatsApp CTA on the page is the entire conversion funnel — a silent
  // placeholder here means every order attempt opens a number that doesn't exist.
  console.error(
    "[Maison Parfum] VITE_WHATSAPP_NUMBER is not set — WhatsApp CTAs are pointing at a placeholder number in production. Set VITE_WHATSAPP_NUMBER before this deploy goes live.",
  );
}

export function waLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
