import { useState } from 'react'

const StatisticLine = (props) => {
  return ( 
    <tr>
      <td>{props.text}</td>
      <td>{props.value}{props.perc}</td>
    </tr>
  )
}
const Statistics = (props) => {
  if((props.good+props.neutral+props.bad)>0) {
    return (   
      <div> 
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value ={props.good} perc=""/>
          <StatisticLine text="neutral" value ={props.neutral} perc=""/>
          <StatisticLine text="bad" value ={props.bad} perc=""/>
          <StatisticLine text="all" value ={props.good+props.neutral+props.bad} perc=""/>
          <StatisticLine text="average" value ={(props.good+props.neutral+props.bad)/3} perc=""/>
          <StatisticLine text="positive" value ={(props.good/(props.good+props.neutral+props.bad))*100} perc="%"/>
        </tbody>
      </table>
      </div>  
    )
  }
  return (
    <div>
      No feedback given
    </div>
  )
}

const Button = (props) => {
  const handleClick = () => {
    props.set(props.value + 1)
  }
  return (
    <button onClick={handleClick}>
        {props.text}
      </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <p>
      <Button text="good" value={good} set={setGood}/>
      <Button text="neutral" value={neutral} set={setNeutral}/>
      <Button text="bad" value={bad} set={setBad}/>
      </p>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
