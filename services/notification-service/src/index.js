const express = require('express');
const app = express();
app.use(express.json());

const notificationRoutes = require('./routes/notifications');
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log('Notification Service running on port ' + PORT);
});

module.exports = app;
