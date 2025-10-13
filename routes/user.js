const express = require('express');
const router = express.Router();
const { signUp,
    login,
    updateUser,
    getselfUser,
    logOut,
} = require('../controllers/user')
const UserController = require('../controllers/user');
const UserSchema = require('../schemas/userSchema');
const { validateSchemaBody
} = require('../helpers/schemaHelper');
router.post('/signUp',
    validateSchemaBody(UserSchema.signUp),
    UserController.signUp);
router.post('/login', login);
router.post('/updateUser', updateUser);
router.post('/logOut', logOut);
router.get('/getselfUser', getselfUser);
module.exports = router;