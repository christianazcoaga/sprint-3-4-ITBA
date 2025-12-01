import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartProvider, useCart } from './CartContext';

// Componente de prueba para usar el contexto
const TestComponent = () => {
  const { cart, addToCart, removeFromCart, getCartCount, getCartTotal, clearCart } = useCart();
  
  const testProduct = {
    id: '1',
    nombre: 'Mesa',
    precio: 10000,
    stock: 5
  };
  
  return (
    <div>
      <p>Items en carrito: {getCartCount()}</p>
      <p>Total: ${getCartTotal()}</p>
      <button onClick={() => addToCart(testProduct, 1)}>Agregar producto</button>
      <button onClick={() => removeFromCart('1')}>Eliminar producto</button>
      <button onClick={clearCart}>Limpiar carrito</button>
      {cart.map(item => (
        <div key={item.id}>
          <span>{item.nombre}</span>
          <span>Cantidad: {item.cantidad}</span>
        </div>
      ))}
    </div>
  );
};

describe('CartContext', () => {
  
  beforeEach(() => {
    // Limpiar localStorage antes de cada prueba
    localStorage.clear();
  });
  
  it('debería iniciar con el carrito vacío', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    expect(screen.getByText(/Items en carrito: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$0/i)).toBeInTheDocument();
  });
  
  it('debería agregar un producto al carrito', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    const addButton = screen.getByText(/Agregar producto/i);
    fireEvent.click(addButton);
    
    expect(screen.getByText(/Items en carrito: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$10000/i)).toBeInTheDocument();
    expect(screen.getByText(/Mesa/i)).toBeInTheDocument();
  });
  
  it('debería incrementar la cantidad si se agrega el mismo producto', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    const addButton = screen.getByText(/Agregar producto/i);
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    
    expect(screen.getByText(/Items en carrito: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$20000/i)).toBeInTheDocument();
    expect(screen.getByText(/Cantidad: 2/i)).toBeInTheDocument();
  });
  
  it('debería eliminar un producto del carrito', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    const addButton = screen.getByText(/Agregar producto/i);
    const removeButton = screen.getByText(/Eliminar producto/i);
    
    fireEvent.click(addButton);
    expect(screen.getByText(/Items en carrito: 1/i)).toBeInTheDocument();
    
    fireEvent.click(removeButton);
    expect(screen.getByText(/Items en carrito: 0/i)).toBeInTheDocument();
  });
  
  it('debería limpiar todo el carrito', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    const addButton = screen.getByText(/Agregar producto/i);
    const clearButton = screen.getByText(/Limpiar carrito/i);
    
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getByText(/Items en carrito: 2/i)).toBeInTheDocument();
    
    fireEvent.click(clearButton);
    expect(screen.getByText(/Items en carrito: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$0/i)).toBeInTheDocument();
  });
  
  it('no debería exceder el stock disponible', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    const addButton = screen.getByText(/Agregar producto/i);
    
    // Intentar agregar más de 5 (stock disponible)
    for (let i = 0; i < 10; i++) {
      fireEvent.click(addButton);
    }
    
    // Debería limitarse a 5
    expect(screen.getByText(/Items en carrito: 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Cantidad: 5/i)).toBeInTheDocument();
  });
});
