import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import { vi, beforeEach } from 'vitest';
import ProtectedRoute from './ProtectedRoute';
import * as AuthContext from '../context/AuthContext';

// Mock de useAuth para controlar el estado de autenticación
vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn()
}));

// Componentes de prueba
const ProtectedContent = () => <div>Contenido Protegido</div>;
const LoginPage = () => <div>Página de Login</div>;

describe('Componente ProtectedRoute', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  const renderWithRouter = (user = null, loading = false) => {
    AuthContext.useAuth.mockReturnValue({ user, loading });
    
    return render(
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/protected" 
            element={
              <ProtectedRoute>
                <ProtectedContent />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <ProtectedContent />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    );
  };
  
  it('debería mostrar "Cargando..." mientras se verifica la autenticación', () => {
    AuthContext.useAuth.mockReturnValue({ user: null, loading: true });
    
    render(
      <BrowserRouter>
        <ProtectedRoute>
          <ProtectedContent />
        </ProtectedRoute>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
  });
  
  it('debería redirigir a /login si no hay usuario autenticado', () => {
    AuthContext.useAuth.mockReturnValue({ user: null, loading: false });
    
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <ProtectedContent />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Página de Login/i)).toBeInTheDocument();
  });
  
  it('debería mostrar el contenido protegido si hay usuario autenticado', () => {
    AuthContext.useAuth.mockReturnValue({ 
      user: { username: 'testuser', rol: 'Usuario' }, 
      loading: false 
    });
    
    render(
      <BrowserRouter>
        <ProtectedRoute>
          <ProtectedContent />
        </ProtectedRoute>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Contenido Protegido/i)).toBeInTheDocument();
  });
  
  it('debería permitir acceso a rutas admin solo para usuarios con rol Admin', () => {
    AuthContext.useAuth.mockReturnValue({ 
      user: { username: 'admin', rol: 'Admin' }, 
      loading: false 
    });
    
    render(
      <BrowserRouter>
        <ProtectedRoute requireAdmin={true}>
          <ProtectedContent />
        </ProtectedRoute>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Contenido Protegido/i)).toBeInTheDocument();
  });
  
  it('debería redirigir a home si usuario no es admin pero ruta requiere admin', () => {
    AuthContext.useAuth.mockReturnValue({ 
      user: { username: 'user', rol: 'Usuario' }, 
      loading: false 
    });
    
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <ProtectedContent />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    );
    
    // No debería ver el contenido protegido
    expect(screen.queryByText(/Contenido Protegido/i)).not.toBeInTheDocument();
  });
});
