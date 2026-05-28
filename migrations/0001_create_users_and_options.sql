-- create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- create options listings table
CREATE TABLE IF NOT EXISTS option_listings (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  ticker TEXT NOT NULL,
  strategy TEXT NOT NULL,
  premium NUMERIC(12,4) NOT NULL,
  expiry DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
