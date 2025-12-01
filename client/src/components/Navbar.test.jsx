import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Navbar from './Navbar';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';

// Wrapper con todos los contextos necesarios
const AllTheProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

const renderWithProviders = (ui) => {
  return render(ui, { wrapper: AllTheProviders });
};

describe('Componente Navbar', () => {
  
  it('debería mostrar los links principales (Inicio, Catálogo, Contacto)', () => {
    renderWithProviders(<Navbar />);
    
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/Catálogo/i)).toBeInTheDocument();
    expect(screen.getByText(/Contacto/i)).toBeInTheDocument();
  });

  it('debería mostrar Iniciar Sesión y Registrarse cuando no hay usuario logueado', () => {
    renderWithProviders(<Navbar />);
    
    expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
    expect(screen.getByText(/Registrarse/i)).toBeInTheDocument();
  });

  it('debería mostrar el ícono del carrito', () => {
    renderWithProviders(<Navbar />);
    
    const cartIcon = screen.getByLabelText(/Carrito de compras/i);
    expect(cartIcon).toBeInTheDocument();
  });

  it('debería abrir el menú hamburguesa al hacer clic en móvil', () => {
    renderWithProviders(<Navbar />);
    
    const hamburgerButton = screen.getByLabelText(/Toggle menu/i);
    expect(hamburgerButton).toBeInTheDocument();
    
    // Simulamos clic en el botón hamburguesa
    fireEvent.click(hamburgerButton);
    
    // El menú debería tener la clase 'active'
    const menu = document.querySelector('.navbar-menu');
    expect(menu).toHaveClass('active');
  });
});
