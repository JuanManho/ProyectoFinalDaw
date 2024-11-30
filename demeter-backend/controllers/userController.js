const User = require('../models/userModel');

const getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    } else {
      res.json(results);
    }
  });
};

module.exports = { getAllUsers };
