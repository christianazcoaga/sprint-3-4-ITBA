import React from 'react';
import logo from '../assets/logo.svg';

const Navbar = ({ cartCount, onNavigate }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div>
          <img src={logo} alt="Logo" className="navbar-logo" />
        </div>
        <div className="navbar-menu">
          <button className="navbar-link" onClick={() => onNavigate('catalogo')}>Catálogo</button>
          <button className="navbar-link" onClick={() => onNavigate('contacto')}>Contacto</button>
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