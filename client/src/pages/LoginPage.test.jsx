import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import LoginPage from './LoginPage';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';

// Mock de fetch
global.fetch = vi.fn();

const AllTheProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Página de Login', () => {
  
  beforeEach(() => {
    fetch.mockClear();
    localStorage.clear();
  });
  
  it('debería renderizar el formulario de login', () => {
    render(
      <AllTheProviders>
        <LoginPage />
      </AllTheProviders>
    );
    
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });
  
  it('debería permitir escribir en los campos', () => {
    render(
      <AllTheProviders>
        <LoginPage />
      </AllTheProviders>
    );
    
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });
  
  it('debería enviar el formulario con credenciales válidas', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'fake-token',
        user: {
          id: '1',
          username: 'testuser',
          email: 'test@example.com',
          rol: 'Usuario'
        }
      })
    });
    
    render(
      <AllTheProviders>
        <LoginPage />
      </AllTheProviders>
    );
    
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/users/login'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          }),
          body: expect.any(String)
        })
      );
    });
  });
  
  it('debería deshabilitar el botón mientras se procesa el login', async () => {
    fetch.mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: async () => ({ token: 'fake-token', user: {} })
      }), 100))
    );
    
    render(
      <AllTheProviders>
        <LoginPage />
      </AllTheProviders>
    );
    
    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    expect(submitButton).toBeDisabled();
  });
  
  it('debería tener un enlace a la página de registro', () => {
    render(
      <AllTheProviders>
        <LoginPage />
      </AllTheProviders>
    );
    
    const registerLink = screen.getByRole('link', { name: /Regístrate/i });
    expect(registerLink).toHaveAttribute('href', '/registro');
  });
});
