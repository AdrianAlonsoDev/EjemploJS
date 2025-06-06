// Importamos los hooks de React que necesitamos
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // ESTADOS (variables que pueden cambiar y actualizar la página)
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [contact, setContact] = useState('')
  const [diet, setDiet] = useState('')
  const [training, setTraining] = useState('')
  const [editingId, setEditingId] = useState(null) 
  useEffect(() => {
    fetchUsers()
  }, [])

  // FUNCIÓN para obtener todos los items del servidor
  const fetchUsers = async () => {
    try {
      // Hacemos petición GET al backend
      const response = await fetch('http://localhost:3001/api/users')
      // Convertimos la respuesta a JSON
      const data = await response.json()
      // Actualizamos el estado con los usuarios recibidos
      setUsers(data)
    } catch (error) {
      // Si hay error, lo mostramos en la consola
      console.error('Error fetching users:', error)
    }
  }

  // FUNCIÓN que se ejecuta cuando se envía el formulario
  const handleSubmit = async (e) => {
    // Prevenimos que la página se recargue (comportamiento por defecto del form)
    e.preventDefault()
    
    // Validamos que ambos campos tengan contenido (trim() quita espacios)

    if (!age.trim() || !contact.trim() || !diet.trim() || !training.trim()) {
      alert('Por favor completa todos los campos')
      return
    }
      try {
        if (editingId) {
          const response = await fetch(`http://localhost:3001/api/users/${editingId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, age, contact, diet, training }),
          })

          if (response.ok) {
            setEditingId(null)
          }
        } else {
          await fetch('http://localhost:3001/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, age, contact, diet, training }),
          })
        }

        setName('')
        setAge('')
        setContact('')
        setDiet('')
        setTraining('')
        fetchUsers()

      } catch (error) {
        console.error('Error saving user:', error)
      }
    } 

  const handleEditUser = (user) => {
    setName(user.name)
    setAge(user.age)
    setContact(user.contact)
    setDiet(user.diet)
    setTraining(user.training)
  }

  const handleDeleteUser = async (id) => {
    // Pedimos confirmación antes de eliminar
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        // Hacemos petición DELETE al backend
        await fetch(`http://localhost:3001/api/users/${id}`, {
          method: 'DELETE',
        })
        // Recargamos la lista para ver que se eliminó
        fetchUsers()
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }

  /* // FUNCIÓN para cancelar la edición
  const cancelEdit = () => {
    // Limpiamos todo: dejamos de editar y vaciamos los campos
    setEditingId(null)
    setName('')
    setDescription('')
  } */

  const cancelEditUser = () => {
    setEditingId(null)
    setName('')
    setAge('')
    setContact('')
    setDiet('')
    setTraining('')
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
            placeholder="Edad"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Contacto"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Dieta"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Entrenamiento"
            value={training}
            onChange={(e) => setTraining(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <button type="submit">
            {/* El texto cambia según si estamos editando o creando */}
            {editingId ? 'Actualizar' : 'Agregar'}
          </button>
          {/* Solo mostramos "Cancelar" si estamos editando */}
          {editingId && (
            <button type="button" onClick={cancelEditUser}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* LISTA de items */}
      <div className="items-list">
        <h2>Items</h2>
        {/* Si no hay items, mostramos un mensaje */}
        {users.length === 0 ? (
          <p>No hay items</p>
        ) : (
          // Si hay items, los mostramos usando map()
          users.map((user) => (
            // Cada item necesita una "key" única para React
            <div key={user.id} className="item">
              <div className="item-info">
                <h3>{user.name}</h3>        {/* Mostramos el nombre */}
                <p>{user.age}</p>   {/* Mostramos la descripción */}
                <p>{user.contact}</p>
                <p>{user.diet}</p>
                <p>{user.training}</p>
              </div>
              <div className="item-actions">
                {/* Botón editar: pasamos todo el objeto item */}
                <button onClick={() => handleEditUser(user)}>Editar</button>
                {/* Botón eliminar: pasamos solo el ID */}
                <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
