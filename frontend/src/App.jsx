// Importamos los hooks de React que necesitamos
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // ESTADOS (variables que pueden cambiar y actualizar la página)
  const [items, setItems] = useState([])           // Lista de todos los items
  const [name, setName] = useState('')             // Valor del campo "nombre"
  const [description, setDescription] = useState('') // Valor del campo "descripción"
  const [editingId, setEditingId] = useState(null) // ID del item que estamos editando (null = no editando)

  // useEffect se ejecuta cuando el componente se carga por primera vez
  useEffect(() => {
    fetchItems() // Cargamos los items del servidor al iniciar
  }, [])

  // FUNCIÓN para obtener todos los items del servidor
  const fetchItems = async () => {
    try {
      // Hacemos petición GET al backend
      const response = await fetch('http://localhost:3001/api/items')
      // Convertimos la respuesta a JSON
      const data = await response.json()
      // Actualizamos el estado con los items recibidos
      setItems(data)
    } catch (error) {
      // Si hay error, lo mostramos en la consola
      console.error('Error fetching items:', error)
    }
  }

  // FUNCIÓN que se ejecuta cuando se envía el formulario
  const handleSubmit = async (e) => {
    // Prevenimos que la página se recargue (comportamiento por defecto del form)
    e.preventDefault()
    
    // Validamos que ambos campos tengan contenido (trim() quita espacios)
    if (!name.trim() || !description.trim()) {
      alert('Por favor completa todos los campos')
      return
    }

    try {
      // Si editingId tiene valor, estamos EDITANDO un item existente
      if (editingId) {
        const response = await fetch(`http://localhost:3001/api/items/${editingId}`, {
          method: 'PUT',        // Método PUT para actualizar
          headers: {
            'Content-Type': 'application/json', // Indicamos que enviamos JSON
          },
          body: JSON.stringify({ name, description }), // Convertimos datos a JSON
        })
        
        // Si la actualización fue exitosa, dejamos de editar
        if (response.ok) {
          setEditingId(null)
        }
      } else {
        // Si NO hay editingId, estamos CREANDO un item nuevo
        await fetch('http://localhost:3001/api/items', {
          method: 'POST',       // Método POST para crear
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, description }),
        })
      }
      
      // Limpiamos los campos del formulario
      setName('')
      setDescription('')
      // Recargamos la lista para ver los cambios
      fetchItems()
    } catch (error) {
      console.error('Error saving item:', error)
    }
  }

  // FUNCIÓN para iniciar la edición de un item
  const handleEdit = (item) => {
    // Llenamos los campos del formulario con los datos del item a editar
    setName(item.name)
    setDescription(item.description)
    // Guardamos el ID para saber cuál item estamos editando
    setEditingId(item.id)
  }

  // FUNCIÓN para eliminar un item
  const handleDelete = async (id) => {
    // Pedimos confirmación antes de eliminar
    if (window.confirm('¿Estás seguro de eliminar este item?')) {
      try {
        // Hacemos petición DELETE al backend
        await fetch(`http://localhost:3001/api/items/${id}`, {
          method: 'DELETE',
        })
        // Recargamos la lista para ver que se eliminó
        fetchItems()
      } catch (error) {
        console.error('Error deleting item:', error)
      }
    }
  }

  // FUNCIÓN para cancelar la edición
  const cancelEdit = () => {
    // Limpiamos todo: dejamos de editar y vaciamos los campos
    setEditingId(null)
    setName('')
    setDescription('')
  }

  // RENDERIZADO (lo que se muestra en la página)
  return (
    <div className="app">
      <h1>CRUD Simple</h1>
      
      {/* FORMULARIO para agregar/editar items */}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre"
            value={name}  // El valor viene del estado
            onChange={(e) => setName(e.target.value)} // Cuando cambia, actualizamos el estado
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <button type="submit">
            {/* El texto cambia según si estamos editando o creando */}
            {editingId ? 'Actualizar' : 'Agregar'}
          </button>
          {/* Solo mostramos "Cancelar" si estamos editando */}
          {editingId && (
            <button type="button" onClick={cancelEdit}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* LISTA de items */}
      <div className="items-list">
        <h2>Items</h2>
        {/* Si no hay items, mostramos un mensaje */}
        {items.length === 0 ? (
          <p>No hay items</p>
        ) : (
          // Si hay items, los mostramos usando map()
          items.map((item) => (
            // Cada item necesita una "key" única para React
            <div key={item.id} className="item">
              <div className="item-info">
                <h3>{item.name}</h3>        {/* Mostramos el nombre */}
                <p>{item.description}</p>   {/* Mostramos la descripción */}
              </div>
              <div className="item-actions">
                {/* Botón editar: pasamos todo el objeto item */}
                <button onClick={() => handleEdit(item)}>Editar</button>
                {/* Botón eliminar: pasamos solo el ID */}
                <button onClick={() => handleDelete(item.id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
