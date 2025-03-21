import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'

import axios from 'axios'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const queryClient = useQueryClient()

  const handleVote = (anecdote) => {
    console.log('vote')
    changeVotes(anecdote)
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
    retry: 1
  })  
  
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {    
    return <div>loading data...</div>  
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
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
