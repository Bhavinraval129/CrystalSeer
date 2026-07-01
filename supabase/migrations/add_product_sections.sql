-- Migration 4: Add sections_visibility and custom_sections to products
ALTER TABLE products
ADD COLUMN IF NOT EXISTS sections_visibility JSONB DEFAULT '{"description":true,"benefits":true,"ingredients":true,"howToUse":true}'::jsonb,
ADD COLUMN IF NOT EXISTS custom_sections JSONB DEFAULT '[]'::jsonb;
