const {
  calculateOrderTotal,
  calculateItemSubtotal,
  applyDiscount,
  calculateRemainingStock,
  calculateShippingCost
} = require('./calculations');

describe('Cálculos de Pedidos', () => {
  
  describe('calculateOrderTotal', () => {
    it('debería calcular correctamente el total de un pedido con múltiples items', () => {
      const items = [
        { precio: 100, cantidad: 2 },
        { precio: 50, cantidad: 3 },
        { precio: 25, cantidad: 4 }
      ];

      const total = calculateOrderTotal(items);

      expect(total).toBe(450); // (100*2) + (50*3) + (25*4) = 200 + 150 + 100
    });

    it('debería retornar 0 para un array vacío', () => {
      expect(calculateOrderTotal([])).toBe(0);
    });

    it('debería retornar 0 si no se pasa un array', () => {
      expect(calculateOrderTotal(null)).toBe(0);
      expect(calculateOrderTotal(undefined)).toBe(0);
      expect(calculateOrderTotal('no es array')).toBe(0);
    });

    it('debería ignorar items con datos inválidos', () => {
      const items = [
        { precio: 100, cantidad: 2 },
        { precio: 'invalido', cantidad: 3 },
        { precio: 50, cantidad: 1 }
      ];

      const total = calculateOrderTotal(items);

      expect(total).toBe(250); // Solo suma los items válidos
    });

    it('debería calcular correctamente con un solo item', () => {
      const items = [{ precio: 100, cantidad: 5 }];
      
      expect(calculateOrderTotal(items)).toBe(500);
    });
  });

  describe('calculateItemSubtotal', () => {
    it('debería calcular correctamente el subtotal de un item', () => {
      expect(calculateItemSubtotal(100, 5)).toBe(500);
      expect(calculateItemSubtotal(25.50, 3)).toBe(76.5);
    });

    it('debería retornar 0 para valores negativos', () => {
      expect(calculateItemSubtotal(-100, 5)).toBe(0);
      expect(calculateItemSubtotal(100, -5)).toBe(0);
    });

    it('debería retornar 0 si los argumentos no son números', () => {
      expect(calculateItemSubtotal('100', 5)).toBe(0);
      expect(calculateItemSubtotal(100, '5')).toBe(0);
      expect(calculateItemSubtotal(null, 5)).toBe(0);
    });

    it('debería manejar cantidad 0', () => {
      expect(calculateItemSubtotal(100, 0)).toBe(0);
    });
  });

  describe('applyDiscount', () => {
    it('debería aplicar correctamente un descuento del 10%', () => {
      expect(applyDiscount(1000, 10)).toBe(900);
    });

    it('debería aplicar correctamente un descuento del 50%', () => {
      expect(applyDiscount(200, 50)).toBe(100);
    });

    it('debería retornar el precio original si el descuento es 0', () => {
      expect(applyDiscount(1000, 0)).toBe(1000);
    });

    it('debería retornar 0 si el descuento es 100%', () => {
      expect(applyDiscount(1000, 100)).toBe(0);
    });

    it('debería retornar el precio original si el descuento es negativo', () => {
      expect(applyDiscount(1000, -10)).toBe(1000);
    });

    it('debería retornar el precio original si el descuento es mayor a 100', () => {
      expect(applyDiscount(1000, 150)).toBe(1000);
    });

    it('debería manejar descuentos decimales', () => {
      expect(applyDiscount(1000, 15.5)).toBe(845);
    });

    it('debería retornar el precio original si los argumentos no son números', () => {
      expect(applyDiscount('1000', 10)).toBe('1000');
      expect(applyDiscount(1000, '10')).toBe(1000);
    });
  });

  describe('calculateRemainingStock', () => {
    it('debería calcular correctamente el stock restante', () => {
      expect(calculateRemainingStock(100, 30)).toBe(70);
      expect(calculateRemainingStock(50, 25)).toBe(25);
    });

    it('debería retornar el stock actual si la cantidad es 0', () => {
      expect(calculateRemainingStock(100, 0)).toBe(100);
    });

    it('debería retornar el stock actual si se intenta comprar más de lo disponible', () => {
      expect(calculateRemainingStock(50, 100)).toBe(50);
    });

    it('debería manejar cuando el stock se agota completamente', () => {
      expect(calculateRemainingStock(50, 50)).toBe(0);
    });

    it('debería retornar el stock actual si los argumentos no son números', () => {
      expect(calculateRemainingStock('100', 30)).toBe('100');
      expect(calculateRemainingStock(100, '30')).toBe(100);
    });
  });

  describe('calculateShippingCost', () => {
    it('debería retornar 0 si el total supera el mínimo para envío gratis', () => {
      expect(calculateShippingCost(6000, 5000, 500)).toBe(0);
      expect(calculateShippingCost(5000, 5000, 500)).toBe(0); // Exactamente el mínimo
    });

    it('debería retornar el costo de envío si el total es menor al mínimo', () => {
      expect(calculateShippingCost(4000, 5000, 500)).toBe(500);
      expect(calculateShippingCost(1000, 5000, 500)).toBe(500);
    });

    it('debería usar valores por defecto si no se proporcionan', () => {
      expect(calculateShippingCost(6000)).toBe(0); // Supera 5000 por defecto
      expect(calculateShippingCost(3000)).toBe(500); // Menor a 5000, costo 500
    });

    it('debería retornar el costo de envío para totales negativos o inválidos', () => {
      expect(calculateShippingCost(-100, 5000, 500)).toBe(500);
      expect(calculateShippingCost('invalido', 5000, 500)).toBe(500);
    });

    it('debería manejar diferentes configuraciones de envío', () => {
      expect(calculateShippingCost(8000, 10000, 1000)).toBe(1000);
      expect(calculateShippingCost(12000, 10000, 1000)).toBe(0);
    });
  });
});
