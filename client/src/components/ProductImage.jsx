import React from 'react';

const ProductImage = ({ 
  src, 
  alt, 
  className = '', 
  fallbackText = 'Imagen no disponible',
  priority = false 
}) => {
  const handleError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  return (
    <div className={`product-image-container ${className}`}>
      <img 
        src={src} 
        alt={alt}
        onError={handleError}
        className="product-image"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
      <div className="product-image-fallback" style={{ display: 'none' }}>
        <div className="fallback-content">
          <div className="fallback-icon" aria-hidden="true"></div>
          <div className="fallback-text">{fallbackText}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
