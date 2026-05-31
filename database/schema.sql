-- Run this manually or use the sync function in database.js
CREATE DATABASE portfolio_db;

\c portfolio_db;

CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  technologies TEXT,
  image_url VARCHAR(500),
  github_link VARCHAR(500),
  live_link VARCHAR(500),
  is_featured BOOLEAN DEFAULT false
);

-- ... (other tables as in database.js sync)