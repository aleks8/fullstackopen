import { useContext } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch, useNotificationValue } from "../NotificationContext"
import NotificationContext from "../NotificationContext"
//import { setNotification } from "../NotificationContext"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  //could have also used this line below
  //const [notificationValue, dispatch] = useContext(NotificationContext)

  const dispatch = useNotificationDispatch()
  const notificationValue = useNotificationValue()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote, 
    onSuccess: (newAnecdote) => {   
      const anecdotes = queryClient.getQueryData(['anecdotes'])      
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))   
      //queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      
      //setNotification({type: 'ADDED_ANECDOTE', payload: 'You added '+newAnecdote.content}, 5)
      
      dispatch({type: 'ADDED_ANECDOTE', payload: 'You added '+newAnecdote.content})
      //console.log('nvanecdoteform', notificationValue)
      //setNotificationDisplay('You added '+newAnecdote.content)
      setTimeout(() => {
        //setNotificationDisplay('Add anecdote or vote')
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000)
      /*setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000)
      setNotificationDisplay('You added2 '+newAnecdote.content)*/
    }

  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
    //console.log('nvoncreate', notificationValue)

    /*dispatch({type: 'ADDED_ANECDOTE', payload: 'You added '+content})
    setNotificationDisplay(notification)
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 5000)*/

}
/*
const addAnecdote = async (event) => {
  event.preventDefault()
  const content = event.target.anecdote.value
  event.target.anecdote.value = ''
  newAnecdoteMutation.mutate({ content, vote: 0 })  }
  */

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate} >
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
