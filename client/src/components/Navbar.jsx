import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import logo from '../assets/logo.svg';

const Navbar = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevCartCountRef = useRef(cartCount);
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/');
    showToast('Sesión cerrada correctamente', 'success');
  };

  // Cerrar el menú cuando se hace clic fuera de él
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Animación del carrito
  useEffect(() => {
    if (cartCount > prevCartCountRef.current) {
      setIsAnimating(true);
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);

      return () => clearTimeout(timer);
    }
    prevCartCountRef.current = cartCount;
  }, [cartCount]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
        
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Overlay para cerrar el menú */}
        {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link" onClick={closeMenu}>Inicio</Link>
          <Link to="/productos" className="navbar-link" onClick={closeMenu}>Catálogo</Link>
          <Link to="/contacto" className="navbar-link" onClick={closeMenu}>Contacto</Link>
          <Link to="/admin/crear-producto" className="navbar-link" onClick={closeMenu}>Crear Producto</Link>
          
          {user ? (
            <div className="navbar-auth">
              <span className="navbar-user">Hola, {user.username}</span>
              <button onClick={handleLogout} className="navbar-link navbar-logout-btn">
                Cerrar Sesión
              </button>
              <Link to="/profile" className="navbar-link" onClick={closeMenu}>Mi perfil</Link>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="navbar-link navbar-login-btn" onClick={closeMenu}>Iniciar Sesión</Link>
              <Link to="/registro" className="navbar-link navbar-register-btn" onClick={closeMenu}>Registrarse</Link>
            </div>
          )}
          
          <div 
            className={`cart-icon ${isAnimating ? 'cart-bump' : ''}`} 
            aria-label="Carrito de compras"
          >
            <svg className="cart-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M6 6H4V4h2v2zm0 0h14l-1.2 6.8A2 2 0 0 1 16.9 16H8.1a2 2 0 0 1-1.9-1.2L5 6z" fill="currentColor" />
              <circle cx="10" cy="20" r="1" fill="currentColor" />
              <circle cx="18" cy="20" r="1" fill="currentColor" />
            </svg>
            <span className="cart-count">{cartCount}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;