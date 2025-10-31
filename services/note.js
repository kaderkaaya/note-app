const NoteDataAccess = require('../data/note');
class NoteService {
    static async addNote({ ownerId, title, body, isPrivate, tags }) {
        return await NoteDataAccess.addNote({ ownerId, title, body, isPrivate, tags });
    }
    static async getNote({ ownerId, noteId }) {
        return await NoteDataAccess.getNote({ ownerId, noteId });
    }
    static async updateNote({ ownerId, noteId, title, body, isPrivate, tags }) {
        const note = await NoteDataAccess.getNote({ ownerId, noteId });
        console.log('note',note);
        if(note){
            return await NoteDataAccess.updateNote({ownerId, noteId, title, body, isPrivate, tags});
        }
        
    }
}
module.exports = NoteService;