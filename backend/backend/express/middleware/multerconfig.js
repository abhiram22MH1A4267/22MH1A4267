const fs = require('fs');
const path = require('path');

const logStream = fs.createWriteStream(path.join(__dirname, '../logs/app.log'), { flags: 'a' });

const logger = (req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url} - ${req.ip}\n`;
  logStream.write(log);
};

module.exports = logger;
