const NoteDataAccess = require('../data/note');
const ApiError = require('../helpers/apiHelper');
const { NOTE_ERROR } = require('../utils/errors');
const UserDataAccss = require('../data/user');

class NoteService {
    static async addNote({ ownerId, title, body, isPrivate, tags }) {
        const note = await NoteDataAccess.addNote({ ownerId, title, body, isPrivate, tags });
        return { note };
    };

    static async getNote({ ownerId, noteId }) {
        return await NoteDataAccess.getNote({ ownerId, noteId });
    };

    static async updateNote({ ownerId, noteId, title, body, isPrivate, tags, noteStatus }) {
        const note = await NoteDataAccess.getNote({ ownerId, noteId });
        if (note) {
            return await NoteDataAccess.updateNote({ ownerId, noteId, title, body, isPrivate, tags, noteStatus });
        }
        else {
            throw new ApiError(NOTE_ERROR.message, NOTE_ERROR.statusCode)
        }

    };

    static async getAllNotes({ ownerId, page, limit, search }) {
        const user = await UserDataAccss.getUserById({ userId: ownerId });
        if (user) {
            return await NoteDataAccess.getAllNotes({ ownerId, page, limit, search });
        };
    };

    static async deleteNote({ ownerId, noteId, noteStatus }) {
        const note = await NoteDataAccess.getNote({ ownerId, noteId });
        if (note) {
            return NoteDataAccess.deleteNote({ ownerId, noteId, noteStatus })
        }
        else {
            throw new ApiError(NOTE_ERROR.message, NOTE_ERROR.statusCode)
        }
    };

}

module.exports = NoteService;