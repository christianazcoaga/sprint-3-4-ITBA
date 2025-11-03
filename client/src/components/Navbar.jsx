import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Navbar = ({ cartCount }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const prevCartCountRef = useRef(cartCount);

  useEffect(() => {
    if (cartCount > prevCartCountRef.current) {
      setIsAnimating(true);
      
      // Quita la clase despues de que termine la animacion (500ms)
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Debe coincidir con la duración de la animación en CSS

      // Limpieza del timer si el componente se desmonta
      return () => clearTimeout(timer);
    }
    prevCartCountRef.current = cartCount;

  }, [cartCount]); // Este efecto se ejecuta cada vez que cartCount cambia

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo-container" aria-label="Hermanos Jota">
          <img src={logo} alt="Hermanos Jota logo" className="navbar-logo" />
          <span className="navbar-logo-text">Hermanos Jota</span>
        </div>
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Inicio</Link>
          <Link to="/productos" className="navbar-link">Catálogo</Link>
          <Link to="/contacto" className="navbar-link">Contacto</Link>
          <Link to="/admin/crear-producto" className="navbar-link">Crear Producto</Link>
          
          {/* Aquí aplicamos la clase 'cart-bump' condicionalmente
            basado en el estado 'isAnimating'
          */}
          <div 
            className={`cart-icon ${isAnimating ? 'cart-bump' : ''}`} 
            aria-label="Carrito de compras"
          >
            {/* icono */}
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