import pg from 'pg';
import dotenv from 'dotenv';
import { crystalCategories } from './src/data/crystalCategories.js';
import { products } from './src/data/products.js';

dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Error: DATABASE_URL not found in .env.local");
  process.exit(1);
}

const client = new pg.Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function main() {
  try {
    console.log("Connecting to Supabase PostgreSQL database to seed data...");
    await client.connect();
    console.log("Connected!");

    // Seed Categories
    console.log(`Seeding ${crystalCategories.length} categories...`);
    for (const cat of crystalCategories) {
      const insertCatSql = `
        INSERT INTO categories (id, name, description, icon)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO UPDATE 
        SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
      `;
      // Store productType in the icon column to preserve filtering compatibility
      const icon = cat.productType || 'Raw';
      const description = `Energized and moon-blessed ${cat.name} crystals.`;
      
      await client.query(insertCatSql, [cat.slug, cat.name, description, icon]);
    }
    console.log("✓ Categories seeded successfully!");

    // Seed Products
    console.log(`Seeding ${products.length} products...`);
    for (const prod of products) {
      const insertProdSql = `
        INSERT INTO products (
          id, name, category, sku, short_benefit, description, how_to_use, 
          is_best_seller, image, benefits, ingredients, specs, has_details,
          problem_category_slug
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        ON CONFLICT (id) DO UPDATE 
        SET name = EXCLUDED.name,
            category = EXCLUDED.category,
            sku = EXCLUDED.sku,
            short_benefit = EXCLUDED.short_benefit,
            description = EXCLUDED.description,
            how_to_use = EXCLUDED.how_to_use,
            is_best_seller = EXCLUDED.is_best_seller,
            image = EXCLUDED.image,
            benefits = EXCLUDED.benefits,
            ingredients = EXCLUDED.ingredients,
            specs = EXCLUDED.specs,
            has_details = EXCLUDED.has_details,
            problem_category_slug = EXCLUDED.problem_category_slug;
      `;

      const firstImage = prod.imageUrls && prod.imageUrls.length > 0 ? prod.imageUrls[0] : '';
      const shortBenefit = prod.benefits && prod.benefits.length > 0 ? prod.benefits[0] : '';
      const specsJson = {
        price: prod.price?.toString(),
        compareAtPrice: prod.compareAtPrice?.toString(),
        rating: prod.rating?.toString()
      };
      
      const benefitsJson = JSON.stringify(prod.benefits || []);
      const ingredientsJson = JSON.stringify([]); // No separate ingredients in static list, but we keep it empty array
      
      const sku = `CS-${prod.slug.substring(0, 4).toUpperCase()}-${prod.id}`;
      const howToUse = "Cleanse under running water or place on a Selenite charging plate. Program with your specific intentions during a quiet meditation.";

      await client.query(insertProdSql, [
        prod.slug,
        prod.name,
        prod.crystalCategorySlug,
        sku,
        shortBenefit,
        prod.description,
        howToUse,
        prod.isBestseller || false,
        firstImage,
        benefitsJson,
        ingredientsJson,
        JSON.stringify(specsJson),
        true, // has_details defaults to true
        prod.problemCategorySlug || null
      ]);
    }
    console.log("✓ Products seeded successfully!");
    console.log("All data seeding tasks completed successfully!");

  } catch (error) {
    console.error("Seeding failed with error:", error);
  } finally {
    await client.end();
  }
}

main();
