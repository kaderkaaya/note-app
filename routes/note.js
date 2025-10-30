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


module.exports = router;