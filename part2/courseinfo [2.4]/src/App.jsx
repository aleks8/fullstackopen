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


//<Part part = {props.parts[0].name} exercises = {props.parts[0].exercises}/>
     // <Part part = {props.parts[1].name} exercises = {props.parts[1].exercises}/>
     // <Part part = {props.parts[2].name} exercises = {props.parts[2].exercises}/>
const Content = (props) => {
  //const partsa = {parts}
  //console.log('props',props)
  //console.log('parts',partsa)
  //console.log('part id', props.parts[0].id)
  //const result = props.parts.map(note => note.content)
  //console.log(result)
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
  //console.log(result)
    return (
      <p><b>total of {result} exercises</b></p>
      //<p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    )
}

const Course = (props) => {
  console.log('props',props)
  return (
      //console.log(props.name)
      //<Header course={props.course} />
      //<Content parts={props.course.parts} />
      //<Total parts={props.course.parts} />
      <div>
        <Header course={props.course} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>           
        <Course key={course.id} course={course} />        
      )}
    </div>
  )
}

export default App
