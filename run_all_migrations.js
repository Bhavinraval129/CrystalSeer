import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Error: DATABASE_URL not found in .env.local");
  process.exit(1);
}

// Create client with SSL support since Supabase requires it
const client = new pg.Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

const migrations = [
  './supabase/schema.sql',
  './supabase/migrations/add_subcategories.sql',
  './supabase/migrations/add_has_details_to_products.sql',
  './supabase/migrations/add_category_seo_and_download_link.sql',
  './supabase/migrations/add_product_sections.sql',
];

async function main() {
  try {
    console.log("Connecting to Supabase PostgreSQL database...");
    await client.connect();
    console.log("Connected successfully!");

    for (const filePath of migrations) {
      const absolutePath = path.resolve(__dirname, filePath);
      console.log(`Running migration: ${filePath}...`);
      
      if (!fs.existsSync(absolutePath)) {
        console.warn(`Warning: Migration file not found at ${absolutePath}, skipping.`);
        continue;
      }
      
      const sql = fs.readFileSync(absolutePath, 'utf8');
      
      // Execute the migration SQL
      await client.query(sql);
      console.log(`✓ Completed: ${filePath}`);
    }

    // Now insert the default admin user if not exists
    console.log("Inserting default admin user...");
    const adminUser = 'admin';
    const adminPass = 'CrystalSeerEkdant*129'; // Using a secure password based on user's pattern
    
    // Check if table admin_users exists and insert admin
    const insertAdminSql = `
      INSERT INTO admin_users (username, password)
      VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING;
    `;
    await client.query(insertAdminSql, [adminUser, adminPass]);
    console.log(`✓ Admin user checked/created successfully!`);
    console.log(`-----------------------------------------------`);
    console.log(`Admin Portal Credentials:`);
    console.log(`Username: ${adminUser}`);
    console.log(`Password: ${adminPass}`);
    console.log(`-----------------------------------------------`);

    console.log("Database migrations completed successfully!");
  } catch (error) {
    console.error("Migration failed with error:", error);
  } finally {
    await client.end();
  }
}

main();
