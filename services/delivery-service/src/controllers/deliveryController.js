const deliveries = [];
const agents = [
  { id: 1, name: 'Agent Mike', available: true },
  { id: 2, name: 'Agent Sara', available: true },
  { id: 3, name: 'Agent John', available: true }
];

const assignAgent = (req, res) => {
  try {
    const { orderId } = req.body;
    const agent = agents.find(a => a.available);
    if (!agent) return res.status(400).json({ message: 'No agents available' });

    agent.available = false;
    const delivery = {
      id: deliveries.length + 1,
      orderId,
      agent: agent.name,
      status: 'assigned',
      assignedAt: new Date()
    };
    deliveries.push(delivery);
    res.status(201).json({ message: 'Agent assigned successfully', delivery });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateStatus = (req, res) => {
  const delivery = deliveries.find(d => d.id === parseInt(req.params.id));
  if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
  delivery.status = req.body.status;
  res.status(200).json({ message: 'Delivery status updated', delivery });
};

const getDelivery = (req, res) => {
  const delivery = deliveries.find(d => d.id === parseInt(req.params.id));
  if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
  res.status(200).json(delivery);
};

module.exports = { assignAgent, updateStatus, getDelivery };
