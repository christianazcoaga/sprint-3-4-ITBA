const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');
const productosRoutes = require('./routes/productos.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB Atlas
connectDB();

// Middleware global para logging de peticiones
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rutas de productos
app.use('/api/productos', productosRoutes);

// Manejador para rutas no encontradas (404)
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    message: `La ruta ${req.method} ${req.originalUrl} no existe`
  });
});

// Manejador de errores centralizado
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: 'Algo salió mal en el servidor'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});