//6.7 answer
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    console.log('event', event)
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    //const content = 'test'
    dispatch(createAnecdote(content))
  }

  return (
    <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
    </div>
  )
}

export default AnecdoteForm

/*
<div>
    <h2>create new</h2>
</div>
*/