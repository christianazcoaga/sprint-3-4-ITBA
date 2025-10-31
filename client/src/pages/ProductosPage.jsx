import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar productos desde la API
  const fetchProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3000/api/productos');
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setProductos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="productos-page">
      <ProductList
        productos={productos}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default ProductosPage;
