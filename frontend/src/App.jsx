import { useState } from 'react'
import { useEffect } from 'react'
import  Filter  from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
//import axios from 'axios';
import personService from './services/person.js';

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [filterPerson, setFilter] = useState('')


  useEffect(() => {
    console.log('axios get')

    personService.getAll()
    .then(personsList => {
      setPersons(personsList)
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
      }


  return (
    <div>
      <Filter value={filterPerson} onChange={handleFilter} />
      <h2>Phonebook</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterPerson={filterPerson} remove={deletePerson} />
    </div>
  )
}

export default App