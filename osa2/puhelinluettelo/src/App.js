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

    const match = persons.find(person => person.name === newName)
    const nameObject = {
      name: newName,
      number: newNumber
    }

    if (match !== undefined) {
      const text = `${newName} is already added to phonebook, do you want to ` +
        `replace the existing number with a new one?`
      const confirm = window.confirm(text)

      if (confirm) {
        recordService
          .update(match.id, nameObject)
          .then((response) => {
            setPersons(
              persons.map(
                person => person.id !== response.data.id
                  ? person
                  : response.data
              )
            )
          })
      }
    } else {
      recordService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
    }

    setNewName('')
    setNewNumber('')
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
  const handleRecordDelete = (record) => {
    const confirmText = `Do you want to delete ${record.name} from phonebook?`

    if (window.confirm(confirmText)) {
      recordService
        .deleteRecord(record.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== record.id))
        })
    }
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
      <Persons
        records={recordsToShow}
        deleteHandler={handleRecordDelete}
      />
    </div>
  )
}

export default App