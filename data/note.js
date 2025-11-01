const NoteModel = require('../models/note');
const { NOTE_STATUS } = require('../utils/constant');
const mongoose = require('mongoose');

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
        return { note };
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
        const note = await NoteModel.findOneAndUpdate(
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
        );
        return { note }
    };
    static async getAllNotes({ ownerId, page, limit, search }) {
        const objectOwnerId = new mongoose.Types.ObjectId(ownerId);
        const limitNum = Number(limit)
        const totalNotes = await NoteModel.countDocuments({ ownerId });
        const result = [
            {
                $match: {
                    ownerId: objectOwnerId,
                    title: { $regex: search, $options: "i" }
                },

            },
            // {
            //     $group: {
            //         _id: "$ownerId",
            //         noteCount: { $sum: 1 }
            //     }
            // },
            {
                $lookup: {
                    from: 'notes',
                    pipeline: [
                        { $match: { ownerId: objectOwnerId } },
                        { $count: 'totalNotes' }
                    ],
                    as: 'totNotes'
                },
            },
            // {
            //     $addFields:{
            //         totalNotes:{$arrayElemAt:['$totNotes.totalNotes',0]}
            //     }
            // },
        ];
        if (page && limit) {
            const skip = (page) * limitNum;
            result.push({ $skip: skip })
            result.push({ $limit: limitNum })

        }
        const notes = await NoteModel.aggregate(result);
        return {
            notes,
            totalNotes
        };

    };
    static async deleteNote({ ownerId, noteId, noteStatus }) {
        const objectOwnerId = new mongoose.Types.ObjectId(ownerId);
        const objectNoteId = new mongoose.Types.ObjectId(noteId);
        const note = await NoteModel.findOneAndUpdate(
            {
                _id: objectNoteId,
                ownerId: objectOwnerId
            },
            {
                $set: { noteStatus: noteStatus }
            },
            { new: true }
        );
        return { note }
    }
}
module.exports = NoteDataAccess;