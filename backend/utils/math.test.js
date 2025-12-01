const { sumar } = require('./math');

// `describe` agrupa un conjunto de pruebas relacionadas. Es como un capítulo.
describe('Función de suma', () => {

  // `it` (o `test`) define una prueba individual. Su nombre debe ser descriptivo.
  it('debería sumar dos números positivos correctamente', () => {
    // 1. Arrange (Organizar): Definimos nuestras entradas.
    const num1 = 5;
    const num2 = 10;

    // 2. Act (Actuar): Ejecutamos la función que estamos probando.
    const resultado = sumar(num1, num2);

    // 3. Assert (Afirmar): Verificamos si el resultado es el esperado.
    expect(resultado).toBe(15);
  });

  it('debería devolver null si uno de los argumentos no es un número', () => {
    // Arrange
    const num1 = 5;
    const str2 = 'hola';

    // Act
    const resultado = sumar(num1, str2);

    // Assert
    expect(resultado).toBeNull(); // .toBeNull() es un "matcher" de Jest
  });
  
  it('debería manejar números negativos', () => {
    expect(sumar(-5, -5)).toBe(-10); // Podemos hacerlo más conciso
  });
});
