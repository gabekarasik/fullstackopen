import { useState } from 'react'

const Header = ({header}) => {
  return (
    <>
      <h1>{header}</h1>
    </>
  )
}

const Button = ( {onClick, text} ) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good} />
          <StatisticLine text='neutral' value={props.neutral} />
          <StatisticLine text='bad' value={props.bad} />
          <StatisticLine text='all' value={props.total} />
          <StatisticLine text='average' value={props.avg} />
          <StatisticLine text='positive' value={props.pos}/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0)
  const [pos, setPos] = useState(0)

  const handleGood = () => {
    const newGood = good + 1
    const newTotal = newGood + neutral + bad 

    setGood(newGood)
    setTotal(newTotal)
    setAvg((newGood - bad) / newTotal)
    setPos(newGood / newTotal  * 100 + '%')
  }

  const handleNeutral = () => {
    const newNeutral = neutral + 1
    const newTotal = good + newNeutral + bad

    setNeutral(newNeutral)
    setTotal(good + newNeutral + bad)
    setAvg((good - bad) / newTotal)
    setPos(good / newTotal * 100 + '%')
  }

  const handleBad = () => {
    const newBad = bad + 1
    const newTotal = good + neutral + newBad

    setBad(newBad)
    setTotal(newTotal)
    setAvg((good - newBad) / newTotal)
    setPos(good / newTotal * 100 + '%')
  }

  return (
    <div>
      <Header header='give feedback' />

      <Button onClick={handleGood} text='good'/>
      <Button onClick={handleNeutral} text='neutral'/>
      <Button onClick={handleBad} text='bad'/>
        
      <Header header='statistics' />
      
      <Statistics good={good} neutral={neutral} bad={bad} total={total} avg={avg} pos={pos} />
    </div>
  )
}

export default App