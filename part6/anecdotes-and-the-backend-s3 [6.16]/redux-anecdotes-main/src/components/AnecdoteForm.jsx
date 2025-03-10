//6.7 answer
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
//import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    console.log('event', event)
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    //const content = 'test'
    //part of 6.15 answer -- 2 lines below 
    //const newAnecdote = await anecdoteService.createNew(content)    
    
    //6.17 answer
    dispatch(createAnecdote(content))
    //dispatch(createAnecdote(content))
    dispatch(setNotification('you added '+content))
    setTimeout(() => {        
      dispatch(removeNotification('Add an anecdote or vote'))      
    }, 5000)
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