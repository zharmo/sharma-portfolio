require('dotenv').config();
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const cookieParser = require('cookie-parser');           // <-- ADDED
const db = require('./config/database');

// Import locale middleware
const { setLocale, setLanguage } = require('./middleware/localeMiddleware');  // <-- ADDED

// Import route modules
const pageRoutes = require('./routes/pageRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// ========== SECURITY MIDDLEWARE ==========
app.use(helmet({
  contentSecurityPolicy: false, // Allows inline scripts (Bootstrap uses some)
}));

// ========== RATE LIMITING (skip static files, higher limit in dev) ==========
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 10000,
  skip: (req) => {
    const staticPaths = ['/css/', '/js/', '/images/', '/uploads/', '/favicon.ico'];
    return staticPaths.some(p => req.url.startsWith(p));
  },
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// ========== VIEW ENGINE ==========
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ========== BODY PARSING ==========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== COOKIE PARSER (for language preference) ==========
app.use(cookieParser());                                      // <-- ADDED

// ========== LOCALE MIDDLEWARE (must be before routes) ==========
app.use(setLocale);                                           // <-- ADDED

// ========== STATIC FILES (must be before routes) ==========
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ========== SESSION (for admin auth) ==========
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_dev_secret_change_in_production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 3600000,
  },
}));

// ========== MAKE USER AVAILABLE IN ALL VIEWS ==========
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// ========== LANGUAGE SWITCHER ROUTE (place before other routes) ==========
app.get('/lang/:lang', setLanguage);                          // <-- ADDED

// ========== ROUTES ==========
app.use('/', pageRoutes);
app.use('/contact', contactRoutes);
app.use('/admin', adminRoutes);

// ========== ERROR HANDLING ==========
// 404 handler
app.use((req, res) => {
  res.status(404).render('errors/404', { title: 'Page Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).render('errors/500', {
    title: 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : null
  });
});

// ========== DATABASE SYNC & SERVER START ==========
const PORT = process.env.PORT || 3000;

db.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🚀 Rate limit: ${process.env.NODE_ENV === 'production' ? '100 requests per 15 min' : '10000 requests per 15 min (static files skipped)'}`);
  });
}).catch(err => {
  console.error('❌ Database connection failed:', err);
  process.exit(1);
});