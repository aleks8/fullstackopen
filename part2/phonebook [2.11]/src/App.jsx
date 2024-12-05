import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'

const App = () => {
  const [people, setPeople] = useState([])
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newShow, setNewShow] = useState('')

  useEffect(() => {    
    console.log('effect')    
    axios      
      .get('http://localhost:5173/persons')      
      .then(response => {        
        console.log('promise fulfilled')        
        setPeople(response.data)      
    })  
  }, [])  
  console.log('render', people.length, 'persons')

  const addNote = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)  
    //console.log('pr',props)
    const noteObject = {
      name: newName,
      number: newNumber,
      //important: Math.random() < 0.5,
      id: String(persons.length + 1),
    }
    //console.log('no',noteObject)
    //console.log(persons.findLastIndex())
    const map1 = persons.map((x) => JSON.stringify(x.name) == JSON.stringify(noteObject.name))
    //console.log(map1)
    //console.log(map1.includes(true))
    const canAdd = map1.includes(true)
    //console.log('p',persons)
    !(canAdd) ? setPersons(persons.concat(noteObject))
    + setNewName('') : alert(`${newName} is already added to phonebook`)

  }

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
        persons={persons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNote={addNote}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        newShow={newShow}
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