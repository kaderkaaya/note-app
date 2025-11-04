const winston = require('winston');
const fs = require('fs');

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}
function successfulLogin() {
    const logFormat = printf(({ level, message, user, ip }) => {
        return `${message} ${level}: ${user} ${ip}`;
    });
    return winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
        logFormat,
          winston.format.json()),
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
}
function failedLogins() {
    const logFormat = printf(({level, message, user, ip, reason }) => {
        return `${message} ${level}: ${user} ${ip} ${reason}`;
    });
    return winston.createLogger({
        level: 'info',
        format: winston.format.combine(
        winston.format.timestamp(),
        logFormat,
        winston.format.json()),
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
}

module.exports = {
    successfulLogin,
    failedLogins
}