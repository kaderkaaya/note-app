const winston = require('winston');
const fs = require('fs');
const { combine, timestamp, json } = winston.format;

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}
const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
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
//burda fonksiyon olarak ekledik. aslinda obje olarakta yapabiliriz aynı olur ama ben app dosyasında
//sürekli calismasini istiyorum.
module.exports = {
  createLogger: () => logger
};