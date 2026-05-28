import { Router, Request, Response } from 'express';
import authRouter from './auth';
import jwt from 'jsonwebtoken';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// Public endpoints
router.use('/auth', authRouter);

router.post('/contact', (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  console.log('Contact received:', { name, email, message });
  res.json({ ok: true, received: { name, email } });
});

// Auth middleware
function authMiddleware(req: Request, res: Response, next: any) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'no_auth' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'malformed' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    (req as any).user = payload;
    next();
  } catch (err) { return res.status(401).json({ error: 'invalid' }); }
}

// Protected option listings CRUD
router.get('/options', authMiddleware, async (req: Request, res: Response) => {
  const pool = (req as any).db;
  const userId = (req as any).user.uid;
  try {
    const result = await pool.query('SELECT * FROM option_listings WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error('GET /api/options error', err);
    res.status(500).json({ error: 'server' });
  }
});

router.post('/options', authMiddleware, async (req: Request, res: Response) => {
  const pool = (req as any).db;
  const { ticker, strategy, premium, expiry } = req.body;
  const userId = (req as any).user.uid;
  try {
    const result = await pool.query(
      'INSERT INTO option_listings (user_id,ticker,strategy,premium,expiry) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [userId, ticker, strategy, premium, expiry]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('POST /api/options error', err);
    res.status(500).json({ error: 'server' });
  }
});

router.put('/options/:id', authMiddleware, async (req: Request, res: Response) => {
  const pool = (req as any).db;
  const id = req.params.id;
  const { ticker, strategy, premium, expiry } = req.body;
  const userId = (req as any).user.uid;
  try {
    const check = await pool.query('SELECT user_id FROM option_listings WHERE id = $1', [id]);
    if (check.rowCount === 0) return res.status(404).json({ error: 'not_found' });
    if (check.rows[0].user_id !== userId) return res.status(403).json({ error: 'forbidden' });

    const result = await pool.query(
      'UPDATE option_listings SET ticker=$1, strategy=$2, premium=$3, expiry=$4 WHERE id=$5 RETURNING *',
      [ticker, strategy, premium, expiry, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('PUT /api/options/:id error', err);
    res.status(500).json({ error: 'server' });
  }
});

router.delete('/options/:id', authMiddleware, async (req: Request, res: Response) => {
  const pool = (req as any).db;
  const id = req.params.id;
  const userId = (req as any).user.uid;
  try {
    const check = await pool.query('SELECT user_id FROM option_listings WHERE id = $1', [id]);
    if (check.rowCount === 0) return res.status(404).json({ error: 'not_found' });
    if (check.rows[0].user_id !== userId) return res.status(403).json({ error: 'forbidden' });

    await pool.query('DELETE FROM option_listings WHERE id=$1', [id]);
    res.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/options/:id error', err);
    res.status(500).json({ error: 'server' });
  }
});

export default router;
