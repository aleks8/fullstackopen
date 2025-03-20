import { configureStore } from '@reduxjs/toolkit'
import blogService from './services/blogs'
import blogReducer, {setBlogs} from './reducers/blogReducer'
import filterReducer from './reducers/filterReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer, 
    filter: filterReducer,
    login: loginReducer,
    notification: notificationReducer
  }
})

blogService.getAll().then(blogs =>     
  store.dispatch(setBlogs(blogs)) 
)

export default store