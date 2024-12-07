const Menu = require('../models/menuModel');

// Obtener todos los platos de un restaurante
const getMenuByRestaurantId = (req, res) => {
  const restaurantId = req.params.id;
  Menu.getByRestaurantId(restaurantId, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener el menú' });
    } else {
      res.json(results);
    }
  });
};


module.exports = { getMenuByRestaurantId };
