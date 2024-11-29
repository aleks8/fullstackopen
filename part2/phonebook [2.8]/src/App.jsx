import { useState } from 'react'

const Name = (props) => {
  return (
    <li>{props.persons.name}</li>
  )
} 

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  //console.log('persons',{persons})
  const handleNameChange = (event) => {    
    //console.log(event.target.value)    
    setNewName(event.target.value)  }

  const handleNumberChange = (event) => {    
    //console.log(event.target.value)    
    setNewNumber(event.target.value)  }
  
  const addNote = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)  
    const noteObject = {
      name: newName,
      number: newNumber,
      //important: Math.random() < 0.5,
      //id: String(persons.length + 1),
    }
    //console.log('no',noteObject)
    //console.log(persons.findLastIndex())
    const map1 = persons.map((x) => JSON.stringify(x) == JSON.stringify(noteObject))
    //console.log(map1)
    //console.log(map1.includes(true))
    const canAdd = map1.includes(true)
    //console.log('p',persons)
    !(canAdd) ? setPersons(persons.concat(noteObject))
    + setNewName('') : alert(`${newName} is already added to phonebook`)

  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName}
          onChange={handleNameChange} 
          />
        </div>
        <div>
          number: <input value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(person => 
        <div key={persons.name}>{person.name} {person.number}
        </div>
        )}
      </div>  
    </div>
  )
}
//      ...<div>debug: {newName}</div>
export default App