const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const asyncHandler = require('express-async-handler');
const UserSchema = require('../schemas/userSchema');
const { validateSchemaBody,
        validateSchemaQuery,
} = require('../helpers/schemaHelper');

router.post('/signUp',
    validateSchemaBody(UserSchema.signUp),
    //async handler konusuna çalışıldı.
    asyncHandler(UserController.signUp));
router.post('/login',
    validateSchemaBody(UserSchema.login),
    UserController.login);
router.post('/updateUser',
    validateSchemaBody(UserSchema.updateUser),
    UserController.updateUser);
router.post('/logOut',
    validateSchemaBody(UserSchema.logOut),
    UserController.logOut);
router.get('/getselfUser',
    validateSchemaQuery(UserSchema.getselfUser),
    UserController.getselfUser);
module.exports = router;