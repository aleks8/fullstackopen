import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const points = new Array(anecdotes.length).fill(0)
  const copy = [...points]
  //const [counter, setCounter] = useState(copy) 
  //const [users, setUsers] = useState([copy]);
  //const newArray = [...users];
  const [counters, setCounters] = useState(copy);

  const handleClick = () => {  
    setSelected(Math.floor(Math.random() * anecdotes.length))   
  }
  
  function handleClickVote() {
    console.log('selected',selected)
    const nextCounters = counters.map((c, i) => {
      if (i === selected) {
        // Increment the clicked counter
        return c + 1;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setCounters(nextCounters);
  }

  //{counters[selected]} <br></br>
  //{selected}
  return (
    <div>
      {anecdotes[selected]} <br></br>
      has {counters[selected]} votes <br></br>
      <button onClick={handleClickVote}>        
        vote      
      </button>
      <button onClick={handleClick}>        
        next anecdote      
      </button>
    </div>
  )
}

export default App