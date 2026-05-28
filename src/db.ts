import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const connectionString = process.env.DATABASE_URL || '';
export const pool = new Pool({ connectionString, ssl: connectionString ? { rejectUnauthorized: false } : false });

export default pool;
