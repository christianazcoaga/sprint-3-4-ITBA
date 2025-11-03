import React from 'react';
import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';

const ProductCard = ({ producto, priority = false }) => {
  return (
    <Link to={`/productos/${producto.id}`} className="product-card-link">
      <div className="product-card">
        <ProductImage 
          src={producto.imagenUrl} 
          alt={producto.nombre}
          fallbackText={producto.nombre}
          priority={priority}
        />
        <div className="product-info">
          <h3 className="product-name">{producto.nombre}</h3>
          <p className="product-description">{producto.descripcion}</p>
          <div className="product-price">${producto.precio}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
