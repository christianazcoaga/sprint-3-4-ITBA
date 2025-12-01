const {
  validateProductData,
  validateUserData,
  isValidEmail,
  hasEnoughStock
} = require('./validators');

describe('Validadores de Productos', () => {
  
  describe('validateProductData', () => {
    it('debería validar correctamente un producto con datos válidos', () => {
      const productData = {
        nombre: 'Laptop',
        precio: 1000,
        stock: 10,
        descripcion: 'Una laptop moderna'
      };

      const resultado = validateProductData(productData);

      expect(resultado.isValid).toBe(true);
      expect(resultado.errors).toHaveLength(0);
    });

    it('debería rechazar un producto sin nombre', () => {
      const productData = {
        precio: 1000,
        stock: 10
      };

      const resultado = validateProductData(productData);

      expect(resultado.isValid).toBe(false);
      expect(resultado.errors).toContain('El nombre es obligatorio y debe ser un texto válido');
    });

    it('debería rechazar un producto con nombre vacío', () => {
      const productData = {
        nombre: '   ',
        precio: 1000
      };

      const resultado = validateProductData(productData);

      expect(resultado.isValid).toBe(false);
      expect(resultado.errors.length).toBeGreaterThan(0);
    });

    it('debería rechazar un producto sin precio', () => {
      const productData = {
        nombre: 'Laptop',
        stock: 10
      };

      const resultado = validateProductData(productData);

      expect(resultado.isValid).toBe(false);
      expect(resultado.errors).toContain('El precio es obligatorio');
    });

    it('debería rechazar un producto con precio negativo', () => {
      const productData = {
        nombre: 'Laptop',
        precio: -100
      };

      const resultado = validateProductData(productData);

      expect(resultado.isValid).toBe(false);
      expect(resultado.errors).toContain('El precio debe ser un número mayor o igual a 0');
    });

    it('debería rechazar un producto con stock negativo', () => {
      const productData = {
        nombre: 'Laptop',
        precio: 1000,
        stock: -5
      };

      const resultado = validateProductData(productData);

      expect(resultado.isValid).toBe(false);
      expect(resultado.errors).toContain('El stock debe ser un número mayor o igual a 0');
    });

    it('debería aceptar un producto sin stock (se asume 0 por defecto)', () => {
      const productData = {
        nombre: 'Laptop',
        precio: 1000
      };

      const resultado = validateProductData(productData);

      expect(resultado.isValid).toBe(true);
    });
  });
});

describe('Validadores de Usuarios', () => {
  
  describe('validateUserData', () => {
    it('debería validar correctamente un usuario con datos válidos', () => {
      const userData = {
        username: 'juan123',
        email: 'juan@example.com',
        password: 'password123'
      };

      const resultado = validateUserData(userData);

      expect(resultado.isValid).toBe(true);
      expect(resultado.errors).toHaveLength(0);
    });

    it('debería rechazar un usuario sin nombre de usuario', () => {
      const userData = {
        email: 'juan@example.com',
        password: 'password123'
      };

      const resultado = validateUserData(userData);

      expect(resultado.isValid).toBe(false);
      expect(resultado.errors).toContain('El nombre de usuario es obligatorio');
    });

    it('debería rechazar un usuario sin email', () => {
      const userData = {
        username: 'juan123',
        password: 'password123'
      };

      const resultado = validateUserData(userData);

      expect(resultado.isValid).toBe(false);
      expect(resultado.errors).toContain('El email es obligatorio');
    });

    it('debería rechazar un usuario con email inválido', () => {
      const userData = {
        username: 'juan123',
        email: 'email-invalido',
        password: 'password123'
      };

      const resultado = validateUserData(userData);

      expect(resultado.isValid).toBe(false);
      expect(resultado.errors).toContain('El formato del email no es válido');
    });

    it('debería rechazar un usuario sin contraseña', () => {
      const userData = {
        username: 'juan123',
        email: 'juan@example.com'
      };

      const resultado = validateUserData(userData);

      expect(resultado.isValid).toBe(false);
      expect(resultado.errors).toContain('La contraseña es obligatoria');
    });

    it('debería rechazar un usuario con contraseña muy corta', () => {
      const userData = {
        username: 'juan123',
        email: 'juan@example.com',
        password: '12345'
      };

      const resultado = validateUserData(userData);

      expect(resultado.isValid).toBe(false);
      expect(resultado.errors).toContain('La contraseña debe tener al menos 6 caracteres');
    });
  });

  describe('isValidEmail', () => {
    it('debería validar emails correctos', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.com')).toBe(true);
    });

    it('debería rechazar emails incorrectos', () => {
      expect(isValidEmail('invalido')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('user @example.com')).toBe(false);
    });
  });
});

describe('Validadores de Stock', () => {
  
  describe('hasEnoughStock', () => {
    it('debería retornar true cuando hay stock suficiente', () => {
      expect(hasEnoughStock(10, 5)).toBe(true);
      expect(hasEnoughStock(10, 10)).toBe(true);
    });

    it('debería retornar false cuando no hay stock suficiente', () => {
      expect(hasEnoughStock(5, 10)).toBe(false);
      expect(hasEnoughStock(0, 1)).toBe(false);
    });

    it('debería retornar false para cantidades no positivas', () => {
      expect(hasEnoughStock(10, 0)).toBe(false);
      expect(hasEnoughStock(10, -5)).toBe(false);
    });

    it('debería retornar false si los argumentos no son números', () => {
      expect(hasEnoughStock('10', 5)).toBe(false);
      expect(hasEnoughStock(10, '5')).toBe(false);
      expect(hasEnoughStock(null, 5)).toBe(false);
    });
  });
});
