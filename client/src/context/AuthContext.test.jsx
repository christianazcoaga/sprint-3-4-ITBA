import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthProvider, useAuth } from './AuthContext';

// Componente de prueba
const TestComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  const handleLogin = () => {
    const userData = {
      id: '123',
      username: 'testuser',
      email: 'test@example.com',
      rol: 'Usuario'
    };
    const token = 'fake-jwt-token';
    login(userData, token);
  };
  
  return (
    <div>
      <p>Autenticado: {isAuthenticated ? 'Sí' : 'No'}</p>
      {user && <p>Usuario: {user.username}</p>}
      <button onClick={handleLogin}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  
  beforeEach(() => {
    localStorage.clear();
  });
  
  it('debería iniciar sin usuario autenticado', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByText(/Autenticado: No/i)).toBeInTheDocument();
  });
  
  it('debería autenticar un usuario correctamente', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    const loginButton = screen.getByText(/Login/i);
    fireEvent.click(loginButton);
    
    expect(screen.getByText(/Autenticado: Sí/i)).toBeInTheDocument();
    expect(screen.getByText(/Usuario: testuser/i)).toBeInTheDocument();
  });
  
  it('debería almacenar el token en localStorage al hacer login', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    const loginButton = screen.getByText(/Login/i);
    fireEvent.click(loginButton);
    
    expect(localStorage.getItem('token')).toBe('fake-jwt-token');
    expect(localStorage.getItem('user')).toBeTruthy();
  });
  
  it('debería cerrar sesión y limpiar el estado', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    const loginButton = screen.getByText(/Login/i);
    const logoutButton = screen.getByText(/Logout/i);
    
    // Login
    fireEvent.click(loginButton);
    expect(screen.getByText(/Autenticado: Sí/i)).toBeInTheDocument();
    
    // Logout
    fireEvent.click(logoutButton);
    expect(screen.getByText(/Autenticado: No/i)).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
  
  it('debería restaurar la sesión desde localStorage', () => {
    // Simular datos en localStorage
    localStorage.setItem('token', 'stored-token');
    localStorage.setItem('user', JSON.stringify({
      id: '456',
      username: 'storeduser',
      email: 'stored@example.com',
      rol: 'Admin'
    }));
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByText(/Autenticado: Sí/i)).toBeInTheDocument();
    expect(screen.getByText(/Usuario: storeduser/i)).toBeInTheDocument();
  });
});
