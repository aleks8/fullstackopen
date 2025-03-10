import ReactDOM from 'react-dom/client'
//import { createStore , combineReducers} from 'redux'
import { Provider } from 'react-redux'
//import { configureStore } from '@reduxjs/toolkit'
import App from './App'
//import { createAnecdote } from './reducers/anecdoteReducer'
//import { filterChange } from './reducers/filterReducer'
import store from './store'


console.log(store.getState())
//const store = createStore(reducer)

//store.subscribe(() => console.log(store.getState()))
//store.dispatch(filterChange('hurts'))
//store.dispatch(createAnecdote('It only works on my machine...'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)