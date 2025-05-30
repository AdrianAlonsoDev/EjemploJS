import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/items')
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error('Error fetching items:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!name.trim() || !description.trim()) {
      alert('Por favor completa todos los campos')
      return
    }

    try {
      if (editingId) {
        const response = await fetch(`http://localhost:3001/api/items/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, description }),
        })
        
        if (response.ok) {
          setEditingId(null)
        }
      } else {
        await fetch('http://localhost:3001/api/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, description }),
        })
      }
      
      setName('')
      setDescription('')
      fetchItems()
    } catch (error) {
      console.error('Error saving item:', error)
    }
  }

  const handleEdit = (item) => {
    setName(item.name)
    setDescription(item.description)
    setEditingId(item.id)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este item?')) {
      try {
        await fetch(`http://localhost:3001/api/items/${id}`, {
          method: 'DELETE',
        })
        fetchItems()
      } catch (error) {
        console.error('Error deleting item:', error)
      }
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setName('')
    setDescription('')
  }

  return (
    <div className="app">
      <h1>CRUD Simple</h1>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            {editingId ? 'Actualizar' : 'Agregar'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="items-list">
        <h2>Items</h2>
        {items.length === 0 ? (
          <p>No hay items</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="item">
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <div className="item-actions">
                <button onClick={() => handleEdit(item)}>Editar</button>
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
