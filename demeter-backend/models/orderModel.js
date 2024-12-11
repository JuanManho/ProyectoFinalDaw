const db = require('../config/db');

const Order = {
  // Obtener todos los pedidos
  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM pedidos';
      db.query(query, (err, results) => {
        if (err) {
          console.error('Error al obtener todos los pedidos:', err);
          return reject(new Error('Error al obtener los pedidos.'));
        }
        resolve(results);
      });
    });
  },

  // Obtener un pedido por ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      if (!id) return reject(new Error('El ID del pedido es requerido.'));
      const query = 'SELECT * FROM pedidos WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          console.error(`Error al obtener el pedido con ID ${id}:`, err);
          return reject(new Error('Error al obtener el pedido.'));
        }
        resolve(results[0]); // results[0] porque es un solo pedido
      });
    });
  },

  // Crear un pedido
  create: (orderData) => {
    return new Promise((resolve, reject) => {
      if (!orderData || typeof orderData !== 'object') {
        return reject(new Error('Los datos del pedido son inválidos.'));
      }
      const query = 'INSERT INTO pedidos SET ?';
      db.query(query, orderData, (err, result) => {
        if (err) {
          console.error('Error al crear el pedido:', err);
          return reject(new Error('Error al crear el pedido.'));
        }
        resolve(result);
      });
    });
  },

  // Insertar detalles del pedido
  insertDetails: (orderId, items) => {
    return new Promise((resolve, reject) => {
      if (!orderId || !Array.isArray(items) || items.length === 0) {
        return reject(new Error('Datos inválidos para los detalles del pedido.'));
      }
      const values = items.map(item => [orderId, item.id, item.quantity, item.price]);
      const query = `
        INSERT INTO detalle_pedidos (id_pedido, id_plato, cantidad, precio_unitario)
        VALUES ?
      `;
      db.query(query, [values], (err, result) => {
        if (err) {
          console.error(`Error al insertar los detalles para el pedido ${orderId}:`, err);
          return reject(new Error('Error al insertar los detalles del pedido.'));
        }
        resolve(result);
      });
    });
  },

  // Actualizar el estado de un pedido
  updateStatus: (id, status) => {
    return new Promise((resolve, reject) => {
      if (!id || !status) {
        return reject(new Error('El ID del pedido y el estado son requeridos.'));
      }
      const query = 'UPDATE pedidos SET estado = ? WHERE id = ?';
      db.query(query, [status, id], (err, result) => {
        if (err) {
          console.error(`Error al actualizar el estado del pedido con ID ${id}:`, err);
          return reject(new Error('Error al actualizar el estado del pedido.'));
        }
        resolve(result);
      });
    });
  },

  // Eliminar un pedido
  delete: (id) => {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new Error('El ID del pedido es requerido.'));
      }
      const query = 'DELETE FROM pedidos WHERE id = ?';
      db.query(query, [id], (err, result) => {
        if (err) {
          console.error(`Error al eliminar el pedido con ID ${id}:`, err);
          return reject(new Error('Error al eliminar el pedido.'));
        }
        resolve(result);
      });
    });
  },

  // Obtener pedidos por ID de usuario
  getByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      if (!userId) {
        return reject(new Error('El ID del usuario es requerido.'));
      }
      const query = `
        SELECT o.id, o.total, o.fecha_pedido, r.nombre AS restaurante
        FROM pedidos o
        JOIN restaurantes r ON o.id_restaurante = r.id
        WHERE o.id_usuario = ?`;
      db.query(query, [userId], (err, results) => {
        if (err) {
          console.error(`Error al obtener los pedidos del usuario con ID ${userId}:`, err);
          return reject(new Error('Error al obtener los pedidos del usuario.'));
        }
        resolve(results);
      });
    });
  },

  getOrdersByDeliveryPersonId: (userId) => {
    return new Promise((resolve, reject) => {
      if (!userId) {
        return reject(new Error('El ID del repartidor es requerido.'));
      }
      const query = `
        SELECT 
          o.id, 
          o.total, 
          o.fecha_pedido, 
          o.estado, 
          r.nombre AS restaurante, 
          r.direccion AS direccion_restaurante,
          u.nombre AS cliente, 
          u.telefono AS telefono_cliente, 
          u.direccion AS direccion_cliente
        FROM pedidos o
        JOIN restaurantes r ON o.id_restaurante = r.id
        JOIN usuarios u ON o.id_usuario = u.id
        WHERE o.id_repartidor = ? AND o.estado IN ('asignado', 'en camino')
      `;
      db.query(query, [userId], (err, results) => {
        if (err) {
          console.error(`Error al obtener los pedidos del repartidor con ID ${userId}:`, err);
          return reject(new Error('Error al obtener los pedidos del repartidor.'));
        }
        resolve(results);
      });
    });
  },

  // Obtener detalles de un pedido por ID
  getDetailsById: (id) => {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new Error('El ID del pedido es requerido.'));
      }
      const query = `
        SELECT o.id, o.total, o.fecha_pedido, o.estado, 
               u.nombre AS cliente, r.nombre AS restaurante, 
               d.id_plato, d.cantidad, d.precio_unitario AS precio
        FROM pedidos o
        JOIN usuarios u ON o.id_usuario = u.id
        JOIN restaurantes r ON o.id_restaurante = r.id
        JOIN detalle_pedidos d ON o.id = d.id_pedido
        WHERE o.id = ?
      `;
      db.query(query, [id], (err, results) => {
        if (err) {
          console.error(`Error al obtener detalles del pedido con ID ${id}:`, err);
          return reject(new Error('Error al obtener los detalles del pedido.'));
        }
        resolve(results);
      });
    });
  },

  // Obtener pedidos por ID de restaurante
  getByRestaurantId: (restaurantId) => {
    return new Promise((resolve, reject) => {
      if (!restaurantId) {
        return reject(new Error('El ID del restaurante es requerido.'));
      }
      const query = `
        SELECT o.id, o.total, o.fecha_pedido, o.estado, u.nombre AS cliente, u.telefono, u.direccion
        FROM pedidos o
        JOIN usuarios u ON o.id_usuario = u.id
        WHERE o.id_restaurante = ?`;
      db.query(query, [restaurantId], (err, results) => {
        if (err) {
          console.error(`Error al obtener pedidos del restaurante con ID ${restaurantId}:`, err);
          return reject(new Error('Error al obtener los pedidos del restaurante.'));
        }
        resolve(results);
      });
    });
  },

  // Obtener pedidos disponibles para repartidores
  getAvailableOrders: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT o.id, o.total, o.fecha_pedido, r.nombre AS restaurante
        FROM pedidos o
        JOIN restaurantes r ON o.id_restaurante = r.id
        WHERE o.estado = 'pendiente'`;
      db.query(query, (err, results) => {
        if (err) {
          console.error('Error al obtener pedidos disponibles:', err);
          return reject(new Error('Error al obtener pedidos disponibles.'));
        }
        resolve(results);
      });
    });
  },
  assignOrder: (orderId, repartidorId) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE pedidos 
        SET estado = 'asignado', id_repartidor = ? 
        WHERE id = ? AND estado = 'listo'
      `;
      db.query(query, [repartidorId, orderId], (err, result) => {
        if (err) {
          console.error(`Error al asignar el pedido ${orderId} al repartidor ${repartidorId}:`, err);
          return reject(new Error('Error al asignar el pedido.'));
        }
        if (result.affectedRows === 0) {
          return reject(new Error('El pedido ya fue asignado o no está listo.'));
        }
        resolve(result);
      });
    });
  },

  markOrderInTransit: (orderId) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE pedidos 
        SET estado = 'en camino' 
        WHERE id = ? AND estado = 'asignado'
      `;
      db.query(query, [orderId], (err, result) => {
        if (err) {
          console.error(`Error al marcar el pedido ${orderId} como en camino:`, err);
          return reject(new Error('Error al marcar el pedido como en camino.'));
        }
        if (result.affectedRows === 0) {
          return reject(new Error('El pedido no está en estado asignado.'));
        }
        resolve(result);
      });
    });
  },

  completeOrder: (orderId) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE pedidos 
        SET estado = 'entregado' 
        WHERE id = ? AND estado = 'en camino'
      `;
      db.query(query, [orderId], (err, result) => {
        if (err) {
          console.error(`Error al completar el pedido ${orderId}:`, err);
          return reject(new Error('Error al completar el pedido.'));
        }
        if (result.affectedRows === 0) {
          return reject(new Error('El pedido no está en estado en camino.'));
        }
        resolve(result);
      });
    });
  },
  getReadyOrders: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          o.id, 
          o.total, 
          o.fecha_pedido, 
          o.estado, 
          r.nombre AS restaurante, 
          r.direccion AS direccion_restaurante, 
          u.nombre AS cliente, 
          u.telefono, 
          u.direccion AS direccion_cliente
        FROM pedidos o
        JOIN restaurantes r ON o.id_restaurante = r.id
        JOIN usuarios u ON o.id_usuario = u.id
        WHERE o.estado = "listo"
      `;
      db.query(query, (err, results) => {
        if (err) {
          console.error('Error al obtener pedidos listos:', err);
          return reject(new Error('Error al obtener pedidos listos.'));
        }
        resolve(results);
      });
    });
  },
  



};

module.exports = Order;
