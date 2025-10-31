import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Importar componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Importar páginas
import Home from './pages/Home';
import ProductosPage from './pages/ProductosPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactoPage from './pages/ContactoPage';
import CrearProductoPage from './pages/CrearProductoPage';

function App() {
  // Estado del carrito
  const [cart, setCart] = useState([]);

  // Función para añadir producto al carrito
  const handleAddToCart = (producto) => {
    setCart((prevCart) => [...prevCart, producto]);
    alert(`¡${producto.nombre} añadido al carrito!`);
  };

  const handleRemoveFromCart = (productoId) => {
    setCart((prevCart) => prevCart.filter(p => p.id !== productoId));
    alert(`¡Producto eliminado del carrito!`);
  };

  return (
    <Router>
      <div className="App">
        <Navbar cartCount={cart.length} />
        
        <div className="app-container">
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<ProductosPage />} />
              <Route 
                path="/productos/:id" 
                element={
                  <ProductDetailPage 
                    cart={cart}
                    onAddToCart={handleAddToCart}
                    onRemoveFromCart={handleRemoveFromCart}
                  />
                } 
              />
              <Route path="/contacto" element={<ContactoPage />} />
              <Route path="/admin/crear-producto" element={<CrearProductoPage />} />
            </Routes>
          </div>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;