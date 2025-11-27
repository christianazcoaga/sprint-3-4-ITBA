const jwt = require('jsonwebtoken');

// Middleware para verificar JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();

    } catch (err) {
        return res.status(403).json({ message: 'Token inválido o expirado.' });
    }
};

// Middleware para verificar que el usuario es admin
const isAdmin = (req, res, next) => {
    if (req.user.rol !== 'Admin') {
        return res.status(403).json({ message: 'Acceso denegado. Permisos insuficientes.' });
    }
    next();
};

module.exports = { authenticateToken, isAdmin };

