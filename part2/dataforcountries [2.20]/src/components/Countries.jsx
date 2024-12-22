
import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = (props) => {
    const [showOne, setShowOne] = useState('')
    const [savedShow, setSavedShow] = useState('')
    const [originalData, setOriginalData] = useState(props.countries)
    const [filteredData, setFilteredData] = useState(props.countries)
    //const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
      setOriginalData(props.countries);
      setFilteredData(props.countries);
    }, [props.countries])

    const api_key = import.meta.env.VITE_SOME_KEY
    const [weather, setWeather] = useState('')
    const [temp, setTemp] = useState('')
    const [wind, setWind] = useState('')
    const [icon, setIcon] = useState('')
    const [description, setDescription] = useState('')
    
    console.log('weather01',weather)
    

    const count = 0
    console.log('props',props)
    const peopleToShow = props.newShow === ''
    ? filteredData
    : filteredData.filter(country => country.name.common.toLowerCase().includes(props.newShow.toLowerCase()) === true)
  
    console.log('c', props.countries.filter(country => country.name.common.toLowerCase().includes(props.newShow.toLowerCase()) === true))
    console.log('ppl',peopleToShow)
    console.log('capital',peopleToShow.capital)

    if(peopleToShow.length === 1){
      console.log('length1', peopleToShow[0].capital[0])
    }

    const capital = peopleToShow.map(country => 
      <div key={props.countries}> capital {country.capital} </div>)
    const area = peopleToShow.map(country => 
      <div key={props.countries}> area {country.area} </div>)
    

      useEffect(() => {
        console.log('effect run, country is now', showOne)
        //console.log('api-key', api_key)
        // skip if currency is not defined
        //can't seem to add this &units=metric
        //I think I need to get rid of !weather 
        //(weather && (savedShow !== props.newShow)
        if ((!weather && showOne !== '') || (showOne !== '' && showOne.capital[0] !== weather.name)) {
          const country = showOne
          console.log('1fetching exchange rates...')
          console.log('chere1', country)
          axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
            .then(response => {
              setWeather(response.data)
            })
        } 
        if ((!weather && peopleToShow.length === 1) || (peopleToShow.length === 1 && peopleToShow[0].capital[0] !== weather.name)) {
          const country = peopleToShow[0]
          console.log('2fetching exchange rates...')
          console.log('chere2', country)
          axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
            .then(response => {
              setWeather(response.data)
            })
        }
      }, [showOne, peopleToShow, weather, icon])
      //showOne, api_key, peopleToShow, weather, savedShow, props.newShow
      console.log('weather1',weather)
   
    //console.log('print', peopleToShow.length !== 1 && showOne !== true)
    if(showOne && savedShow !== props.newShow) {
      setFilteredData(originalData)
      setShowOne('')
      setIcon('')
      setDescription('')
      setTemp('')
      setWind('')
      setWeather('')
      //setRefreshKey(refreshKey + 1)
      //maybe could update the state here and get all people to show
      /*return (
        null
    )*/
    }

    if(peopleToShow.length > 10) {
      //setRefreshKey(refreshKey + 1)
      return ('Too many matches, specify another filter')
    }
    
    else if(peopleToShow.length !== 1 && showOne === '') {
      return (
        //<div>{countries}</div>
        //maybe I should move this up and move the ==1 here 
        <div>{peopleToShow.map(country => 
          <div key={props.countries}>
            {country.name.common} 
            <button onClick={showOneCountry(country, peopleToShow, 
              setShowOne, showOne, props.newShow, setSavedShow)}>show</button>
          </div>
          )}
          
        
        
        </div> 
        
        //  <button type="button" onClick={showOneCountry(country)}>show</button>
        //  move button up and edit 
        // <button type="show" onClick={showCountry(person, props)}>show</button>
      )

      
    }
    
    if (showOne !== '') {
      console.log('showoneppl',peopleToShow[0])
      console.log('showonehere',showOne)
      console.log('savedShow',savedShow)
      console.log('newshow',props.newShow)
      console.log('peopletoshowhere',peopleToShow)
      if(savedShow !== props.newShow) {
        setFilteredData(originalData)
        setShowOne('')
        setIcon('')
        setDescription('')
        setTemp('')
        setWind('')
        setWeather('')
        //setRefreshKey(refreshKey + 1)
        //maybe could update the state here and get all people to show
        /*return (
          null
      )*/
      }
      
      return (
        
        DisplayOneCountry(showOne, weather, 
          temp, setTemp, wind, setWind, icon, setIcon,
          description, setDescription) 
        
      )
    }
    /*if (count > 0) {
      return (displayOneCountry(peopleToShow[0]))
    }*/
    /*if(showOne) {
      return (
        showOneCountry(showOne)
      )
    }*/
    if(peopleToShow.length === 1 && showOne==='') {
        //return (
      console.log('co',count )
      const onecountry = peopleToShow[0]
      console.log('on',onecountry)
      console.log('on',onecountry.name)
      /**/
      return (
        DisplayOneCountry(onecountry, weather, 
          temp, setTemp, wind, setWind, icon, setIcon, 
          description, setDescription)
      )
    }
  //}
  }

  /*<div>{peopleToShow.map(country => 
          <div key={props.countries}>
            {country.name.common} 
          </div>
          )}
        </div>*/
  //const deleteUser = (person, props) => () => {
  const showOneCountry = (country, peopleToShow, setShowOne, showOne, newShow, setSavedShow, weather, temp, setTemp) => () => {
    //event.preventDefault()
    setSavedShow(newShow)
    setShowOne(country)
    console.log('show',showOne)
    //count = count + 1
    //console.log('count', count)
    /*peopleToShow.filter(person => 
      person.name.common.toLowerCase().includes(country.name.common.toLowerCase()) === true)*/
    console.log('cmethod',peopleToShow)
    console.log('c',country.name.common.toLowerCase())
    console.log('psf',peopleToShow.filter(person => 
      person.name.common.toLowerCase().includes(country.name.common.toLowerCase()) === true))
    //setShowOne(country)
    DisplayOneCountry (country, weather, 
      temp, setTemp, wind, setWind, icon, setIcon, 
      description, setDescription)
    /*  return(
        peopleToShow
      )*/
    }
  const DisplayOneCountry = (country, weather, 
    temp, setTemp, wind, setWind, icon, setIcon,
    description, setDescription) => {
    //setShowOne(null)
    //temperature {weather.main.temp} Celsius 
    //wind {weather.wind.speed} m/s
    //need to figure out what to do if the weather api is not received and null 
    //const [temp, setTemp] = useState('')
    //setTemp(weather.main.temp)
    console.log('weather2',weather)
    console.log('stationweather',weather.name)
    console.log('capitaltocompare',country.capital[0])
    //console.log('weathert',weather.main.temp)
    //setTemp(0)
    //const description = 'Weather'
    if(weather === '' && temp !== 0) {
      //const celcius = weather.main.temp 
      setTemp(0)
    }
    else if (weather !== '' && weather.main.temp !== temp) {
      setTemp(weather.main.temp)
    }
    if(weather === '' && wind !== 0) {
      //const celcius = weather.main.temp 
      setWind(0)
    }
    else if (weather !== '' && weather.wind.speed !== wind) {
      setWind(weather.wind.speed)
    }
    if (weather === '' && icon !== 0) {
      setIcon(0)
      setDescription('Weather icon')
      console.log('sethere')
    }
    else if (weather !== '' &&  weather.weather[0].icon !== icon) {
      const weather_0 = weather.weather[0].icon
      setDescription(weather.weather[0].description)
      /*axios
      .get(`https://openweathermap.org/img/wn/${icon}@2x.png`)
      .then(response => {
        setUrl(response.data)
      })*/
      setIcon(weather.weather[0].icon)
      //const value = JSON.stringify(icon)
      const url = 'https://openweathermap.org/img/wn/'+icon+'@2x.png'
      //setIcon(weather_0["icon"])
      //const icon = weather_0["icon"]
      console.log('weather[0]', weather_0)
      console.log('description', description)
      console.log('icon',icon)
      console.log('url',url)
      //console.log('v',value)
    }
    console.log('weathert',temp)
    console.log('weatherwind',wind)
    return (
      <div>
        <p>
        <h1>{country.name.common} </h1>  
        <div>
        capital {country.capital} <br></br>
        area {country.area}
        </div>
        <div>
        <br></br><b>languages: </b>
        <ul>{Object.values(country.languages).map(lang => 
        <li key={lang}> {lang} </li>)}
        </ul>
        </div>
        <img
        src={country.flags.svg}
        alt={country.flags.alt}
        style={{
          width: '30%',
          maxWidth: '800px',
          height: 'auto',
        }}
      />
        <h3>Weather in {country.capital}</h3>
        temperature {temp} Celsius <br></br>
        <div>
        <img
        src={'https://openweathermap.org/img/wn/'+icon+'@2x.png'}
        alt={description}
        style={{
          width: '30%',
          maxWidth: '800px',
          height: 'auto',
        }}
        />
        </div>
        wind {wind} m/s
        </p>
        </div> 
      )
  }

  export default Countries

  /*if(showOne) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${showOne.capital}&appid=${api_key}`)
        .then(response => {
          setWeather(response.data)
        })
    }*/
    /*const onSearch = (event) => {
        event.preventDefault()
        setCurrency(value)
      }*/
    /*if (showOne !== '' && weather !== '') {
      if (showOne.capital[0] !== weather.name) {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${showOne.capital}&appid=${api_key}&units=metric`)
            .then(response => {
              setWeather(response.data)
            })
      }
    } */
  //'https://openweathermap.org/img/wn/'+icon+'@2x.png'}
        // https://openweathermap.org/img/wn/'+{icon}+'2x.png'}
  /*const Language = ({country}) => {
  return (
    country.map(([langCode, langName], index) => (
    <li key={index}>{langName}</li>
  )))}*/
  //return(country.map((l) => 
  //<div key={country}>{l}</div>)
