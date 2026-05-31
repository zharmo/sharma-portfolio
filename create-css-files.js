const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'public', 'css');
if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir, { recursive: true });

const files = {
  'global.css': `/* Global styles */
:root {
  --primary: #2563eb;
  --secondary: #0f172a;
  --accent: #06b6d4;
}
body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  color: var(--secondary);
}
.navbar {
  background: var(--secondary) !important;
}
.hero {
  background: linear-gradient(135deg, var(--secondary), var(--primary));
  min-height: 80vh;
  display: flex;
  align-items: center;
  color: white;
}
.btn-primary {
  background: var(--primary);
  border-radius: 40px;
  padding: 0.5rem 1.5rem;
}
.card {
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}
.progress {
  height: 8px;
  border-radius: 4px;
}
.progress-bar {
  background: var(--primary);
}
.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  position: relative;
}
.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 3px;
  background: var(--primary);
}
footer {
  background: var(--secondary);
  color: #94a3b8;
  padding: 2rem 0;
  margin-top: 3rem;
}`,
  'home.css': '/* Home page specific styles */',
  'about.css': '/* About page styles */',
  'projects.css': '/* Projects page styles */',
  'skills.css': '/* Skills page styles */',
  'experience.css': '/* Experience page styles */',
  'education.css': '/* Education page styles */',
  'certificates.css': '/* Certificates page styles */',
  'services.css': '/* Services page styles */',
  'contact.css': '/* Contact page styles */',
  'admin.css': '/* Admin panel styles */'
};

Object.entries(files).forEach(([filename, content]) => {
  fs.writeFileSync(path.join(cssDir, filename), content);
  console.log(`Created: public/css/${filename}`);
});
console.log('All CSS files created successfully!');