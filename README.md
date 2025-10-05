# 🏠 Hermanos Jota - E-commerce de Muebles

## 📋 Información del Proyecto

**Proyecto:** Sprint 3 y 4 - ITBA  
**Integrantes:** [Tu nombre aquí]  
**Tecnologías:** Node.js, Express.js, React, Vite  
**Arquitectura:** Monorepo con Backend API REST y Frontend SPA

## 🎯 Objetivos de Aprendizaje Completados

- ✅ Construcción de servidor web y API REST con Node.js y Express
- ✅ Definición y organización de rutas de API modulares con express.Router
- ✅ Implementación de middlewares personalizados (logging)
- ✅ Reconstrucción de interfaz de usuario con arquitectura de componentes React
- ✅ Manejo de estado con useState
- ✅ Comunicación entre componentes con props
- ✅ Manejo de eventos de usuario
- ✅ Renderizado dinámico con .map() y keys
- ✅ Renderizado condicional para diferentes vistas
- ✅ Conexión de React a API backend con fetch
- ✅ Manejo del ciclo de vida de peticiones (carga, éxito, error)

## 🏗️ Arquitectura del Proyecto

```
sprint-3-4-ITBA/
├── backend/                 # API REST con Express.js
│   ├── routes/
│   │   └── productos.js     # Rutas de productos
│   ├── productos.js         # Base de datos local (array)
│   ├── server.js           # Servidor principal
│   └── package.json
├── client/                 # Aplicación React SPA
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   └── ContactForm.jsx
│   │   ├── App.jsx         # Componente principal
│   │   ├── App.css         # Estilos globales
│   │   └── main.jsx        # Punto de entrada
│   └── package.json
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm (incluido con Node.js)

### 1. Clonar el repositorio
```bash
git clone [URL_DEL_REPOSITORIO]
cd sprint-3-4-ITBA
```

### 2. Configurar imágenes
Coloca las imágenes en la carpeta `client/public/images/`:
- `logo-hermanos-jota.svg` - Logo principal
- Imágenes de productos (ver `client/public/images/README.md`)

### 3. Instalar dependencias del Backend
```bash
cd backend
npm install
```

### 4. Instalar dependencias del Frontend
```bash
cd ../client
npm install
```

## 🏃‍♂️ Ejecutar la Aplicación

### Opción 1: Ejecutar en terminales separadas

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
El servidor estará disponible en: `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
La aplicación estará disponible en: `http://localhost:5173`

### Opción 2: Ejecutar con scripts npm
```bash
# En la raíz del proyecto
npm run start:backend    # Inicia el backend
npm run start:frontend   # Inicia el frontend
```

## 📡 API Endpoints

### Backend (Express.js)
- **GET** `/api/productos` - Obtiene todos los productos
- **GET** `/api/productos/:id` - Obtiene un producto por ID
- **404** - Manejador para rutas no encontradas
- **500** - Manejador de errores centralizado

### Características del Backend
- ✅ Middleware de logging global
- ✅ Middleware express.json() para procesar JSON
- ✅ Rutas organizadas con express.Router
- ✅ Base de datos local (array de productos)
- ✅ Manejo de errores 404 y 500

## 🎨 Frontend (React SPA)

### Componentes Implementados

#### 1. **Navbar**
- Logo clickeable para volver al catálogo
- Navegación entre vistas (Catálogo, Contacto)
- Contador de productos en el carrito

#### 2. **ProductList**
- Carga productos desde la API
- Estados de carga, error y éxito
- Renderizado dinámico con .map()
- Manejo de clics en productos

#### 3. **ProductCard**
- Tarjeta individual de producto
- Imagen, nombre, categoría, descripción, precio
- Click handler para navegar al detalle

#### 4. **ProductDetail**
- Vista detallada del producto
- Especificaciones técnicas
- Botón "Añadir al Carrito"
- Navegación de vuelta al catálogo

#### 5. **ContactForm**
- Formulario controlado con useState
- Validación de campos requeridos
- Console.log de datos al enviar
- Mensaje de éxito en UI

#### 6. **Footer**
- Información de contacto
- Datos de la empresa

### Características del Frontend
- ✅ Arquitectura de componentes reutilizables
- ✅ Manejo de estado con useState
- ✅ Comunicación entre componentes con props
- ✅ Fetch API para conectar con backend
- ✅ Renderizado condicional para diferentes vistas
- ✅ Manejo de estados de carga y error
- ✅ Carrito de compras funcional
- ✅ Formulario de contacto controlado
- ✅ Diseño responsivo

## 🛒 Funcionalidades Implementadas

### 1. **Catálogo de Productos**
- Lista todos los productos desde la API
- Estados de "Cargando..." y "Error al cargar"
- Renderizado con .map() y keys únicas
- Navegación a vista de detalle

### 2. **Vista de Detalle**
- Renderizado condicional (sin React Router)
- Información completa del producto
- Especificaciones técnicas
- Botón para añadir al carrito

### 3. **Carrito de Compras**
- Estado compartido en App.js
- Añadir productos al carrito
- Contador en tiempo real en Navbar
- Persistencia durante la sesión

### 4. **Formulario de Contacto**
- Componente controlado con useState
- Validación de campos
- Console.log de datos al enviar
- Mensaje de éxito en la UI

## 🎨 Diseño y UX

- **Diseño Responsivo**: Se adapta a diferentes tamaños de pantalla
- **Estados Visuales**: Loading, error, éxito claramente diferenciados
- **Navegación Intuitiva**: Fácil navegación entre vistas
- **Feedback Visual**: Contador de carrito, mensajes de éxito
- **Imágenes de Fallback**: Placeholder para imágenes no disponibles

## 🔧 Tecnologías Utilizadas

### Backend
- **Node.js**: Runtime de JavaScript
- **Express.js**: Framework web
- **express.Router**: Organización modular de rutas
- **Middleware personalizado**: Logging de peticiones

### Frontend
- **React 19**: Biblioteca de UI
- **Vite**: Herramienta de build y desarrollo
- **useState**: Hook para manejo de estado
- **useEffect**: Hook para efectos secundarios
- **Fetch API**: Peticiones HTTP asíncronas

## 📝 Decisiones de Arquitectura

### 1. **Monorepo**
- Un solo repositorio para backend y frontend
- Facilita el desarrollo y deployment
- Compartir configuración común

### 2. **API REST**
- Separación clara entre frontend y backend
- Escalabilidad futura
- Reutilización de la API

### 3. **Componentes React**
- Arquitectura modular y reutilizable
- Separación de responsabilidades
- Fácil mantenimiento y testing

### 4. **Estado Centralizado**
- Estado del carrito en App.js
- Comunicación clara entre componentes
- Flujo de datos predecible

## 🚀 Próximas Mejoras

- [ ] React Router para navegación más avanzada
- [ ] LocalStorage para persistir el carrito
- [ ] Filtros y búsqueda de productos
- [ ] Animaciones y transiciones
- [ ] Tests unitarios
- [ ] Conexión a base de datos real
- [ ] Autenticación de usuarios
- [ ] Panel de administración

## 📞 Contacto

**Desarrollado por:** [Tu nombre]  
**Email:** [tu-email@ejemplo.com]  
**GitHub:** [tu-usuario-github]

---

*Proyecto desarrollado como parte del Sprint 3 y 4 del curso de ITBA*