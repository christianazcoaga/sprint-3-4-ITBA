// Funciones de validación para productos

/**
 * Valida los datos de un producto
 * @param {Object} productData - Datos del producto
 * @returns {Object} - { isValid: boolean, errors: string[] }
 */
const validateProductData = (productData) => {
  const errors = [];

  if (!productData.nombre || typeof productData.nombre !== 'string' || productData.nombre.trim() === '') {
    errors.push('El nombre es obligatorio y debe ser un texto válido');
  }

  if (productData.precio === undefined || productData.precio === null) {
    errors.push('El precio es obligatorio');
  } else if (typeof productData.precio !== 'number' || productData.precio < 0) {
    errors.push('El precio debe ser un número mayor o igual a 0');
  }

  if (productData.stock !== undefined && (typeof productData.stock !== 'number' || productData.stock < 0)) {
    errors.push('El stock debe ser un número mayor o igual a 0');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida los datos de un usuario
 * @param {Object} userData - Datos del usuario
 * @returns {Object} - { isValid: boolean, errors: string[] }
 */
const validateUserData = (userData) => {
  const errors = [];

  if (!userData.username || typeof userData.username !== 'string' || userData.username.trim() === '') {
    errors.push('El nombre de usuario es obligatorio');
  }

  if (!userData.email || typeof userData.email !== 'string') {
    errors.push('El email es obligatorio');
  } else if (!isValidEmail(userData.email)) {
    errors.push('El formato del email no es válido');
  }

  if (!userData.password || typeof userData.password !== 'string') {
    errors.push('La contraseña es obligatoria');
  } else if (userData.password.length < 6) {
    errors.push('La contraseña debe tener al menos 6 caracteres');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida el formato de un email
 * @param {string} email - Email a validar
 * @returns {boolean}
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida que un stock sea suficiente para una cantidad solicitada
 * @param {number} stockDisponible - Stock disponible del producto
 * @param {number} cantidadSolicitada - Cantidad que se desea comprar
 * @returns {boolean}
 */
const hasEnoughStock = (stockDisponible, cantidadSolicitada) => {
  if (typeof stockDisponible !== 'number' || typeof cantidadSolicitada !== 'number') {
    return false;
  }
  return stockDisponible >= cantidadSolicitada && cantidadSolicitada > 0;
};

module.exports = {
  validateProductData,
  validateUserData,
  isValidEmail,
  hasEnoughStock
};
