import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

//6.14 and 6.15 submissions are identical 
const App = () => {
  const dispatch = useDispatch()  
  useEffect(() => {    
    anecdoteService    
      .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))  
  }, [])


  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification /><p></p>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App

