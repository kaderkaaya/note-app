const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const asyncHandler = require('express-async-handler');
const UserSchema = require('../schemas/userSchema');
const limiter = require('../helpers/bruteforceHelper');

const { validateSchemaBody,
    validateSchemaQuery,
} = require('../helpers/schemaHelper');

router.post('/sign-up',
    validateSchemaBody(UserSchema.signUp),
    asyncHandler(UserController.signUp));

router.post('/login',
    limiter,
    validateSchemaBody(UserSchema.login),
    UserController.login);

router.post('/update-user',
    limiter,
    validateSchemaBody(UserSchema.updateUser),
    UserController.updateUser);

router.post('/log-out',
    validateSchemaBody(UserSchema.logOut),
    UserController.logOut);

router.get('/getself-user',
    validateSchemaQuery(UserSchema.getselfUser),
    UserController.getselfUser);

router.post('/upload-profile-img',
    validateSchemaBody(UserSchema.uploadProfileImg),
    UserController.uploadProfileImg);

router.post('/forgot-password',
    validateSchemaBody(UserSchema.forgotPassword),
    UserController.forgotPassword);

router.post('/reset-password',
    validateSchemaBody(UserSchema.resetPassword),
    UserController.resetPassword);

router.get('/get-user-IP',
    validateSchemaQuery(UserSchema.getUserIP),
    UserController.getUserIP);
    
module.exports = router;