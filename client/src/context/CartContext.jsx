import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Agregar producto al carrito
  const addToCart = (producto, cantidad = 1) => {
    setCart((prevCart) => {
      // Verificar si el producto ya está en el carrito
      const existingItemIndex = prevCart.findIndex(
        item => item.id === producto.id
      );

      if (existingItemIndex !== -1) {
        // Si existe, verificar que no supere el stock
        const newCart = [...prevCart];
        const currentQuantity = newCart[existingItemIndex].cantidad;
        const maxStock = producto.stock || 999;
        const newQuantity = Math.min(currentQuantity + cantidad, maxStock);
        newCart[existingItemIndex].cantidad = newQuantity;
        return newCart;
      } else {
        // Si no existe, agregar nuevo item con cantidad limitada por stock
        const maxStock = producto.stock || 999;
        const validCantidad = Math.min(cantidad, maxStock);
        return [...prevCart, { ...producto, cantidad: validCantidad }];
      }
    });
  };

  // Eliminar producto del carrito
  const removeFromCart = (productoId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productoId));
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (productoId, cantidad) => {
    if (cantidad <= 0) {
      removeFromCart(productoId);
      return;
    }

    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex(item => item.id === productoId);
      if (itemIndex === -1) return prevCart;

      const newCart = [...prevCart];
      const maxStock = newCart[itemIndex].stock || 999;
      // Limitar la cantidad al stock disponible
      newCart[itemIndex].cantidad = Math.min(cantidad, maxStock);
      return newCart;
    });
  };

  // Limpiar todo el carrito
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Calcular total del carrito
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.precio * item.cantidad);
    }, 0);
  };

  // Obtener cantidad total de items
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.cantidad, 0);
  };

  // Verificar si un producto está en el carrito
  const isInCart = (productoId) => {
    return cart.some(item => item.id === productoId);
  };

  // Obtener cantidad de un producto específico
  const getProductQuantity = (productoId) => {
    const item = cart.find(item => item.id === productoId);
    return item ? item.cantidad : 0;
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isInCart,
    getProductQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
