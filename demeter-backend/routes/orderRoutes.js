const express = require('express');
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');

const router = express.Router();

router.get('/', getAllOrders); // Obtener todos los pedidos
router.get('/:id', getOrderById); // Obtener un pedido por ID
router.post('/', createOrder); // Crear un pedido
router.put('/:id', updateOrderStatus); // Actualizar el estado de un pedido
router.delete('/:id', deleteOrder); // Eliminar un pedido

module.exports = router;
