import React, { useState } from 'react';
import ProductImage from './ProductImage';
import { useAuth } from '../context/AuthContext';

const ProductDetail = ({ producto, onAddToCart, onBackToCatalog, onRemoveFromCart, onDeleteProduct, isInCart, getProductQuantity }) => {
  const [deleting, setDeleting] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  const { user } = useAuth();
  
  if (!producto) {
    return (
      <div className="product-detail-error">
        <h3>Producto no encontrado</h3>
        <button onClick={onBackToCatalog}>Volver al catálogo</button>
      </div>
    );
  }

  const productInCart = isInCart(producto.id);
  const currentQuantity = getProductQuantity(producto.id);
  const availableStock = (producto.stock || 0) - currentQuantity;

  const handleAddToCart = () => {
    if (currentQuantity + cantidad > producto.stock) {
      alert(`Solo hay ${producto.stock} unidades disponibles. Ya tienes ${currentQuantity} en el carrito.`);
      return;
    }
    onAddToCart(producto, cantidad);
    setCantidad(1);
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
          
          {productInCart && (
            <div style={{ marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>
              <span style={{ color: '#2e7d32', fontWeight: '500' }}>
                ✓ En el carrito ({currentQuantity} {currentQuantity === 1 ? 'unidad' : 'unidades'})
              </span>
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'stretch', 
              gap: '0', 
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <button
                onClick={() => {
                  if (cantidad > 1) setCantidad(cantidad - 1);
                }}
                disabled={cantidad <= 1 || availableStock <= 0}
                style={{
                  width: '45px',
                  height: '45px',
                  backgroundColor: (cantidad <= 1 || availableStock <= 0) ? '#e0e0e0' : '#f5f5f5',
                  border: 'none',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: (cantidad <= 1 || availableStock <= 0) ? '#999' : '#3e2723',
                  cursor: (cantidad <= 1 || availableStock <= 0) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  if (cantidad > 1 && availableStock > 0) {
                    e.target.style.backgroundColor = '#e8e8e8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (cantidad > 1 && availableStock > 0) {
                    e.target.style.backgroundColor = '#f5f5f5';
                  }
                }}
              >
                −
              </button>
              
              <div style={{
                width: '60px',
                height: '45px',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#3e2723',
                borderLeft: '1px solid #e0e0e0',
                borderRight: '1px solid #e0e0e0'
              }}>
                {cantidad}
              </div>
              
              <button
                onClick={() => {
                  if (cantidad < availableStock) setCantidad(cantidad + 1);
                }}
                disabled={cantidad >= availableStock || availableStock <= 0}
                style={{
                  width: '45px',
                  height: '45px',
                  backgroundColor: (cantidad >= availableStock || availableStock <= 0) ? '#e0e0e0' : '#a0522d',
                  border: 'none',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: (cantidad >= availableStock || availableStock <= 0) ? '#999' : 'white',
                  cursor: (cantidad >= availableStock || availableStock <= 0) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  if (cantidad < availableStock && availableStock > 0) {
                    e.target.style.backgroundColor = '#8b4513';
                  }
                }}
                onMouseLeave={(e) => {
                  if (cantidad < availableStock && availableStock > 0) {
                    e.target.style.backgroundColor = '#a0522d';
                  }
                }}
              >
                +
              </button>
            </div>
            <button 
              className='add-to-cart-button' 
              onClick={handleAddToCart}
              disabled={!producto.stock || producto.stock < 1 || availableStock <= 0}
              style={{
                opacity: (!producto.stock || producto.stock < 1 || availableStock <= 0) ? 0.5 : 1,
                cursor: (!producto.stock || producto.stock < 1 || availableStock <= 0) ? 'not-allowed' : 'pointer'
              }}
            >
              {availableStock <= 0 ? 'Stock completo en carrito' : (productInCart ? 'Añadir más' : 'Añadir al carrito')}
            </button>
          </div>
          
          {productInCart && (
            <button 
              className='remove-from-cart-button' 
              onClick={() => onRemoveFromCart(producto.id)}
              style={{ marginBottom: '1rem' }}
            >
              Eliminar del carrito
            </button>
          )}
          
          { user?.rol == 'Admin' && (
          <button 
            className='delete-product-button' 
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Eliminando...' : '🗑️ Eliminar Producto'}
          </button>
          )};

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
