"use client";
import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function Navbar({ theme = "v1" }) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme: themeData } = useTheme();

  // Theme configuration
  const isV1 = theme === "v1";
  
  const navClasses = isV1 
    ? "bg-white/80 backdrop-blur-md border-b border-soft-purple-100"
    : "bg-ocean-blue-900 text-white shadow-lg";

  const logoClasses = isV1
    ? "font-playfair text-2xl font-semibold text-soft-purple-800"
    : "font-cormorant text-3xl font-bold text-ocean-blue-50";

  const linkClasses = isV1
    ? "font-inter text-sm text-gray-600 hover:text-soft-purple-600 transition-colors"
    : "font-lato text-sm text-ocean-blue-100 hover:text-white transition-colors uppercase tracking-wider";

  const dropdownClasses = isV1
    ? "absolute top-full left-0 mt-2 w-48 bg-white border border-soft-purple-100 shadow-xl rounded-xl overflow-hidden py-2"
    : "absolute top-full left-0 mt-2 w-48 bg-ocean-blue-800 shadow-xl rounded-sm border border-ocean-blue-700 overflow-hidden py-2";

  const dropdownItemClasses = isV1
    ? "block px-4 py-2 font-inter text-sm text-gray-600 hover:bg-soft-purple-50 hover:text-soft-purple-700 transition-colors"
    : "block px-4 py-2 font-lato text-sm text-ocean-blue-100 hover:bg-ocean-blue-700 hover:text-white transition-colors uppercase tracking-wider";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navClasses}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className={`flex items-center ${logoClasses}`}>
              {themeData?.logoUrl ? (
                <img
                  src={themeData.logoUrl}
                  alt={themeData.siteName || "Logo"}
                  className="h-16 md:h-20 w-auto object-contain py-1.5 transition-all duration-300"
                />
              ) : (
                <span className="font-semibold tracking-wide">{themeData?.siteName || "CRYSTALSEER"}</span>
              )}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#" className={linkClasses}>Home</Link>
            <Link href="#" className={linkClasses}>Collection</Link>
            <Link href="#" className={linkClasses}>About</Link>
            <Link href="#" className={linkClasses}>Contact Us</Link>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className={`${linkClasses} flex items-center gap-1 focus:outline-none`}>
                Services
                <svg className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`transition-all duration-300 transform origin-top ${
                  isServicesOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                }`}
              >
                <div className={dropdownClasses}>
                  <Link href="#" className={dropdownItemClasses}>Tarot Card</Link>
                  <Link href="#" className={dropdownItemClasses}>Numerology</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={isV1 ? "text-gray-600 focus:outline-none" : "text-white focus:outline-none"}
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden ${isV1 ? "bg-white border-b border-soft-purple-100" : "bg-ocean-blue-800"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#" className={`block px-3 py-2 ${linkClasses}`}>Home</Link>
            <Link href="#" className={`block px-3 py-2 ${linkClasses}`}>Collection</Link>
            <Link href="#" className={`block px-3 py-2 ${linkClasses}`}>About</Link>
            <Link href="#" className={`block px-3 py-2 ${linkClasses}`}>Contact Us</Link>
            <div className="px-3 py-2">
              <div className={`${linkClasses} font-semibold mb-2`}>Services</div>
              <div className="pl-4 space-y-2">
                <Link href="#" className={`block ${dropdownItemClasses.replace('px-4', 'px-2')}`}>Tarot Card</Link>
                <Link href="#" className={`block ${dropdownItemClasses.replace('px-4', 'px-2')}`}>Numerology</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
