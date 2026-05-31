const db = require('../config/database');

const getAll = async () => {
  const result = await db.query('SELECT * FROM certificates ORDER BY date_earned DESC');
  return result.rows;
};

const create = async (data) => {
  const { title, organization, date_earned, image_url, credential_link } = data;
  const result = await db.query(
    `INSERT INTO certificates (title, organization, date_earned, image_url, credential_link)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [title, organization, date_earned, image_url, credential_link]
  );
  return result.rows[0];
};

const deleteCertificate = async (id) => { await db.query('DELETE FROM certificates WHERE id = $1', [id]); };

module.exports = { getAll, create, deleteCertificate };