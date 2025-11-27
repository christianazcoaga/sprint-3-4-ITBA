import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import API_URL from '../config/api';
import '../styles.css';

const PerfilPage = () => {

  const { token } = useAuth();
  const [ profileData, setProfileData ] = useState(null);

  // Cargar datos frescos del perfil desde el backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {

        if (!token) {
          console.error("No se encontró token de autenticación.");
          return;
        }

        const response = await fetch (`${API_URL}/users/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("No se pudo acceder al perfil.");
        }


        const data = await response.json();
        setProfileData(data)

      } catch (error) {
        console.error('Error cargando perfil:', error);
      }
    };

    fetchProfile();
  }, [token]);

  return (
    <div className="perfil-page container" style={{ padding: '2rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#a0522d', 
        marginBottom: '2rem',
        fontSize: '2.5rem',
        fontFamily: '"Playfair Display", Georgia, serif',
        letterSpacing: '0.1em',
        textTransform: 'uppercase'
      }}>
        MI PERFIL
      </h1>

      {/* Contenido Principal */}
      <main style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 6px 24px rgba(62, 39, 35, 0.08)',
        padding: '2.5rem',
        border: '1px solid #e0e0e0'
      }}>
        <h2 style={{
          color: '#3e2723',
          fontSize: '1.5rem',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem',
          borderBottom: '2px solid #a0522d',
          fontFamily: '"Playfair Display", Georgia, serif'
        }}>
          PERFIL DE USUARIO
        </h2>

        {profileData ? (
          <div style={{
            display: 'grid',
            gap: '1.25rem'
          }}>
            <div style={{
              display: 'flex',
              padding: '1rem',
              backgroundColor: '#f5e6d3',
              borderRadius: '8px',
              borderLeft: '4px solid #a0522d'
            }}>
              <strong style={{ 
                minWidth: '100px', 
                color: '#3e2723',
                fontSize: '1rem'
              }}>
                Nombre:
              </strong>
              <span style={{ 
                color: '#3e2723',
                fontSize: '1rem',
                fontWeight: '500'
              }}>
                {profileData.user.username}
              </span>
            </div>

            <div style={{
              display: 'flex',
              padding: '1rem',
              backgroundColor: '#fbf7f2',
              borderRadius: '8px',
              borderLeft: '4px solid #87a96b'
            }}>
              <strong style={{ 
                minWidth: '100px', 
                color: '#3e2723',
                fontSize: '1rem'
              }}>
                Email:
              </strong>
              <span style={{ 
                color: '#3e2723',
                fontSize: '1rem',
                fontWeight: '500'
              }}>
                {profileData.user.email}
              </span>
            </div>

            <div style={{
              display: 'flex',
              padding: '1rem',
              backgroundColor: '#f5e6d3',
              borderRadius: '8px',
              borderLeft: '4px solid #d4a437'
            }}>
              <strong style={{ 
                minWidth: '100px', 
                color: '#3e2723',
                fontSize: '1rem'
              }}>
                Rol:
              </strong>
              <span style={{ 
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: '600',
                backgroundColor: profileData.user.rol === 'Admin' ? '#d4a437' : '#87a96b',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {profileData.user.rol}
              </span>
            </div>
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '3rem 0',
            color: '#666'
          }}>
            <div className="loading-spinner" style={{ margin: '0 auto 1rem' }}></div>
            <p>Cargando perfil...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PerfilPage;