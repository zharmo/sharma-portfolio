const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.get('/', pageController.getHome);
router.get('/about', pageController.getAbout);
router.get('/projects', pageController.getProjects);
router.get('/projects/:id', pageController.getProjectDetails);
router.get('/skills', pageController.getSkills);
router.get('/experience', pageController.getExperience);
router.get('/education', pageController.getEducation);
router.get('/certificates', pageController.getCertificates);
router.get('/services', pageController.getServices);
router.get('/contact', pageController.getContactPage);
router.get('/resume', pageController.downloadResume);

module.exports = router;