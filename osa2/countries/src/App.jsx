import { useState, useEffect } from 'react'

import countriesService from './services/countries'
import Results from './components/results'
import Filter from './components/Filter'

function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const recordsToShow = newFilter === ''
    ? countries
    : countries.filter(
        country =>
          country.name.common
          .toLowerCase()
          .includes(newFilter))

  const handleKeywordChange = (event) => {
    setNewFilter(event.target.value.toLowerCase())
  }

  return (
    <>
      <Filter handler={handleKeywordChange} />
      <Results results={recordsToShow} handler={handleKeywordChange} />
    </>
  )
}

export default App
