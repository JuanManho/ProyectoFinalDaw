const db = require('../config/db');

const OrderDetail = {
  // Obtener los detalles de un pedido
  getByOrderId: (orderId, callback) => {
    const query = 'SELECT * FROM detalle_pedidos WHERE id_pedido = ?';
    db.query(query, [orderId], callback);
  },

  // Agregar un nuevo detalle a un pedido
  create: (orderDetailData, callback) => {
    const query = 'INSERT INTO detalle_pedidos SET ?';
    db.query(query, orderDetailData, callback);
  },
};

module.exports = OrderDetail;
