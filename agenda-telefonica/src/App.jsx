import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import agendaService from './services/agenda'

function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newTel, setNewTel] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    agendaService
      .getAll()
      .then(response => {
        console.log('Respuesta de la API:', response.data);
        if (Array.isArray(response.data)) {
          setPersons(response.data);
        } else {
          console.error('La respuesta no es un array:', response.data);
          setPersons([]); // Establecemos un array vacío como fallback
        }
      })
      .catch(error =>{
        console.error("error al obtener datos", error);
        setPersons([]); // Establecemos un array vacío en caso de error
      })
  },[])
  
  const personsToShow = filter
      ? persons.filter(person =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
      : persons

  const handleSubmit = (e) =>{
    e.preventDefault()

    if(persons.some(person => person.name === newName || person.number === newTel)) {
      alert(`${newName} o el numero ${newTel} ya esta agendado`)
      return  
    }
    const newPerson = {name: newName, number: newTel, id: persons.length + 1}
    
    agendaService
      .create(newPerson)
      .then(response =>{
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewTel('')  
      })
  }

  const handleChange = (e) =>{
    setNewName(e.target.value)
  }

  const handleChangeTel = (e) =>{
    setNewTel(e.target.value)
  }  

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleBorrarContacto = (id, nombre) => {
    if (window.confirm(`¿Desea eliminar a ${nombre} del contacto?`)) {
      agendaService
        .delete(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
        })
        .catch((error) => {
          console.error("Error al eliminar el contacto:", error);
        });
        alert("Contacto eliminado correctamente")
    }
  };

  return (
    <>
    <div className='container'>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <h1>Phonebook</h1>
        
        

        <PersonForm 
          handleSubmit={handleSubmit} 
          handleChange={handleChange} 
          handleChangeTel={handleChangeTel}  
          newTel={newTel}
          newName={newName} 
        />

        <h3 className="contacts-title">Contactos</h3>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        <Persons persons={personsToShow} borrarContacto={handleBorrarContacto}/>
      </div>
    </div>
    </>
  )
}

export default App
