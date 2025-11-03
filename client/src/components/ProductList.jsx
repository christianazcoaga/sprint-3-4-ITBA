import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ productos, loading, error }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error al cargar los productos</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Intentar de nuevo
        </button>
      </div>
    );
  }

  if (!productos || productos.length === 0) {
    return (
      <div className="no-products">
        <h3>No hay productos disponibles</h3>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h2>Nuestros Productos</h2>
      <div className="product-grid">
        {productos.map((producto, index) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            priority={index < 3}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
