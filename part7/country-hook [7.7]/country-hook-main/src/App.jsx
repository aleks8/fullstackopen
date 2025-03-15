import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  /*const [countryName, setCountryName] = useState(null) 
  useEffect(() => {
    setCountryName(name)
  }, [name])
*/
  useEffect(() => {
    console.log('effect run, country name is now', name)

    // skip if name is not defined
    if (name) {

      console.log('fetching country...')
        axios
          .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
          .then(response => {
            console.log('responsehere', response)
            setCountry({...response, found: true})
          })
          .catch ((error) => {
              //console.log('errorhere', error)
        //if (error.response && error.response.status === 404) {
              setCountry({ response: null, found: null }) //data: null
        //} else {
          // Handle other errors
              //console.error('Error fetching country:', error)
        //}
            })
      //console.log('country', country)
    }


  }, [name])

  return country
}

const Country = ({ country }) => {
  console.log('countryhere', country)
  /*if(country) {
    console.log('countrydatahere', country.data.name)
  }*/
  if (!country) {
    return null
  }

  if (!country.found) {
  //if (!country) {
  //if(country.status !== 200 ) {
  //if(!country.status) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App