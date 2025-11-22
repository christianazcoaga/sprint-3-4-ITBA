const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
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
                username: user.username,
                email: user.email,
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Error del servidor' });
    }
});

router.post('/register', async (req, res) => {
    try {
        // recibe los datos del formulario en front
        const {username, email, password} = req.body;

        // verificar si el usuario ya existe
        const existingUser = await User.findOne( { $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({message: 'El usuario o email ya está en uso'});
        }

        // hashear la constraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // crear nuevo usuario
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        // guardar en base de datos
        const savedUser = await newUser.save();

        // responder al front
        res.status(201).json({
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email

        })
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', error });
    }
});

module.exports = router;