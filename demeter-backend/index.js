const express = require('express');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Para manejar JSON en las solicitudes

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente 🚀');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
