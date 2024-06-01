import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState('')

  const addPerson = (event) => {
        event.preventDefault()
        const person = {
          id : persons.length,
          name: newPerson
        }
        if (persons.some(personInPersons => personInPersons.name === person.name)){
          alert(`${person.name} ya está agendado`)
        }
        else {
          setPersons(persons.concat(person))
        }
  }

  const handleNameChange = (event) => {
    setNewPerson(event.target.value)
  }

  const PersonLine = () => {
    return (
      <p>{persons.map(person => <li key={person.id}>{person.name}</li>)}</p>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newPerson} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <PersonLine />
      </ul>
    </div>
  )
}

export default App






