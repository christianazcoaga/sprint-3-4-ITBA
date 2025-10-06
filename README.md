# Hermanos Jota - E-commerce de Muebles

## Información del Proyecto

**Proyecto:** Sprint 3 y 4 - ITBA  
**Integrantes:**
- Azcoaga, Christian
- Bibilaqua, Matias
- Bellomo, Lucca Daniel
- Carrillo, Gonzalo Alejo
- Simone, Santiago

---

## Instrucciones de Instalación

### 1. Instalar dependencias del Backend

```bash
cd backend
npm install
```

### 2. Instalar dependencias del Frontend

```bash
cd client
npm install
```

---

## Instrucciones de Ejecución

### Iniciar el Backend (API)

```bash
cd backend
npm run dev
```

El servidor estará disponible en: **http://localhost:3000**

### Iniciar el Frontend (React)

```bash
cd client
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

> **Nota:** Es necesario ejecutar ambos servidores simultáneamente en terminales separadas.

---

## Arquitectura del Proyecto

### Backend (API REST con Express)

- **Servidor:** Express.js corriendo en el puerto 3000
- **Fuente de datos:** Array de productos en archivo local (`productos.js`)
- **Rutas modulares:** Organizadas con `express.Router` en carpeta `routes/`
- **Middlewares:**
  - Logging de peticiones (método y URL)
  - `express.json()` para parsear JSON
  - CORS habilitado para comunicación con frontend
  - Manejador de errores centralizado (404 y 500)

**Endpoints disponibles:**
- `GET /api/productos` - Obtiene todos los productos
- `GET /api/productos/:id` - Obtiene un producto específico por ID

### Frontend (Single Page Application con React)

- **Framework:** React con Vite como build tool
- **Arquitectura de componentes:** Componentes reutilizables (`Navbar`, `Footer`, `ProductList`, `ProductCard`, `ProductDetail`, `ContactForm`)
- **Manejo de estado:** Hooks de React (`useState`, `useEffect`)
- **Comunicación con API:** Fetch API para consumir endpoints del backend
- **Renderizado:** Condicional basado en estados (cargando, error, detalle, catálogo)
- **Funcionalidades:**
  - Catálogo de productos con estados de carga y error
  - Vista detallada de producto con renderizado condicional
  - Carrito de compras manejado en estado global de `App.jsx`
  - Formulario de contacto controlado con validación

### Decisiones de Arquitectura

1. **Separación Backend/Frontend:** Permite desarrollo independiente y escalabilidad
2. **Componentes modulares:** Facilita mantenimiento y reutilización de código
3. **Estado centralizado en App.jsx:** Simplifica el flujo de datos entre componentes sin necesidad de librerías externas
4. **Renderizado condicional:** Implementa navegación entre vistas sin React Router (según requisitos del proyecto)
5. **Manejo de errores robusto:** Tanto en backend (middlewares) como frontend (estados de error)