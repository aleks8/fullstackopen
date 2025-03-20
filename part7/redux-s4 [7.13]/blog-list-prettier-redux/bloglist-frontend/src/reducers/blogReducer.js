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
        vote.id !== id ? vote : changedVote )  

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

export const initializeBlogs = () => {  
  return async dispatch => {    
    const blogs = await blogService.getAll()    
    dispatch(setBlogs(blogs))  
  }
}

export const createBlog = newObject => {  
  return async dispatch => {    
    const newBlog = await blogService.create(newObject)    
    dispatch(appendBlog(newBlog))  
  }
}

export const removeBlog = (id) => {
    return async dispatch => {    
        await blogService.remove(id)  
        /*.then(remainingBlogs => {
            remainingBlogs = blogs.filter(b => b.id !== blog.id)})
        //probably have to change this line   
        dispatch(setBlogs(remainingBlogs))  */
      }
}
export const udpateBlogLikes = (id, voteToChange) => {  
  return async dispatch => {   
    //console.log('anecdoteshere', anecdotes) 
    //const anecdotes = await anecdoteService.getAll() 
    //const voteToChange = anecdotes.find(a => a.id === id)
    const changedVote = { ...voteToChange, votes: voteToChange.votes + 1 }
    await blogService.update(id, changedVote)    
    dispatch(incrementBlog(id))  
  }
}

export default blogSlice.reducer