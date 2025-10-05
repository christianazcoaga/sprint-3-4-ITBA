import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Hermanos Jota</h3>
          <p>Muebles de diseño sostenible</p>
          <p>Artesanía que honra el pasado mientras abraza el futuro</p>
        </div>
        <div className="footer-section">
          <h4>Showroom y Taller</h4>
          <p>Av. San Juan 2847</p>
          <p>C1232AAB — Barrio de San Cristóbal</p>
          <p>Ciudad Autónoma de Buenos Aires</p>
          <p>Argentina</p>
        </div>
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>info@hermanosjota.com.ar</p>
          <p>ventas@hermanosjota.com.ar</p>
          <p>+54 11 4567-8900</p>
          <p>@hermanosjota_ba</p>
        </div>
        <div className="footer-section">
          <h4>Horarios</h4>
          <p>Lunes a Viernes: 10:00 - 19:00</p>
          <p>Sábados: 10:00 - 14:00</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Hermanos Jota. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
