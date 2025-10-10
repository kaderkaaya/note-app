const express = require('express');
const router = express.Router();
const { generateToken,
    verifyAndRefreshToken,
} = require('../controllers/token');

router.post('/generateToken', generateToken);
router.post('/verifyAndRefreshToken', verifyAndRefreshToken);


module.exports = router;