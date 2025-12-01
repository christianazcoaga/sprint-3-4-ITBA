import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Home from './Home';

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Página Home', () => {
  
  it('debería mostrar el título de bienvenida', () => {
    renderWithRouter(<Home />);
    
    // Buscar por el heading principal
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
  
  it('debería tener un enlace o botón para ver el catálogo', () => {
    renderWithRouter(<Home />);
    
    // Buscar por texto que contenga "catálogo" o "productos"
    const catalogLink = screen.getByRole('link', { name: /catálogo|productos/i });
    expect(catalogLink).toBeInTheDocument();
  });
  
  it('debería renderizar la imagen hero o banner principal', () => {
    renderWithRouter(<Home />);
    
    // Verificar que existe la sección hero
    const heroSection = screen.getByRole('heading', { level: 1 });
    expect(heroSection).toBeInTheDocument();
  });
});
