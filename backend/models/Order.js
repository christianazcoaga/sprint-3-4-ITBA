const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es obligatorio']
  },
  items: [{
    productoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    nombre: {
      type: String,
      required: true
    },
    precio: {
      type: Number,
      required: true
    },
    cantidad: {
      type: Number,
      required: true,
      min: [1, 'La cantidad debe ser al menos 1']
    },
    imagenUrl: String
  }],
  total: {
    type: Number,
    required: [true, 'El total es obligatorio'],
    min: [0, 'El total no puede ser negativo']
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'],
    default: 'Pendiente'
  }
}, {
  timestamps: true,
  versionKey: false
});

// Método para calcular el total
orderSchema.methods.calcularTotal = function() {
  this.total = this.items.reduce((sum, item) => {
    return sum + (item.precio * item.cantidad);
  }, 0);
  return this.total;
};

// Configurar toJSON para incluir virtuals
orderSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
