const Header = (props) => {
    //console.log('there',props.course.name)
    return (
        <h2>{props.course.name}</h2>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
          {props.part} {props.exercises}
        </p>
    )
  }
  
  
  const Content = (props) => {
  
    return (
      <div>
          {props.parts.map(note => 
            <p key={note.id}>{note.name} {note.exercises}
            </p>
          )}
      </div>
    )
  }
  
  const Total = (props) => {
    const result = props.parts.reduce(
      (sum, exercise) => sum + exercise.exercises,
      0,
    )
      return (
        <p><b>total of {result} exercises</b></p>
        
      )
  }
  
  const Course = (props) => {
    return (
        <div>
          <Header course={props.course} />
          <Content parts={props.course.parts} />
          <Total parts={props.course.parts} />
        </div>
    )
  }

export default Course