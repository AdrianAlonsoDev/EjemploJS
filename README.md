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

# Decisiones Técnicas del Proyecto

Este documento explica **qué es cada tecnología** y **por qué** la elegimos para este proyecto CRUD simple.

---

## ✅ ¿Qué es un CRUD?

**CRUD** son las siglas de:

- **C**reate → Crear datos (por ejemplo: añadir un nuevo cliente)
- **R**ead → Leer datos (ver una lista de clientes)
- **U**pdate → Actualizar datos (editar la información de un cliente)
- **D**elete → Borrar datos (eliminar un cliente)

👉 Es la base de cualquier app web que maneje información.

---

## ✅ ¿Qué es una API REST?

Una **API REST** (o API web) es una forma en la que dos aplicaciones se comunican a través de internet.

En nuestro caso:
- El **frontend (React)** pide datos al **backend (Express)** usando URLs.
- El backend responde con datos en formato **JSON**.

### Ejemplo de rutas REST:
- `GET /clientes` → devuelve todos los clientes
- `POST /clientes` → añade un nuevo cliente
- `PUT /clientes/:id` → actualiza un cliente por ID
- `DELETE /clientes/:id` → borra un cliente por ID

---

## ✅ ¿Qué es el frontend y qué es el backend?

| Parte       | Qué hace                                     | Ejemplo                         |
|-------------|----------------------------------------------|----------------------------------|
| **Frontend**| Lo que el usuario ve en pantalla             | React: botones, formularios     |
| **Backend** | Lo que pasa por detrás, donde se procesan los datos | Express: guarda, edita, consulta información |

---

## ✅ ¿Qué es React?

**React** es una biblioteca de JavaScript que se usa para construir interfaces web modernas e interactivas.

- Es rápida, modular, y permite actualizar partes de la página sin recargarla.
- Se usa mucho en el mundo real (empresas como Facebook, Instagram, Airbnb...).

---

## ✅ ¿Qué es Express?

**Express.js** es un framework para construir servidores en JavaScript, usando Node.js.

Permite:
- Definir rutas como `/clientes`
- Recibir peticiones desde el frontend
- Responder con datos (JSON)

Ejemplo de una ruta básica:

```js
app.get('/clientes', (req, res) => {
  res.json([{ id: 1, nombre: 'Pepe' }]);
});
```

### ¿Qué es JavaScript?
JavaScript es un lenguaje de programación que originalmente se creó para hacer páginas web interactivas. Hoy en día se puede usar tanto en navegadores (frontend) como en servidores (backend).

### ¿Por qué lo elegimos?
- **Un solo lenguaje**: Podemos usar JavaScript tanto en frontend (navegador) como en backend (servidor)
- **Comunidad gigante**: Millones de desarrolladores, muchos recursos y tutoriales
- **Fácil de aprender**: Sintaxis relativamente simple para principiantes
- **Versatilidad**: Se puede usar para web, móvil, escritorio, servidores, etc.

## Node.js

### ¿Qué es Node.js?
Node.js es un entorno de ejecución que permite ejecutar JavaScript fuera del navegador, especialmente en servidores. Básicamente, toma el motor JavaScript de Chrome y lo hace funcionar en tu computadora.

### ¿Por qué lo elegimos?
- **JavaScript en el servidor**: No necesitamos aprender otro lenguaje
- **Rápido para I/O**: Perfecto para aplicaciones web que manejan muchas peticiones
- **NPM**: El gestor de paquetes más grande del mundo
- **Comunidad activa**: Constantemente actualizado y mejorado

## NPM

### ¿Qué es NPM?
NPM (Node Package Manager) es como una "tienda de aplicaciones" para código JavaScript. Te permite descargar e instalar librerías que otros programadores han creado, en lugar de tener que escribir todo desde cero.

### ¿Por qué lo elegimos?
- **Viene incluido**: Se instala automáticamente con Node.js
- **Millones de paquetes**: Casi todo lo que necesites ya existe
- **Fácil de usar**: Comandos simples como `npm install`
- **Standard de la industria**: Lo usan la mayoría de proyectos JavaScript

## React

