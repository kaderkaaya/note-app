const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        error: 'Too many requests from this IP address',
        retryAfter: '15 minutes',
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
//BRUTE FORCE: Kullanıcı mail ve şifre ile deneme yanılma yoluyla yaptığı saldırıdır.
//Biz burda rate limit kullanarak aynı IP adresi ile kaç kere deneme yapabilir buna izin veriyoruz.

module.exports = limiter
    