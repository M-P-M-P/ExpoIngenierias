// Importa la función sum del archivo math.js
const sum = require('../react/src/Pages/Juez/math');

// Prueba para verificar que la función sum sume dos números correctamente
describe('sum function', () => {
  it('should return the sum of two numbers', () => {
    // Define dos números para sumar
    const a = 3;
    const b = 5;

    // Llama a la función sum con los números definidos
    const result = sum(a, b);

    // Verifica que el resultado sea el esperado
    expect(result).toBe(8); // Esperamos que la suma de 3 y 5 sea 8
  });
});
