import { useState , useEffect } from 'react'
import countryService from './services/countries'
import Filter from './components/Filter.jsx'
import Countries from './components/Countries.jsx'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newShow, setNewShow] = useState('')
  //const [name, setName] = useState(null)
  
  useEffect(() => {   
    console.log('effect') 
    //if ( name) 
    //if () {
      console.log('fetching exchange rates...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          console.log('promise fulfilled') 
          setCountries(response.data)
        })
    //}
  }, [])
  if (!countries) {
    return null 
  }
  /*  axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          console.log('promise fulfilled') 
          setCountries(response.data.rates)
        })
    /*countryService   
      .getAll()      
      .then(initialCountries => {
        console.log('promise fulfilled') 
        setCountries(initialCountries)      
      })
  }, [])  */
  console.log('render', countries.length, 'countries')
  console.log('countries', countries)

  const handleShowChange = (event) => {    
    //console.log(event.target.value)    
  setNewShow(event.target.value)  }

  return (
    <div>
      <Filter 
        newShow={newShow} 
        set={setNewShow}
        handleShowChange={handleShowChange}
      />
      <Countries 
        countries={countries}
        newShow={newShow}
        countryService={countryService}
        setCountries={setCountries}
      />
    </div>
  )
}

export default App

/*useEffect(() => {   
    console.log('effect') 
    //if ( name) 
    if (newShow) {
      console.log('fetching exchange rates 2...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${newShow}`)
        .then(response => {
          console.log('promise fulfilled') 
          setCountries(response.data)
        })
    }
  }, [newShow])*/
