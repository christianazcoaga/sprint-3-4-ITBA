const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'El stock no puede ser negativo']
  },
  imagenUrl: {
    type: String,
    trim: true
  },
  categoria: {
    type: String,
    trim: true
  },
  especificaciones: {
    type: Map,
    of: String
  }
}, {
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
  versionKey: false // Elimina el campo __v
});

// Método para formatear el precio
productSchema.virtual('precioFormateado').get(function() {
  return `$${this.precio.toFixed(2)}`;
});

// Configurar toJSON para incluir virtuals
productSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
