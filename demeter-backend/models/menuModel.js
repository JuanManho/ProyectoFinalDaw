const db = require('../config/db');

const Menu = {
  // Obtener todos los platos de un restaurante
  getByRestaurantId: (restaurantId, callback) => {
    const query = 'SELECT * FROM menus WHERE id_restaurante = ?';
    db.query(query, [restaurantId], callback);
  },

  // Crear un nuevo plato
  create: (menuItemData, callback) => {
    const query = 'INSERT INTO menus SET ?';
    db.query(query, menuItemData, callback);
  },

  // Actualizar un plato existente
  update: (id, menuItemData, callback) => {
    const query = 'UPDATE menus SET ? WHERE id = ?';
    db.query(query, [menuItemData, id], callback);
  },

  // Eliminar un plato
  delete: (id, callback) => {
    const query = 'DELETE FROM menus WHERE id = ?';
    db.query(query, [id], callback);
  },
};

module.exports = Menu;
