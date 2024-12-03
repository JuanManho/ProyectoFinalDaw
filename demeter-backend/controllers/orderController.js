const Order = require('../models/orderModel');

// Obtener todos los pedidos
const getAllOrders = (req, res) => {
  Order.getAll((err, orders) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener pedidos' });
    } else {
      res.json(orders);
    }
  });
};

// Obtener un pedido por ID
const getOrderById = (req, res) => {
  const orderId = req.params.id;
  Order.getById(orderId, (err, order) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener el pedido' });
    } else if (!order) {
      res.status(404).json({ message: 'Pedido no encontrado' });
    } else {
      res.json(order);
    }
  });
};

// Crear un pedido
const createOrder = (req, res) => {
  const newOrder = req.body;
  Order.create(newOrder, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al crear el pedido' });
    } else {
      res.status(201).json({ message: 'Pedido creado', orderId: result.insertId });
    }
  });
};

// Actualizar el estado de un pedido
const updateOrderStatus = (req, res) => {
  const orderId = req.params.id;
  const newStatus = req.body.status;
  Order.updateStatus(orderId, newStatus, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error al actualizar el estado del pedido' });
    } else {
      res.json({ message: 'Estado del pedido actualizado' });
    }
  });
};

// Eliminar un pedido
const deleteOrder = (req, res) => {
  const orderId = req.params.id;
  Order.delete(orderId, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error al eliminar el pedido' });
    } else {
      res.json({ message: 'Pedido eliminado' });
    }
  });
};

// Obtener historial de pedidos de un usuario
const getUserOrderHistory = (req, res) => {
  const userId = req.params.id;
  Order.getByUserId(userId, (err, orders) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener el historial de pedidos' });
    } else {
      res.json(orders);
    }
  });
};

const getOrdersByRestaurant = (req, res) => {
  const restaurantId = req.params.id;
  Order.getByRestaurantId(restaurantId, (err, orders) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener pedidos del restaurante' });
    }
    res.json(orders);
  });
};

const getAvailableOrders = (req, res) => {
  Order.getAvailableOrders((err, orders) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener pedidos disponibles' });
    }
    res.json(orders);
  });
};


module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getUserOrderHistory,
  getOrdersByRestaurant,
  getAvailableOrders,
};