const express = require('express');
const { getMenuByRestaurantId } = require('../controllers/menuController');
const router = express.Router();

router.get('/restaurant/:id', getMenuByRestaurantId); // Obtener menú de un restaurante específico

module.exports = router;
