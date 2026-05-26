const express = require('express');
const app = express();
app.use(express.json());

const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log('Order Service running on port ' + PORT);
});

module.exports = app;
