const express = require('express');
const { getAllRestaurants, getRestaurantById } = require('../controllers/restaurantController');
const router = express.Router();

router.get('/', getAllRestaurants); // Obtener todos los restaurantes
router.get('/:id', getRestaurantById); // Obtener restaurante por ID

module.exports = router;
