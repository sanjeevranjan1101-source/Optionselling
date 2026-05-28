import { pool } from '../db';
import bcrypt from 'bcryptjs';

export async function createUser(email: string, password: string, role: string = 'user') {
  const hash = await bcrypt.hash(password, 10);
  const res = await pool.query('INSERT INTO users (email, password_hash, role) VALUES ($1,$2,$3) RETURNING id, email, role, created_at', [email, hash, role]);
  return res.rows[0];
}

export async function findUserByEmail(email: string) {
  const res = await pool.query('SELECT id, email, role, password_hash FROM users WHERE email=$1', [email]);
  return res.rows[0];
}

export async function verifyPassword(hash: string, password: string) {
  return bcrypt.compare(password, hash);
}
