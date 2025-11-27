const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../middleware/auth');
const {
  crearPedido,
  obtenerMisPedidos,
  obtenerPedidoPorId,
  obtenerTodosPedidos,
  actualizarEstadoPedido
} = require('../controllers/OrderController');

// Rutas protegidas para usuarios autenticados
router.post('/', authenticateToken, crearPedido);
router.get('/', authenticateToken, obtenerMisPedidos);
router.get('/:id', authenticateToken, obtenerPedidoPorId);

// Rutas protegidas solo para administradores
router.get('/admin/todos', authenticateToken, isAdmin, obtenerTodosPedidos);
router.patch('/:id/estado', authenticateToken, isAdmin, actualizarEstadoPedido);

module.exports = router;
