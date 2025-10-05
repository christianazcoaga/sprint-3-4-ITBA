import React from 'react';
import ProductImage from './ProductImage';

const ProductDetail = ({ producto, onAddToCart, onBackToCatalog }) => {
  if (!producto) {
    return (
      <div className="product-detail-error">
        <h3>Producto no encontrado</h3>
        <button onClick={onBackToCatalog}>Volver al catálogo</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    onAddToCart(producto);
  };

  return (
    <div className="product-detail">
      <button className="back-button" onClick={onBackToCatalog}>
        ← Volver al catálogo
      </button>
      
      <div className="product-detail-content">
        <div className="product-detail-image">
          <ProductImage 
            src={producto.imagen} 
            alt={producto.nombre}
            fallbackText={producto.nombre}
            className="detail-image"
          />
        </div>
        
        <div className="product-detail-info">
          <h1 className="product-detail-name">{producto.nombre}</h1>
          <p className="product-detail-category">{producto.categoria}</p>
          <div className="product-detail-price">{producto.precio}</div>
          
          <div className="product-detail-description">
            <h3>Descripción</h3>
            <p>{producto.descripcion}</p>
          </div>
          
          <div className="product-detail-specs">
            <h3>Especificaciones</h3>
            <ul>
              {Object.entries(producto.especificaciones).map(([key, value]) => (
                <li key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
          
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
