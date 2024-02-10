import Person from './Person'

const Persons = ({ records }) => (
  <ul>
    {records.map(
      person =>
        <Person
          key={person.name}
          person={person}
        />
      )
    }
  </ul>
)

export default Persons