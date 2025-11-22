const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        // buscar usuario por email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: 'Inicio inválido' });
        }

        // comparar constraseñas
        const esValida = await bcrypt.compare(req.body.password, user.password);
        if (!esValida) {
            return res.status(400).json({message: 'Inicio inválido'});
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // respondemos al front con datos del usuario
        res.status(200).json({ 
            token,
            user: {
                id: user._id,
                nombreUsuario: user.nombreUsuario,
                email: user.email,
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Error del servidor' });
    }
});

module.exports = router;