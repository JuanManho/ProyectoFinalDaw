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

// Iniciar sesión
const loginUser = (req, res) => {
  const { email, contraseña } = req.body;

  // Validar que se reciban email y contraseña
  if (!email || !contraseña) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
  }

  // Buscar usuario por email
  User.getByEmail(email, (err, result) => {
    if (err) {
      console.error('Error al buscar usuario:', err); // Registro en consola para depuración
      return res.status(500).json({ message: 'Error al buscar el usuario' });
    }

    // Verificar si el usuario existe
    if (result.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = result[0];

    // Verificar contraseña
    if (user.contraseña.trim() !== contraseña.trim()) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Si el usuario es propietario, buscar su restaurante
    if (user.rol === 'propietario') {
      User.getRestaurantByOwnerId(user.id, (err, restaurantResult) => {
        if (err) {
          console.error('Error al buscar restaurante del propietario:', err);
          return res.status(500).json({ message: 'Error al obtener el restaurante del propietario' });
        }

        if (restaurantResult.length === 0) {
          return res.status(404).json({ message: 'El propietario no tiene un restaurante asociado' });
        }

        const restaurantId = restaurantResult[0].id;

        // Responder con éxito y enviar datos del usuario y el restaurantId
        return res.status(200).json({
          message: 'Inicio de sesión exitoso',
          user: {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol,
            restaurantId, 
          },
        });
      });
    } else {
      // Para roles distintos de propietario
      return res.status(200).json({
        message: 'Inicio de sesión exitoso',
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol,
        },
      });
    }
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser, 
};

