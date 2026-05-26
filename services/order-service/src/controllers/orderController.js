const orders = [];

const createOrder = (req, res) => {
  try {
    const { product, quantity, deliveryAddress } = req.body;
    const order = {
      id: orders.length + 1,
      customerId: req.user.id,
      product,
      quantity,
      deliveryAddress,
      status: 'pending',
      createdAt: new Date()
    };
    orders.push(order);
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getOrders = (req, res) => {
  const userOrders = orders.filter(o => o.customerId === req.user.id);
  res.status(200).json(userOrders);
};

const getOrder = (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.status(200).json(order);
};

const updateOrderStatus = (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.status = req.body.status;
  res.status(200).json({ message: 'Order status updated', order });
};

module.exports = { createOrder, getOrders, getOrder, updateOrderStatus };
