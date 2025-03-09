import { useDispatch, useSelector } from 'react-redux'
import { incrementAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        //console.log('statefilter', state.filter)
        //console.log('stateanecdotes', state.anecdotes)
        //console.log('includes', state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()) ))//=== true
        if(state.filter === '') {
            return state.anecdotes
        }
        //console.log('state.anecdotes.filter',state.anecdotes.filter)
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()) ) //=== true
        //if (state.filter === 'SET_FILTER') {
         //   console.log('statehere', state)
        //    return state
            //return state.anecdotes.filter(a => a.includes(action.payload) === true)
        //}
        //return state.anecdotes
        })
    const dispatch = useDispatch()

    //console.log('anecdotes', anecdotes)
    //if(anecdotes) {
    let sortedAnecdotes = [...anecdotes]
    sortedAnecdotes.sort((a, b) => Number(b.votes) - Number(a.votes))
    
    //}

    const vote = (id) => {
        console.log('vote', id)
        dispatch(incrementAnecdote(id))
    }

    return (
      <div>
        {sortedAnecdotes.map(anecdote =>
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