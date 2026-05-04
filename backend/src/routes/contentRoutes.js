const express = require('express');
const router = express.Router();
const { getAllContent, updateSectionContent } = require('../controllers/contentController');

const { protect } = require('../middlewares/authMiddleware');

// GET /api/content
// Fetch all site content (public)
router.get('/', getAllContent);

// PUT /api/content/:section
// Update a specific section (will require admin auth middleware later)
router.put('/:section', protect, updateSectionContent);

module.exports = router;
