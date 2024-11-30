const User = require('../models/userModel');

// Obtener todos los usuarios
const getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    } else {
      res.json(results);
    }
  });
};

// Obtener un usuario por ID
const getUserById = (req, res) => {
  const userId = req.params.id;
  User.getById(userId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener el usuario' });
    } else if (result.length === 0) {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      res.json(result[0]);
    }
  });
};

// Crear un nuevo usuario
const createUser = (req, res) => {
  const newUser = req.body;
  User.create(newUser, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al crear el usuario' });
    } else {
      res.status(201).json({ message: 'Usuario creado', userId: result.insertId });
    }
  });
};

// Actualizar un usuario
const updateUser = (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  User.update(userId, userData, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    } else {
      res.json({ message: 'Usuario actualizado' });
    }
  });
};

// Eliminar un usuario
const deleteUser = (req, res) => {
  const userId = req.params.id;
  User.delete(userId, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    } else {
      res.json({ message: 'Usuario eliminado' });
    }
  });
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
