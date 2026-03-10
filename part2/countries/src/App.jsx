import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const Display = ({ country }) => {
  const name = country.name.common
  const capital = country.capital
  const area = country.area
  const languages = country.languages
  const imgSrc = country.flags.png
  const imgAlt = country.flags.alt
  return (
    <div>
      <h1>{name}</h1>
      <p>Capital {capital}</p>
      <p>Area {area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(languages).map(language => <li>{language}</li>)}
      </ul>
      <img src={imgSrc} alt={imgAlt}/>
    </div>
  )
}

const App = () => {
  const [newCountry, setNewCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [display, setDisplay] = useState('Too many matches, specify another filter')

  const showInfo = (event) => {
    const country = countries.find(country => country.name.common === event.target.value)
    setDisplay(<Display country={country} />)
  }

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value)
    const filteredCountries = countries.filter(country => country.name.common.toUpperCase().includes(event.target.value.toUpperCase()))

    if (filteredCountries.length > 10) {
      setDisplay('Too many matches, specify another filter')
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      setDisplay(<Display country={country}/>)
    } else {
      setDisplay(filteredCountries.map(country => 
        <div key={country.name.common}>
          {country.name.common} {' '}
          <button type='submit' value={country.name.common} onClick={showInfo}>Show</button>
        </div>))
    }
  }
  
  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
      setCountries(response.data)
    })
  }, [])

  return (
    <div>
      <form>
        <div>
          find countries <input 
            value={newCountry}
            onChange={handleCountryChange}
          />
        </div>
      </form>
      {display}
    </div>
  )
}

export default App
