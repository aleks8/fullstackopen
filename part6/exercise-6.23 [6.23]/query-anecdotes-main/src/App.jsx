import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import { useNotificationDispatch, useNotificationValue } from './NotificationContext'
import { NotificationContextProvider } from './NotificationContext'
import NotificationContext from './NotificationContext'

import axios from 'axios'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
//import Vote from './components/Vote'

const App = () => {

  const queryClient = useQueryClient()
  //const [notificationDisplay, setNotificationDisplay] = useState('')

  //could have also used this line below for notificationValue
  //and dispatch
  //const [notificationValue, dispatch] = useContext(NotificationContext)
  
  const dispatch = useNotificationDispatch()
  const notificationValue = useNotificationValue()
  console.log('nv1', notificationValue)
  console.log('d1', dispatch)

  /*useEffect(() => {
    if (dispatch) {
      window.location.reload()
      dispatch === null 
    }
  }, [dispatch])*/

  const handleVote = (anecdote) => {
    console.log('vote')
    //dispatch({type: 'VOTED', payload: 'You voted '+anecdote.content}) 
    //console.log('nvhere', notificationValue)
    //setNotificationDisplay(notificationValue)
    changeVotes(anecdote)
    
  }

  const updateAnecdoteMutation = useMutation({    
    mutationFn: updateAnecdote,    
    onSuccess: (updatedAnecdote) => {      
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] 
      })  
      //console.log('nvhere3', notificationValue)
      dispatch({type: 'VOTED', payload: 'You voted '+updatedAnecdote.content}) 
      //setNotificationDisplay(notificationValue)
      setTimeout(() => {
        //setNotificationDisplay('Add anecdote or vote')
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000) 
     //setNotificationDisplay(notificationValue)
    },  
  })  

  const changeVotes = (anecdote) => {    
    //updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 }) 
    updateAnecdoteMutation.mutate({id: anecdote.id, content: anecdote.content,
       votes: anecdote.votes + 1 }) 
    //dispatch({type: 'VOTED', payload: 'You voted '+anecdote.content})   
    /*dispatch({type: 'VOTED', payload: 'You voted '+anecdote.content}) 
    //setNotificationState(true) 
    console.log('nvhere2', notificationValue)
    //console.log('notiValue', notificationValue)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000) */
  }
/*  const anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ]
*/

  const result = useQuery({    
    queryKey: ['anecdotes'],    
    queryFn: getAnecdotes, 
    retry: 1,
    //below is an optimization concept mentioned
    //refetchOnWindowFocus: false
  })  
  
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {    
    return <div>loading data...</div>  
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data
//handleVote(anecdote)
//    <NotificationContextProvider>
// </NotificationContextProvider>
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}


    </div>
    
  )
}

export default App
