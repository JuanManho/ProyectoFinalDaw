const db = require('../config/db');

const Order = {
  // Obtener todos los pedidos
  getAll: (callback) => {
    const query = 'SELECT * FROM pedidos';
    db.query(query, callback);
  },

  // Obtener un pedido por ID
  getById: (id, callback) => {
    const query = 'SELECT * FROM pedidos WHERE id = ?';
    db.query(query, [id], callback);
  },

  // Crear un pedido
  create: (orderData, callback) => {
    const query = 'INSERT INTO pedidos SET ?';
    db.query(query, orderData, callback);
  },

  // Actualizar el estado de un pedido
  updateStatus: (id, status, callback) => {
    const query = 'UPDATE pedidos SET estado = ? WHERE id = ?';
    db.query(query, [status, id], callback);
  },

  // Eliminar un pedido
  delete: (id, callback) => {
    const query = 'DELETE FROM pedidos WHERE id = ?';
    db.query(query, [id], callback);
  },

  // Obtener pedidos por ID de usuario
  getByUserId: (userId, callback) => {
    const query = `
      SELECT o.id, o.total, o.fecha, r.nombre AS restaurante
      FROM pedidos o
      JOIN restaurantes r ON o.id_restaurante = r.id
      WHERE o.id_usuario = ?`;
    db.query(query, [userId], callback);
  },

  // Obtener pedidos por ID de restaurante
  getByRestaurantId: (restaurantId, callback) => {
    const query = `
      SELECT o.id, o.total, o.fecha, o.estado, u.nombre AS cliente
      FROM pedidos o
      JOIN usuarios u ON o.id_usuario = u.id
      WHERE o.id_restaurante = ?`;
    db.query(query, [restaurantId], callback);
  },

  // Obtener pedidos disponibles para repartidores
  getAvailableOrders: (callback) => {
    const query = `
      SELECT o.id, o.total, o.fecha, r.nombre AS restaurante
      FROM pedidos o
      JOIN restaurantes r ON o.id_restaurante = r.id
      WHERE o.estado = 'pendiente'`;
    db.query(query, callback);
  },
};

module.exports = Order;
