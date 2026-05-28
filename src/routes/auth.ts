import { Router } from 'express';
import { createUser, findUserByEmail, verifyPassword } from '../models/user';
import jwt from 'jsonwebtoken';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'missing' });
  try {
    const existing = await findUserByEmail(email);
    if (existing) return res.status(409).json({ error: 'exists' });
    const user = await createUser(email, password);
    const token = jwt.sign({ uid: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ ok: true, token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) { console.error(err); res.status(500).json({ error: 'server' }); }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'missing' });
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'invalid' });
    const ok = await verifyPassword(user.password_hash, password);
    if (!ok) return res.status(401).json({ error: 'invalid' });
    const token = jwt.sign({ uid: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ ok: true, token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) { console.error(err); res.status(500).json({ error: 'server' }); }
});

export default router;
