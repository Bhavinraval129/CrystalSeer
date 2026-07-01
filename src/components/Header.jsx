"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null); // 'shop' | 'services' | null
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (menu) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };

  const closeAllMenus = () => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const whatsappNavMsg = buildWhatsAppLink("Hi, I'd like to know more about your crystals");

  return (
    <nav className={`fixed w-full z-50 bg-white transition-all duration-300 ${
      scrolled 
        ? "border-b border-soft-purple-100/50 shadow-md py-3" 
        : "border-b border-transparent py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          
          {/* Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" onClick={closeAllMenus} className="flex items-center gap-2.5 font-playfair text-2xl font-bold tracking-wide text-deep-plum transition-transform hover:scale-[1.02] cursor-pointer">
              {theme?.logoUrl && (
                <img
                  src={theme.logoUrl}
                  alt={theme.siteName || "Logo"}
                  className="h-10 w-auto object-contain"
                />
              )}
              <span>
                {theme?.siteName || (
                  <>
                    Crystal<span className="text-primary-purple italic font-light">Seer</span>
                  </>
                )}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-8">
            <Link 
              href="/" 
              className="relative font-inter text-sm text-ink hover:text-primary-purple font-medium transition-colors py-2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-purple after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center"
            >
              Home
            </Link>
            
            {/* Shop Dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown("shop")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                href="/shop/crystal-type"
                onClick={closeAllMenus}
                className="font-inter text-sm text-ink hover:text-primary-purple font-medium transition-colors flex items-center gap-1 focus:outline-none cursor-pointer"
              >
                Shop
                <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'shop' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {activeDropdown === "shop" && (
                <div className="absolute top-full left-0 pt-2 w-72 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-lavender-mist/80 shadow-2xl rounded-2xl overflow-hidden p-3 grid gap-2 animate-fade-in">
                    <Link href="/shop/problem" onClick={closeAllMenus} className="flex gap-3 p-3 rounded-xl hover:bg-lavender-mist/50 transition-all group cursor-pointer">
                      <span className="text-xl">🔮</span>
                      <div>
                        <h4 className="font-playfair font-bold text-sm text-deep-plum group-hover:text-primary-purple transition-colors">Shop by Intent</h4>
                        <p className="text-[10px] text-ink/60 font-light mt-0.5 font-inter">Explore by stress, wealth, protection...</p>
                      </div>
                    </Link>
                    <Link href="/shop/crystal-type" onClick={closeAllMenus} className="flex gap-3 p-3 rounded-xl hover:bg-lavender-mist/50 transition-all group cursor-pointer">
                      <span className="text-xl">✨</span>
                      <div>
                        <h4 className="font-playfair font-bold text-sm text-deep-plum group-hover:text-primary-purple transition-colors">Shop by Crystal Type</h4>
                        <p className="text-[10px] text-ink/60 font-light mt-0.5 font-inter">Raw stones, trees, bracelets, geodes...</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown("services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                href="/services/tarot-card-reading"
                onClick={closeAllMenus}
                className="font-inter text-sm text-ink hover:text-primary-purple font-medium transition-colors flex items-center gap-1 focus:outline-none cursor-pointer"
              >
                Services
                <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {activeDropdown === "services" && (
                <div className="absolute top-full left-0 pt-2 w-72 z-50">
                  <div className="bg-white/95 backdrop-blur-md border border-lavender-mist/80 shadow-2xl rounded-2xl overflow-hidden p-3 grid gap-2 animate-fade-in">
                    <Link href="/services/tarot-card-reading" onClick={closeAllMenus} className="flex gap-3 p-3 rounded-xl hover:bg-lavender-mist/50 transition-all group cursor-pointer">
                      <span className="text-xl">🃏</span>
                      <div>
                        <h4 className="font-playfair font-bold text-sm text-deep-plum group-hover:text-primary-purple transition-colors">Tarot Card Reading</h4>
                        <p className="text-[10px] text-ink/60 font-light mt-0.5 font-inter">Live sessions & layouts for clarity</p>
                      </div>
                    </Link>
                    <Link href="/services/numerology" onClick={closeAllMenus} className="flex gap-3 p-3 rounded-xl hover:bg-lavender-mist/50 transition-all group cursor-pointer">
                      <span className="text-xl">🔢</span>
                      <div>
                        <h4 className="font-playfair font-bold text-sm text-deep-plum group-hover:text-primary-purple transition-colors">Numerology Guidance</h4>
                        <p className="text-[10px] text-ink/60 font-light mt-0.5 font-inter">Spiritual blueprint & counseling call</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/consultations" 
              className="relative font-inter text-sm text-ink hover:text-primary-purple font-medium transition-colors py-2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-purple after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center"
            >
              Consultations
            </Link>
            <Link 
              href="/our-journey" 
              className="relative font-inter text-sm text-ink hover:text-primary-purple font-medium transition-colors py-2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-purple after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center"
            >
              Our Journey
            </Link>
            <Link 
              href="/about" 
              className="relative font-inter text-sm text-ink hover:text-primary-purple font-medium transition-colors py-2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-purple after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center"
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className="relative font-inter text-sm text-ink hover:text-primary-purple font-medium transition-colors py-2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-purple after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center"
            >
              Contact Us
            </Link>
          </div>

          {/* Book on WhatsApp CTA with pulsating glow */}
          <div className="hidden xl:block">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-btn rounded-full blur opacity-30 group-hover:opacity-60 transition duration-300 animate-pulse-slow"></div>
              <a 
                href={whatsappNavMsg} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-btn text-white font-medium text-sm transition-all shadow-md hover:scale-[1.02]"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.864-9.859.002-2.637-1.019-5.114-2.88-6.974C16.392 1.912 13.91 1.9 11.278 1.9c-5.44 0-9.866 4.418-9.869 9.861-.001 1.502.411 2.97 1.19 4.282L1.57 20.316l4.287-1.121 1.62.959z" />
                </svg>
                Book via WhatsApp
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-ink focus:outline-none cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen 
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-lavender-mist">
          <div className="px-4 pt-2 pb-6 space-y-3">
            <Link href="/" onClick={closeAllMenus} className="block py-2 font-inter text-sm text-ink hover:text-primary-purple font-medium">Home</Link>
            
            {/* Shop Links for Mobile */}
            <div>
              <p className="font-inter text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Shop</p>
              <div className="pl-4 space-y-2 border-l border-lavender-mist">
                <Link href="/shop/problem" onClick={closeAllMenus} className="block py-1 font-inter text-sm text-ink hover:text-primary-purple">By Problem / Intent</Link>
                <Link href="/shop/crystal-type" onClick={closeAllMenus} className="block py-1 font-inter text-sm text-ink hover:text-primary-purple">By Crystal Type</Link>
              </div>
            </div>

            {/* Services Links for Mobile */}
            <div>
              <p className="font-inter text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Services</p>
              <div className="pl-4 space-y-2 border-l border-lavender-mist">
                <Link href="/services/tarot-card-reading" onClick={closeAllMenus} className="block py-1 font-inter text-sm text-ink hover:text-primary-purple">Tarot Card Reading</Link>
                <Link href="/services/numerology" onClick={closeAllMenus} className="block py-1 font-inter text-sm text-ink hover:text-primary-purple">Numerology Guidance</Link>
              </div>
            </div>

            <Link href="/consultations" onClick={closeAllMenus} className="block py-2 font-inter text-sm text-ink hover:text-primary-purple font-medium">Consultations</Link>
            <Link href="/our-journey" onClick={closeAllMenus} className="block py-2 font-inter text-sm text-ink hover:text-primary-purple font-medium">Our Journey</Link>
            <Link href="/about" onClick={closeAllMenus} className="block py-2 font-inter text-sm text-ink hover:text-primary-purple font-medium">About Us</Link>
            <Link href="/contact" onClick={closeAllMenus} className="block py-2 font-inter text-sm text-ink hover:text-primary-purple font-medium">Contact Us</Link>
            
            <a 
              href={whatsappNavMsg} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-btn text-white font-medium text-sm transition-all shadow-md shadow-lavender-mist cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.864-9.859.002-2.637-1.019-5.114-2.88-6.974C16.392 1.912 13.91 1.9 11.278 1.9c-5.44 0-9.866 4.418-9.869 9.861-.001 1.502.411 2.97 1.19 4.282L1.57 20.316l4.287-1.121 1.62.959z" />
              </svg>
              Book via WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
