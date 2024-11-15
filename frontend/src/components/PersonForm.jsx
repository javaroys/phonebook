import React, { useState } from 'react'
import axios from 'axios';
import personService from '../services/person.js';

const PersonForm = ({ persons, setPersons, setMessage }) => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1 + ""
    }

    if (persons.find(person => person.name === newName)) {
      const samePerson = persons.find(person => person.name === newName)
      if (window.confirm(`${samePerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(samePerson.id, personObj)
          .then(updatedPerson => {
            setPersons(persons.map(person =>
              updatedPerson.id !== person.id ? person : updatedPerson
            ))
            setMessage({ text: `Updated ${updatedPerson.name}`, error: false })
          })
          .catch(error => {
            setMessage({ text: error.response.data.error, error: true })
          })

      }

    }
    else {


      personService.create(personObj)
        .then(addedPerson => {
          setMessage({ text: `Added ${addedPerson.name}`, error: false })
          setPersons(persons.concat(addedPerson));
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setMessage({ text: error.response.data.error, error: true })
        })
    }
  }



  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        name:{' '} <input value={newName} onChange={handleNameChange} />
        number:{' '} <input type="tel" value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )


}

export default PersonForm;