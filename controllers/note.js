const NoteService = require('../services/note');
const ErrorHelper = require('../helpers/errorHelper');

class NoteController {
    static async addNote(req, res) {
        const { ownerId, title, body, isPrivate, tags } = req.body;
        const note = await NoteService.addNote({ ownerId, title, body, isPrivate, tags });
        return ErrorHelper.sendSuccess({ code: 201, data: note, res })
    }
}
module.exports = NoteController;