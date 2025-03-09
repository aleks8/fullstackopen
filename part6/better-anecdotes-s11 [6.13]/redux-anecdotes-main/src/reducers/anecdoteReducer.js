import { createSlice, current } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

//6.11 answer
//this might be the new thing? 
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content, 
        id: getId(),
        votes: 0 
      })
    },
    incrementAnecdote(state,action) {
      //console.log('inc_state', current(state))
      const id = action.payload
      //console.log('idhere', id)
      const voteToChange = state.find(a => a.id === id)
      //console.log('voteToChange', voteToChange)
      const changedVote = { ...voteToChange, votes: voteToChange.votes + 1 }
      //console.log('state.votes', voteToChange.votes)
      //console.log('changeVote', changedVote)
      //state.sort((a, b) => b.votes - a.votes)
      console.log('statehere', current(state))
      return state.map(vote =>
        vote.id !== id ? vote : changedVote 
      )  
    }
  },
})
/*
const reducer = (state = initialState, action) => {
  
  console.log('state now: ', state)
  console.log('action', action)

  let id
  let voteToChange
  let changedVote 
  switch(action.type) {
    case 'NEW_ANECDOTE':
      //state.sort((a, b) => b.votes - a.votes)
      return [...state, action.payload]
    case 'INCREMENT':
        id = action.payload.id
        //console.log('idhere', id)
        voteToChange = state.find(a => a.id === id)
        //console.log('voteToChange', voteToChange)
        changedVote = { ...voteToChange, votes: voteToChange.votes + 1 }
        //console.log('state.votes', voteToChange.votes)
        //console.log('changeVote', changedVote)
        //state.sort((a, b) => b.votes - a.votes)
        return state.map(vote =>
          vote.id !== id ? vote : changedVote 
        )
    default:
      //state.sort((a, b) => b.votes - a.votes)
      return state
  }
  //return state
}
//part of 6.6 answer but already did this before
export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      //important: false,
      id: getId(),
      votes: 0 
    }
  }
}
//part of 6.6 answer but already did this before
export const incrementAnecdote = (id) => {
  return {
    type: 'INCREMENT',
    payload: { id }
  }
}*/
//export default reducer
export const { createAnecdote, incrementAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer