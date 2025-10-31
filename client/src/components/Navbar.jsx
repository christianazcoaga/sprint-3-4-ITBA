import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Inicio</Link>
          <Link to="/productos" className="navbar-link">Catálogo</Link>
          <Link to="/contacto" className="navbar-link">Contacto</Link>
          <Link to="/admin/crear-producto" className="navbar-link">Crear Producto</Link>
          <div className="cart-icon">
            🛒
            <span className="cart-count">{cartCount}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;