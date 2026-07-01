import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

async function runMigration(sqlFile) {
  await client.connect();
  console.log(`Running migration: ${sqlFile}`);
  const sql = fs.readFileSync(path.join(__dirname, sqlFile), 'utf8');
  await client.query(sql);
  await client.end();
  console.log('✓ Migration completed!');
}

// Run all migrations in order
const migrations = [
  './supabase/schema.sql',
  './supabase/migrations/add_subcategories.sql',
  './supabase/migrations/add_has_details_to_products.sql',
  './supabase/migrations/add_category_seo_and_download_link.sql',
  './supabase/migrations/add_product_sections.sql',
];

const target = process.argv[2];
if (target) {
  runMigration(target).catch(console.error);
} else {
  console.log('Usage: node run_migration.js <path-to-sql-file>');
  console.log('Available migrations:', migrations);
}
