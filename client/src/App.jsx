import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Importar contexto
import { AuthProvider } from './context/AuthContext';
import { ToastProvider, useToast } from './context/ToastContext';

// Importar componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/Toast';

// Importar páginas
import Home from './pages/Home';
import ProductosPage from './pages/ProductosPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactoPage from './pages/ContactoPage';
import CrearProductoPage from './pages/CrearProductoPage';
import RegistroPage from './pages/RegistroPage';
import LoginPage from './pages/LoginPage';
import PerfilPage from './pages/PerfilPage';
import MisPedidosPage from './pages/MisPedidosPage';
function AppContent() {
  const { showToast } = useToast();
  const [cart, setCart] = useState([]);

  const handleAddToCart = (producto) => {
    setCart((prevCart) => [...prevCart, producto]);
    showToast(`${producto.nombre} añadido al carrito`, 'success');
  };

  const handleRemoveFromCart = (productoId) => {
    setCart((prevCart) => prevCart.filter(p => p.id !== productoId));
    showToast('Producto eliminado del carrito', 'info');
  };

  return (
    <div className="App">
      <Toast />
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
            <Route 
              path="/admin/crear-producto" 
              element={
                <ProtectedRoute>
                  <CrearProductoPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/registro" element={<RegistroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/perfil"  element={ <ProtectedRoute> <PerfilPage /></ProtectedRoute>} />
            <Route path="/mis-pedidos" element={ <ProtectedRoute> <MisPedidosPage /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;