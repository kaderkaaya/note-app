const winston = require('winston');
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
    level: 'info',
     format: combine(timestamp(), json()),
     defaultMeta :{
        service: 'User-Service',
     },
     transports: [
       new winston.transports.Console(),
       new winston.transports.File({
        filename: 'combined.log',
       })
     ],

});
//burda fonksiyon olarak ekledik. aslinda obje olarakta yapabiliriz aynı olur ama ben app dosyasında
//sürekli calismasini istiyorum.
module.exports = {
  createLogger: () => logger
};