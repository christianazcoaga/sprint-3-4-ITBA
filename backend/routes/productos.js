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

// Crear un nuevo producto (requiere autenticación y autorización)
router.post('/', authenticateToken, isAdmin, createProduct);

// Actualizar un producto existente (requiere autenticación y autorización)
router.put('/:id', authenticateToken, isAdmin, updateProduct);

// Eliminar un producto (requiere autenticación y autorización)
router.delete('/:id', authenticateToken, isAdmin, deleteProduct);

module.exports = router;