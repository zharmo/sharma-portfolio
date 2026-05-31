const Contact = require('../models/Contact');
const Project = require('../models/Project');

const getStats = async () => {
  const messages = await Contact.getAllContacts();
  const projects = await Project.getAllProjects();
  return {
    totalMessages: messages.length,
    totalProjects: projects.length,
    recentMessages: messages.slice(0, 5),
  };
};

module.exports = { getStats };