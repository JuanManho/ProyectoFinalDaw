const db = require('../config/db');

const Restaurant = {
  // Obtener todos los restaurantes
  getAll: (callback) => {
    const query = 'SELECT * FROM restaurantes';
    db.query(query, callback);
  },

  // Obtener un restaurante por ID
  getById: (id, callback) => {
    const query = 'SELECT * FROM restaurantes WHERE id = ?';
    db.query(query, [id], callback);
  },

  // Crear un nuevo restaurante
  create: (restaurantData, callback) => {
    const query = 'INSERT INTO restaurantes SET ?';
    db.query(query, restaurantData, callback);
  },

  // Actualizar un restaurante existente
  update: (id, restaurantData, callback) => {
    const query = 'UPDATE restaurantes SET ? WHERE id = ?';
    db.query(query, [restaurantData, id], callback);
  },

  // Eliminar un restaurante por ID
  delete: (id, callback) => {
    const query = 'DELETE FROM restaurantes WHERE id = ?';
    db.query(query, [id], callback);
  },
};

module.exports = Restaurant;
