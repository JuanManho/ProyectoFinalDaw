const express = require('express');
const Order = require('../models/orderModel');
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getUserOrderHistory,
  getOrdersByRestaurant,
  getAvailableOrders,
} = require('../controllers/orderController');

const router = express.Router();

// Rutas existentes
router.get('/', getAllOrders); // Obtener todos los pedidos
router.get('/:id', getOrderById); // Obtener un pedido por ID
router.post('/', createOrder); // Crear un pedido
router.put('/:id', updateOrderStatus); // Actualizar el estado de un pedido
router.delete('/:id', deleteOrder); // Eliminar un pedido
router.get('/user/:id', getUserOrderHistory); // Obtener historial de pedidos de un usuario

// Nuevas rutas
router.get('/restaurant/:id', getOrdersByRestaurant); // Obtener pedidos de un restaurante
router.get('/available', getAvailableOrders); // Obtener pedidos disponibles para repartidores

module.exports = router;