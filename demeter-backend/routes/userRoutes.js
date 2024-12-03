const express = require('express');
const { loginUser, getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.post('/login', loginUser); // Ruta de inicio de sesión
router.get('/', getAllUsers); // Obtener todos los usuarios
router.get('/:id', getUserById); // Obtener un usuario por ID
router.post('/', createUser); // Crear un usuario
router.put('/:id', updateUser); // Actualizar un usuario
router.delete('/:id', deleteUser); // Eliminar un usuario


module.exports = router;
