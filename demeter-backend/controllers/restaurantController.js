const Restaurant = require('../models/restaurantModel');

// Obtener todos los restaurantes
const getAllRestaurants = (req, res) => {
  Restaurant.getAll((err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los restaurantes' });
    } else {
      res.json(results);
    }
  });
};

// Obtener un restaurante por ID
const getRestaurantById = (req, res) => {
  const restaurantId = req.params.id;
  Restaurant.getById(restaurantId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener el restaurante' });
    } else if (result.length === 0) {
      res.status(404).json({ message: 'Restaurante no encontrado' });
    } else {
      res.json(result[0]);
    }
  });
};

// Crear un nuevo restaurante
const createRestaurant = (req, res) => {
  const newRestaurant = req.body;
  Restaurant.create(newRestaurant, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al crear el restaurante' });
    } else {
      res.status(201).json({ message: 'Restaurante creado', restaurantId: result.insertId });
    }
  });
};

// Actualizar un restaurante
const updateRestaurant = (req, res) => {
  const restaurantId = req.params.id;
  const restaurantData = req.body;
  Restaurant.update(restaurantId, restaurantData, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error al actualizar el restaurante' });
    } else {
      res.json({ message: 'Restaurante actualizado' });
    }
  });
};

// Eliminar un restaurante
const deleteRestaurant = (req, res) => {
  const restaurantId = req.params.id;
  Restaurant.delete(restaurantId, (err) => {
    if (err) {
      res.status(500).json({ error: 'Error al eliminar el restaurante' });
    } else {
      res.json({ message: 'Restaurante eliminado' });
    }
  });
};

module.exports = { getAllRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant };
