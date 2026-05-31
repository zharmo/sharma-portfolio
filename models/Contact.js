const db = require('../config/database');

const saveContact = async (name, email, message) => {
  const result = await db.query(
    'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
    [name, email, message]
  );
  return result.rows[0];
};

const getAllContacts = async () => {
  const result = await db.query('SELECT * FROM contacts ORDER BY created_at DESC');
  return result.rows;
};

module.exports = { saveContact, getAllContacts };