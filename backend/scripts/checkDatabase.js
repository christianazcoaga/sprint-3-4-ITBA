const mongoose = require('mongoose');
require('dotenv').config();

// Conectar a la base de datos
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME || 'hermanos_jota_db'
    });
    console.log(`MongoDB conectado: ${conn.connection.host}`);
    console.log(`Base de datos: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Función para revisar la base de datos
const checkDatabase = async () => {
  try {
    const conn = await connectDB();
    
    // Listar todas las colecciones
    console.log('\n=== COLECCIONES EN LA BASE DE DATOS ===');
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('Colecciones encontradas:', collections.map(c => c.name));
    
    // Verificar cada colección
    for (const collection of collections) {
      const count = await conn.connection.db.collection(collection.name).countDocuments();
  console.log(`\nColección: ${collection.name}`);
      console.log(`   Documentos: ${count}`);
      
      if (count > 0) {
        // Mostrar algunos documentos de ejemplo
        const docs = await conn.connection.db.collection(collection.name).find({}).limit(3).toArray();
        console.log(`   Ejemplos:`);
        docs.forEach((doc, index) => {
          console.log(`\n   Documento ${index + 1}:`);
          console.log(`   ID: ${doc._id}`);
          console.log(`   Campos:`, Object.keys(doc).join(', '));
          console.log(`   Datos:`, JSON.stringify(doc, null, 2));
        });
      }
    }
    
    // Intentar acceder directamente a la colección de productos
    console.log('\n=== BÚSQUEDA DIRECTA EN COLECCIÓN PRODUCTS ===');
    const productsCount = await conn.connection.db.collection('products').countDocuments();
    console.log(`Total productos en 'products': ${productsCount}`);
    
    if (productsCount > 0) {
      const products = await conn.connection.db.collection('products').find({}).toArray();
      console.log('\nTodos los productos:');
      products.forEach(p => {
        console.log(`\n- ${p.nombre || p.name || 'Sin nombre'}`);
        console.log(`  Campos:`, Object.keys(p).join(', '));
      });
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nConexión cerrada');
    process.exit(0);
  }
};

checkDatabase();
