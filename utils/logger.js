import winston from 'winston';

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
export default logger;