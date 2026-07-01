// Static fallback — actual WhatsApp number is managed via Admin Panel → Site Settings
// Components that use useTheme() will get the live number from Supabase automatically
export const WHATSAPP_NUMBER = "917096691255";

export function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
