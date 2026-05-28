-- add role column to users and index on option_listings.user_id
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user';

CREATE INDEX IF NOT EXISTS idx_option_listings_user_id ON option_listings(user_id);
