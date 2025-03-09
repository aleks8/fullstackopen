import { useSelector, useDispatch } from 'react-redux'
import { incrementAnecdote } from './reducers/anecdoteReducer'
//import NewAnecdote from './components/NewAnecdote'
import { createAnecdote } from './reducers/anecdoteReducer'

//no changes to code to answer question 6.6
const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  anecdotes.sort((a, b) => b.votes - a.votes)

  const vote = (id) => {
    console.log('vote', id)
    dispatch(incrementAnecdote(id))
  }

  const addAnecdote = (event) => {
      event.preventDefault()
      //console.log('event', event)
      //console.log('content', event.target.anecdote.value)
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      //const content = 'test'
      dispatch(createAnecdote(content))
    }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">create</button>
      </form> 
    </div>
  )
}

export default App
/*
<div>
      <NewAnecdote />
      </div>

      <form>
        <div><input /></div>
        <button>create</button>
      </form>
      */
