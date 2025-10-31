const express = require('express');
const router = express.Router();
const NoteContoller = require('../controllers/note');
const NoteSchema = require('../schemas/noteSchema');
const { validateSchemaBody,
    validateSchemaQuery,
} = require('../helpers/schemaHelper');
const asyncHandler = require('express-async-handler');

router.post('/addNote',
    validateSchemaBody(NoteSchema.addNote),
    asyncHandler(NoteContoller.addNote),
);
router.get('/getNote',
    validateSchemaQuery(NoteSchema.getNote),
    NoteContoller.getNote,
);
router.post('/updateNote',
    validateSchemaBody(NoteSchema.updateNote),
    NoteContoller.updateNote,
);
router.get('/getAllNotes',
    validateSchemaQuery(NoteSchema.getAllNotes),
    NoteContoller.getAllNotes,
);
router.post('/deleteNote',
    validateSchemaBody(NoteSchema.deleteNote),
    NoteContoller.deleteNote,
);


module.exports = router;