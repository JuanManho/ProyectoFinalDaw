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

// Crear un nuevo plato
const createMenuItem = (req, res) => {
  const newMenuItem = req.body;
  Menu.create(newMenuItem, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al crear el plato' });
    } else {
      res.status(201).json({ message: 'Plato creado', menuItemId: result.insertId });
    }
  });
};

// Actualizar un plato existente
const updateMenuItem = (req, res) => {
  const menuItemId = req.params.id;
  const menuItemData = req.body;
  Menu.update(menuItemId, menuItemData, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error al actualizar el plato' });
    } else {
      res.json({ message: 'Plato actualizado' });
    }
  });
};

// Eliminar un plato
const deleteMenuItem = (req, res) => {
  const menuItemId = req.params.id;
  Menu.delete(menuItemId, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error al eliminar el plato' });
    } else {
      res.json({ message: 'Plato eliminado' });
    }
  });
};

module.exports = { getMenuByRestaurantId, createMenuItem, updateMenuItem, deleteMenuItem };
