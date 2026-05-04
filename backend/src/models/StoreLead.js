const mongoose = require('mongoose');

const storeLeadSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  storeName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  productTypes: { type: String },
  inventorySize: { type: String },
  priceRange: { type: String },
  notes: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('StoreLead', storeLeadSchema);
