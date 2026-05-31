const Contact = require('../models/Contact');
const { sendContactEmail } = require('../config/mailConfig');
const { body, validationResult } = require('express-validator');

exports.sendMessage = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('pages/contact', { 
        errors: errors.array(), 
        success: null,
        user: req.session.user 
      });
    }
    const { name, email, message } = req.body;
    try {
      // Save to database
      await Contact.saveContact(name, email, message);
      // Send email (don't crash if email fails)
      const emailResult = await sendContactEmail(name, email, message);
      if (!emailResult.success) {
        console.warn('Email not sent:', emailResult.error);
      }
      res.render('pages/contact', { 
        success: 'Your message has been sent. I will get back to you soon!',
        errors: null,
        user: req.session.user 
      });
    } catch (err) {
      console.error('Contact save error:', err);
      res.status(500).render('pages/contact', { 
        success: null, 
        errors: [{ msg: 'Server error. Please try again later.' }],
        user: req.session.user 
      });
    }
  }
];