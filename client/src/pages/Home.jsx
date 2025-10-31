import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Hermanos Jota</h1>
        <p>Muebles de diseño sostenible</p>
        <p className="subtitle">Artesanía que honra el pasado mientras abraza el futuro</p>
        <Link to="/productos" className="cta-button">
          Ver Catálogo
        </Link>
      </section>
      
      <section className="features">
        <div className="feature">
          <h3>🌿 Sostenible</h3>
          <p>Materiales certificados FSC® y acabados ecológicos</p>
        </div>
        <div className="feature">
          <h3>✨ Diseño Atemporal</h3>
          <p>Piezas que combinan funcionalidad y elegancia</p>
        </div>
        <div className="feature">
          <h3>🛠️ Artesanal</h3>
          <p>Elaborado con técnicas tradicionales y modernas</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
