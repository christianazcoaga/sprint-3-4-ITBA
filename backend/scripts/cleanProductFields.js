const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

// Conectar a la base de datos
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME || 'hermanos_jota_db'
    });
    console.log(`MongoDB conectado: ${conn.connection.host}`);
    console.log(`Base de datos: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Función para limpiar los campos no deseados
const cleanProductFields = async () => {
  try {
    console.log('Iniciando limpieza de campos...');
    
    // Conectar primero
    await connectDB();
    
    // Usar la conexión directa de MongoDB en lugar del modelo
    const db = mongoose.connection.db;
    const result = await db.collection('products').updateMany(
      {}, // Sin filtro, aplica a todos los documentos
      { 
        $unset: { 
          categoria: "", 
          especificaciones: "" 
        } 
      }
    );
    
  console.log('Limpieza completada.');
    console.log(`Documentos modificados: ${result.modifiedCount}`);
    console.log(`Documentos encontrados: ${result.matchedCount}`);
    
    // Verificar el resultado usando la colección directa
    const productos = await db.collection('products').find({}).limit(3).toArray();
    console.log('\nEjemplo de productos actualizados:');
    productos.forEach(p => {
      console.log(`- ${p.nombre}: ${Object.keys(p).join(', ')}`);
    });
    
  } catch (error) {
    console.error('Error durante la limpieza:', error);
  } finally {
    // Cerrar la conexión
    await mongoose.connection.close();
    console.log('\nConexión a MongoDB cerrada');
    process.exit(0);
  }
};

// Ejecutar el script
const run = async () => {
  await cleanProductFields();
};

run();
