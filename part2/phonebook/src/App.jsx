import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      filter shown with <input
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <div>
          <div>name: <input 
            value={props.newName}
            onChange={props.handleNameChange}
          /></div>
          <div>number: <input
            value={props.newNum}
            onChange={props.handleNumChange}
          /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Person = (props) => {
  return (
    <div>
      <li>{props.name} {props.number}</li>
    </div>
  )
}

const Persons = (props) => {
  const people = props.peopleToShow
  return (
    <div>
      {people.map(person =>
        <Person key={person.name} name={person.name} number={person.number} />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  })

  const peopleToShow = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const exists = persons.some((person) => person.name.toUpperCase() === newName.toUpperCase())

    if (exists) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNum
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add new</h2>
      <PersonForm onSubmit={addPerson} newName={newName} handleNameChange={handleNameChange} newNum={newNum} handleNumChange={handleNumChange}/>
      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} />
    </div>
  )
}

export default App