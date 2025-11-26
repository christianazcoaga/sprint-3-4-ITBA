const express = require('express');
const router = express.Router();

// Importar las funciones del controlador
const {
    createUser,
    loginUser
} = require('../controllers/userController.js');

router.post('/register', createUser);
router.post('/login', loginUser);

module.exports = router;