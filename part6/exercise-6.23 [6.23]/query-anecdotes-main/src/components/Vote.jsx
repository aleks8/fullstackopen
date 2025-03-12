/*import { useContext, useState } from "react"
import {useNotificationDispatch, useNotificationValue} from '../NotificationContext'
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { updateAnecdote } from "../requests"

const Vote = ({anecdote}) => {
  
    const queryClient = useQueryClient()
    //const [notificationState, setNotificationState] = useState(false)
  
    //const [notificationValue, dispatch] = useContext(NotificationContext)
    const dispatch = useNotificationDispatch()
    //const notificationValue = useNotificationValue()
  
    /*useEffect(() => {
      if (dispatch) {
        window.location.reload()
        dispatch === null 
      }
    }, [dispatch])*/
 /*   handleVote(anecdote)
    const handleVote = (anecdote) => {
      console.log('vote')
      changeVotes(anecdote)
      dispatch({type: 'VOTED', payload: 'You voted '+anecdote.content}) 
      //setNotificationState(true) 
      //console.log('notiValue', notificationValue)
        setTimeout(() => {
          dispatch({ type: 'CLEAR_NOTIFICATION' });
        }, 5000) 
    }
  
    const updateAnecdoteMutation = useMutation({    
      mutationFn: updateAnecdote,    
      onSuccess: () => {      
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] 
        })  
      },  
    })  
  
    const changeVotes = (anecdote) => {    
      updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 }) 
      //updateAnecdoteMutation.mutate({id: anecdote.id, content: anecdote.content,
      //   votes: anecdote.votes + 1 }) 
      //dispatch({type: 'VOTED', payload: 'You voted '+anecdote.content})   
       
    }
  
//{notification}
//<div style={style}>
//{notificationValue}
//</div>
/*  return (
    <div>

    </div>
  )
}

export default Vote*/

