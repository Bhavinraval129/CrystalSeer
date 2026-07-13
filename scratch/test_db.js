import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const passwords = ['CrystalSeerEkdant*129'];
const projectRef = 'oqjggxfygcqlctzcaiff';

const uris = [
  // 1. Direct connection
  `postgresql://postgres:${passwords[0]}@db.${projectRef}.supabase.co:5432/postgres`,
  // 2. Pooler with port 6543 (Transaction)
  `postgresql://postgres.${projectRef}:${passwords[0]}@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres`,
  // 3. Pooler with port 5432 (Session)
  `postgresql://postgres.${projectRef}:${passwords[0]}@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres`,
];

async function testUri(uri, name) {
  console.log(`Testing connection: ${name}...`);
  const client = new pg.Client({
    connectionString: uri,
    ssl: { rejectUnauthorized: false }
  });
  try {
    await client.connect();
    console.log(`✓ SUCCESS: Connected using ${name}!`);
    const res = await client.query('SELECT NOW()');
    console.log(`  Time from DB: ${res.rows[0].now}`);
    await client.end();
    return true;
  } catch (err) {
    console.log(`✗ FAILED: ${name} failed with: ${err.message}`);
    try { await client.end(); } catch (e) {}
    return false;
  }
}

async function run() {
  for (let i = 0; i < uris.length; i++) {
    const success = await testUri(uris[i], `URI Option ${i + 1}`);
    if (success) {
      console.log(`\nWorking connection string found: Option ${i + 1}`);
      break;
    }
  }
}

run();
