const express = require('express');
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getUserOrderHistory,
  getOrdersByRestaurant,
  getAvailableOrders,
  getOrderDetails,
  markOrderAsReady, 
  assignOrder,
  markOrderInTransit,
  completeOrder,
  getReadyOrders,
  getDeliveryPersonOrders,
} = require('../controllers/orderController');

const router = express.Router();


router.get('/ready', getReadyOrders); // Obtener pedidos listos
router.get('/user/:id', getUserOrderHistory); // Obtener historial de pedidos de un usuario
router.get('/delivery-person/:id', getDeliveryPersonOrders); // Obtener pedidos asignados a un repartidor
router.get('/restaurant/:id', getOrdersByRestaurant); // Obtener pedidos de un restaurante
router.get('/available', getAvailableOrders); // Obtener pedidos disponibles para repartidores
router.get('/details/:id', getOrderDetails); // Nueva ruta para obtener detalles de un pedido
router.put('/:id/ready', markOrderAsReady); // Ruta para marcar como listo
router.get('/:id', getOrderById); // Obtener un pedido por ID
router.post('/', createOrder); // Crear un pedido
router.put('/:id', updateOrderStatus); // Actualizar el estado de un pedido
router.delete('/:id', deleteOrder); // Eliminar un pedido
router.post('/assign', assignOrder); // Asignar pedido a repartidor
router.post('/in-transit', markOrderInTransit); // Marcar pedido como en camino
router.post('/complete', completeOrder); // Completar pedido



module.exports = router;
