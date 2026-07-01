-- Migration 2: Add has_details boolean to products
ALTER TABLE products
ADD COLUMN IF NOT EXISTS has_details BOOLEAN DEFAULT FALSE;
