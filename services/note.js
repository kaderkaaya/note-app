const NoteDataAccess = require('../data/note');
const ApiError = require('../helpers/apiHelper');
const { NOTE_ERROR } = require('../utils/errors');
class NoteService {
    static async addNote({ ownerId, title, body, isPrivate, tags }) {
        return await NoteDataAccess.addNote({ ownerId, title, body, isPrivate, tags });
    }
    static async getNote({ ownerId, noteId }) {
        return await NoteDataAccess.getNote({ ownerId, noteId });
    }
    static async updateNote({ ownerId, noteId, title, body, isPrivate, tags, noteStatus }) {
        const note = await NoteDataAccess.getNote({ ownerId, noteId });
        if(note){
            return await NoteDataAccess.updateNote({ownerId, noteId, title, body, isPrivate, tags, noteStatus});
        }
        else{
            throw new ApiError(NOTE_ERROR.message,NOTE_ERROR.statusCode)
        }
        
    }
}
module.exports = NoteService;