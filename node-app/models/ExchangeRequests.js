const mongoose = require('mongoose');

const exchangeRequestSchema = new mongoose.Schema({
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  requestedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  requesterProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
  requestedProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected', 'Completed'], default: 'Pending' },
  chat: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
      message: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  confirmedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
});

module.exports = mongoose.model('ExchangeRequests', exchangeRequestSchema);