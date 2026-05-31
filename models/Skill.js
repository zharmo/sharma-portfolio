const db = require('../config/database');

const getAll = async () => {
  const result = await db.query('SELECT * FROM skills ORDER BY category, name');
  return result.rows;
};

const getAllGrouped = async () => {
  const rows = await getAll();
  const grouped = {};
  rows.forEach(skill => {
    if (!grouped[skill.category]) grouped[skill.category] = [];
    grouped[skill.category].push({ name: skill.name, percentage: skill.percentage });
  });
  return grouped;
};

const create = async (category, name, percentage) => {
  const result = await db.query(
    'INSERT INTO skills (category, name, percentage) VALUES ($1, $2, $3) RETURNING *',
    [category, name, percentage]
  );
  return result.rows[0];
};

const update = async (id, category, name, percentage) => { /* similar */ };
const deleteSkill = async (id) => { await db.query('DELETE FROM skills WHERE id = $1', [id]); };

module.exports = { getAll, getAllGrouped, create, update, deleteSkill };