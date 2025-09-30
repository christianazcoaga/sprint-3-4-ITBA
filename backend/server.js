const express = require('express');
const productos = require('./productos.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Endpoint para obtener todos los productos
app.get('/api/productos', (req, res) => {
  res.json(productos);
});

// Endpoint para obtener un producto por ID
app.get('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);
  
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  
  res.json(producto);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});