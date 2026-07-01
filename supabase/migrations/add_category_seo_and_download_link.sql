-- Migration 3: Add SEO fields and download link to categories
ALTER TABLE categories
ADD COLUMN IF NOT EXISTS seo_title TEXT,
ADD COLUMN IF NOT EXISTS seo_sections JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS download_list_url TEXT;
