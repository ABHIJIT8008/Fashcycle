const express = require('express');
const router = express.Router();
const { login, verifySession } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/login', login);
router.get('/verify', protect, verifySession);

module.exports = router;
