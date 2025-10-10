const express = require('express');
const router = express.Router();
const { signUp,
    login,
    updateUser,
    getselfUser,
    logOut,
} = require('../controllers/user')

router.post('/signUp', signUp);
router.post('/login', login);
router.post('/updateUser', updateUser);
router.post('/logOut', logOut);
router.get('/getselfUser', getselfUser);
module.exports = router;