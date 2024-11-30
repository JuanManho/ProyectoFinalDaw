const express = require('express');
const {
  getMenuByRestaurantId,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController');

const router = express.Router();

router.get('/:id', getMenuByRestaurantId); // Obtener todos los platos de un restaurante
router.post('/', createMenuItem); // Crear un plato
router.put('/:id', updateMenuItem); // Actualizar un plato
router.delete('/:id', deleteMenuItem); // Eliminar un plato

module.exports = router;
