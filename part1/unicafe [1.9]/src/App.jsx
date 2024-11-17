import { useState } from 'react'

const Statistics = (props) => {
  if((props.good+props.neutral+props.bad)>0) {
    return (   
      <div> 
      <h1>statistics</h1>
      <p> good {props.good} <br></br>
          neutral {props.neutral} <br></br>
          bad {props.bad} <br></br>
          all {props.good+props.neutral+props.bad} <br></br>
          average {(props.good+props.neutral+props.bad)/3} <br></br>
          positive {(props.good/(props.good+props.neutral+props.bad))*100}%</p>
      </div>  
    )
  }
  return (
    <div>
      No feedback given
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    setGood(good +1 )
  }
  const handleClickNeutral = () => {
    setNeutral(neutral +1 )
  }
  const handleClickBad = () => {
    setBad(bad +1 )
  }
  return (
    <div>
      <h1>give feedback</h1>
      <p>
      <button onClick={handleClickGood}>
        good
      </button>
      <button onClick={handleClickNeutral}>
        neutral
      </button>
      <button onClick={handleClickBad}>
        bad
      </button>
      </p>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
