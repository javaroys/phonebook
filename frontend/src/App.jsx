import { useState } from 'react'
import { useEffect } from 'react'
import  Filter  from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
//import axios from 'axios';
import personService from './services/person.js';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [message, setMessage] = useState(null)

  const [filterPerson, setFilter] = useState('')


  useEffect(() => {
    console.log('axios get')

    personService.getAll()
    .then(personsList => {
      setPersons(personsList)
    })
    .catch(error => {
      setMessage(error.response.data.error)
    })
  }, [])
    

  const handleFilter = (event) => {
      console.log(event.target.value)
      setFilter(event.target.value)
    }

    const deletePerson = (person) => {
      const removedPerson = person 
      console.log(person)
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== removedPerson.id))
        })
        .catch(error => {
          setMessage(error.response.data.error)
        })
      }



  return (
    <div>
      <div>
        {message}
      </div>
      <Filter value={filterPerson} onChange={handleFilter} />
      <h2>Phonebook</h2>
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterPerson={filterPerson} remove={deletePerson} />
    </div>
  )
}

export default App