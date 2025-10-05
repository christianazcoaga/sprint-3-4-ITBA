import React from 'react';
import ProductImage from './ProductImage';

const ProductCard = ({ producto, onProductClick }) => {
  const handleClick = () => {
    onProductClick(producto);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <ProductImage 
        src={producto.imagen} 
        alt={producto.nombre}
        fallbackText={producto.nombre}
      />
      <div className="product-info">
        <h3 className="product-name">{producto.nombre}</h3>
        <p className="product-category">{producto.categoria}</p>
        <p className="product-description">{producto.descripcion}</p>
        <div className="product-price">{producto.precio}</div>
      </div>
    </div>
  );
};

export default ProductCard;
