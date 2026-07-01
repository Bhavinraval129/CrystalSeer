-- Migration 5: Add problem_category_slug to products table
ALTER TABLE products
ADD COLUMN IF NOT EXISTS problem_category_slug TEXT;
