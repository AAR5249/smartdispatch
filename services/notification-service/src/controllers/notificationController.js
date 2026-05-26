const notifications = [];

const sendNotification = (req, res) => {
  try {
    const { userId, message, type } = req.body;
    const notification = {
      id: notifications.length + 1,
      userId,
      message,
      type: type || 'info',
      read: false,
      createdAt: new Date()
    };
    notifications.push(notification);
    res.status(201).json({ message: 'Notification sent successfully', notification });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getNotifications = (req, res) => {
  const userNotifications = notifications.filter(n => n.userId === req.user.id);
  res.status(200).json(userNotifications);
};

module.exports = { sendNotification, getNotifications };
