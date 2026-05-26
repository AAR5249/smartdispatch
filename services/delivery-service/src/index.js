const express = require('express');
const app = express();
app.use(express.json());

const deliveryRoutes = require('./routes/delivery');
app.use('/api/delivery', deliveryRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log('Delivery Service running on port ' + PORT);
});

module.exports = app;
