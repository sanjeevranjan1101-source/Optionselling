import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
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

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user as any;
  if (!user) return res.status(401).json({ error: 'no_auth' });
  if (user.role === 'admin') return next();
  return res.status(403).json({ error: 'forbidden' });
}
