const Joi = require('joi');

module.exports = {
    generateToken: Joi.object({
        userId: Joi.string().required(),
    }),
    verifyAndRefreshToken: Joi.object({
        token: Joi.string().required(),
    })
};