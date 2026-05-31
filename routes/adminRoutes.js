const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Login
router.get('/login', adminController.loginForm);
router.post('/login', adminController.login);
router.get('/logout', adminController.logout);

// Dashboard (protected)
router.get('/dashboard', authMiddleware.isAuthenticated, adminController.dashboard);

// Projects
router.get('/projects', authMiddleware.isAuthenticated, adminController.listProjects);
router.post('/projects', authMiddleware.isAuthenticated, upload.single('image'), adminController.createProject);
router.get('/projects/:id/delete', authMiddleware.isAuthenticated, adminController.deleteProject);

// Skills
router.get('/skills', authMiddleware.isAuthenticated, adminController.listSkills);
router.post('/skills', authMiddleware.isAuthenticated, adminController.createSkill);
router.get('/skills/:id/delete', authMiddleware.isAuthenticated, adminController.deleteSkill);

// Experience
router.get('/experience', authMiddleware.isAuthenticated, adminController.listExperience);
router.post('/experience', authMiddleware.isAuthenticated, adminController.createExperience);
router.get('/experience/:id/delete', authMiddleware.isAuthenticated, adminController.deleteExperience);

// Education
router.get('/education', authMiddleware.isAuthenticated, adminController.listEducation);
router.post('/education', authMiddleware.isAuthenticated, adminController.createEducation);
router.get('/education/:id/delete', authMiddleware.isAuthenticated, adminController.deleteEducation);

// Certificates
router.get('/certificates', authMiddleware.isAuthenticated, adminController.listCertificates);
router.post('/certificates', authMiddleware.isAuthenticated, upload.single('image'), adminController.createCertificate);
router.get('/certificates/:id/delete', authMiddleware.isAuthenticated, adminController.deleteCertificate);

// Testimonials
router.get('/testimonials', authMiddleware.isAuthenticated, adminController.listTestimonials);
router.post('/testimonials', authMiddleware.isAuthenticated, upload.single('image'), adminController.createTestimonial);
router.get('/testimonials/:id/delete', authMiddleware.isAuthenticated, adminController.deleteTestimonial);

// Messages
router.get('/messages', authMiddleware.isAuthenticated, adminController.listMessages);

module.exports = router;