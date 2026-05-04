const StoreLead = require('../models/StoreLead');

const createStoreLead = async (req, res) => {
  try {
    const newLead = new StoreLead(req.body);
    await newLead.save();
    res.status(201).json({ success: true, message: 'Store lead created successfully', data: newLead });
  } catch (error) {
    console.error('Error creating store lead:', error);
    res.status(500).json({ success: false, message: 'Failed to create store lead', error: error.message });
  }
};

const getStoreLeads = async (req, res) => {
  try {
    const leads = await StoreLead.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    console.error('Error fetching store leads:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch store leads', error: error.message });
  }
};

module.exports = {
  createStoreLead,
  getStoreLeads
};
