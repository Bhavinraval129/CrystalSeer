-- Migration 1: Add Subcategories Table
CREATE TABLE IF NOT EXISTS subcategories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category_id TEXT REFERENCES categories(id) ON DELETE CASCADE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add subcategory column to products
ALTER TABLE products
ADD COLUMN IF NOT EXISTS subcategory TEXT REFERENCES subcategories(id) ON DELETE SET NULL;

-- RLS for subcategories
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all on subcategories" ON subcategories FOR ALL USING (true) WITH CHECK (true);
