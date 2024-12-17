
const Countries = (props) => {
    console.log('props',props)
    const peopleToShow = props.newShow === ''
    ? props.countries
    : props.countries.filter(country => country.name.common.toLowerCase().includes(props.newShow.toLowerCase()) === true)
  
    console.log('c', props.countries.filter(country => country.name.common.toLowerCase().includes(props.newShow.toLowerCase()) === true))
    console.log('ppl',peopleToShow)
    console.log('capital',peopleToShow.capital)

    const capital = peopleToShow.map(country => 
      <div key={props.countries}> capital {country.capital} </div>)
    const area = peopleToShow.map(country => 
      <div key={props.countries}> area {country.area} </div>)
    


    if(peopleToShow.length > 10) {
      return ('Too many matches, specify another filter')
    }
    
    else if(peopleToShow.length === 1) {
      const onecountry = peopleToShow[0]
      console.log('on',onecountry)
      console.log('on',onecountry.name)
      /**/
      return (
        <div>
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
        </div> 
      )
    }

    
    //if(peopleToShow.length === 1) {
    return (
      //<div>{countries}</div>
      <div>{peopleToShow.map(country => 
        <div key={props.countries}>
          {country.name.common} 
        </div>
        )}
      </div> 
      
    )
  //}
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