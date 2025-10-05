import { useState, useEffect } from 'react';
import './App.css';

// Importar componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ContactForm from './components/ContactForm';

function App() {
  // Estados principales
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState('catalogo'); // 'catalogo', 'detalle', 'contacto'

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

  // Función para manejar clic en producto
  const handleProductClick = (producto) => {
    setSelectedProduct(producto);
    setCurrentView('detalle');
  };

  // Función para volver al catálogo
  const handleBackToCatalog = () => {
    setSelectedProduct(null);
    setCurrentView('catalogo');
  };

  // Función para añadir producto al carrito
  const handleAddToCart = (producto) => {
    setCart((prevCart) => [...prevCart, producto]);
    alert(`¡${producto.nombre} añadido al carrito!`);
  };

  const handleRemoveFromCart = (productoId) => {
    setCart((prevCart) => prevCart.filter(p => p.id !== productoId));
    alert(`¡Producto eliminado del carrito!`);
  }

  return (
    <div className="App">
      <Navbar 
        cartCount={cart.length}
        onNavigate={setCurrentView} // Pasar la función para manejar la navegación
      />
      
      <div className="app-container">
        <div className="content-wrapper">
          {currentView === 'catalogo' && (
            <ProductList
              productos={productos}
              loading={loading}
              error={error}
              onProductClick={handleProductClick}
            />
          )}
          
          {currentView === 'detalle' && selectedProduct && (
            <ProductDetail
              producto={selectedProduct}
              onBackToCatalog={handleBackToCatalog}
              cart={cart}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}

            />
          )}
          
          {currentView === 'contacto' && (
            <ContactForm />
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;