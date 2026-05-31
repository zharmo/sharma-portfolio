const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const sync = async () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )`,
    `CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      description TEXT,
      technologies TEXT,
      image_url VARCHAR(500),
      github_link VARCHAR(500),
      live_link VARCHAR(500),
      is_featured BOOLEAN DEFAULT false
    )`,
    `CREATE TABLE IF NOT EXISTS skills (
      id SERIAL PRIMARY KEY,
      category VARCHAR(100),
      name VARCHAR(100) NOT NULL,
      percentage INT
    )`,
    `CREATE TABLE IF NOT EXISTS experiences (
      id SERIAL PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      company VARCHAR(200),
      location VARCHAR(200),
      start_date VARCHAR(50),
      end_date VARCHAR(50),
      description TEXT,
      type VARCHAR(50)
    )`,
    `CREATE TABLE IF NOT EXISTS certificates (
      id SERIAL PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      organization VARCHAR(200),
      date_earned VARCHAR(50),
      image_url VARCHAR(500),
      credential_link VARCHAR(500)
    )`,
    `CREATE TABLE IF NOT EXISTS testimonials (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      position VARCHAR(100),
      review TEXT,
      image_url VARCHAR(500)
    )`
  ];
  for (let query of queries) {
    await pool.query(query);
  }
  console.log('Database tables ready');
};

module.exports = { query: (text, params) => pool.query(text, params), sync };