const Order = require('../models/orderModel');

// Obtener todos los pedidos
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.json(orders);
  } catch (err) {
    console.error('Error al obtener pedidos:', err);
    res.status(500).json({ error: 'Error al obtener pedidos.' });
  }
};

// Obtener detalles de un pedido
const getOrderDetails = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    if (isNaN(orderId)) {
      return res.status(400).json({ error: 'El ID del pedido debe ser un número válido.' });
    }
    const details = await Order.getDetailsById(orderId);
    if (details.length === 0) {
      return res.status(404).json({ message: 'Detalles del pedido no encontrados.' });
    }
    res.json(details);
  } catch (err) {
    console.error(`Error al obtener detalles del pedido con ID ${req.params.id}:`, err);
    res.status(500).json({ error: 'Error al obtener los detalles del pedido.' });
  }
};

// Obtener un pedido por ID
const getOrderById = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    if (isNaN(orderId)) {
      return res.status(400).json({ error: 'El ID del pedido debe ser un número válido.' });
    }
    const order = await Order.getById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado.' });
    }
    res.json(order);
  } catch (err) {
    console.error(`Error al obtener el pedido con ID ${req.params.id}:`, err);
    res.status(500).json({ error: 'Error al obtener el pedido.' });
  }
};

// Crear un pedido
const createOrder = async (req, res) => {
  try {
    const { total, items, id_usuario, id_restaurante } = req.body;

    if (!total || !Array.isArray(items) || items.length === 0 || !id_usuario || !id_restaurante) {
      return res.status(400).json({ message: 'Datos incompletos para crear el pedido.' });
    }

    const pedidoData = { total, id_usuario, id_restaurante, estado: 'pendiente', fecha_pedido: new Date() };
    const result = await Order.create(pedidoData);
    const id_pedido = result.insertId;

    await Order.insertDetails(id_pedido, items);

    res.status(201).json({ message: 'Pedido creado con éxito.', id_pedido });
  } catch (err) {
    console.error('Error al crear el pedido:', err);
    res.status(500).json({ message: 'Error al crear el pedido.' });
  }
};

// Actualizar el estado de un pedido
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    const newStatus = req.body.status;

    if (isNaN(orderId) || !newStatus) {
      return res.status(400).json({ error: 'Datos inválidos para actualizar el estado del pedido.' });
    }

    await Order.updateStatus(orderId, newStatus);
    res.json({ message: 'Estado del pedido actualizado.' });
  } catch (err) {
    console.error(`Error al actualizar el estado del pedido con ID ${req.params.id}:`, err);
    res.status(500).json({ error: 'Error al actualizar el estado del pedido.' });
  }
};

// Eliminar un pedido
const deleteOrder = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    if (isNaN(orderId)) {
      return res.status(400).json({ error: 'El ID del pedido debe ser un número válido.' });
    }

    await Order.delete(orderId);
    res.json({ message: 'Pedido eliminado.' });
  } catch (err) {
    console.error(`Error al eliminar el pedido con ID ${req.params.id}:`, err);
    res.status(500).json({ error: 'Error al eliminar el pedido.' });
  }
};

// Obtener historial de pedidos de un usuario
const getUserOrderHistory = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'El ID del usuario debe ser un número válido.' });
    }

    const orders = await Order.getByUserId(userId);
    res.json(orders);
  } catch (err) {
    console.error(`Error al obtener el historial de pedidos del usuario con ID ${req.params.id}:`, err);
    res.status(500).json({ error: 'Error al obtener el historial de pedidos.' });
  }
};

// Obtener pedidos por restaurante
const getOrdersByRestaurant = async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.id, 10);
    if (isNaN(restaurantId)) {
      return res.status(400).json({ error: 'El ID del restaurante debe ser un número válido.' });
    }

    const orders = await Order.getByRestaurantId(restaurantId);
    res.json(orders);
  } catch (err) {
    console.error(`Error al obtener pedidos del restaurante con ID ${req.params.id}:`, err);
    res.status(500).json({ error: 'Error al obtener pedidos del restaurante.' });
  }
};

// Obtener pedidos disponibles
const getAvailableOrders = async (req, res) => {
  try {
    const orders = await Order.getAvailableOrders();
    res.json(orders);
  } catch (err) {
    console.error('Error al obtener pedidos disponibles:', err);
    res.status(500).json({ error: 'Error al obtener pedidos disponibles.' });
  }
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
  getOrderDetails,
};
