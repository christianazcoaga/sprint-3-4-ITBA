const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../middleware/auth.js')

// Importar las funciones del controlador
const {
    createUser,
    loginUser,
    getUserProfile
} = require('../controllers/userController.js');

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, getUserProfile)

module.exports = router;