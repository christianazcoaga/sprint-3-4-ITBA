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
    <div className="perfil-page container">
      <h1 className="perfil-titulo">Mi Perfil</h1>

        {/* Contenido Principal */}
      <main className="perfil-content">
        <h2>Perfil de usuario</h2>

        {profileData ? (
          <>
          <div><strong>Nombre:</strong> {profileData.user.username}</div>
          <div><strong>Email:</strong> {profileData.user.email}</div>
          <div><strong>Rol:</strong> {profileData.user.rol}</div>
          </>
        ) : (
          <>
          <div>Cargando... </div>
          </>
        )}
      </main>
    </div>
  );
};

export default PerfilPage;