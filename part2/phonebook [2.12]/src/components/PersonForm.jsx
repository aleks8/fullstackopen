const PersonForm = (props) => {
    /*const HandleShowChange = (event) => {    
      //console.log(event.target.value)    
      //console.log('hsc',props)
      props.setNewShow(event.target.value)  }*/
      
      return (
        <form onSubmit={props.addNote}>
            <div>
              name: <input value={props.newName}
              onChange={props.handleNameChange} 
              />
            </div>
            <div>
              number: <input value={props.newNumber}
              onChange={props.handleNumberChange}
              />
            </div>
            <div>
              <button type="submit">add</button>
            </div>
        </form>
      )
    }

export default PersonForm