### ¿Qué es React?
React es una librería de JavaScript creada por Facebook para construir interfaces de usuario. Te permite crear páginas web que se actualizan automáticamente cuando cambian los datos, sin necesidad de recargar toda la página.

### ¿Por qué lo elegimos?
- **Muy popular**: Fácil encontrar trabajo y ayuda
- **Componentes reutilizables**: Escribes una vez, usas muchas veces
- **Comunidad enorme**: Infinidad de librerías y recursos
- **Mantenido por Meta**: Garantiza longevidad y estabilidad
- **Paradigma declarativo**: Describes cómo quieres que se vea, React se encarga del resto

## Vite

### ¿Qué es Vite?
Vite es una herramienta de desarrollo que te ayuda a crear proyectos web modernos. Es como un "asistente" que se encarga de procesar tu código, crear un servidor de desarrollo local, y convertir tu código para que funcione en todos los navegadores.

### ¿Por qué lo elegimos?
- **Súper rápido**: Arranca el servidor de desarrollo en milisegundos
- **Hot Module Replacement**: Los cambios se ven instantáneamente
- **Configuración mínima**: Funciona bien sin configurar nada
- **Moderno**: Usa las últimas tecnologías web (ES modules)
- **Liviano**: No añade peso innecesario al proyecto

## Express.js

### ¿Qué es Express.js?
Express.js es un framework (conjunto de herramientas) para Node.js que facilita la creación de servidores web. Es como tener un kit de construcción que ya incluye las piezas más comunes que necesitas para hacer un servidor.

### ¿Por qué lo elegimos?
- **Minimalista**: Solo lo esencial, sin peso innecesario
- **Flexible**: Puedes añadir solo lo que necesitas
- **Maduro**: Lleva años en el mercado, muy estable
- **Documentación excelente**: Fácil de aprender y usar
- **Middleware ecosystem**: Miles de plugins disponibles

## CORS

### ¿Qué es CORS?
CORS (Cross-Origin Resource Sharing) es una medida de seguridad de los navegadores que controla qué páginas web pueden comunicarse entre sí. Es como un "guardián" que decide si una página puede hacer peticiones a otra.

### ¿Por qué lo necesitamos?
- **Seguridad del navegador**: Por defecto, el navegador bloquea peticiones entre diferentes puertos
- **Desarrollo local**: Frontend (puerto 5173) necesita hablar con Backend (puerto 3001)

## Almacenamiento en Memoria

### ¿Qué es el almacenamiento en memoria?
En lugar de usar una base de datos real, guardamos la información en variables de JavaScript que viven en la memoria RAM del servidor. Cuando se reinicia el servidor, todos los datos se pierden.

### ¿Por qué lo elegimos para este proyecto?
- **Simplicidad**: No necesitamos configurar base de datos
- **Propósito educativo**: Nos enfocamos en aprender CRUD, no administración de BD
- **Rápido desarrollo**: Cero configuración adicional
- **Suficiente para demo**: El proyecto es para aprender conceptos

### Para proyectos reales usaríamos
- **SQLite**: Para proyectos pequeños
- **PostgreSQL**: Para proyectos medianos/grandes
- **MongoDB**: Para datos no relacionales
- **Redis**: Para cache y datos temporales

## Arquitectura: ¿Por qué separar Frontend y Backend?

### Ventajas de la separación
- **Responsabilidades claras**: Cada parte tiene su trabajo específico
- **Escalabilidad**: Podemos mejorar cada parte independientemente
- **Reutilización**: El mismo backend puede servir a web, móvil, etc.
- **Equipos separados**: Frontend y backend pueden trabajar en paralelo
- **Tecnologías específicas**: Cada parte usa las herramientas más adecuadas

### Alternativas consideradas
- **Monolito**: Todo en una aplicación (más simple pero menos flexible)
- **Serverless**: Funciones separadas (bueno para escala, complejo para aprender)
- **JAMstack**: Archivos estáticos (rápido pero limitado para CRUD)

## Resumen de la Stack

```
Frontend: React + Vite + CSS
          ↕ (HTTP requests)
Backend:  Node.js + Express.js + CORS
          ↕
Storage:  Memoria (arrays JavaScript)
```