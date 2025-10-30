const Joi = require('joi');

module.exports = {
    addNote: Joi.object({
        ownerId: Joi.string().required(),
        title: Joi.string().required(),
        body: Joi.string().required(),
        isPrivate: Joi.bool().optional(),
        tags: Joi.array().items(Joi.string()).optional()
    }),
};