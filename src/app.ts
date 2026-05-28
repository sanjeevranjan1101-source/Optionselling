import express from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRouter from './routes/api';
import { pool } from './db';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');
const publicPath = fs.existsSync(frontendDistPath)
  ? frontendDistPath
  : path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

app.use('/api', (req, _res, next) => {
  (req as any).db = pool;
  next();
}, apiRouter);

app.get('*', (_req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

export default app;
