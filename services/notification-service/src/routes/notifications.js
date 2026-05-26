const express = require('express');
const router = express.Router();
const { sendNotification, getNotifications } = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/send', authMiddleware, sendNotification);
router.get('/', authMiddleware, getNotifications);

module.exports = router;
