const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../../logs/app.log');

// Ensure logs directory exists
const logDir = path.dirname(logFile);
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

const log = (level, message) => {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${level.toUpperCase()}: ${message}\n`;
  console.log(logLine.trim());
  fs.appendFile(logFile, logLine, (err) => { if (err) console.error('Log write failed', err); });
};

module.exports = { info: (msg) => log('info', msg), error: (msg) => log('error', msg), warn: (msg) => log('warn', msg) };