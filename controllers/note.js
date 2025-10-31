const NoteService = require('../services/note');
const ErrorHelper = require('../helpers/errorHelper');

class NoteController {
    static async addNote(req, res) {
        const { ownerId, title, body, isPrivate, tags } = req.body;
        const note = await NoteService.addNote({ ownerId, title, body, isPrivate, tags });
        return ErrorHelper.sendSuccess({ code: 201, data: note, res })
    };
    static async getNote(req, res, next) {
        try {
            const { ownerId, noteId } = req.query;
            const note = await NoteService.getNote({ ownerId, noteId });
            return ErrorHelper.sendSuccess({ code: 201, data: note, res })
        } catch (error) {
            res.status(500).send({ error: `error:${error}` })
        }
    };
    static async updateNote(req, res, next) {
        try {
            const { ownerId, noteId, title, body, isPrivate, tags, noteStatus } = req.body;
            const note = await NoteService.updateNote({ ownerId, noteId, title, body, isPrivate, tags, noteStatus });   
            return ErrorHelper.sendSuccess({ code: 201, data: note, res })
        } catch (error) {
            console.log('error', error);
            res.status(500).send({ error: `error:${error}` })
        }
    };
    static async getAllNotes(req, res, next) {
        try {
            const { ownerId, page, limit } = req.query;
            const note = await NoteService.getAllNotes({ ownerId, page, limit });
            return ErrorHelper.sendSuccess({ code: 201, data: note, res })
        } catch (error) {
            console.log('error', error);
            res.status(500).send({ error: `error:${error}` })
        }
    };
    static async deleteNote(req, res, next) {
        try {
            const { ownerId, noteId } = req.body;
            const note = await NoteService.deleteNote({ ownerId, noteId });
            return ErrorHelper.sendSuccess({ code: 201, data: note, res })
        } catch (error) {
            console.log('error', error);
            res.status(500).send({ error: `error:${error}` })
        }
    };
}
module.exports = NoteController;