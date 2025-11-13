const express = require('express');
const router = express.Router();

const {
    validateSchemaBody
} = require('../helpers/schemaHelper');
const TokenSchema = require('../schemas/tokenSchema');

const UserController = require('../controllers/token');
router.post('/generate-token',
    validateSchemaBody(TokenSchema.generateToken),
    UserController.generateToken);

router.post('/verify-and-refresh-token',
    validateSchemaBody(TokenSchema.verifyAndRefreshToken),
    UserController.verifyAndRefreshToken);

module.exports = router;