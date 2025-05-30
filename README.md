# CRUD Simple - React + Express

Una aplicación web sencilla que permite **crear, leer, actualizar y eliminar** items (como una lista de tareas pero más completa). Perfecto para aprender desarrollo web.

## ¿Qué hace esta aplicación?

- **Agregar**: Escribes un nombre y descripción, y se guarda
- **Ver**: Muestra todos los items que has creado
- **Editar**: Puedes modificar items existentes
- **Eliminar**: Borrar items que ya no necesitas

## Estructura del Proyecto

```
EjemploJS/
├── backend/          # El "cerebro" - maneja los datos
│   ├── index.js      # Código del servidor
│   └── package.json  # Lista de dependencias
├── frontend/         # La "cara" - lo que ves en el navegador
│   ├── src/
│   │   ├── App.jsx   # Página principal
│   │   ├── App.css   # Estilos bonitos
│   │   └── index.css # Estilos generales
│   └── package.json  # Lista de dependencias
└── README.md         # Este archivo
```

## Requisitos Previos (¡Muy Importante!)

Antes de empezar, necesitas instalar estas herramientas en tu computadora:

### 1. Node.js (El motor que ejecuta JavaScript)
- Ve a https://nodejs.org
- Descarga la versión "LTS" (recomendada)
- Instálala como cualquier programa normal
- Esto también instala **npm** automáticamente

### 2. Verificar la instalación
Abre tu terminal/consola y escribe:
```bash
node --version
npm --version
```
Si ves números de versión, ¡estás listo!

## Cómo Ejecutar la Aplicación

Necesitas abrir **DOS ventanas de terminal** (una para cada parte):

### Paso 1: Ejecutar el Backend (El servidor)
```bash
cd backend
npm install    # Instala las dependencias necesarias
npm start      # Arranca el servidor
```
Verás: "Servidor ejecutándose en http://localhost:3001"

### Paso 2: Ejecutar el Frontend (La página web)
**En otra ventana de terminal nueva:**
```bash
cd frontend
npm install    # Instala las dependencias necesarias
npm run dev    # Arranca la página web
```
Verás algo como: "Local: http://localhost:5173"

### Paso 3: ¡Usar la aplicación!
- Abre tu navegador
- Ve a http://localhost:5173
- ¡Ya puedes agregar, editar y eliminar items!

## ¿Qué son estas herramientas?

### Frontend vs Backend
- **Frontend**: Lo que ves (botones, formularios, colores)
- **Backend**: Lo que no ves (donde se guardan los datos, lógica)

### React
- Biblioteca para crear páginas web interactivas
- Hace que los botones funcionen y la página se actualice

### Express.js
- Framework para crear servidores web
- Maneja las peticiones (guardar, editar, eliminar datos)

### npm
- Gestor de paquetes (como una "tienda de aplicaciones" para código)
- Instala automáticamente las herramientas que necesitas

## Dependencias del Proyecto

### Backend (Servidor)
- **express**: Para crear el servidor web
- **cors**: Para que frontend y backend se comuniquen

### Frontend (Página web)
- **react**: Para crear la interfaz
- **react-dom**: Para mostrar React en el navegador
- **vite**: Herramienta rápida para desarrollo

## Nota Importante
Los datos se guardan temporalmente en la memoria. Si reinicias el servidor backend, se pierden todos los items. ¡Es normal!