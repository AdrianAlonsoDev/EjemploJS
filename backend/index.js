const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let items = [
  { id: 1, name: 'Item 1', description: 'Descripción del item 1' },
  { id: 2, name: 'Item 2', description: 'Descripción del item 2' }
];

let nextId = 3;

// GET - Obtener todos los items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// GET - Obtener un item por ID
app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);
  
  if (!item) {
    return res.status(404).json({ error: 'Item no encontrado' });
  }
  
  res.json(item);
});

// POST - Crear un nuevo item
app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  
  if (!name || !description) {
    return res.status(400).json({ error: 'Nombre y descripción son requeridos' });
  }
  
  const newItem = {
    id: nextId++,
    name,
    description
  };
  
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT - Actualizar un item
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item no encontrado' });
  }
  
  if (!name || !description) {
    return res.status(400).json({ error: 'Nombre y descripción son requeridos' });
  }
  
  items[itemIndex] = { id, name, description };
  res.json(items[itemIndex]);
});

// DELETE - Eliminar un item
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item no encontrado' });
  }
  
  items.splice(itemIndex, 1);
  res.json({ message: 'Item eliminado correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});