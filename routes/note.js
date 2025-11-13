const express = require('express');
const router = express.Router();
const NoteContoller = require('../controllers/note');
const NoteSchema = require('../schemas/noteSchema');
const { validateSchemaBody,
    validateSchemaQuery,
} = require('../helpers/schemaHelper');
const asyncHandler = require('express-async-handler');

router.post('/add-note',
    validateSchemaBody(NoteSchema.addNote),
    asyncHandler(NoteContoller.addNote),
);

router.get('/get-note',
    validateSchemaQuery(NoteSchema.getNote),
    NoteContoller.getNote,
);

router.post('/update-note',
    validateSchemaBody(NoteSchema.updateNote),
    NoteContoller.updateNote,
);

router.get('/get-alll-notes',
    validateSchemaQuery(NoteSchema.getAllNotes),
    NoteContoller.getAllNotes,
);

router.post('/delete-note',
    validateSchemaBody(NoteSchema.deleteNote),
    NoteContoller.deleteNote,
);


module.exports = router;