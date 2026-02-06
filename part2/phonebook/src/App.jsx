import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorMsg from './components/ErrorMsg'

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

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>delete</button>
    </>
  )
}

const Person = (props) => {
  const onClick = (id) => {
    if (window.confirm('Do you want to delete this person?')) {
      personService
      .removePerson(id)
      .then(() => {})
    }
  }

  return (
    <div>
      <li>
        {props.name} {props.number}
        <Button onClick={() => onClick(props.id)}/>
      </li>
    </div>
  )
}

const Persons = (props) => {
  const people = props.peopleToShow
  return (
    <div>
      {people.map(person =>
        <Person key={person.id} name={person.name} number={person.number} id={person.id} />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errMsg, setErrMsg] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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

  const updateNumber = (id, newNum) => {
    const person = persons.find(p => p.id === id)
    const updatedPerson = { ...person, number: newNum}
    
    personService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id === id ? returnedPerson : person))
        setMessage(`Updated ${person.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrMsg(`Information of ${person.name} has already been removed from server`)
        setTimeout(() => {
          setErrMsg(null)
        }, 5000)
      })
  }

  const addPerson = (event) => {
    event.preventDefault()

    const exists = persons.some((person) => person.name.toUpperCase() === newName.toUpperCase())

    if (exists) {
      if (window.confirm("This person already exists. Do you want to update their phone number?")) {
        const person = persons.find(p => p.name.toUpperCase() === newName.toUpperCase())
        updateNumber(person.id, newNum)
        return
      } else {
        return
      }
    }

    const newPerson = {
      name: newName,
      number: newNum
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNum('')
      })

    setMessage(`Added ${newPerson.name}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorMsg message={errMsg} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add new</h2>
      <PersonForm onSubmit={addPerson} newName={newName} handleNameChange={handleNameChange} newNum={newNum} handleNumChange={handleNumChange}/>
      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} />
    </div>
  )
}

export default App