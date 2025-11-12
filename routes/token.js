const express = require('express');
const router = express.Router();

const {
    validateSchemaBody
} = require('../helpers/schemaHelper');
const TokenSchema = require('../schemas/tokenSchema');

const UserController = require('../controllers/token');
router.post('/generateToken',
    validateSchemaBody(TokenSchema.generateToken),
    UserController.generateToken);

router.post('/verifyAndRefreshToken',
    validateSchemaBody(TokenSchema.verifyAndRefreshToken),
    UserController.verifyAndRefreshToken);

module.exports = router;