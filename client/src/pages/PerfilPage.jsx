import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importar Link
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import API_URL from '../config/api';
import '../styles.css';

const PerfilPage = () => {
  const { token, user: authUser } = useAuth(); // Usamos authUser para datos iniciales
  const { showToast } = useToast();
  
  const [activeTab, setActiveTab] = useState('info');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    telefono: ''
  });

  // Cargar datos frescos del perfil desde el backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
          setFormData({ telefono: data.telefono || '' });
        }
      } catch (error) {
        console.error('Error cargando perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ telefono: formData.telefono })
      });

      if (!response.ok) throw new Error('Error al actualizar');

      showToast('Información actualizada correctamente', 'success');
    } catch (error) {
      showToast('No se pudo actualizar el perfil', 'error');
    }
  };

  if (loading) return <div className="loading-container"><div className="loading-spinner"></div></div>;
  if (!profileData) return <div className="container">Error al cargar perfil</div>;

  return (
    <div className="perfil-page container">
      <h1 className="perfil-titulo">Mi Perfil</h1>
      
      <div className="perfil-layout">
        {/* Sidebar */}
        <aside className="perfil-sidebar">
          <div className="perfil-user-card">
            <div className="perfil-avatar">
              {profileData.username.charAt(0).toUpperCase()}
            </div>
            <h3>{profileData.username}</h3>
            <p className="perfil-rol">{profileData.rol}</p>
          </div>
          
          <nav className="perfil-nav">
            <button 
              className={activeTab === 'info' ? 'active' : ''} 
              onClick={() => setActiveTab('info')}
            >
              👤 Información Personal
            </button>
            <button 
              className={activeTab === 'pagos' ? 'active' : ''} 
              onClick={() => setActiveTab('pagos')}
            >
              💳 Datos de Pago
            </button>
            
            {/* Link a la página separada de pedidos */}
            <Link to="/mis-pedidos" className="perfil-nav-link">
              📦 Mis Pedidos →
            </Link>
          </nav>
        </aside>

        {/* Contenido Principal */}
        <main className="perfil-content">
          
          {/* SECCIÓN 1: INFO */}
          {activeTab === 'info' && (
            <div className="perfil-section">
              <h2>Información Personal</h2>
              <form onSubmit={handleUpdateInfo} className="perfil-form">
                <div className="form-group">
                  <label>Nombre de Usuario</label>
                  <input type="text" value={profileData.username} disabled className="input-disabled" />
                  <small>El nombre de usuario no se puede cambiar.</small>
                </div>
                
                <div className="form-group">
                  <label>Correo Electrónico</label>
                  <input type="email" value={profileData.email} disabled className="input-disabled" />
                </div>

                <div className="form-group">
                  <label>Teléfono</label>
                  <input 
                    type="tel" 
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    placeholder="+54 11 ..." 
                  />
                </div>

                <button type="submit" className="submit-button">Guardar Cambios</button>
              </form>
            </div>
          )}

          {/* SECCIÓN 2: PAGOS (Ahora vacía de datos falsos) */}
          {activeTab === 'pagos' && (
            <div className="perfil-section">
              <h2>Métodos de Pago</h2>
              
              {profileData.metodosPago && profileData.metodosPago.length > 0 ? (
                profileData.metodosPago.map((metodo, index) => (
                  <div key={index} className="tarjeta-card">
                    <div className="tarjeta-icono">💳</div>
                    <div className="tarjeta-info">
                      <p><strong>{metodo.tipo}</strong> terminada en **** {metodo.terminacion}</p>
                      <p className="tarjeta-exp">Vence: {metodo.expiracion}</p>
                    </div>
                    <button className="btn-small danger">Eliminar</button>
                  </div>
                ))
              ) : (
                <div className="no-products" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                  <p>No tienes métodos de pago guardados.</p>
                </div>
              )}
              
              <button 
                className="add-card-btn" 
                onClick={() => showToast('Funcionalidad de agregar tarjeta próximamente', 'info')}
              >
                + Agregar nuevo método de pago
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PerfilPage;