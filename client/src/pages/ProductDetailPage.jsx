import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import ProductDetail from '../components/ProductDetail';
import API_URL from '../config/api';

const ProductDetailPage = ({ cart, onAddToCart, onRemoveFromCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const topRef = useRef(null);

  useEffect(() => {
    // Scroll al inicio de la página cuando se carga el detalle
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    
    // También intentar con el elemento ref
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
    
    const fetchProducto = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/productos/${id}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setProducto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  const handleBackToCatalog = () => {
    navigate('/productos');
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/productos/${productId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar el producto');
      }

      // Producto eliminado exitosamente
      showToast('Producto eliminado exitosamente', 'success');
      navigate('/productos');
    } catch (err) {
      showToast(`Error al eliminar el producto: ${err.message}`, 'error');
    }
  };

  if (loading) {
    return (
      <div ref={topRef} className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div ref={topRef} className="error-container">
        <h3>Error al cargar el producto</h3>
        <p>{error}</p>
        <button onClick={handleBackToCatalog}>Volver al catálogo</button>
      </div>
    );
  }

  return (
    <div ref={topRef}>
      <ProductDetail
        producto={producto}
        onBackToCatalog={handleBackToCatalog}
        cart={cart}
        onAddToCart={onAddToCart}
        onRemoveFromCart={onRemoveFromCart}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

export default ProductDetailPage;
