import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';
import '../styles.css';

const MisPedidosPage = () => {
  const { token } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/orders`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('No se pudieron cargar los pedidos');
        }

        const data = await response.json();
        setPedidos(data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar pedidos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [token]);

  // Función auxiliar para formatear fecha
  const formatearFecha = (fechaString) => {
    return new Date(fechaString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Renderizado de carga
  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <div className="loading-spinner"></div>
        <p>Cargando tus pedidos...</p>
      </div>
    );
  }

  // Renderizado de error
  if (error) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <div style={{ color: '#d32f2f', marginBottom: '1rem' }}>
          <p>Error: {error}</p>
        </div>
        <Link to="/productos" className="cta-button">Volver a Productos</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/" style={{ color: '#a0522d', textDecoration: 'none', fontWeight: '500' }}>
          ← Volver al Inicio
        </Link>
      </div>

      <h1 style={{ marginBottom: '2rem', color: '#3e2723' }}>Mis Pedidos</h1>

      <div className="pedidos-list">
        {pedidos.length > 0 ? (
          pedidos.map(pedido => (
            <div key={pedido._id || pedido.id} className="pedido-card">
              <div className="pedido-header">
                <span className="pedido-id">
                  Pedido #{(pedido._id || pedido.id).slice(-6).toUpperCase()}
                </span>
                <span className={`pedido-estado estado-${(pedido.estado || 'Pendiente').toLowerCase().replace(' ', '-')}`}>
                  {pedido.estado || 'Pendiente'}
                </span>
              </div>
              <div className="pedido-body">
                <p><strong>Fecha:</strong> {formatearFecha(pedido.createdAt)}</p>
                <p><strong>Artículos:</strong> {pedido.items?.length || 0}</p>
                <div className="pedido-items-preview">
                  {pedido.items?.map((item, idx) => (
                    <small key={idx} style={{ display: 'block', color: '#666' }}>
                      • {item.nombre} (x{item.cantidad}) - ${item.precio.toLocaleString()}
                    </small>
                  ))}
                </div>
                <p className="pedido-total">Total: ${pedido.total?.toLocaleString()}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-products">
            <h3>No tienes pedidos recientes</h3>
            <p>¡Explora nuestro catálogo y realiza tu primera compra!</p>
            <Link to="/productos" className="cta-button" style={{ marginTop: '1rem', display: 'inline-block' }}>
              Ir al Catálogo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MisPedidosPage;