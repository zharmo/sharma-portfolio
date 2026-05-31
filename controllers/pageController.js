const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Certificate = require('../models/Certificate');
const Testimonial = require('../models/Testimonial');
const path = require('path');

exports.getHome = async (req, res) => {
  const featuredProjects = await Project.getFeaturedProjects();
  const skillsGrouped = await Skill.getAllGrouped(); // returns object like { Frontend: [...], Backend: [...] }
  const testimonials = await Testimonial.getAll();
  res.render('pages/home', { 
    featuredProjects, 
    skills: skillsGrouped, 
    testimonials, 
    user: req.session.user 
  });
};

exports.getAbout = (req, res) => { 
  res.render('pages/about', { user: req.session.user }); 
};

exports.getProjects = async (req, res) => {
  const projects = await Project.getAllProjects();
  res.render('pages/projects', { projects, user: req.session.user });
};

exports.getProjectDetails = async (req, res) => {
  const project = await Project.getProjectById(req.params.id);
  res.render('pages/project-details', { project, user: req.session.user });
};

exports.getSkills = async (req, res) => {
  const skillsGrouped = await Skill.getAllGrouped();
  res.render('pages/skills', { skills: skillsGrouped, user: req.session.user });
};

exports.getExperience = async (req, res) => {
  const experiences = await Experience.getAll();
  res.render('pages/experience', { experiences, user: req.session.user });
};

exports.getEducation = async (req, res) => {
  const educations = await Education.getAll();
  res.render('pages/education', { educations, user: req.session.user });
};

exports.getCertificates = async (req, res) => {
  const certificates = await Certificate.getAll();
  res.render('pages/certificates', { certificates, user: req.session.user });
};

exports.getServices = (req, res) => { 
  res.render('pages/services', { user: req.session.user }); 
};

exports.getContactPage = (req, res) => { 
  res.render('pages/contact', { success: null, errors: null, user: req.session.user }); 
};

exports.downloadResume = (req, res) => {
  res.download(path.join(__dirname, '../public/files/Sharma_Resume.pdf'));
};