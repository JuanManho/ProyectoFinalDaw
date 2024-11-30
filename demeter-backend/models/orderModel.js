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

  // Crear un nuevo pedido
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
};

module.exports = Order;
