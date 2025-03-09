import { useDispatch, useSelector } from 'react-redux'
import { incrementAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    anecdotes.sort((a, b) => b.votes - a.votes)

    const vote = (id) => {
        console.log('vote', id)
        dispatch(incrementAnecdote(id))
    }

    return (
      <div>
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
       </div>
    )
}

export default AnecdoteList