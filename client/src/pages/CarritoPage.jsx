import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import API_URL from '../config/api';
import '../styles.css';

const CarritoPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart();
  const { isAuthenticated, token } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity < 1) return;
    const maxStock = item.stock || 999;
    if (newQuantity > maxStock) {
      showToast(`Solo hay ${maxStock} unidades disponibles de ${item.nombre}`, 'error');
      return;
    }
    updateQuantity(item.id, newQuantity);
  };

  const handleRemoveItem = (producto) => {
    removeFromCart(producto.id);
    showToast(`${producto.nombre} eliminado del carrito`, 'info');
  };

  const handleFinalizarCompra = async () => {
    if (!isAuthenticated) {
      showToast('Debes iniciar sesión para realizar un pedido', 'error');
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      showToast('El carrito está vacío', 'error');
      return;
    }

    setLoading(true);

    try {
      // Preparar items para el pedido
      const items = cart.map(item => ({
        productoId: item.id,
        cantidad: item.cantidad
      }));

      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Error al crear el pedido');
      }

      // Limpiar el carrito después de un pedido exitoso
      clearCart();
      showToast('¡Pedido creado exitosamente!', 'success');
      
      // Redirigir a mis pedidos
      setTimeout(() => {
        navigate('/mis-pedidos');
      }, 1500);

    } catch (error) {
      console.error('Error al finalizar compra:', error);
      showToast(error.message || 'Error al procesar el pedido', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '1rem', color: '#3e2723' }}>Tu Carrito está Vacío</h1>
        <p style={{ marginBottom: '2rem', color: '#666' }}>
          No tienes productos en tu carrito. ¡Explora nuestra tienda!
        </p>
        <Link 
          to="/productos" 
          className="btn-primary"
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            backgroundColor: '#a0522d',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: '500'
          }}
        >
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', color: '#3e2723' }}>
        Carrito de Compras ({getCartCount()} {getCartCount() === 1 ? 'producto' : 'productos'})
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {/* Lista de productos */}
        <div className="carrito-items">
          {cart.map((item) => (
            <div 
              key={item.id} 
              className="carrito-item"
              style={{
                display: 'flex',
                gap: '1rem',
                padding: '1rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                marginBottom: '1rem',
                backgroundColor: 'white'
              }}
            >
              {/* Imagen del producto */}
              {item.imagenUrl && (
                <img 
                  src={item.imagenUrl} 
                  alt={item.nombre}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
              )}

              {/* Información del producto */}
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#3e2723' }}>
                  <Link to={`/productos/${item.id}`} style={{ color: '#3e2723', textDecoration: 'none' }}>
                    {item.nombre}
                  </Link>
                </h3>
                <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>
                  Precio: ${item.precio.toLocaleString()}
                </p>
                {item.stock !== undefined && (
                  <p style={{ margin: '0 0 0.5rem 0', color: item.cantidad >= item.stock ? '#d32f2f' : '#666', fontSize: '0.9rem' }}>
                    Stock disponible: {item.stock} unidades
                  </p>
                )}

                {/* Control de cantidad */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button
                    onClick={() => handleUpdateQuantity(item, item.cantidad - 1)}
                    disabled={item.cantidad <= 1}
                    style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: item.cantidad <= 1 ? '#ccc' : '#a0522d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: item.cantidad <= 1 ? 'not-allowed' : 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    -
                  </button>
                  <span style={{ padding: '0.25rem 1rem', fontWeight: '500' }}>
                    {item.cantidad}
                  </span>
                  <button
                    onClick={() => handleUpdateQuantity(item, item.cantidad + 1)}
                    disabled={item.cantidad >= (item.stock || 999)}
                    style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: item.cantidad >= (item.stock || 999) ? '#ccc' : '#a0522d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: item.cantidad >= (item.stock || 999) ? 'not-allowed' : 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Subtotal y botón eliminar */}
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1rem', color: '#3e2723' }}>
                  ${(item.precio * item.cantidad).toLocaleString()}
                </p>
                <button
                  onClick={() => handleRemoveItem(item)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#d32f2f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen del pedido */}
        <div 
          className="carrito-resumen"
          style={{
            padding: '1.5rem',
            border: '2px solid #a0522d',
            borderRadius: '8px',
            backgroundColor: '#f5f5f5',
            position: 'sticky',
            top: '100px'
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: '1rem', color: '#3e2723' }}>Resumen del Pedido</h2>
          
          <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #ddd' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Subtotal:</span>
              <span>${getCartTotal().toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Envío:</span>
              <span>A calcular</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span style={{ color: '#a0522d' }}>${getCartTotal().toLocaleString()}</span>
          </div>

          {!isAuthenticated && (
            <p style={{ color: '#d32f2f', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'center' }}>
              Debes iniciar sesión para finalizar la compra
            </p>
          )}

          <button
            onClick={handleFinalizarCompra}
            disabled={loading || !isAuthenticated}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: !isAuthenticated ? '#ccc' : '#a0522d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: !isAuthenticated ? 'not-allowed' : 'pointer',
              marginBottom: '1rem'
            }}
          >
            {loading ? 'Procesando...' : 'Finalizar Compra'}
          </button>

          <Link 
            to="/productos"
            style={{
              display: 'block',
              textAlign: 'center',
              color: '#a0522d',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            ← Seguir Comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarritoPage;