//)}

     /*const language = peopleToShow.languages.map(lang => 
        <div key={lang.index}> {lang.name} </div>)*/
  
    
    //if(peopleToShow.languages) {
    /*const languages = peopleToShow?.map((country, index) => 
      country.languages && (<li key={index}>{country.languages}</li>))*/
    //console.log('l',languages)
    //}
    /*if(peopleToShow.languages) {
      console.log('languages',{languages})
      const languages = peopleToShow.languages.map(country => 
        <div key={props.countries.languages}> {country} </div>)
      return ( languages
        //const languages
      //console.log('languages',{languages})
    )
  }*/
  //console.log('languages',{languages})
    //const onelanguage = languages.map(l => <div key={props.countries}> language {l}</div>)
    //console.log('languages',languages)
    //console.log('onel',onelanguage)
  /*const flag = peopleToShow.map(country => 
      <div key={props.countries}> {country.flag.svg} </div>)*/

          /*<div>
        <p>
        <h1><div>{peopleToShow.map(country => 
            <div key={props.countries}>
              {country.name.common} 
            </div>
            )}
          </div> </h1>  
        <div>
        {capital}
        {area}
        </div>
        <div>
        <br></br><b>languages: </b>
        <ul>{Object.values(onecountry.languages).map(lang => 
        <li key={lang}> {lang} </li>)}
        </ul>
        </div>
        <img
        src={onecountry.flags.svg}
        alt={onecountry.flags.alt}
        style={{
          width: '30%',
          maxWidth: '800px',
          height: 'auto',
        }}
      />
        </p>
        </div> */

    //country.name.common.toLowerCase().includes(props.newShow.toLowerCase()) === true)
    //const onecountry = country
    /*
      return (
        <div>
        <p>
        <h1>{country.name.common} </h1>  
        <div>
        {country.capital}
        {country.area}
        </div>
        <div>
        <br></br><b>languages: </b>
        <ul>{Object.values(country.languages).map(lang => 
        <li key={lang}> {lang} </li>)}
        </ul>
        </div>
        <img
        src={country.flags.svg}
        alt={country.flags.alt}
        style={{
          width: '30%',
          maxWidth: '800px',
          height: 'auto',
        }}
      />
        </p>
        </div> 
      )
    */