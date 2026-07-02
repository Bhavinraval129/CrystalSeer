"use client";
import Link from "next/link";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="bg-ink text-lavender-mist pt-16 pb-8 border-t border-white/10 relative overflow-hidden mt-auto font-inter">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary-purple rounded-full blur-[120px] opacity-[0.08] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Logo, Description & Shop Now */}
          <div className="space-y-5">
            {theme?.logoUrl ? (
              <div className="relative w-24 h-12">
                <img
                  src={theme.logoUrl}
                  alt={theme.siteName || "CrystalSeer Logo"}
                  className="object-contain w-full h-full object-left"
                />
              </div>
            ) : (
              <h3 className="font-playfair text-2xl font-bold text-white tracking-wide">
                {theme?.siteName || "CrystalSeer"}
              </h3>
            )}
            <p className="text-sm text-lavender-mist/70 max-w-sm leading-relaxed font-light font-inter">
              {theme?.tagline || "Elevating your spiritual journey through ethically sourced crystals, intuitive readings, and deep astrological guidance."}
            </p>
            <div className="pt-2">
              <Link href="/shop/crystal-type" className="inline-flex items-center gap-2 text-sm font-semibold text-soft-lilac hover:text-white transition-colors group">
                Shop Now
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-5 md:pl-12">
            <h4 className="font-semibold text-white tracking-wider uppercase text-xs">Quick Links</h4>
            <ul className="space-y-3 text-sm font-light text-lavender-mist/80">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/shop/crystal-type" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/shop/crystal-type" className="hover:text-white transition-colors">Our Products</Link></li>
              <li><Link href="/our-journey" className="hover:text-white transition-colors">Our Journey</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="space-y-5">
            <h4 className="font-semibold text-white tracking-wider uppercase text-xs">Contact Us</h4>
            <ul className="space-y-4 text-sm font-light text-lavender-mist/80">
              {theme?.phone && (
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-soft-lilac shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <a href={`tel:${theme.phone}`} className="hover:text-white transition-colors font-inter">
                    {theme.phone}
                  </a>
                </li>
              )}
              {theme?.email && (
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-soft-lilac shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a href={`mailto:${theme.email}`} className="hover:text-white transition-colors font-inter">
                    {theme.email}
                  </a>
                </li>
              )}
              {theme?.address && (
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-soft-lilac shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="font-inter">{theme.address}</span>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-lavender-mist/50">
          <p>© {new Date().getFullYear()} {theme?.siteName || "CrystalSeer"}. All rights reserved.</p>
          <div className="font-semibold uppercase tracking-widest text-soft-lilac text-[10px]">
            Crystals Crafted by Nature
          </div>
        </div>
      </div>
    </footer>
  );
}

