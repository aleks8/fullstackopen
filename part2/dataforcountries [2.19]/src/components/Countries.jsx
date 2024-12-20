
import { useState, useEffect } from 'react'

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

    const count = 0
    console.log('props',props)
    const peopleToShow = props.newShow === ''
    ? filteredData
    : filteredData.filter(country => country.name.common.toLowerCase().includes(props.newShow.toLowerCase()) === true)
  
    console.log('c', props.countries.filter(country => country.name.common.toLowerCase().includes(props.newShow.toLowerCase()) === true))
    console.log('ppl',peopleToShow)
    console.log('capital',peopleToShow.capital)

    const capital = peopleToShow.map(country => 
      <div key={props.countries}> capital {country.capital} </div>)
    const area = peopleToShow.map(country => 
      <div key={props.countries}> area {country.area} </div>)
    

    /*const onSearch = (event) => {
        event.preventDefault()
        setCurrency(value)
      }*/
    //console.log('print', peopleToShow.length !== 1 && showOne !== true)
    if(showOne && savedShow !== props.newShow) {
      setFilteredData(originalData)
      setShowOne('')
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
        //setRefreshKey(refreshKey + 1)
        //maybe could update the state here and get all people to show
        /*return (
          null
      )*/
      }
      
      return (
        
        displayOneCountry(showOne) 
        
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
        displayOneCountry(onecountry)
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
  const showOneCountry = (country, peopleToShow, setShowOne, showOne, newShow, setSavedShow) => () => {
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
    displayOneCountry (country)
    /*  return(
        peopleToShow
      )*/
    }
  const displayOneCountry = (country) => {
    //setShowOne(null)
    
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
        </p>
        </div> 
      )
  }

  export default Countries

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