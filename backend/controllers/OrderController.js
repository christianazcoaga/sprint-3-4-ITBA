const Order = require('../models/Order');
const Product = require('../models/Product');

// Crear un nuevo pedido
const crearPedido = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.userId; // Obtenido del middleware de autenticación

    console.log('Usuario autenticado:', req.user);
    console.log('userId extraído:', userId);

    // Validar que haya items
    if (!items || items.length === 0) {
      return res.status(400).json({
        error: 'El carrito está vacío',
        message: 'Debe agregar al menos un producto al carrito'
      });
    }

    // Validar y calcular el total
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      // Verificar que el producto existe
      const producto = await Product.findById(item.productoId);
      if (!producto) {
        return res.status(404).json({
          error: 'Producto no encontrado',
          message: `El producto con ID ${item.productoId} no existe`
        });
      }

      // Verificar stock disponible
      if (producto.stock < item.cantidad) {
        return res.status(400).json({
          error: 'Stock insuficiente',
          message: `No hay suficiente stock de ${producto.nombre}. Disponible: ${producto.stock}`
        });
      }

      // Agregar item al pedido
      orderItems.push({
        productoId: producto._id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: item.cantidad,
        imagenUrl: producto.imagenUrl
      });

      total += producto.precio * item.cantidad;

      // Actualizar stock del producto
      producto.stock -= item.cantidad;
      await producto.save();
    }

    // Crear el pedido
    const nuevoPedido = new Order({
      userId,
      items: orderItems,
      total,
      estado: 'Pendiente'
    });

    await nuevoPedido.save();

    // Poblar información del usuario
    await nuevoPedido.populate('userId', 'username email');

    res.status(201).json({
      message: 'Pedido creado exitosamente',
      pedido: nuevoPedido
    });

  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({
      error: 'Error al crear el pedido',
      message: error.message
    });
  }
};

// Obtener todos los pedidos del usuario autenticado
const obtenerMisPedidos = async (req, res) => {
  try {
    const userId = req.user.userId;

    const pedidos = await Order.find({ userId })
      .sort({ createdAt: -1 }) // Más recientes primero
      .populate('userId', 'username email');

    res.status(200).json(pedidos);

  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({
      error: 'Error al obtener los pedidos',
      message: error.message
    });
  }
};

// Obtener un pedido específico por ID
const obtenerPedidoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const pedido = await Order.findOne({ _id: id, userId })
      .populate('userId', 'username email');

    if (!pedido) {
      return res.status(404).json({
        error: 'Pedido no encontrado',
        message: 'No se encontró el pedido o no tienes permiso para verlo'
      });
    }

    res.status(200).json(pedido);

  } catch (error) {
    console.error('Error al obtener pedido:', error);
    res.status(500).json({
      error: 'Error al obtener el pedido',
      message: error.message
    });
  }
};

// Obtener todos los pedidos (solo admin)
const obtenerTodosPedidos = async (req, res) => {
  try {
    const pedidos = await Order.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'username email');

    res.status(200).json(pedidos);

  } catch (error) {
    console.error('Error al obtener todos los pedidos:', error);
    res.status(500).json({
      error: 'Error al obtener los pedidos',
      message: error.message
    });
  }
};

// Actualizar estado de un pedido (solo admin)
const actualizarEstadoPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const estadosValidos = ['Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'];
    
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({
        error: 'Estado inválido',
        message: `El estado debe ser uno de: ${estadosValidos.join(', ')}`
      });
    }

    const pedido = await Order.findByIdAndUpdate(
      id,
      { estado },
      { new: true, runValidators: true }
    ).populate('userId', 'username email');

    if (!pedido) {
      return res.status(404).json({
        error: 'Pedido no encontrado',
        message: 'No se encontró el pedido especificado'
      });
    }

    res.status(200).json({
      message: 'Estado del pedido actualizado exitosamente',
      pedido
    });

  } catch (error) {
    console.error('Error al actualizar estado del pedido:', error);
    res.status(500).json({
      error: 'Error al actualizar el estado del pedido',
      message: error.message
    });
  }
};

module.exports = {
  crearPedido,
  obtenerMisPedidos,
  obtenerPedidoPorId,
  obtenerTodosPedidos,
  actualizarEstadoPedido
};
