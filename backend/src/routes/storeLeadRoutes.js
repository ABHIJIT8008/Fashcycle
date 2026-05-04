const express = require('express');
const router = express.Router();
const { createStoreLead, getStoreLeads } = require('../controllers/storeLeadController');

// POST /api/store-leads
router.post('/', createStoreLead);

// GET /api/store-leads
router.get('/', getStoreLeads);

module.exports = router;
