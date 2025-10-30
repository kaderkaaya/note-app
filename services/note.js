const NoteDataAccess = require('../data/note');
class NoteService {
    static async addNote({ ownerId, title, body, isPrivate, tags }) {
        return await NoteDataAccess.addNote({ ownerId, title, body, isPrivate, tags });
    }
}
module.exports = NoteService;