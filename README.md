Hermanos Jota - E-commerce de Muebles
Información del Proyecto

Proyecto: Sprint 3 y 4 - ITBA
Integrantes: Azcoaga Christian, Bibilaqua Matias, Bellomo Lucca Daniel, Carrillo Gonzalo Alejo
Tecnologías: Node.js, Express.js, React, Vite
Arquitectura: Monorepo con Backend (API REST) y Frontend (SPA)

Objetivos de Aprendizaje

Construcción de servidor web y API REST con Express.
Definición modular de rutas con express.Router.
Implementación de middlewares personalizados.
Desarrollo de interfaz con React y manejo de estado con useState.
Comunicación entre componentes mediante props.
Renderizado dinámico y condicional.
Conexión entre frontend y backend usando fetch.

Estructura del Proyecto
sprint-3-4-ITBA/
├── backend/
│   ├── routes/
│   │   └── productos.js
│   ├── productos.js
│   ├── server.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   └── ContactForm.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
└── README.md

Instalación
Requisitos

Node.js 16 o superior
npm (incluido con Node.js)

Pasos

Clonar el repositorio:

git clone [URL_DEL_REPOSITORIO]
cd sprint-3-4-ITBA


Instalar dependencias:

cd backend && npm install
cd ../client && npm install


(Opcional) Agregar imágenes en client/public/images/.

Ejecución
Opción 1: Terminales separadas

Backend

cd backend
npm run dev


Disponible en: http://localhost:3000

Frontend

cd client
npm run dev


Disponible en: http://localhost:5173

Opción 2: Scripts en la raíz del proyecto
npm run start:backend
npm run start:frontend

API del Backend

GET /api/productos → Lista todos los productos

GET /api/productos/:id → Obtiene un producto por ID

404 / 500 → Manejadores de errores

Middleware de logging y express.json() habilitado

Frontend (React)
Componentes Principales

Navbar: Navegación y contador del carrito.

ProductList: Carga productos desde la API y maneja estados (cargando, error, éxito).

ProductCard: Tarjeta individual de producto.

ProductDetail: Vista detallada con botón para agregar al carrito.

ContactForm: Formulario controlado con validación.

Footer: Información de contacto y empresa.

Características

Renderizado dinámico con .map() y keys únicas.

Renderizado condicional de vistas.

Estado compartido entre componentes.

Peticiones asíncronas con manejo de errores.

Diseño responsivo.

Tecnologías

Backend: Node.js, Express, express.Router, middlewares personalizados.
Frontend: React, Vite, Hooks (useState, useEffect), Fetch API.