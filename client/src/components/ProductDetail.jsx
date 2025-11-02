import React, { useState } from 'react';
import ProductImage from './ProductImage';

const ProductDetail = ({ producto, onAddToCart, onBackToCatalog, cart, onRemoveFromCart, onDeleteProduct }) => {
  const [deleting, setDeleting] = useState(false);

  if (!producto) {
    return (
      <div className="product-detail-error">
        <h3>Producto no encontrado</h3>
        <button onClick={onBackToCatalog}>Volver al catálogo</button>
      </div>
    );
  }

  const isInCart = cart.some(p => p.id === producto.id);

  const handleAddToCart = () => {
    onAddToCart(producto);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar "${producto.nombre}"?\n\nEsta acción no se puede deshacer.`
    );
    
    if (confirmed) {
      setDeleting(true);
      onDeleteProduct(producto.id);
    }
  };

  return (
    <div className="product-detail">
      <button className="back-button" onClick={onBackToCatalog}>
        ← Volver al catálogo
      </button>
      
      <div className="product-detail-content">
        <div className="product-detail-image">
          <ProductImage 
            src={producto.imagenUrl || producto.imagen} 
            alt={producto.nombre}
            fallbackText={producto.nombre}
            className="detail-image"
          />
        </div>
        
        <div className="product-detail-info">
          <h1 className="product-detail-name">{producto.nombre}</h1>
          <div className="product-detail-price">${producto.precio}</div>
          
          <div className="product-detail-description">
            <h3>Descripción</h3>
            <p>{producto.descripcion || 'Sin descripción disponible'}</p>
          </div>
          
          {producto.stock !== undefined && (
            <div className="product-detail-stock">
              <strong>Stock disponible:</strong> {producto.stock} unidades
            </div>
          )}
          
          {isInCart ? ( 
            <button className='remove-from-cart-button' onClick={() => onRemoveFromCart(producto.id)}>
              Eliminar del carrito
            </button>
           ) : ( 
            <button className='add-to-cart-button' onClick={handleAddToCart}>
              Añadir al carrito
            </button>
           )}
          
          <button 
            className='delete-product-button' 
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Eliminando...' : '🗑️ Eliminar Producto'}
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
