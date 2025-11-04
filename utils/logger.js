const winston = require('winston');
const fs = require('fs');

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message} `;
    })
  ),
  defaultMeta: {
    service: 'User-Service',
  },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/combined.log',
    })
  ],

});
module.exports = logger;