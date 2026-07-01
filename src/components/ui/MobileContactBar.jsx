"use client";

import { useTheme } from "@/components/theme/ThemeProvider";

export default function MobileContactBar() {
  const { theme } = useTheme();
  const phone = theme.phone || "+91 70966 91255";
  const whatsapp = theme.whatsapp || "917096691255";
  const waLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi, I'd like to know more about your crystals")}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t border-soft-purple-200 bg-white/95 backdrop-blur-md">
      <a
        href={`tel:${phone}`}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-deep-plum hover:bg-soft-purple-50 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.4 11.08 19.79 19.79 0 01.36 2.43 2 2 0 012.33.25h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.03-.78a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
        Call Us
      </a>
      <div className="w-px bg-soft-purple-200" />
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-[#25D366] hover:bg-green-50 transition-colors"
      >
        <svg viewBox="0 0 32 32" fill="currentColor" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.002 3.2A12.785 12.785 0 003.2 16.002c0 2.258.596 4.474 1.728 6.41L3.2 28.8l6.588-1.703A12.785 12.785 0 1016.002 3.2zm5.695 15.38c-.312-.155-1.844-.904-2.13-.007-.286.895-.892.007-1.98.007-.18 0-.358-.016-.534-.045a5.897 5.897 0 01-2.553-1.21 6.08 6.08 0 01-1.723-2.378c-.15-.43-.007-.663.11-.876.103-.19.23-.39.346-.584.117-.194.155-.33.233-.55.078-.22.039-.413-.02-.578-.058-.165-.521-1.254-.715-1.717-.188-.45-.38-.39-.52-.397-.136-.006-.292-.008-.447-.008a.862.862 0 00-.623.29c-.214.232-.816.798-.816 1.944 0 1.145.835 2.25.95 2.406.117.157 1.643 2.508 3.98 3.52a13.51 13.51 0 001.327.49c.557.177 1.064.152 1.465.092.447-.067 1.376-.562 1.57-1.105.195-.542.195-1.007.137-1.104-.058-.097-.213-.155-.447-.27z"/>
        </svg>
        WhatsApp
      </a>
    </div>
  );
}
