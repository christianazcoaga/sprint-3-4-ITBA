const express = require('express');
const Product = require('../models/Product');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// GET /api/productos - Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ 
      error: 'Error al obtener los productos',
      message: error.message 
    });
  }
});

// GET /api/productos/:id - Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    
    if (!producto) {
      return res.status(404).json({ 
        error: 'Producto no encontrado',
        message: `No existe un producto con el ID ${req.params.id}` 
      });
    }
    
    res.json(producto);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    
    // Si el ID no es válido (formato incorrecto)
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        error: 'ID inválido',
        message: 'El formato del ID no es válido' 
      });
    }
    
    res.status(500).json({ 
      error: 'Error al obtener el producto',
      message: error.message 
    });
  }
});

// POST /api/productos - Crear un nuevo producto (requiere autenticación)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, imagenUrl, categoria, especificaciones } = req.body;
    
    // Validar campos requeridos
    if (!nombre || !precio) {
      return res.status(400).json({ 
        error: 'Datos incompletos',
        message: 'Los campos nombre y precio son obligatorios' 
      });
    }
    
    // Crear nuevo producto
    const nuevoProducto = new Product({
      nombre,
      descripcion,
      precio,
      stock: stock || 0,
      imagenUrl,
      categoria,
      especificaciones
    });
    
    // Guardar en la base de datos
    const productoGuardado = await nuevoProducto.save();
    
    res.status(201).json({
      message: 'Producto creado exitosamente',
      producto: productoGuardado
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    
    // Error de validación de Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Error de validación',
        message: error.message 
      });
    }
    
    res.status(500).json({ 
      error: 'Error al crear el producto',
      message: error.message 
    });
  }
});

// PUT /api/productos/:id - Actualizar un producto existente (requiere autenticación)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, imagenUrl, categoria, especificaciones } = req.body;
    
    // Construir objeto con los campos a actualizar
    const datosActualizados = {};
    if (nombre !== undefined) datosActualizados.nombre = nombre;
    if (descripcion !== undefined) datosActualizados.descripcion = descripcion;
    if (precio !== undefined) datosActualizados.precio = precio;
    if (stock !== undefined) datosActualizados.stock = stock;
    if (imagenUrl !== undefined) datosActualizados.imagenUrl = imagenUrl;
    if (categoria !== undefined) datosActualizados.categoria = categoria;
    if (especificaciones !== undefined) datosActualizados.especificaciones = especificaciones;
    
    // Actualizar el producto (new: true devuelve el documento actualizado)
    const productoActualizado = await Product.findByIdAndUpdate(
      req.params.id,
      datosActualizados,
      { new: true, runValidators: true }
    );
    
    if (!productoActualizado) {
      return res.status(404).json({ 
        error: 'Producto no encontrado',
        message: `No existe un producto con el ID ${req.params.id}` 
      });
    }
    
    res.json({
      message: 'Producto actualizado exitosamente',
      producto: productoActualizado
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    
    // Si el ID no es válido
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        error: 'ID inválido',
        message: 'El formato del ID no es válido' 
      });
    }
    
    // Error de validación
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Error de validación',
        message: error.message 
      });
    }
    
    res.status(500).json({ 
      error: 'Error al actualizar el producto',
      message: error.message 
    });
  }
});

// DELETE /api/productos/:id - Eliminar un producto (requiere autenticación)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const productoEliminado = await Product.findByIdAndDelete(req.params.id);
    
    if (!productoEliminado) {
      return res.status(404).json({ 
        error: 'Producto no encontrado',
        message: `No existe un producto con el ID ${req.params.id}` 
      });
    }
    
    res.json({
      message: 'Producto eliminado exitosamente',
      producto: productoEliminado
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    
    // Si el ID no es válido
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        error: 'ID inválido',
        message: 'El formato del ID no es válido' 
      });
    }
    
    res.status(500).json({ 
      error: 'Error al eliminar el producto',
      message: error.message 
    });
  }
});

module.exports = router;