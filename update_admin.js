import pg from 'pg';
import dotenv from 'dotenv';

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
    await client.connect();
    console.log("Connected to database...");

    const username = 'admin';
    const password = '123456789';

    // Upsert admin user
    const query = `
      INSERT INTO admin_users (username, password)
      VALUES ($1, $2)
      ON CONFLICT (username)
      DO UPDATE SET password = EXCLUDED.password;
    `;

    await client.query(query, [username, password]);
    console.log(`Successfully set admin credentials!`);
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
  } catch (error) {
    console.error("Failed to update admin:", error);
  } finally {
    await client.end();
  }
}

main();
