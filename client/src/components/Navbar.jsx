import React from 'react';
import Logo from './Logo';

const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div>
          <Logo size="medium" variant="default" />
        </div>
        <div className="navbar-menu">
          <button className="navbar-link">Catálogo</button>
          <button className="navbar-link">Contacto</button>
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