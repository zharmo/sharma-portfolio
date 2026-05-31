const db = require('../config/database');

const getAll = async () => {
  const result = await db.query('SELECT * FROM experiences ORDER BY start_date DESC');
  return result.rows;
};

const getByType = async (type) => {
  const result = await db.query('SELECT * FROM experiences WHERE type = $1 ORDER BY start_date DESC', [type]);
  return result.rows;
};

const create = async (data) => {
  const { title, company, location, start_date, end_date, description, type } = data;
  const result = await db.query(
    `INSERT INTO experiences (title, company, location, start_date, end_date, description, type)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [title, company, location, start_date, end_date, description, type]
  );
  return result.rows[0];
};

const update = async (id, data) => { /* similar */ };
const deleteExperience = async (id) => { await db.query('DELETE FROM experiences WHERE id = $1', [id]); };

module.exports = { getAll, getByType, create, update, deleteExperience };