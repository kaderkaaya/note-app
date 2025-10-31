const Joi = require('joi');

module.exports = {
    addNote: Joi.object({
        ownerId: Joi.string().required(),
        title: Joi.string().required(),
        body: Joi.string().required(),
        isPrivate: Joi.bool().optional(),
        tags: Joi.array().items(Joi.string()).optional()
    }),
    getNote: Joi.object({
        ownerId: Joi.string().required(),
        noteId: Joi.string().required(),
    }),
    updateNote: Joi.object({
        ownerId :Joi.string().required(),
        noteId: Joi.string().required(),
        title: Joi.string().optional(),
        body: Joi.string().optional(),
        isPrivate: Joi.bool().optional(),
        tags: Joi.array().items(Joi.string()).optional(),
        noteStatus:Joi.number().optional(),
    }),
    getAllNotes: Joi.object({
        ownerId: Joi.string().required(),
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
        search: Joi.string().optional(),
    }),
    deleteNote: Joi.object({
        ownerId: Joi.string().required(),
        noteId: Joi.string().required(),
    })
};