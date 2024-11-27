import { useState } from 'react'

const Name = (props) => {
  return (
    <li>{props.persons.name}</li>
  )
} 

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Ada Lovelace' }
  ]) 
  const [newName, setNewName] = useState('')

  //console.log('persons',{persons})
  const handleNameChange = (event) => {    
    //console.log(event.target.value)    
    setNewName(event.target.value)  }
  
  const addNote = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)  
    const noteObject = {
      name: newName,
      //important: Math.random() < 0.5,
      //id: String(persons.length + 1),
    }
    
    setPersons(persons.concat(noteObject))
    setNewName('')
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(person => 
        <div key={persons.name}>{person.name}
        </div>
        )}
      </div>  
    </div>
  )
}
//      ...<div>debug: {newName}</div>
export default App