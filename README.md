# Hermanos Jota - E-commerce de Muebles

Tienda online de muebles de diseño con gestión completa de productos, carrito de compras y sistema de administración.

---

## 🌐 Sitios Desplegados

- **Frontend (Vercel):** https://jota-hermanos.vercel.app
- **Backend API (Render):** https://sprint-3-4-itba.onrender.com
- **Base de Datos:** MongoDB Atlas

---

## 👥 Información del Proyecto

**Proyecto:** Sprint 3, 4, 5 y 6 - ITBA  
**Integrantes:**
- Azcoaga, Christian
- Bibilaqua, Matias
- Bellomo, Lucca Daniel
- Carrillo, Gonzalo Alejo
- Simone, Santiago

---

## 🚀 Tecnologías Utilizadas

### Backend
- **Node.js** con **Express.js**
- **MongoDB** con **Mongoose**
- **CORS** para peticiones cross-origin
- **dotenv** para variables de entorno
- **Jest** para pruebas unitarias

### Frontend
- **React 18**
- **Vite** como bundler
- **React Router** para navegación
- **CSS moderno** con diseño responsivo
- **Vitest** y **React Testing Library** para pruebas

---

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn
- Cuenta en MongoDB Atlas (para base de datos)
- Git

---

## ⚙️ Configuración Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/christianazcoaga/sprint-3-4-ITBA.git
cd sprint-3-4-ITBA
```

### 2. Configurar Backend

#### Instalar dependencias

```bash
cd backend
npm install
```

#### Configurar variables de entorno

Crea un archivo `.env` en la carpeta `backend/` con las siguientes variables:

```env
# Puerto del servidor
PORT=3000

# MongoDB Atlas Connection String
MONGODB_URI

#### Obtener MongoDB URI:
1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. En "Database" → "Connect" → "Connect your application"
4. Copia la connection string y reemplaza `<password>` con tu contraseña

### 3. Configurar Frontend

#### Instalar dependencias

```bash
cd client
npm install
```

#### Configurar variables de entorno (Opcional)

Crea un archivo `.env` en la carpeta `client/` si quieres personalizar la URL de la API:

```env
# URL de la API (opcional, tiene fallback automático)
VITE_API_URL=http://localhost:3000/api
```

**Nota:** Si no creas este archivo, la aplicación usará automáticamente `http://localhost:3000/api` en desarrollo.

---

## 🏃 Ejecutar el Proyecto Localmente

### Opción 1: Ejecutar Backend y Frontend por separado

#### Iniciar el Backend

```bash
cd backend
npm start
```

El servidor estará disponible en: **http://localhost:3000**

#### Iniciar el Frontend (en otra terminal)

```bash
cd client
npm run dev
```


La aplicación estará disponible en: **http://localhost:5173**

---

## 📡 API Endpoints

### Productos

- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/:id` - Obtener un producto por ID
- `POST /api/productos` - Crear un nuevo producto
- `PUT /api/productos/:id` - Actualizar un producto
- `DELETE /api/productos/:id` - Eliminar un producto

---

## 🧪 Pruebas (Testing)

El proyecto incluye pruebas automatizadas tanto para el frontend como para el backend.

### Ejecutar Pruebas del Backend

```bash
cd backend
npm test
```

Las pruebas del backend incluyen:
- ✅ Validadores de productos y usuarios
- ✅ Funciones de cálculo de pedidos
- ✅ Validación de stock y datos
- ✅ Cálculo de totales y descuentos

### Ejecutar Pruebas del Frontend

```bash
cd client
npm test
```

Las pruebas del frontend incluyen:
- ✅ Componentes React
- ✅ Contextos (Auth, Cart, Toast)
- ✅ Páginas principales
- ✅ Rutas protegidas

---

## 🔧 Scripts Disponibles

### Backend

```bash
npm start          # Inicia el servidor en modo producción
npm run dev        # Inicia el servidor con nodemon (desarrollo)
npm test           # Ejecuta las pruebas unitarias con Jest
```

### Frontend

```bash
npm run dev        # Inicia el servidor de desarrollo con Vite
npm run build      # Construye la aplicación para producción
npm run preview    # Previsualiza la build de producción
npm test           # Ejecuta las pruebas con Vitest
```

---

## 🌍 Deployment

### Backend (Render)

1. Conecta tu repositorio de GitHub a Render
2. Configura las variables de entorno en Render:
   - `MONGODB_URI`
   - `NODE_ENV=production`
   - `PORT` (Render lo asigna automáticamente)
3. Root Directory: `backend`
4. Build Command: `npm install`
5. Start Command: `npm start`

### Frontend (Vercel)

1. Importa el proyecto desde GitHub
2. Framework Preset: **Vite**
3. Root Directory: `client`
4. Build Command: `npm run build` o `vite build`
5. Output Directory: `dist`
6. Variables de entorno (opcional):
   - `VITE_API_URL=https://sprint-3-4-itba.onrender.com/api`


---

## 📝 Variables de Entorno Necesarias

### Backend (.env)

```env
PORT=3000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/database
NODE_ENV=development
```

### Frontend (.env) - Opcional

```env
VITE_API_URL=http://localhost:3000/api
```

---
