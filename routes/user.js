const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const asyncHandler = require('express-async-handler');
const UserSchema = require('../schemas/userSchema');
const limiter = require('../helpers/bruteforceHelper');

const { validateSchemaBody,
    validateSchemaQuery,
} = require('../helpers/schemaHelper');

router.post('/signUp',
    validateSchemaBody(UserSchema.signUp),
    //async handler konusuna çalışıldı.
    asyncHandler(UserController.signUp));
router.post('/login',
    limiter,
    validateSchemaBody(UserSchema.login),
    UserController.login);
router.post('/updateUser',
    limiter,
    validateSchemaBody(UserSchema.updateUser),
    UserController.updateUser);
router.post('/logOut',
    validateSchemaBody(UserSchema.logOut),
    UserController.logOut);
router.get('/getselfUser',
    validateSchemaQuery(UserSchema.getselfUser),
    UserController.getselfUser);
router.post('/uploadProfileImg',
    validateSchemaBody(UserSchema.uploadProfileImg),
    UserController.uploadProfileImg)
router.post('/forgotPassword',
    validateSchemaBody(UserSchema.forgotPassword),
    UserController.forgotPassword)
router.post('/resetPassword',
    validateSchemaBody(UserSchema.resetPassword),
    UserController.resetPassword)      
module.exports = router;