const fs = require('fs');
const path = require('path');

// Load translation files
const en = JSON.parse(fs.readFileSync(path.join(__dirname, '../locales/en.json'), 'utf8'));
const so = JSON.parse(fs.readFileSync(path.join(__dirname, '../locales/so.json'), 'utf8'));

const translations = { en, so };

// Middleware to set language from cookie or query param
const setLocale = (req, res, next) => {
  let lang = req.query.lang || req.cookies?.lang || 'en';
  if (!['en', 'so'].includes(lang)) lang = 'en';
  req.lang = lang;
  res.locals.lang = lang;
  res.locals.t = translations[lang]; // translation function
  // Also expose __() helper for EJS
  res.locals.__ = (key) => translations[lang][key] || key;
  next();
};

// Route to change language
const setLanguage = (req, res) => {
  const { lang } = req.params;
  if (['en', 'so'].includes(lang)) {
    res.cookie('lang', lang, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
  }
  res.redirect('back');
};

module.exports = { setLocale, setLanguage };