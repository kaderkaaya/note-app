const NoteModel = require('../models/note');

class NoteDataAccess {
    static async addNote({ ownerId, title, body, isPrivate, tags }) {
        const note = await NoteModel.create({
            ownerId,
            title,
            body,
            isPrivate,
            tags
        });
        return note;
    }
}
module.exports = NoteDataAccess;