import request from 'supertest'
import app from '../app'

// Mock the pool to avoid real DB calls
jest.mock('../db', () => {
  // simple in-memory mock state for users and listings
  const users: Record<string, any> = {}
  const listings: Record<number, any> = {}
  let nextListingId = 100

  return {
    pool: {
      query: jest.fn((sql: string, params?: any[]) => {
        const s = sql.toLowerCase()

        if (s.includes('create table if not exists schema_migrations')) {
          return Promise.resolve({ rows: [], rowCount: 0 })
        }

        if (s.includes('select id, email, role, password_hash from users where')) {
          const email = params![0]
          if (users[email]) return Promise.resolve({ rows: [users[email]] })
          return Promise.resolve({ rows: [] })
        }

        if (s.includes('insert into users')) {
          const email = params![0]
          const role = params![2] || 'user'
          const u = { id: `u_${Object.keys(users).length + 1}`, email, role, password_hash: '$2a$10$dummyhash' }
          users[email] = u
          return Promise.resolve({ rows: [u], rowCount: 1 })
        }

        if (s.includes('insert into option_listings')) {
          const userId = params![0]
          const ticker = params![1]
          const strategy = params![2]
          const premium = params![3]
          const expiry = params![4]
          const id = nextListingId++
          const rec = { id, user_id: userId, ticker, strategy, premium, expiry }
          listings[id] = rec
          return Promise.resolve({ rows: [rec], rowCount: 1 })
        }

        if (s.includes('select * from option_listings where user_id')) {
          const userId = params![0]
          const rows = Object.values(listings).filter((r: any) => r.user_id === userId)
          return Promise.resolve({ rows, rowCount: rows.length })
        }

        if (s.includes('select user_id from option_listings where id')) {
          const id = params![0]
          const rec = listings[id]
          if (rec) return Promise.resolve({ rows: [{ user_id: rec.user_id }], rowCount: 1 })
          return Promise.resolve({ rows: [], rowCount: 0 })
        }

        if (s.includes('update option_listings')) {
          const ticker = params![0]
          const strategy = params![1]
          const premium = params![2]
          const expiry = params![3]
          const id = params![4]
          const rec = listings[id]
          if (!rec) return Promise.resolve({ rows: [], rowCount: 0 })
          rec.ticker = ticker
          rec.strategy = strategy
          rec.premium = premium
          rec.expiry = expiry
          return Promise.resolve({ rows: [rec], rowCount: 1 })
        }

        if (s.includes('delete from option_listings')) {
          const id = params![0]
          delete listings[id]
          return Promise.resolve({ rowCount: 1 })
        }

        // default
        return Promise.resolve({ rows: [], rowCount: 0 })
      })
    }
  }
})

describe('CRUD auth integration (mocked DB)', () => {
  it('register, login, create/get/update/delete listings', async () => {
    // Register
    const reg = await request(app).post('/api/auth/register').send({ email: 'test@example.com', password: 'password' })
    expect(reg.status).toBe(200)
    expect(reg.body.ok).toBe(true)
    const token = reg.body.token

    // Create listing
    const create = await request(app).post('/api/options').set('Authorization', `Bearer ${token}`).send({ ticker: 'AAPL', strategy: 'Covered Call', premium: 3.5, expiry: '2026-06-19' })
    expect(create.status).toBe(200)
    expect(create.body.ticker).toBe('AAPL')
    const createdId = create.body.id

    // Get listings
    const list = await request(app).get('/api/options').set('Authorization', `Bearer ${token}`)
    expect(list.status).toBe(200)
    expect(Array.isArray(list.body)).toBe(true)

    // Update listing
    const update = await request(app).put(`/api/options/${createdId}`).set('Authorization', `Bearer ${token}`).send({ ticker: 'AAPL', strategy: 'Long Put', premium: 2.1, expiry: '2026-07-01' })
    expect(update.status).toBe(200)
    expect(update.body.strategy).toBe('Long Put')

    // Delete listing
    const del = await request(app).delete(`/api/options/${createdId}`).set('Authorization', `Bearer ${token}`)
    expect(del.status).toBe(200)
    expect(del.body.ok).toBe(true)
  })
})
