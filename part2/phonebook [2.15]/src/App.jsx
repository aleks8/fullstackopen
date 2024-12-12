import { useState, useEffect } from 'react'
//import axios from 'axios'
import personService from './services/persons'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'

const App = () => {
  const [people, setPeople] = useState([])
  /*const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])*/

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newShow, setNewShow] = useState('')

  useEffect(() => {   
    console.log('effect')  
    personService   
      .getAll()      
      .then(initialPeople => {
        console.log('promise fulfilled') 
        setPeople(initialPeople)      
      })
  }, [])  
  console.log('render', people.length, 'persons')

  /*personService      
      .update(noteObject.id, noteObject)      
      .then(response => {     
        console.log(response) */  

  const addNote = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)  
    //console.log('pr',props)
    const noteObject = {
      name: newName,
      number: newNumber,
      //important: Math.random() < 0.5,
      id: String(people.length + 1),
    }
    
    //I think here is where it adds it before checking the logic 
    const map1 = people.map((x) => JSON.stringify(x.name) == JSON.stringify(noteObject.name))
        //console.log(map1)
        //console.log(map1.includes(true))
        const canAdd = map1.includes(true)
        //console.log('p',persons)
        !(canAdd) ? 
          personService
            .create(noteObject)
              .then(returnedPeople => {     
                console.log(returnedPeople)    
                //setPeople(people.concat(returnedPeople))
                //setNewName('')
              
                //console.log('no',noteObject)
                //console.log(persons.findLastIndex())
                setPeople(people.concat(returnedPeople))
        + setNewName('') })
        : 
        replacePhoneNum(noteObject) //maybe this is retur
    
  
  
  }

  const replacePhoneNum = (noteObject) => {
    if (window.confirm(noteObject.name+' is already added to phonebook,'+ 
      ' replace the old number with a new one?')) {
      console.log('replacePhoneNum')
       //could be helpful 
      console.log('no',noteObject)
      console.log('noname',noteObject.name)
        const changeNumberOf = (name) => {
          const origPerson = people.find(p => p.name === name)
          const changedNumber = { ...origPerson, number:newNumber }
          console.log('p', origPerson)
          console.log('cN',changedNumber)
        
        //changeNumberOf(noteObject.name)
        
          personService      
            .update(origPerson.id, changedNumber)      
                .then(returnedNote => {
                setPeople(people.map(p => p.id === origPerson.id ? returnedNote : p))     
            })
            .catch(error => {     
              alert(        
                `the note '${changedNumber.name}' was already deleted 
                from server`      
              )      
                setPeople(people.filter(p => p.id !== origPerson.id))    
            })
        }
      changeNumberOf(noteObject.name)
      }
      
      
    }
  
  /*<Persons personService={personService}/> //maybe this would work? could move to form?
  const deleteUser = (id) => {
    personService      
        .remove(id) 
        .then(response => {
          //console.log(notRemovedPeople)
          console.log('promise fulfilled') 
          setPeople(people.map(notRemovedPeople => 
            notRemovedPeople.id !== id ? response.data : notRemovedPeople))     
        })
  
  }*/

  //console.log('persons',{persons})
  const handleNameChange = (event) => {    
    //console.log(event.target.value)    
    setNewName(event.target.value)  }

  const handleNumberChange = (event) => {    
    //console.log(event.target.value)    
    setNewNumber(event.target.value)  }

  const handleShowChange = (event) => {    
      //console.log(event.target.value)    
    setNewShow(event.target.value)  }
  //console.log(newShow == '')
  //console.log(peopleToShow)
  /*const handleShowChange = (event) => {    
    //console.log(event.target.value)    
    setNewShow(event.target.value)  }*/

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        newShow={newShow} 
        set={setNewShow}
        handleShowChange={handleShowChange}
      />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        people={people}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPeople}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNote={addNote}
      />
      <h2>Numbers</h2>
      <Persons 
        people={people}
        newShow={newShow}
        personService={personService}
        setPeople={setPeople}
      />
      
    </div>
  )
}

//      ...<div>debug: {newName}</div>
export default App
/*<div>
        {peopleToShow.map(note =>          
        <div key={note.id} note={note} >
        </div>
        )}
      </div>*/


  //const [show, setShow] = useState(true)

  //const peopleToShow = showAll    
    //? notes    
   // : notes.filter(note => note.important === true)
  //JSON.stringify(person.name).includes(JSON.stringify(newShow)) == JSON.stringify(noteObject.name)
  //console.log('nS',newShow.toLowerCase())
  //console.log('ps',JSON.stringify(persons[0].name))
  //console.log('includes',persons[0].name.toLowerCase().includes(newShow.toLowerCase()))
  //console.log(persons.filter(person => person.name.toLowerCase().includes(newShow.toLowerCase()) === true))
  
  /*
const Name = (props) => {
  return (
    <li>{props.persons.name}</li>
  )
} 
*/