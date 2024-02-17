import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import recordService from './services/records'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    recordService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
  
      recordService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })

      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleKeywordChange = (event) => {
    setNewFilter(event.target.value.toLowerCase())
  }

  const recordsToShow = newFilter === ''
    ? persons
    : persons.filter(
        person => person
          .name
          .toLowerCase()
          .includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleKeywordChange}/>
      <h3>Add a number</h3>
      <PersonForm
        submitHandler={addName}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons records={recordsToShow} />
    </div>
  )
}

export default App