const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const services = {
  users: 'http://user-service:3001',
  orders: 'http://order-service:3002',
  delivery: 'http://delivery-service:3003',
  notifications: 'http://notification-service:3004'
};

app.use('/api/users', async (req, res) => {
  const url = services.users + '/api/users' + req.path;
  const fetch = (await import('node-fetch')).default;
  const response = await fetch(url, {
    method: req.method,
    headers: { ...req.headers, host: 'user-service:3001' },
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
  });
  const data = await response.json();
  res.status(response.status).json(data);
});

app.use('/api/orders', async (req, res) => {
  const url = services.orders + '/api/orders' + req.path;
  const fetch = (await import('node-fetch')).default;
  const response = await fetch(url, {
    method: req.method,
    headers: { ...req.headers, host: 'order-service:3002' },
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
  });
  const data = await response.json();
  res.status(response.status).json(data);
});

app.use('/api/delivery', async (req, res) => {
  const url = services.delivery + '/api/delivery' + req.path;
  const fetch = (await import('node-fetch')).default;
  const response = await fetch(url, {
    method: req.method,
    headers: { ...req.headers, host: 'delivery-service:3003' },
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
  });
  const data = await response.json();
  res.status(response.status).json(data);
});

app.use('/api/notifications', async (req, res) => {
  const url = services.notifications + '/api/notifications' + req.path;
  const fetch = (await import('node-fetch')).default;
  const response = await fetch(url, {
    method: req.method,
    headers: { ...req.headers, host: 'notification-service:3004' },
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
  });
  const data = await response.json();
  res.status(response.status).json(data);
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    services: {
      users: services.users,
      orders: services.orders,
      delivery: services.delivery,
      notifications: services.notifications
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('API Gateway running on port ' + PORT);
});

module.exports = app;
