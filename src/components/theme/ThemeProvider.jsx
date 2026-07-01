"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const defaultTheme = {
  primaryColor: "#844c84",
  backgroundColor: "#fdfafc",
  textColor: "#3b203b",
  headingFont: "'Playfair Display', serif",
  bodyFont: "'Inter', sans-serif",
  baseFontSize: "16px",
  siteName: "Crystal Seer",
  tagline: "Ethereal Crystals & Mystic Healing",
  phone: "+91 70966 91255",
  email: "hello@crystalseer.in",
  whatsapp: "917096691255",
  address: "Mumbai, Maharashtra, India",
  footerText: "© 2026 Crystal Seer. All rights reserved.",
  logoUrl: null,
};

const ThemeContext = createContext({
  theme: defaultTheme,
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(defaultTheme);

  const applyCSS = (t) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.style.setProperty("--theme-primary", t.primaryColor);
    root.style.setProperty("--theme-bg", t.backgroundColor);
    root.style.setProperty("--theme-text", t.textColor);
    root.style.setProperty("--background", t.backgroundColor);
    root.style.setProperty("--foreground", t.textColor);
    root.style.setProperty("--font-serif", t.headingFont);
    root.style.setProperty("--font-body", t.bodyFont);
    root.style.fontSize = t.baseFontSize;
  };

  const mapRow = (row) => ({
    primaryColor: row.theme_primary_color || defaultTheme.primaryColor,
    backgroundColor: row.theme_background_color || defaultTheme.backgroundColor,
    textColor: row.theme_text_color || defaultTheme.textColor,
    headingFont: row.theme_heading_font || defaultTheme.headingFont,
    bodyFont: row.theme_body_font || defaultTheme.bodyFont,
    baseFontSize: row.theme_base_font_size || defaultTheme.baseFontSize,
    siteName: row.site_name || defaultTheme.siteName,
    tagline: row.tagline || defaultTheme.tagline,
    phone: row.phone || defaultTheme.phone,
    email: row.email || defaultTheme.email,
    whatsapp: row.whatsapp || defaultTheme.whatsapp,
    address: row.address || defaultTheme.address,
    footerText: row.footer_text || defaultTheme.footerText,
    logoUrl: row.logo_url || null,
  });

  useEffect(() => {
    // Try localStorage first for instant load
    const cached = localStorage.getItem("site_theme");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setThemeState(parsed);
        applyCSS(parsed);
      } catch {}
    }

    // Then fetch fresh from Supabase
    const supabase = createClient();
    supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single()
      .then(({ data, error }) => {
        if (!error && data) {
          const mapped = mapRow(data);
          setThemeState(mapped);
          applyCSS(mapped);
          localStorage.setItem("site_theme", JSON.stringify(mapped));
        }
      });
  }, []);

  const setTheme = (newSettings) => {
    const mapped = typeof newSettings.siteName !== "undefined"
      ? newSettings
      : mapRow(newSettings);
    setThemeState(mapped);
    applyCSS(mapped);
    localStorage.setItem("site_theme", JSON.stringify(mapped));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
