const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        enum: ['usuario', 'admin'],
        default: 'usuario'
    }
});

module.exports = mongoose.model('User', userSchema);