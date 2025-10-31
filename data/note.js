const NoteModel = require('../models/note');
const { NOTE_STATUS } = require('../utils/constant');

class NoteDataAccess {
    static async addNote({ ownerId, title, body, isPrivate, tags }) {
        const note = await NoteModel.create({
            ownerId,
            title,
            body,
            isPrivate,
            tags,
            noteStatus: NOTE_STATUS.ACTIVE,
        });
        return note;
    }
    static async getNote({ ownerId, noteId }) {
        const note = await NoteModel.findOne({
            ownerId,
            _id: noteId
        });
        return note;
    };
    static async updateNote({ ownerId, noteId, title, body, isPrivate, tags, noteStatus }) {
        const updateNote = {};
        if (title) {
            updateNote.title = title;
        }
        if (body) {
            updateNote.body = body;
        }
        if (isPrivate !== undefined) {
            updateNote.isPrivate = isPrivate;
        }
        if (tags) {
            updateNote.tags = tags;
        }
        if (noteStatus !== undefined) {
            updateNote.noteStatus = noteStatus;
        }   
        return await NoteModel.findOneAndUpdate(
            {
                ownerId,
                _id: noteId
            },
            {
                $set: updateNote 
            },
            {
                new: true,
            }
        )
    }
}
module.exports = NoteDataAccess;