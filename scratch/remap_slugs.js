import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Old slug → New slug mapping
const remaps = [
  ['health-wellbeing',     'health'],
  ['peace-stress-relief',  'health'],
  ['wealth-abundance',     'wealth'],
  ['love-relationships',   'love-relationship'],
  ['confidence-success',   'career-job-business'],
  ['protection-positivity','money'],
];

async function main() {
  await client.connect();
  console.log('Connected. Remapping problem_category_slug values...\n');

  for (const [oldSlug, newSlug] of remaps) {
    const res = await client.query(
      'UPDATE products SET problem_category_slug = $1 WHERE problem_category_slug = $2',
      [newSlug, oldSlug]
    );
    console.log(`  ${oldSlug} → ${newSlug} : ${res.rowCount} products updated`);
  }

  console.log('\n✓ All slugs remapped successfully!');
  await client.end();
}

main().catch(err => {
  console.error('Failed:', err.message);
  client.end();
  process.exit(1);
});
