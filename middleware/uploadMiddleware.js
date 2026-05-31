const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Configure storage dynamically based on field name or route
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/';
    // Detect destination from route or field name
    if (req.originalUrl.includes('/admin/projects') || file.fieldname === 'project_image') {
      uploadPath = 'uploads/projects/';
    } else if (req.originalUrl.includes('/admin/certificates') || file.fieldname === 'certificate_image') {
      uploadPath = 'uploads/certificates/';
    } else if (file.fieldname === 'image') {
      // Fallback: check referer or body
      if (req.body && req.body.type === 'certificate') uploadPath = 'uploads/certificates/';
      else uploadPath = 'uploads/projects/';
    } else {
      uploadPath = 'uploads/misc/';
    }
    ensureDir(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `img-${uniqueSuffix}${ext}`);
  },
});

// File filter – allow only images
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, png, jpg, gif, webp) are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: fileFilter,
});

// Middleware for single file upload (used in admin routes)
module.exports = upload;