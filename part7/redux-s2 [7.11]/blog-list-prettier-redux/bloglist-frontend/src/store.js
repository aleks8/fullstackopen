import { configureStore } from '@reduxjs/toolkit'
import blogService from './services/blogs'
import blogReducer, {setBlogs} from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer, 
    notification: notificationReducer
  }
})

blogService.getAll().then(blogs =>     
  store.dispatch(setBlogs(blogs)) 
)

export default store