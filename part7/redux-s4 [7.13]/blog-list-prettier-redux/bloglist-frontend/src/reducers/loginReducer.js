import blogs from '../services/blogs'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { createSlice, current } from "@reduxjs/toolkit"

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    logOutUser(state, action) {
      return null
    },
    setLoginUser(state,action) {
      //console.log('action.payload', action.payload)
      //console.log('statehere', current(state))
      //state.push(action.payload)
      return action.payload
    }
  },
})

export const {  logOutUser, setLoginUser } = loginSlice.actions

export const initializeLogin = (username, password) => {  
  return async dispatch => {    
    console.log('here')
    const user = await loginService.login({
            username,
            password,
    
    })      
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    blogService.setToken(user.token);
    //dispatch(setLoginUser(user))
    //console.log('user', user)
    dispatch(setLoginUser(user))
    //console.log('statehere', current(state))
    //console.log('state.login - here', state.login)
   // const blogs = await blogService.getAll()    
  //  dispatch(setBlogs(blogs))  
  }
}


export default loginSlice.reducer

/*    //createBlog definition removed from here!
    incrementBlogLogin(state,action) {
    },
    appendBlogLogin(state, action) {
      state.push(action.payload)
    },*/

    /*
export const createBlogLogin = newObject => {  
  return async dispatch => {    
    const newBlog = await blogService.create(newObject)    
    dispatch(appendBlog(newBlog))  
  }
}

export const removeBlogLogin = (id) => {
    return async dispatch => {    
        await blogService.remove(id)  
      }
}
export const udpateBlogLikesLogin = (id, voteToChange) => {  
  return async dispatch => {   
    const changedVote = { ...voteToChange, votes: voteToChange.votes + 1 }
    await blogService.update(id, changedVote)    
    dispatch(incrementBlog(id))  
  }
}*/