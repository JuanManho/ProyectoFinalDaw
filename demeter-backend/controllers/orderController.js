const Order = require('../models/orderModel');

// Obtener todos los pedidos
const getAllOrders = (req, res) => {
  Order.getAll((err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los pedidos' });
    } else {
      res.json(results);
    }
  });
};

// Obtener un pedido por ID
const getOrderById = (req, res) => {
  const orderId = req.params.id;
  Order.getById(orderId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener el pedido' });
    } else if (result.length === 0) {
      res.status(404).json({ message: 'Pedido no encontrado' });
    } else {
      res.json(result[0]);
    }
  });
};

// Crear un nuevo pedido
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
  const { estado } = req.body; // Recibe el estado en el cuerpo de la solicitud
  Order.updateStatus(orderId, estado, (err) => {
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

module.exports = { getAllOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder };
