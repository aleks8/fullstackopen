import blogs from '../services/blogs'
import blogService from '../services/blogs'
import { createSlice, current } from "@reduxjs/toolkit"

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    //createBlog definition removed from here!
    incrementBlog(state,action) {
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
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state,action) {
      return action.payload
    }
  },
})

export const { incrementBlog, appendBlog, setBlogs } = blogSlice.actions

//6.16 answer 
export const initializeBlogs = () => {  
  return async dispatch => {    
    const blogs = await blogService.getAll()    
    dispatch(setBlogs(blogs))  
  }
}

//6.17 answer 
export const createBlog = newObject => {  
  return async dispatch => {    
    const newBlog = await blogService.create(newObject)    
    dispatch(appendBlog(newBlog))  
  }
}

//6.18 answer
export const udpateBlogVotes = (id, voteToChange) => {  
  return async dispatch => {   
    //console.log('anecdoteshere', anecdotes) 
    //const anecdotes = await anecdoteService.getAll() 
    //const voteToChange = anecdotes.find(a => a.id === id)
    const changedVote = { ...voteToChange, votes: voteToChange.votes + 1 }
    await blogService.updateVotes(id, changedVote)    
    dispatch(incrementAnecdote(id))  
  }
}

export default blogSlice.reducer