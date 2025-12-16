import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '5511999999999'; // Substituir pelo número real
const WHATSAPP_MESSAGE = encodeURIComponent('Olá! Gostaria de mais informações sobre os serviços.');

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 md:bottom-6 md:right-6"
      aria-label="Contato via WhatsApp"
      onClick={() => {
        // Analytics tracking event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'whatsapp_click', {
            event_category: 'contact',
            event_label: 'floating_button'
          });
        }
      }}
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" aria-hidden="true" />
    </a>
  );
}
