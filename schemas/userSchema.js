const Joi = require('joi');

module.exports = {
    signUp: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
    login: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
    updateUser: Joi.object({
        userId: Joi.string().required(),
        email: Joi.string().required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
    }),
    logOut: Joi.object({
        userId: Joi.string().required(),
    }),
    getselfUser: Joi.object({
        userId: Joi.string().required(),
    }),
}