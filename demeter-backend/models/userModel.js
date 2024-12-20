const db = require('../config/db'); // Importamos la conexión a la base de datos

const User = {
  // Obtener usuario por email
  getByEmail: (email, callback) => {
    const query = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(query, [email], callback);  
  },

  // Obtener todos los usuarios
  getAll: (callback) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, callback);
  },

  // Obtener un usuario por ID
  getById: (id, callback) => {
    const query = 'SELECT * FROM usuarios WHERE id = ?';
    db.query(query, [id], callback);
  },

  // Crear un nuevo usuario
  create: (userData, callback) => {
    const query = 'INSERT INTO usuarios SET ?';
    db.query(query, userData, callback);
  },

  // Actualizar un usuario existente
  update: (id, userData, callback) => {
    const query = 'UPDATE usuarios SET ? WHERE id = ?';
    db.query(query, [userData, id], callback);
  },
  getRestaurantByOwnerId: (ownerId, callback) => {
    const query = 'SELECT id FROM restaurantes WHERE id_propietario = ?';
    db.query(query, [ownerId], callback);
  },

  // Eliminar un usuario por ID
  delete: (id, callback) => {
    const query = 'DELETE FROM usuarios WHERE id = ?';
    db.query(query, [id], callback);
  },
};

 


module.exports = User;

