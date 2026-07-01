"use client";

import { useTheme } from "@/components/theme/ThemeProvider";

export default function FloatingWhatsApp() {
  const { theme } = useTheme();
  const whatsapp = theme.whatsapp || "917096691255";
  const link = `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi, I'd like to know more about your crystals")}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat on WhatsApp"
      className="hidden md:flex fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full items-center justify-center shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 group"
      style={{ boxShadow: "0 4px 24px rgba(37,211,102,0.4)" }}
    >
      {/* Pulsing Red Notification Badge */}
      <span className="absolute -top-1 -right-1 flex h-[18px] w-[18px]">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-[18px] w-[18px] bg-red-500 border-2 border-white shadow-md"></span>
      </span>

      <svg viewBox="0 0 32 32" fill="white" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.002 3.2A12.785 12.785 0 003.2 16.002c0 2.258.596 4.474 1.728 6.41L3.2 28.8l6.588-1.703A12.785 12.785 0 1016.002 3.2zm0 23.2a10.4 10.4 0 01-5.296-1.45l-.38-.225-3.91 1.01 1.04-3.796-.247-.39A10.42 10.42 0 1116.002 26.4zm5.695-7.82c-.312-.155-1.844-.904-2.13-.007-.286.895-.892.007-1.98.007-.18 0-.358-.016-.534-.045a5.897 5.897 0 01-2.553-1.21 6.08 6.08 0 01-1.723-2.378c-.15-.43-.007-.663.11-.876.103-.19.23-.39.346-.584.117-.194.155-.33.233-.55.078-.22.039-.413-.02-.578-.058-.165-.521-1.254-.715-1.717-.188-.45-.38-.39-.52-.397-.136-.006-.292-.008-.447-.008a.862.862 0 00-.623.29c-.214.232-.816.798-.816 1.944 0 1.145.835 2.25.95 2.406.117.157 1.643 2.508 3.98 3.52a13.51 13.51 0 001.327.49c.557.177 1.064.152 1.465.092.447-.067 1.376-.562 1.57-1.105.195-.542.195-1.007.137-1.104-.058-.097-.213-.155-.447-.27z"/>
      </svg>
    </a>
  );
}
