const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const orderRoutes = require('./routes/orderRoutes');
const menuRoutes = require('./routes/menuRoutes');

// Cargar variables de entorno
dotenv.config();

// Inicializar app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Configurar CORS
app.use(express.json()); // Para manejar JSON en las solicitudes

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente 🚀');
});

// // Logs para verificar las rutas
// console.log('userRoutes:', userRoutes);
// console.log('restaurantRoutes:', restaurantRoutes);
// console.log('orderRoutes:', orderRoutes);
// console.log('menuRoutes:', menuRoutes);

// Rutas
app.use('/api/users', userRoutes); // Rutas de usuarios
app.use('/api/restaurants', restaurantRoutes); // Rutas de restaurantes
app.use('/api/orders', orderRoutes); // Rutas para pedidos
app.use('/api/menus', menuRoutes);   // Rutas para menús

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
