import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Importar contexto
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';

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
import CarritoPage from './pages/CarritoPage';

function AppContent() {
  return (
    <div className="App">
      <Toast />
      <Navbar />
      
      <div className="app-container">
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/productos/:id" element={<ProductDetailPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/carrito" element={<CarritoPage />} />
            <Route 
              path="/admin/crear-producto" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <CrearProductoPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/registro" element={<RegistroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile"  element={ <ProtectedRoute> <PerfilPage /></ProtectedRoute>} />
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
        <CartProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;