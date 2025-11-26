const asyncHandler = require('express-async-handler');
const Product = require('../models/Product.js');

// @desc    Obtener todos los productos
// @route   GET /api/productos

const getAllProducts = asyncHandler(async (req, res) => {
    const productos = await Product.find();
    res.json(productos);
});

const getProductById = asyncHandler(async (req, res) => {
    const producto = await Product.findById(req.params.id);
    
    if (!producto) {
      return res.status(404).json({ 
        error: 'Producto no encontrado',
        message: `No existe un producto con el ID ${req.params.id}` 
      });
    }
    
    res.json(producto);
});

const createProduct = asyncHandler(async (req, res) => {
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
});

const updateProduct = asyncHandler(async (req, res) => {
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
});

const deleteProduct = asyncHandler(async (req, res) => {
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
});

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};