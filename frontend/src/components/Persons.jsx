import React from 'react';
import PersonForm from './PersonForm';

const Persons = ({ persons, filterPerson, remove}) => {
  
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filterPerson.toLowerCase())
    )


    return  filteredPersons.map((person) => (
        <div key={person.id}> {person.name} {person.number} 
        <button onClick={() => {
           if (window.confirm(`Delete ${person.name}`)){
            console.log(person.name)
               remove(person)}
        }
        }> delete</button>
        </div>
      )); 

      
}



export default Persons;