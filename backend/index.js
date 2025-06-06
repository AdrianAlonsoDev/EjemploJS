// Importamos las librerías necesarias
const express = require('express'); // Framework para crear el servidor web
const cors = require('cors');       // Permite que frontend y backend se comuniquen

// Creamos la aplicación Express
const app = express();
// Definimos el puerto donde correrá el servidor (3001 por defecto)
const PORT = process.env.PORT || 3001;

// Configuramos middlewares (funciones que se ejecutan en cada petición)
app.use(cors());         // Permite peticiones desde el frontend
app.use(express.json()); // Permite leer datos JSON del frontend

// Base de datos temporal en memoria (se borra al reiniciar el servidor)
let items = [
  { id: 1, title: 'Hipertrofia', exercises: 'Press banca', notes: '60 min' }
];

// Variable para generar IDs únicos automáticamente
let nextId = 2;

// ENDPOINT GET - Obtener todos los items
// Cuando el frontend hace una petición a /api/items, devolvemos todos los items
app.get('/api/items', (req, res) => {
  res.json(items); // Enviamos el array completo como respuesta JSON
});

// ENDPOINT GET - Obtener un item específico por su ID
// :id es un parámetro dinámico (ejemplo: /api/items/1)
app.get('/api/items/:id', (req, res) => {
  // Convertimos el ID de string a número
  const id = parseInt(req.params.id);
  // Buscamos el item que tenga ese ID
  const item = items.find(item => item.id === id);
  
  // Si no encontramos el item, devolvemos error 404
  if (!item) {
    return res.status(404).json({ error: 'Item no encontrado' });
  }
  
  // Si lo encontramos, lo devolvemos
  res.json(item);
});

// ENDPOINT POST - Crear un nuevo item
// Cuando el frontend envía datos para crear un item nuevo
app.post('/api/items', (req, res) => {
  // Extraemos name y description del cuerpo de la petición
  const { title, exercises, notes } = req.body;
  
  // Validamos que ambos campos estén presentes
  if (!title || !exercises || !notes) {
    return res.status(400).json({ error: 'Título, ejercicios y notas son requeridos' });
  }
  
  // Creamos el nuevo item con un ID único
  const newItem = {
    id: nextId++, // Usamos nextId y lo incrementamos
    title,
    exercises,
    notes
  };
  
  // Agregamos el nuevo item al array
  items.push(newItem);
  // Devolvemos el item creado con status 201 (Created)
  res.status(201).json(newItem);
});

// ENDPOINT PUT - Actualizar un item existente
// Para editar un item que ya existe
app.put('/api/items/:id', (req, res) => {
  // Obtenemos el ID del item a actualizar
  const id = parseInt(req.params.id);
  // Obtenemos los nuevos datos del cuerpo de la petición
  const { title, exercises, notes } = req.body;
  
  // Buscamos la posición del item en el array
  const itemIndex = items.findIndex(item => item.id === id);
  
  // Si no existe, devolvemos error 404
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item no encontrado' });
  }
  
  // Validamos que los nuevos datos estén completos
  if (!title || !exercises || !notes) {
    return res.status(400).json({ error: 'Título, ejercicios y notas son requeridos' });
  }
  
  // Reemplazamos el item en esa posición con los nuevos datos
  items[itemIndex] = { id, title, exercises, notes };
  // Devolvemos el item actualizado
  res.json(items[itemIndex]);
});

// ENDPOINT DELETE - Eliminar un item
// Para borrar permanentemente un item
app.delete('/api/items/:id', (req, res) => {
  // Obtenemos el ID del item a eliminar
  const id = parseInt(req.params.id);
  // Buscamos la posición del item en el array
  const itemIndex = items.findIndex(item => item.id === id);
  
  // Si no existe, devolvemos error 404
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item no encontrado' });
  }
  
  // Eliminamos el item del array usando splice
  // splice(posición, cantidad_a_eliminar)
  items.splice(itemIndex, 1);
  // Confirmamos que se eliminó correctamente
  res.json({ message: 'Item eliminado correctamente' });
});

// Iniciamos el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});