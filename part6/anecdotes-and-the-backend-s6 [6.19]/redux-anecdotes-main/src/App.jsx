import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
//import anecdoteService from './services/anecdotes'
//import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

//6.16 and 6.17 submissions are identical - solved both 
const App = () => {
  const dispatch = useDispatch()  

  useEffect(() => {    
    //6.16 answer
    dispatch(initializeAnecdotes()) 
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

