const db = require('../config/database');

const getAllProjects = async () => {
  const result = await db.query('SELECT * FROM projects ORDER BY id DESC');
  return result.rows;
};

const getFeaturedProjects = async () => {
  const result = await db.query('SELECT * FROM projects WHERE is_featured = true');
  return result.rows;
};

const getProjectById = async (id) => {
  const result = await db.query('SELECT * FROM projects WHERE id = $1', [id]);
  return result.rows[0];
};

const createProject = async (data) => {
  const { title, description, technologies, image_url, github_link, live_link, is_featured } = data;
  const result = await db.query(
    `INSERT INTO projects (title, description, technologies, image_url, github_link, live_link, is_featured)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [title, description, technologies, image_url, github_link, live_link, is_featured]
  );
  return result.rows[0];
};

const updateProject = async (id, data) => { /* similar */ };
const deleteProject = async (id) => { await db.query('DELETE FROM projects WHERE id = $1', [id]); };

module.exports = { getAllProjects, getFeaturedProjects, getProjectById, createProject, updateProject, deleteProject };