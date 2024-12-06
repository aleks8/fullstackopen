const Persons = (props) => {

    const peopleToShow = props.newShow == ''
    ? props.persons
    : props.persons.filter(person => person.name.toLowerCase().includes(props.newShow.toLowerCase()) === true)
  
    return (
      <div>{peopleToShow.map(person => 
        <div key={props.persons.name}>{person.name} {person.number}
        </div>
        )}
      </div>  
    )
  }

export default Persons