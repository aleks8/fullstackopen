import { useState } from 'react'

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
      <h1>statistics</h1>
      <p> good {good} <br></br>
          neutral {neutral} <br></br>
          bad {bad} <br></br>
          all {good+neutral+bad} <br></br>
          average {(good+neutral+bad)/3} <br></br>
          positive {(good/(good+neutral+bad))*100}%</p>
    </div>
  )
}

export default App
