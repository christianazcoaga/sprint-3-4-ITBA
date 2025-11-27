const express = require('express');
const Product = require('../models/Product');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// importar las funciones del controlador
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/ProductController.js');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

// POST /api/productos - Crear un nuevo producto (requiere autenticación)
router.post('/', authenticateToken, isAdmin, createProduct);

// PUT /api/productos/:id - Actualizar un producto existente (requiere autenticación)
router.put('/:id', authenticateToken, isAdmin, updateProduct);

// DELETE /api/productos/:id - Eliminar un producto (requiere autenticación)
router.delete('/:id', authenticateToken, isAdmin, deleteProduct);

module.exports = router;