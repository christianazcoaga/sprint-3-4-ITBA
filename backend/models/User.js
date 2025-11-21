const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombreUsuario: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true
    },
    contraseña: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        enum: ['usuario', 'admin'],
        default: ['usuario']
    }
})