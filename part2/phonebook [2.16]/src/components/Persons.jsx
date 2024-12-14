//import personService from './services/persons'

const Persons = (props) => {
    console.log('props',props)
    const peopleToShow = props.newShow === ''
    ? props.people
    : props.people.filter(person => person.name.toLowerCase().includes(props.newShow.toLowerCase()) === true)
  
    return (
      <div>{peopleToShow.map(person => 
        <div key={props.people.name}>
          {person.name} {person.number} <button  
          type="delete" onClick={deleteUser(person, props)}>delete</button>
        </div>
        )}
      </div>  
    )
  }
  
  const deleteUser = (person, props) => () => {
    //console.log('hello', person.id)
    //console.log('hello', props)
    //console.log('remPeople', props.persons.filter((x) => x.id !== person.id))
    if (window.confirm('Delete '+person.name+' ?')) {
        
          //console.log('id',person.id)
          //console.log('props',person)
          props.personService      
              .remove(person.id) 
              .then(remPeople => {
                //console.log(notRemovedPeople)
                //console.log('promise fulfilled 1') 
                remPeople = props.people.filter((x) => x.id !== person.id)
                props.setPeople(remPeople)
                  
          
              })
          }
      
  }

export default Persons

//not sure how to have the deleteuser thing work...

  //const updatedList = items.filter((item) => item.id !== id);
  //setNotes(notes.map(note => note.id === id ? response.data : note))
  //props.persons.map(notRemovedPeople => 
   // notRemovedPeople.id !== id ? response.data : notRemovedPeople)) 

 /*const printhello = () => {
    return(
      console.log('hello')
    )
  }*/