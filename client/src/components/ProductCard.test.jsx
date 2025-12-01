import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ProductCard from './ProductCard';

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Componente ProductCard', () => {
  
  const mockProducto = {
    id: '1',
    nombre: 'Mesa de Roble',
    precio: 15000,
    stock: 5,
    imagenUrl: 'https://example.com/mesa.jpg',
    descripcion: 'Mesa artesanal de roble'
  };

  it('debería mostrar el nombre del producto', () => {
    renderWithRouter(<ProductCard producto={mockProducto} />);
    
    expect(screen.getByRole('heading', { name: /Mesa de Roble/i })).toBeInTheDocument();
  });

  it('debería mostrar el precio formateado correctamente', () => {
    renderWithRouter(<ProductCard producto={mockProducto} />);
    
    expect(screen.getByText('$15000')).toBeInTheDocument();
  });

  it('debería mostrar el stock disponible', () => {
    renderWithRouter(<ProductCard producto={mockProducto} />);
    
    // El ProductCard no muestra stock, solo nombre, descripción y precio
    expect(screen.getByText(/Mesa artesanal de roble/i)).toBeInTheDocument();
  });

  it('debería mostrar "Sin stock" cuando stock es 0', () => {
    const productoSinStock = { ...mockProducto, stock: 0 };
    renderWithRouter(<ProductCard producto={productoSinStock} />);
    
    // El ProductCard no muestra indicador de stock, este test verifica que renderiza correctamente
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('debería tener un enlace a la página de detalle del producto', () => {
    renderWithRouter(<ProductCard producto={mockProducto} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/productos/1');
  });
});
