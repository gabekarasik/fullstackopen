import { useState } from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.text}</h1>
    </>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const n = anecdotes.length
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(n).fill(0))
  const [most, setMost] = useState(0)

  const handleSelected = () => {
    const newSelected = Math.floor(Math.random() * n)
    setSelected(newSelected)
  }

  const handleVotes = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)

    if (newVotes[selected] > newVotes[most]) {
      const newMost = selected
      setMost(newMost)
    } 
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      <Button onClick={handleVotes} text='vote' />
      <Button onClick={handleSelected} text='next anecdote' />

      <Header text="Anecdote with most votes" />
      <p>{anecdotes[most]}</p>
      <p>has {votes[most]} votes</p>
    </div>
  )
}

export default App