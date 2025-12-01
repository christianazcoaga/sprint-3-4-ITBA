// Funciones de cálculo para pedidos

/**
 * Calcula el total de un pedido
 * @param {Array} items - Array de items con precio y cantidad
 * @returns {number} - Total del pedido
 */
const calculateOrderTotal = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return 0;
  }

  return items.reduce((total, item) => {
    if (typeof item.precio !== 'number' || typeof item.cantidad !== 'number') {
      return total;
    }
    return total + (item.precio * item.cantidad);
  }, 0);
};

/**
 * Calcula el subtotal de un item
 * @param {number} precio - Precio unitario
 * @param {number} cantidad - Cantidad de items
 * @returns {number} - Subtotal del item
 */
const calculateItemSubtotal = (precio, cantidad) => {
  if (typeof precio !== 'number' || typeof cantidad !== 'number') {
    return 0;
  }
  if (precio < 0 || cantidad < 0) {
    return 0;
  }
  return precio * cantidad;
};

/**
 * Aplica un descuento a un precio
 * @param {number} precio - Precio original
 * @param {number} descuentoPorcentaje - Porcentaje de descuento (0-100)
 * @returns {number} - Precio con descuento aplicado
 */
const applyDiscount = (precio, descuentoPorcentaje) => {
  if (typeof precio !== 'number' || typeof descuentoPorcentaje !== 'number') {
    return precio;
  }
  if (descuentoPorcentaje < 0 || descuentoPorcentaje > 100) {
    return precio;
  }
  const descuento = precio * (descuentoPorcentaje / 100);
  return precio - descuento;
};

/**
 * Calcula el stock restante después de una compra
 * @param {number} stockActual - Stock disponible
 * @param {number} cantidadComprada - Cantidad a reducir del stock
 * @returns {number} - Stock restante
 */
const calculateRemainingStock = (stockActual, cantidadComprada) => {
  if (typeof stockActual !== 'number' || typeof cantidadComprada !== 'number') {
    return stockActual;
  }
  if (stockActual < cantidadComprada) {
    return stockActual; // No se puede reducir más de lo disponible
  }
  return stockActual - cantidadComprada;
};

/**
 * Calcula el costo de envío basado en el total del pedido
 * @param {number} total - Total del pedido
 * @param {number} minimoEnvioGratis - Monto mínimo para envío gratis
 * @param {number} costoEnvio - Costo del envío
 * @returns {number} - Costo de envío (0 si califica para envío gratis)
 */
const calculateShippingCost = (total, minimoEnvioGratis = 5000, costoEnvio = 500) => {
  if (typeof total !== 'number' || total < 0) {
    return costoEnvio;
  }
  return total >= minimoEnvioGratis ? 0 : costoEnvio;
};

module.exports = {
  calculateOrderTotal,
  calculateItemSubtotal,
  applyDiscount,
  calculateRemainingStock,
  calculateShippingCost
};
