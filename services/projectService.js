const Project = require('../models/Project');

const getFeaturedWithLimit = async (limit = 3) => {
  const allFeatured = await Project.getFeaturedProjects();
  return allFeatured.slice(0, limit);
};

const searchProjects = async (keyword) => {
  const all = await Project.getAllProjects();
  return all.filter(p => p.title.toLowerCase().includes(keyword.toLowerCase()) ||
                         (p.description && p.description.toLowerCase().includes(keyword.toLowerCase())));
};

module.exports = { getFeaturedWithLimit, searchProjects };