-- ============================================================
-- CrystalSeer — Full Database Schema
-- Run this FIRST in Supabase SQL Editor
-- ============================================================

-- Categories Table
CREATE TABLE categories (
  id TEXT PRIMARY KEY, -- slug-based e.g. 'amethyst'
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'gem',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Products Table
CREATE TABLE products (
  id TEXT PRIMARY KEY, -- slug-based e.g. 'amethyst-cluster'
  name TEXT NOT NULL,
  category TEXT REFERENCES categories(id) ON DELETE SET NULL,
  sku TEXT,
  short_benefit TEXT,
  description TEXT,
  how_to_use TEXT,
  is_best_seller BOOLEAN DEFAULT FALSE,
  image TEXT, -- Cloudinary URL
  benefits JSONB DEFAULT '[]'::jsonb,
  ingredients JSONB DEFAULT '[]'::jsonb,
  specs JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Site Settings Table (Always single row, id=1)
CREATE TABLE site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  site_name TEXT DEFAULT 'CrystalSeer',
  tagline TEXT DEFAULT 'Ethereal Crystals & Mystic Healing',
  phone TEXT DEFAULT '+91 98765 43210',
  email TEXT DEFAULT 'hello@crystalseer.in',
  whatsapp TEXT DEFAULT '919876543210',
  address TEXT DEFAULT 'Mumbai, Maharashtra, India',
  footer_text TEXT DEFAULT '© 2026 CrystalSeer. All rights reserved.',
  logo_url TEXT,
  theme_primary_color TEXT DEFAULT '#844c84',
  theme_background_color TEXT DEFAULT '#fdfafc',
  theme_text_color TEXT DEFAULT '#3b203b',
  theme_heading_font TEXT DEFAULT '''Playfair Display'', serif',
  theme_body_font TEXT DEFAULT '''Inter'', sans-serif',
  theme_base_font_size TEXT DEFAULT '16px'
);

-- Insert initial settings row
INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Admin Users Table
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- ============================================================
-- RLS Policies (Allow all via anon key — adjust for production)
-- ============================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on products" ON products FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on categories" ON categories FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on admin_users" ON admin_users FOR ALL USING (true) WITH CHECK (true);
