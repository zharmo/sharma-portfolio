const db = require('../config/database');

const getAll = async () => {
  const result = await db.query("SELECT * FROM experiences WHERE type = 'education' ORDER BY start_date DESC");
  return result.rows;
};

const create = async (data) => {
  const { title, company, location, start_date, end_date, description } = data;
  const result = await db.query(
    `INSERT INTO experiences (title, company, location, start_date, end_date, description, type)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [title, company, location, start_date, end_date, description, 'education']
  );
  return result.rows[0];
};

module.exports = { getAll, create };