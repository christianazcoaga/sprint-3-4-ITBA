import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import logo from '../assets/logo.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
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
          
          {user ? (
            <>
              <Link to="/profile" className="navbar-link" onClick={closeMenu}>Mi Perfil</Link>
              <Link to="/mis-pedidos" className="navbar-link" onClick={closeMenu}>Mis Pedidos</Link>
              {user.rol === 'Admin' && (
                <Link to="/admin/crear-producto" className="navbar-link" onClick={closeMenu}>Crear Producto</Link>
              )}
              <span className="navbar-user">Hola, {user.username}</span>
              <button onClick={handleLogout} className="navbar-link navbar-logout-btn">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link navbar-login-btn" onClick={closeMenu}>Iniciar Sesión</Link>
              <Link to="/registro" className="navbar-link navbar-register-btn" onClick={closeMenu}>Registrarse</Link>
            </>
          )}
          
          <Link 
            to="/carrito"
            className={`cart-icon ${isAnimating ? 'cart-bump' : ''}`}
            aria-label="Carrito de compras"
            onClick={closeMenu}
          >
            <svg className="cart-icon-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" fill="currentColor" />
            </svg>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;