const express = require('express');
const router = express.Router();
const { assignAgent, updateStatus, getDelivery } = require('../controllers/deliveryController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/assign', authMiddleware, assignAgent);
router.put('/:id/status', authMiddleware, updateStatus);
router.get('/:id', authMiddleware, getDelivery);

module.exports = router;
