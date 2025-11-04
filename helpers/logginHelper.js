const winston = require('winston');
const fs = require('fs');

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}
function successfulLogin() {
    const logFormat = winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
            return `${timestamp} ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
        })
    )
    return winston.createLogger({
        level: 'info',
        format: logFormat,
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
    const logFormat = winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, reason, ...meta }) => {
            return `${timestamp} ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''} ${reason}`;
        })
    )
    return winston.createLogger({
        level: 'info',
        format: logFormat,
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