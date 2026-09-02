-- 001_initial.sql
-- Initial schema for IFBM backend

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS members (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE,
    city        VARCHAR(255) NOT NULL,
    state       VARCHAR(255) NOT NULL,
    contribute  VARCHAR(100),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);

CREATE TABLE IF NOT EXISTS contacts (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name         VARCHAR(255) NOT NULL,
    email        VARCHAR(255) NOT NULL,
    message      TEXT NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stats_cache (
    key         VARCHAR(100) PRIMARY KEY,
    value       TEXT NOT NULL,
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed initial stats
INSERT INTO stats_cache (key, value) VALUES
    ('instagram_followers', '20200'),
    ('campaign_posts', '28')
ON CONFLICT (key) DO NOTHING;
