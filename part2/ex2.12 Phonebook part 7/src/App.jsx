import { useState, useEffect } from 'react'
import PersonList from './components/PersonList'
import Person from './components/Person'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [textSearched, setTextSearched] = useState('')
  const [personToShow, setPersonToShow] = useState([])


  const addPerson = (event) => {
        event.preventDefault()
        const person = {
          id : persons.length+1,
          name: newName,
          phone: newPhone
        }
        if (persons.some(personInPersons => personInPersons.name === person.name)){
          alert(`${person.name} ya está agendado`)
        }
        else {
          axios
            .post('http://localhost:3001/persons', person)
            .then(response => {
            console.log(response)
            setPersonToShow(persons.concat(response.data))
            setPersons(persons.concat(response.data))
            setTextSearched('')
          })
          //const newPersons = persons.concat(person)
          //
          //
          //
        }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleTextSearched = (event) => {
    const text = event.target.value
    setTextSearched(event.target.value)
    const toShow = (text === '') ?
      persons :
      persons.filter(person => person.name.toLowerCase().includes(text.toLowerCase()))
    setPersonToShow(toShow)
  }

  useEffect(() => {
    //console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        //console.log('promise fulfilled')
        setPersons(response.data)
        setPersonToShow(response.data)
      })
  }, [])
  //console.log('render', persons.length, 'persons')
  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={textSearched} onChange={handleTextSearched}/>
      <h2>add a new</h2>
      <Person onSubmitPerson={addPerson} 
              onChangeName={handleNameChange} 
              valueName={newName} 
              onChangePhone={handlePhoneChange}
              valuePhone= {newPhone}/>
      <h2>Numbers</h2>
      <PersonList show={personToShow}/>
      
    </div>
  )
}

export default App






