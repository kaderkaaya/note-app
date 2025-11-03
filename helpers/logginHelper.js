//buraya 2 tane logger ekleyecegim basarili ve basarisiz girisler icin daha sonra bunları login kısmında
//basarili ve basarisiz durumlara gore logger yazacak.
const winston = require('winston');
const fs = require('fs');

if (!fs.existsSync('logs')) {
    fs.mkdir(async)('logs', { recursive: true });
}
//sadece user ve ip gondermek gerek
const successfulLogin = winston.createLogger({
    level: 'info',
    format: winston.combine(winston.timestamp(), winston.json()),
    defaultMeta: {
        service: 'User-Service',
    },
    transports: [
        new winston.transports.File({
            filename: 'logs/successfulLogins.log',
            level: 'info'
        })
    ],
})
//user,ip, reason gondermek gerek
const failedLogins = winston.createLogger({
    level: 'info',
    format: winston.combine(winston.timestamp(), winston.json()),
    defaultMeta: {
        service: 'User-Service',
    },
    transports: [
        new winston.transports.File({
            filename: 'logs/failedLogins.log',
            level: 'error'
        })
    ],
})
module.exports = {
    successfulLogin,
    failedLogins
}