const db = require('../config/database');

const getAll = async () => {
  const result = await db.query('SELECT * FROM testimonials ORDER BY id DESC');
  return result.rows;
};

const create = async (data) => {
  const { name, position, review, image_url } = data;
  const result = await db.query(
    'INSERT INTO testimonials (name, position, review, image_url) VALUES ($1,$2,$3,$4) RETURNING *',
    [name, position, review, image_url]
  );
  return result.rows[0];
};

const deleteTestimonial = async (id) => {
  await db.query('DELETE FROM testimonials WHERE id = $1', [id]);
};

module.exports = { getAll, create, deleteTestimonial };