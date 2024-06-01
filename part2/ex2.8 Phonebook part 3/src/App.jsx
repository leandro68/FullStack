import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')


  const addPerson = (event) => {
        event.preventDefault()
        const person = {
          id : persons.length,
          name: newName,
          phone: newPhone
        }
        if (persons.some(personInPersons => personInPersons.name === person.name)){
          alert(`${person.name} ya está agendado`)
        }
        else {
          setPersons(persons.concat(person))
        }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const PersonLine = () => {
    return (
      <p>{persons.map(person => 
        <li key={person.id}>
          {person.name} {person.phone}
        </li>)}
      </p>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          phone: <input value={newPhone} onChange={handlePhoneChange}/>
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






