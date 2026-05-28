import fs from 'fs';
import path from 'path';
import { pool } from './db';

async function run() {
  try {
    // Ensure schema_migrations table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        applied_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      )
    `);

    const migrationsDir = path.join(__dirname, '..', 'migrations');
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

    for (const file of files) {
      // Check if migration has already been applied
      const checkRes = await pool.query('SELECT name FROM schema_migrations WHERE name = $1', [file]);
      if (checkRes.rows.length > 0) {
        console.log('Skipping (already applied)', file);
        continue;
      }

      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      console.log('Running', file);
      try {
        await pool.query(sql);
        // Record migration as applied
        await pool.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file]);
        console.log('Applied', file);
      } catch (err) {
        console.error('Failed', file, err);
        process.exit(1);
      }
    }
    await pool.end();
    console.log('Migrations complete');
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  }
}

run().catch(e => { console.error(e); process.exit(1); });
