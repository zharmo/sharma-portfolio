const Contact = require('../models/Contact');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Certificate = require('../models/Certificate');
const Testimonial = require('../models/Testimonial');
const bcrypt = require('bcryptjs');

// ========== AUTHENTICATION ==========
exports.loginForm = (req, res) => {
  res.render('admin/login', { error: null });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;
  
  if (!adminHash) {
    return res.render('admin/login', { error: 'Admin hash missing. Check .env file.' });
  }
  
  if (email === adminEmail && bcrypt.compareSync(password, adminHash)) {
    req.session.user = { email: adminEmail, isAdmin: true };
    res.redirect('/admin/dashboard');
  } else {
    res.render('admin/login', { error: 'Invalid email or password' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
};

// ========== DASHBOARD ==========
exports.dashboard = async (req, res) => {
  const projectCount = (await Project.getAllProjects()).length;
  const messageCount = (await Contact.getAllContacts()).length;
  const skillCount = (await Skill.getAll()).length;
  const experienceCount = (await Experience.getAll()).length;
  res.render('admin/dashboard', { projectCount, messageCount, skillCount, experienceCount });
};

// ========== PROJECTS ==========
exports.listProjects = async (req, res) => {
  const projects = await Project.getAllProjects();
  res.render('admin/projects', { projects });
};
exports.createProject = async (req, res) => {
  const { title, description, technologies, github_link, live_link, is_featured } = req.body;
  const image_url = req.file ? `/uploads/projects/${req.file.filename}` : null;
  await Project.createProject({ title, description, technologies, image_url, github_link, live_link, is_featured: !!is_featured });
  res.redirect('/admin/projects');
};
exports.deleteProject = async (req, res) => {
  await Project.deleteProject(req.params.id);
  res.redirect('/admin/projects');
};

// ========== SKILLS ==========
exports.listSkills = async (req, res) => {
  const skills = await Skill.getAll();
  res.render('admin/skills', { skills });
};
exports.createSkill = async (req, res) => {
  await Skill.create(req.body.category, req.body.name, req.body.percentage || null);
  res.redirect('/admin/skills');
};
exports.deleteSkill = async (req, res) => {
  await Skill.deleteSkill(req.params.id);
  res.redirect('/admin/skills');
};

// ========== EXPERIENCE ==========
exports.listExperience = async (req, res) => {
  const experiences = await Experience.getAll();
  res.render('admin/experience', { experiences });
};
exports.createExperience = async (req, res) => {
  await Experience.create(req.body);
  res.redirect('/admin/experience');
};
exports.deleteExperience = async (req, res) => {
  await Experience.deleteExperience(req.params.id);
  res.redirect('/admin/experience');
};

// ========== EDUCATION ==========
exports.listEducation = async (req, res) => {
  const educations = await Education.getAll();
  res.render('admin/education', { educations });
};
exports.createEducation = async (req, res) => {
  await Education.create(req.body);
  res.redirect('/admin/education');
};
exports.deleteEducation = async (req, res) => {
  await Experience.deleteExperience(req.params.id); // same table
  res.redirect('/admin/education');
};

// ========== CERTIFICATES ==========
exports.listCertificates = async (req, res) => {
  const certificates = await Certificate.getAll();
  res.render('admin/certificates', { certificates });
};
exports.createCertificate = async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.image_url = `/uploads/certificates/${req.file.filename}`;
  await Certificate.create(data);
  res.redirect('/admin/certificates');
};
exports.deleteCertificate = async (req, res) => {
  await Certificate.deleteCertificate(req.params.id);
  res.redirect('/admin/certificates');
};

// ========== TESTIMONIALS (all required methods) ==========
exports.listTestimonials = async (req, res) => {
  const testimonials = await Testimonial.getAll();
  res.render('admin/testimonials', { testimonials });
};
exports.createTestimonial = async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.image_url = `/uploads/testimonials/${req.file.filename}`;
  await Testimonial.create(data);
  res.redirect('/admin/testimonials');
};
exports.deleteTestimonial = async (req, res) => {
  await Testimonial.deleteTestimonial(req.params.id);
  res.redirect('/admin/testimonials');
};

// ========== CONTACT MESSAGES ==========
exports.listMessages = async (req, res) => {
  const messages = await Contact.getAllContacts();
  res.render('admin/messages', { messages });
};