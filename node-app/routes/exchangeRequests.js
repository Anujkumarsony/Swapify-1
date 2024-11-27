const express = require('express');
const router = express.Router();
const ExchangeRequests = require('../models/ExchangeRequests');

// Create Exchange Request
router.post('/create', async (req, res) => {
  const { requesterId, requestedUserId, requesterProductId, requestedProductId } = req.body;

  try {
    const newExchangeRequest = new ExchangeRequests({
      requesterId,
      requestedUserId,
      requesterProductId,
      requestedProductId,
    });

    await newExchangeRequest.save();
    res.status(201).json({ message: 'Exchange request sent successfully.', exchangeRequest: newExchangeRequest });
  } catch (err) {
    res.status(500).json({ message: 'Error creating exchange request.', error: err.message });
  }
});

// Get Chat Messages
router.get('/:id/chat', async (req, res) => {
  try {
    const exchangeRequest = await ExchangeRequests.findById(req.params.id).populate('chat.senderId');
    res.status(200).json(exchangeRequest.chat);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching chat messages.', error: err.message });
  }
});

// Send Chat Message
router.post('/:id/chat', async (req, res) => {
  const { senderId, message } = req.body;

  try {
    const exchangeRequest = await ExchangeRequests.findById(req.params.id);
    if (exchangeRequest) {
      exchangeRequest.chat.push({ senderId, message });
      await exchangeRequest.save();
      res.status(200).json({ message: 'Message sent successfully.', chat: exchangeRequest.chat });
    } else {
      res.status(404).json({ message: 'Exchange request not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error sending message.', error: err.message });
  }
});

// Confirm Swap
router.patch('/confirm', async (req, res) => {
  const { userId, exchangeRequestId } = req.body;

  try {
    const exchangeRequest = await ExchangeRequests.findById(exchangeRequestId);

    if (!exchangeRequest) return res.status(404).json({ message: 'Exchange request not found.' });

    if (!exchangeRequest.confirmedBy.includes(userId)) {
      exchangeRequest.confirmedBy.push(userId);
    }

    if (exchangeRequest.confirmedBy.length === 2) {
      exchangeRequest.status = 'Completed';
      await Products.findByIdAndUpdate(exchangeRequest.requesterProductId, { status: 'Exchanged' });
      await Products.findByIdAndUpdate(exchangeRequest.requestedProductId, { status: 'Exchanged' });
    }

    await exchangeRequest.save();
    res.status(200).json({ message: 'Swap confirmed successfully.', exchangeRequest });
  } catch (err) {
    res.status(500).json({ message: 'Error confirming swap.', error: err.message });
  }
});

module.exports = router;